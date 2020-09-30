$.ajaxSetup({cache: false});

var email;
var gE = new Array();
var gN = new Array();
var src = new Array();
var total = new Array();
var total2 = 0;
var count = 0;
$(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $.ajax({
        url: "/checkUser",
        type: "get",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
            var demo = document.querySelector("#demo").innerHTML;
            if (data.userName == null) {
                alert("请先登录后操作")
                window.location.href = "/registerPage"
            }
            if (data.userName != null) {
                $("#login").text(data.userName);
                $("#userNameO").text(data.userName);
                $("#loginForm").html($("#userForm").html());
                email = data.email;
            }
            $.ajax({
                url: "/wishList",
                data: {"email": email},
                success: function (data) {
                    for (var i in data) {
                        count++;
                        $("tbody").append(demo);
                    }
                    for (var x = 0; x < count; x++) {
                        src.push(data["shopCarList" + x].goodsImg);
                        total.push(data["shopCarList" + x].goodsPrice)
                        gN.push(data["shopCarList" + x].goodsName);
                        gE.push(data["shopCarList" + x].goodsEmail);
                        $(".itemInForX").eq(x).text(data["shopCarList" + x].goodsName);
                        $(".itemInForX").eq(x).addClass("product" + x);
                        $(".itemImgX").eq(x).addClass("product" + x);
                        $(".svg").eq(x).addClass("product" + x);
                        $(".svg").eq(x).attr("id", "product" + x);
                        $(".price").eq(x).text("￥" + data["shopCarList" + x].goodsPrice);
                        $(".price").eq(x).text().split("￥")
                        $(".price").eq(x).addClass("price" + x)
                        total2 = total2 + parseInt(total[x]);
                    }
                    $("#total").attr("data-original-title", "总价为:" + total2 + "元");
                    $.ajax({
                        url: "/sortImg",
                        type: "post",
                        data: {"src": JSON.stringify(src)},
                        dataType: "json",
                        success: function (data) {
                            var count = 0;
                            for (var i in data) {
                                count++;
                            }
                            for (var x = 0; x < count; x++) {
                                $(".itemImgX").eq(x).attr("src", "data:image/png;base64," + data["sortImg" + x]);
                                if ($(".itemImgX").eq(x).attr("src") != "") {
                                    $(".text-center").remove();
                                    $(".itemImgX").fadeIn();
                                    $(".itemImgX").fadeIn("slow");
                                    $(".itemImgX").fadeIn(3000);

                                }
                            }

                        },
                        error: function (data) {
                            var count = 0;
                            for (var i in data) {
                                count++;
                            }
                            for (var x = 0; x < count; x++) {
                                $("#cardImg img").eq(x).attr("src", "data:image/png;base64," + data["sortImg" + x]);
                            }
                        }
                    })
                }
            })
        }
    })
});

function deleteGoods(obj) {
    for (x = 0; x < count; x++) {
        if ($(obj).hasClass("product" + x)) {
            $.ajax({
                url: "/deleteWishGoods",
                type: "post",
                data: {"email": email, "goodsName": gN[x]},
                success: function () {
                    $(obj).parent().parent().animate({opacity: '0'}, 300, function () {
                        $(this).remove();
                    })
                }
            })
        }
    }
}



function quickView(obj) {
    for (x = 0; x < count; x++) {
        if ($(obj).hasClass("product" + x)) {
            $.ajax({
                url: "/quickView",
                type: "post",
                data: {"email": gE[x], "goodsName": gN[x]},
                success: function () {
                    window.location.href = "/quickViewPage"
                }
            })
        }
    }
}

function logout() {
    $.ajax({
        url: "/logout",
        type: "get",
        success: function () {
            $("#login").text("登录");
            $("#loginForm").html($("#loginForm2").html());
            window.location.href = "/shopPage"
        },
        error: function () {
            alert("出错了")
        }
    })
    event.preventDefault();//防止起冲突，要阻止默认的行为
    return false;
}

function login() {
    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();
    var user = {"email": email, "password": password};
    $.ajax({
        url: "/login",
        type: "post",
        data: user,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
            alert("欢迎您," + data.userName);
            $("#login").text(data.userName);
            $("#userNameO").text(data.userName);
            if ($("#login").val() != "登录") {
                $("#loginForm").html($("#userForm").html());
            }
        },
        error: function () {
            alert("邮箱或密码错误")
        }
    })
}

// 当网页向下滑动 20px 出现"返回顶部" 按钮
window.onscroll = function () {
    scrollFunction();
    searchFunction();
};

//固定搜索框在顶部
function searchFunction() {
    if (document.body.scrollTop > 270 || document.documentElement.scrollTop > 270) {
        document.getElementById("ss").className = "header-content fixed-top shadow-sm p-3 mb-5 bg-white rounded";
    }
    if (document.body.scrollTop < 0 || document.documentElement.scrollTop <= 0) {
        document.getElementById("ss").className = "header-content";
    }
}

//返回顶部按钮
function scrollFunction() {
    if (document.body.scrollTop > 270 || document.documentElement.scrollTop > 270) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// 点击按钮，返回顶部
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}