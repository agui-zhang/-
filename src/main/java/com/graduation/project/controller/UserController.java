package com.graduation.project.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.graduation.project.dao.MarketDao;
import com.graduation.project.entity.*;
import com.graduation.project.service.UserService;

import com.graduation.project.util.ImageUtil;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;
import org.apache.commons.lang.StringUtils;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.*;

@Controller
public class UserController {
    @Autowired
    private UserService userService;
    String email;
    String goodsName;
    String defaultGoodsName;

    //商店首页
    @RequestMapping(value = "/shopPage", method = RequestMethod.GET)
    public String shop() {
        return "shop";
    }

    //作品介绍
    @RequestMapping(value = "/indexPage", method = RequestMethod.GET)
    public String index() {
        return "index";
    }

    //用户注册
    @RequestMapping(value = "/registerPage", method = RequestMethod.GET)
    public String register() {
        return "register";
    }

    //购物车页面
    @RequestMapping(value = "/shopCarPage", method = RequestMethod.GET)
    public String shopCar() {
        return "shopCar";
    }

    //搜索分类页面
    @RequestMapping(value = "/sortPage", method = RequestMethod.GET)
    public String sort() {
        return "sort";
    }
    //搜索分类页面
    @RequestMapping(value = "/sortPage2", method = RequestMethod.GET)
    public String sort2(@RequestParam(value = "defaultGoodsName") String defaultGoodsName) {
        this.defaultGoodsName=defaultGoodsName;
        return "sort";
    }
    //设置
    @RequestMapping(value = "/accountPage",method = RequestMethod.GET)
    public String setting(){
        return "account";
    }
    //defaultGoodsName
    @RequestMapping(value = "/searchValue",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,String> searchValue(){
        Map<String,String> map=new HashMap<String, String>();
        map.put("defaultGoodsName",defaultGoodsName);
        return map;
    }

    //sortList
    @RequestMapping(value = "/sortList", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Goods> sortList(@RequestParam("defaultPage") Integer integer) {
        this.defaultGoodsName=null;
        return userService.sortList((integer - 1) * 9);
    }
    //sortList2
    @RequestMapping(value = "/sortList2", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Goods> sortList2(@RequestParam("defaultPage") Integer integer,@RequestParam("defaultGoodsName")String defaultGoodsName) {
        return userService.sortList2((integer - 1) * 9,defaultGoodsName);
    }

    //商品详情页面
    @RequestMapping(value = "/quickViewPage", method = RequestMethod.GET)
    public String quickView() {
        return "quickView";
    }

    @RequestMapping(value = "/quickView", method = RequestMethod.POST)
    @ResponseBody
    public String quickView2(@RequestParam("email") String email, @RequestParam("goodsName") String goodsName) {
        this.email = email;
        this.goodsName = goodsName;
        return null;
    }



    //收藏页面
    @RequestMapping(value = "/wishListPage", method = RequestMethod.GET)
    public String wishList() {
        return "wishList";
    }

    //上传商品页面
    @RequestMapping(value = "/uploadPage", method = RequestMethod.GET)
    public String upload() {
        return "upload";
    }

    //检查用户是否登录
    @RequestMapping(value = "/checkUser", method = RequestMethod.GET)
    @ResponseBody
    public User checkUser() {
        return userService.checkUser();
    }

    //登出功能
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String logout() {
        userService.logout();
        return "shop";
    }

    //注册功能
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    @ResponseBody
    public void register(User user) {
        userService.createUser(user);
    }

    //登录功能
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public User login(String email, String password) {
        return userService.login(email, password);
    }

    //商品上传功能
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> upload(@RequestBody @RequestParam("Img") MultipartFile[] photo, @RequestParam Map<String, String> goods, HttpServletRequest request) throws JsonProcessingException {
        return userService.goodsUpload(photo, goods, request);
    }


    //sortImg
    @RequestMapping(value = "/sortImg", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> getImg(@RequestParam("src") String[] src) throws Exception {
        return userService.getImg(src);
    }


    @RequestMapping(value = "/goodsMsg", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Goods> goodsMsg() {
        return userService.goodsMsg(email, goodsName);
    }

    @RequestMapping(value = "/sortMath", method = RequestMethod.GET)
    @ResponseBody
    public double sortMath() {
        return userService.sortMath();
    }
    @RequestMapping(value = "/sortMath2", method = RequestMethod.GET)
    @ResponseBody
    public double sortMath2(String defaultGoodsName) {
        return userService.sortMath2(defaultGoodsName);
    }

    @RequestMapping(value = "/addToCar", method = RequestMethod.POST)
    @ResponseBody
    public void addToCar(ShopCar shopCar) {
        userService.addToCar(shopCar);
    }

    @RequestMapping(value = "/addToWishList", method = RequestMethod.POST)
    @ResponseBody
    public void addToWishList(WishList wishList) {
        userService.addToWishList(wishList);
    }

    @RequestMapping(value = "/shopCarList",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,ShopCar> shopCarList(String email){
        return userService.shopCarList(email);
    }

    @RequestMapping(value = "/wishList",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,ShopCar> wishList(String email){
        return userService.wishList(email);
    }

    @RequestMapping(value = "/deleteGoods",method = RequestMethod.POST)
    @ResponseBody
    public void deleteGoods(String email,String goodsName){
        userService.deleteGoods(email,goodsName);
    }

    @RequestMapping(value = "/deleteWishGoods",method = RequestMethod.POST)
    @ResponseBody
    public void deleteWishGoods(String email,String goodsName){
        userService.deleteWishGoods(email,goodsName);
    }

    @RequestMapping(value = "/checkShopCar",method = RequestMethod.POST)
    @ResponseBody
    public ShopCar checkShopCar(String email,String goodsName){
        if (userService.checkShopCar(email,goodsName)==null){
            return null;
        }
        return userService.checkShopCar(email,goodsName);
    }

    @RequestMapping(value = "/checkWishList",method = RequestMethod.POST)
    @ResponseBody
    public ShopCar checkWishList(String email,String goodsName){
        if (userService.checkWishList(email,goodsName)==null){
            return null;
        }
        return userService.checkWishList(email,goodsName);
    }

    @RequestMapping(value = "/checkGoodsName",method = RequestMethod.POST)
    @ResponseBody
    public Goods checkGoodsName(String email,String goodsName){
        return userService.checkGoodsName(email,goodsName);
    }

    @RequestMapping(value = "/checkEmail",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,String> checkEmail(@RequestParam("email") String email){
        return userService.checkEmail(email);
    }


    @RequestMapping(value = "/accountMsg",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,String> saveAccountMsg( AccountMsg accountMsg){
        return userService.accountMsg(accountMsg);
    }

}

