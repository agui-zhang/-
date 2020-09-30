package com.graduation.project.dao;

import com.graduation.project.entity.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarketDao {
    //用户注册
    void createUser(User user);

    //用户登录
    User login(@Param("email") String email, @Param("password") String password);

    //商品上传
    void uploadGoods(Goods goods);

    //检查商品名字是否存在
    Goods checkGoodsName(@Param("email") String email, @Param("goodsName") String goodsName);

    //遍历商品
    List<Goods> sortList(@Param("defaultPage") Integer defaultPage);

    //分页查询
    Integer sortMath();

    //分页查询2
    Integer sortMath2(@Param("defaultGoodsName") String defaultGoodsName);

    //商品详情
    Goods goodsMsg(@Param("email") String email, @Param("goodsName") String goodsName);

    //加入购物车
    void addToCar(ShopCar shopCar);

    void addToWishList(WishList wishList);

    //购物车列表
    List<ShopCar> shopCarList(@Param("email") String email);

    List<ShopCar> wishList(@Param("email") String email);


    //检查购物车
    ShopCar checkShopCar(@Param("email") String email, @Param("goodsName") String goodsName);

    ShopCar checkWishList(@Param("email") String email, @Param("goodsName") String goodsName);


    //删除购物车
    void deleteGoods(@Param("email") String email, @Param("goodsName") String goodsName);

    void deleteWishGoods(@Param("email") String email, @Param("goodsName") String goodsName);


    List<Goods> sortList2(@Param("defaultPage") Integer defaultPage, @Param("defaultGoodsName") String defaultGoodsName);

    String checkEmail(@Param("email") String email);

    int accountMsg(AccountMsg accountMsg);
}
