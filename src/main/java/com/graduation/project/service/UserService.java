package com.graduation.project.service;

import com.graduation.project.dao.MarketDao;
import com.graduation.project.entity.*;
import com.graduation.project.util.ImageUtil;
import net.sf.json.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.*;

@Service
public class UserService {
    @Autowired
    private MarketDao dao;
    private User userC = new User();

    //注册
    public void createUser(User user) {
        dao.createUser(user);
    }

    //登录
    public User login(String email, String password) {
        if (email.equals("") & password.equals("")) {
            System.out.println("邮箱或密码为空");
            return null;
        }
        User user = dao.login(email, password);
        if (email.equals(user.getEmail()) && password.equals(user.getPassword())) {
            userC.setEmail(user.getEmail());
            userC.setPassword(user.getPassword());
            userC.setUserName(user.getUserName());
            return userC;
        } else {
            System.out.println("用户不存在");
        }
        return userC;
    }

    //登出
    public void logout() {
        userC.setUserName(null);
        userC.setPassword(null);
        userC.setEmail(null);
    }

    //检查用户是否登录
    public User checkUser() {
        return userC;
    }

    //检查商品名字
    public Goods checkGoodsName(String email,String goodsName){
        Goods goods=dao.checkGoodsName(email,goodsName);
        return goods;
    }

    //上传商品信息
    public Map<String, String> goodsUpload(MultipartFile[] photo,Map<String, String> goods,HttpServletRequest request) {
        Map<String, String> ret = new HashMap<String, String>();
        JSONObject jsonObject=JSONObject.fromObject(goods.get("goodsMsg"));
        Goods goods1=(Goods)jsonObject.toBean(jsonObject,Goods.class);
        StringBuilder sqlPath1=new StringBuilder();
        if (photo.length != 3) {
            ret.put("type", "error");
            ret.put("msg", "请选择至少三张图片！");
            return ret;
        }
        for (int i = 0; i < photo.length; i++) {
            if (photo[i].getSize() > 1024 * 1024 * 10) {
                ret.put("type", "error");
                ret.put("msg", "文件大小不能超过10M！");
                return ret;
            }
            //获取文件后缀
            String suffix = photo[i].getOriginalFilename().substring(photo[i].getOriginalFilename().lastIndexOf(".") + 1);
            if (!"jpg,jpeg,gif,png".toUpperCase().contains(suffix.toUpperCase())) {
                ret.put("type", "error");
                ret.put("msg", "请选择jpg,jpeg,gif,png格式的图片！");
                return ret;
            }

            //获取项目根目录加上图片目录
            String savePath = "E:\\desktop\\毕业\\商城\\goodsStorage\\" + userC.getEmail() + "\\"+goods1.getGoodsName()+"\\";
            File savePathFile = new File(savePath);
            if (!savePathFile.exists()) {
                //若不存在该目录，则创建目录
                savePathFile.mkdirs();
            }
            String filename = photo[i].getOriginalFilename();
            String sqlPath2=savePath + filename+"&";
            sqlPath1.append(sqlPath2);
            try {
                //将文件保存指定目录
                photo[i].transferTo(new File(savePath + filename));
            } catch (Exception e) {
                ret.put("type", "error");
                ret.put("msg", "保存文件异常！");
                e.printStackTrace();
                return ret;
            }
        }
        String path=sqlPath1.toString();
        goods1.setEmail(userC.getEmail());
        goods1.setGoodsPath(path);
        dao.uploadGoods(goods1);
        ret.put("type", "success");
        ret.put("msg", "上传成功！");

        return ret;
    }

    //遍历商品
    public Map<String, Goods> sortList(Integer integer){
        Map<String, Goods> map = new HashMap<String, Goods>();
        List<Goods> list=dao.sortList(integer);
        for (int i=0;i<list.size();i++){
            map.put("sortList"+i, list.get(i));
        }
        return map;
    }
    public Map<String, Goods> sortList2(Integer integer,String defaultGoodsName){
        Map<String, Goods> map = new HashMap<String, Goods>();
        List<Goods> list=dao.sortList2(integer,defaultGoodsName);
        for (int i=0;i<list.size();i++){
            map.put("sortList"+i, list.get(i));
        }
        return map;
    }

    //分页查询
    public double sortMath(){
        double math=dao.sortMath()/9.0;
        return Math.ceil(math);
    }
    //分页查询2
    public double sortMath2(String defaultGoodsName){
        double math=dao.sortMath2(defaultGoodsName)/9.0;
        return Math.ceil(math);
    }

    //获取商品图片
    public Map<String, String> getImg(String[] src) throws Exception {
        List<String> list = new LinkedList<String>();
        List<String> list2 = new LinkedList<String>();
        Map<String,String> map=new LinkedHashMap<String, String>();
        for (int x = 0; x < src.length; x++) {
            list.add(x, StringUtils.strip(src[x], "[]"));
        }
        for(int x=0;x<list.size();x++){
            list2.add(x,list.get(x).replace("\"",""));
            String data= ImageUtil.getInputStream(list2.get(x));
            map.put("sortImg" +x,data);
        }
        return map;
    }

    //商品详情
    public Map<String, Goods> goodsMsg(String email,String goodsName){
        Map<String, Goods> map=new HashMap<String, Goods>();
        Goods goods=dao.goodsMsg(email,goodsName);
        map.put("data",goods);
        return map;
    }

    //加入购物车
    public void addToCar(ShopCar shopCar){
        dao.addToCar(shopCar);
    }
    public void addToWishList(WishList wishList){
        dao.addToWishList(wishList);
    }

    //购物车列表
    public Map<String,ShopCar> shopCarList(String email){
        Map<String, ShopCar> map = new HashMap<>();
        List<ShopCar> list=dao.shopCarList(email);
        for (int i=0;i<list.size();i++){
            map.put("shopCarList"+i,list.get(i));
        }
        return map;
    }

    public Map<String,ShopCar> wishList(String email){
        Map<String, ShopCar> map = new HashMap<>();
        List<ShopCar> list=dao.wishList(email);
        for (int i=0;i<list.size();i++){
            map.put("shopCarList"+i,list.get(i));
        }
        return map;
    }


    public void deleteGoods(String email,String goodsName){
        dao.deleteGoods(email,goodsName);
    }

    public void deleteWishGoods(String email,String goodsName){
        dao.deleteWishGoods(email,goodsName);
    }

    public ShopCar checkShopCar(String email, String goodsName) {
        return dao.checkShopCar(email,goodsName);
    }

    public ShopCar checkWishList(String email, String goodsName) {
        return dao.checkWishList(email,goodsName);
    }

    public Map<String,String> checkEmail(String email) {
        Map<String,String> map=new HashMap<String, String>();
        String e=dao.checkEmail(email);
        if (e==null){
            map.put("msg","0");
            return map;
        }else {
            map.put("msg","1");
            return map;
        }
    }

    public Map<String,String> accountMsg(AccountMsg accountMsg){
        System.out.println(accountMsg);
        Map<String,String> map=new HashMap<String, String>();
        int i=dao.accountMsg(accountMsg);
        System.out.println(i);
        if(i!=1){
            map.put("error","保存失败");
            return map;
        }else {
            map.put("success","保存成功");
            return map;
        }
    }
}
