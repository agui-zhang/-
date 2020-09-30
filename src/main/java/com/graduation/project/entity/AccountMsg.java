package com.graduation.project.entity;

public class AccountMsg {
    private String userName;
    private String email;
    private String sign;
    private String gender;

    @Override
    public String toString() {
        return "AccountMsg{" +
                "userName='" + userName + '\'' +
                ", email='" + email + '\'' +
                ", sign='" + sign + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public AccountMsg(String userName, String email, String sign, String gender) {
        this.userName = userName;
        this.email = email;
        this.sign = sign;
        this.gender = gender;
    }

    public AccountMsg() {
    }
}
