package com.graduation.project.entity;

public class WishList {
    private String goodsEmail;
    private String email;
    private String goodsName;
    private String goodsPrice;
    private String goodsImg;

    @Override
    public String toString() {
        return "WishList{" +
                "goodsEmail='" + goodsEmail + '\'' +
                ", email='" + email + '\'' +
                ", goodsName='" + goodsName + '\'' +
                ", goodsPrice='" + goodsPrice + '\'' +
                ", goodsImg='" + goodsImg + '\'' +
                '}';
    }

    public String getGoodsEmail() {
        return goodsEmail;
    }

    public void setGoodsEmail(String goodsEmail) {
        this.goodsEmail = goodsEmail;
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

    public String getGoodsPrice() {
        return goodsPrice;
    }

    public void setGoodsPrice(String goodsPrice) {
        this.goodsPrice = goodsPrice;
    }

    public String getGoodsImg() {
        return goodsImg;
    }

    public void setGoodsImg(String goodsImg) {
        this.goodsImg = goodsImg;
    }

    public WishList(String goodsEmail, String email, String goodsName, String goodsPrice, String goodsImg) {
        this.goodsEmail = goodsEmail;
        this.email = email;
        this.goodsName = goodsName;
        this.goodsPrice = goodsPrice;
        this.goodsImg = goodsImg;
    }

    public WishList() {
    }
}
