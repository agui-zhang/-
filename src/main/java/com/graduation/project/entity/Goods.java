package com.graduation.project.entity;

import java.awt.*;

public class Goods {
    private String email;
    private String goodsName;
    private double goodsPrice;
    private String goodsDetail;
    private String goodsPath;
    private String userName;

    @Override
    public String toString() {
        return "Goods{" +
                "email='" + email + '\'' +
                ", goodsName='" + goodsName + '\'' +
                ", goodsPrice=" + goodsPrice +
                ", goodsDetail='" + goodsDetail + '\'' +
                ", goodsPath='" + goodsPath + '\'' +
                ", userName='" + userName + '\'' +
                '}';
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGoodsName() {
        return goodsName;
    }

    public void setGoodsName(String goodsName) {
        this.goodsName = goodsName;
    }

    public double getGoodsPrice() {
        return goodsPrice;
    }

    public void setGoodsPrice(double goodsPrice) {
        this.goodsPrice = goodsPrice;
    }

    public String getGoodsDetail() {
        return goodsDetail;
    }

    public void setGoodsDetail(String goodsDetail) {
        this.goodsDetail = goodsDetail;
    }

    public String getGoodsPath() {
        return goodsPath;
    }

    public void setGoodsPath(String goodsPath) {
        this.goodsPath = goodsPath;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Goods(String email, String goodsName, double goodsPrice, String goodsDetail, String goodsPath, String userName) {
        this.email = email;
        this.goodsName = goodsName;
        this.goodsPrice = goodsPrice;
        this.goodsDetail = goodsDetail;
        this.goodsPath = goodsPath;
        this.userName = userName;
    }

    public Goods() {
    }
}
