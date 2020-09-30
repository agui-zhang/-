$.ajaxSetup({cache: false });

var email;
var searchMsg;
var lastMath;
var defaultPage;
var now=1;
var t = new Array();//商品的第一张图片

var t2 = new Array();//商品信息

function change1() {
    $("#span1Svg").addClass("active")
    $("#span2Svg").removeClass("active")
}

function change2() {
    $("#span2Svg").addClass("active")
    $("#span1Svg").removeClass("active")
}

$.ajax({
    url: "/searchValue",
    type: "get",
    success: function (data) {
        var msg = data.defaultGoodsName;
        defaultPage = now;
        searchMsg=data.defaultGoodsName;
        $('#search input').attr('value',searchMsg)
        if(msg!=null){
            $.ajax({
                url: "/sortList2",
                type: "get",
                data: {"defaultPage":defaultPage,"defaultGoodsName":msg},
                success: function (data) {
                    var count = 0;
                    var demo = document.querySelector("#demo").innerHTML;
                    var demo2 = document.querySelector("#demo2").innerHTML;
                    for (var i in data) {
                        count++;
                        $("#row").append(demo);
                        $(".card").fadeIn();
                        $(".card").fadeIn("slow");
                        $(".card").fadeIn(3000);
                    }
                    for (var x = 0; x < count; x++) {
                        $(".productName").eq(x).text(data["sortList" + x].goodsName);
                        $(".money").eq(x).text("￥" + data["sortList" + x].goodsPrice);
                        $(".productName").eq(x).addClass("product" + x);
                        $(".quick-view a").eq(x).addClass("product" + x);
                        $(".addToCar").eq(x).addClass("product" + x);
                        t.push(data["sortList" + x].goodsPath.split("&")[0]);
                        t2.push(data["sortList" + x])
                    }
                    $.ajax({
                        url: "/sortImg",
                        type: "post",
                        data: {"src": JSON.stringify(t)},
                        dataType: "json",
                        success: function (data) {
                            var count = 0;
                            for (var i in data) {
                                count++;
                            }
                            for (var x = 0; x < count; x++) {
                                $(".cardImg img").eq(x).attr("src", "data:image/png;base64," + data["sortImg" + x]);
                                if ($(".cardImg img").eq(x).attr("src") != "") {
                                    $(".text-center").remove();
                                    $(".cardImg img").fadeIn();
                                    $(".cardImg img").fadeIn("slow");
                                    $(".cardImg img").fadeIn(3000);

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
                    $.ajax({
                        url: "/sortMath2",
                        data:{"defaultGoodsName":msg},
                        type: "get",
                        success: function (data) {
                            for (var x = 1; x <= data; x++) {
                                $("#previous").after(demo2)
                                lastMath=data;
                            }
                            $(".pagination li:eq(1)").addClass("active")
                            for (var x = 0; x <= data; x++) {
                                $(".pageMath").eq(x).text(x + 1)
                            }
                        }
                    })
                }
            })
        }
        if(msg==null){
            //默认页面
            var defaultPage = 1;
//每页多少条
            var msg = {"defaultPage": defaultPage}
            $.ajax({
                url: "/sortList",
                type: "get",
                data: msg,
                success: function (data) {
                    var count = 0;
                    var demo = document.querySelector("#demo").innerHTML;
                    var demo2 = document.querySelector("#demo2").innerHTML;
                    for (var i in data) {
                        count++;
                        $("#row").append(demo);

                        $(".card").fadeIn();
                        $(".card").fadeIn("slow");
                        $(".card").fadeIn(3000);
                    }
                    for (var x = 0; x < count; x++) {
                        $(".productName").eq(x).text(data["sortList" + x].goodsName);
                        $(".money").eq(x).text("￥" + data["sortList" + x].goodsPrice);
                        $(".productName").eq(x).addClass("product" + x);
                        $(".quick-view a").eq(x).addClass("product" + x);
                        $(".addToCar").eq(x).addClass("product" + x);
                        t.push(data["sortList" + x].goodsPath.split("&")[0]);
                        t2.push(data["sortList" + x])
                    }
                    $.ajax({
                        url: "/sortImg",
                        type: "post",
                        data: {"src": JSON.stringify(t)},
                        dataType: "json",
                        success: function (data) {
                            var count = 0;
                            for (var i in data) {
                                count++;
                            }
                            for (var x = 0; x < count; x++) {
                                $(".cardImg img").eq(x).attr("src", "data:image/png;base64," + data["sortImg" + x]);
                                if ($(".cardImg img").eq(x).attr("src") != "") {
                                    $(".text-center").remove();
                                    $(".cardImg img").fadeIn();
                                    $(".cardImg img").fadeIn("slow");
                                    $(".cardImg img").fadeIn(3000);

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
                    $.ajax({
                        url: "/sortMath",
                        type: "get",
                        success: function (data) {
                            for (var x = 1; x <= data; x++) {
                                $("#previous").after(demo2)
                                lastMath=data;
                            }
                            $(".pagination li:eq(1)").addClass("active")
                            for (var x = 0; x <= data; x++) {
                                $(".pageMath").eq(x).text(x + 1)
                            }
                        }
                    })
                }
            })
        }
    }
})


function quickView(obj) {
    var email;
    var goodsName;
    var data;
    for (x = 0; x < 9; x++) {
        if ($(obj).hasClass("product" + x)) {
            email = t2[x].email;
            goodsName = $(".product"+x).html();
            data = {"email": email, goodsName: goodsName}
            $.ajax({
                url: "/quickView",
                type: "post",
                data: data,
                success: function () {
                    window.location.href = "/quickViewPage"
                }
            })
        }
    }

}

function addToCar(obj) {
    var email;
    var goodsEmail;
    var goodsName;
    var goodsPrice;
    var goodsImg;
    var msg;
    var msg2;
    $.ajax({
        url: "/checkUser",
        type: "get",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
            if (data.userName == null) {
                alert("请先登录后操作")
                window.location.href = "/registerPage"
            }
            for (x = 0; x < 9; x++) {
                if ($(obj).hasClass("product" + x)) {
                    email = data.email;
                    goodsEmail = t2[x].email
                    goodsName = $(".product"+x).html();
                    goodsPrice = t2[x].goodsPrice;
                    goodsImg = t2[x].goodsPath.split("&")[0];
                    msg = {
                        "goodsEmail": goodsEmail,
                        "email": email,
                        "goodsName": goodsName,
                        "goodsPrice": goodsPrice,
                        "goodsImg": goodsImg
                    };
                    msg2 = {"email": email, "goodsName": goodsName};
                    $.ajax({
                        url: "/checkShopCar",
                        data: msg2,
                        type: "post",
                        success: function (data) {
                            if (!Boolean(data)) {
                                $.ajax({
                                    url: "/addToCar",
                                    type: "post",
                                    data: msg,
                                    dataType: "text",
                                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                    success: function () {
                                        alert("加入成功")
                                    }
                                })
                                return;
                            }
                            alert("该商品已经在购物车啦")
                        }
                    })
                }
            }
        }
    })
}

function previous() {
    now=parseInt(now)-1;
    $(".page-item").eq(now).click()
}

function next() {
    now=parseInt(now)+1;
    $(".page-item").eq(now).click()
}
function footer(obj) {
    obj = $(obj);
    obj.siblings().removeClass('active');
    obj.addClass('active');
    $("#previous").removeClass('disabled');
    $("#next").removeClass('disabled');
    var x = $(obj).text().trim("");
    now=x;
    if (x == 1) {
        $("#previous").addClass('disabled');
    }
    if(x==lastMath){
        $("#next").addClass('disabled');
    }
    var msg = {"defaultPage": x}
    var msg2 = {"defaultPage": x,"defaultGoodsName":searchMsg}

    if(searchMsg==null){
        $.ajax({
            url: "/sortList",
            type: "get",
            data: msg,
            success: function (data) {
                $("#row").empty()
                var count = 0;
                var demo = document.querySelector("#demo").innerHTML;
                for (var i in data) {
                    count++;
                    $("#row").append(demo);
                    $(".card").fadeIn();
                    $(".card").fadeIn("slow");
                    $(".card").fadeIn(3000);
                }
                for (var x = 0; x < count; x++) {
                    $(".productName").eq(x).text(data["sortList" + x].goodsName);
                    $(".money").eq(x).text("￥" + data["sortList" + x].goodsPrice);
                    $(".productName").eq(x).addClass("product" + x);
                    $(".quick-view a").eq(x).addClass("product" + x);
                    $(".addToCar").eq(x).addClass("product" + x);
                    t.push(data["sortList" + x].goodsPath.split("&")[0]);
                    t2.push(data["sortList" + x])
                }
                $.ajax({
                    url: "/sortImg",
                    type: "post",
                    data: {"src": JSON.stringify(t)},
                    dataType: "json",
                    success: function (data) {
                        var count = 0;
                        for (var i in data) {
                            count++;
                        }
                        for (var x = 0; x < count; x++) {
                            $(".cardImg img").eq(x).attr("src", "data:image/png;base64," + data["sortImg" + x]);
                            if ($(".cardImg img").eq(x).attr("src") != "") {
                                $(".text-center").remove();
                                $(".cardImg img").fadeIn();
                                $(".cardImg img").fadeIn("slow");
                                $(".cardImg img").fadeIn(3000);

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
    }else {
        $.ajax({
            url: "/sortList2",
            type: "get",
            data: msg2,
            success: function (data) {
                $("#row").empty()
                var count = 0;
                var demo = document.querySelector("#demo").innerHTML;
                for (var i in data) {
                    count++;
                    $("#row").append(demo);
                    $(".card").fadeIn();
                    $(".card").fadeIn("slow");
                    $(".card").fadeIn(3000);
                }
                for (var x = 0; x < count; x++) {
                    $(".productName").eq(x).text(data["sortList" + x].goodsName);
                    $(".money").eq(x).text("￥" + data["sortList" + x].goodsPrice);
                    $(".productName").eq(x).addClass("product" + x);
                    $(".quick-view a").eq(x).addClass("product" + x);
                    $(".addToCar").eq(x).addClass("product" + x);
                    t.push(data["sortList" + x].goodsPath.split("&")[0]);
                    t2.push(data["sortList" + x])
                }
                $.ajax({
                    url: "/sortImg",
                    type: "post",
                    data: {"src": JSON.stringify(t)},
                    dataType: "json",
                    success: function (data) {
                        var count = 0;
                        for (var i in data) {
                            count++;
                        }
                        for (var x = 0; x < count; x++) {
                            $(".cardImg img").eq(x).attr("src", "data:image/png;base64," + data["sortImg" + x]);
                            if ($(".cardImg img").eq(x).attr("src") != "") {
                                $(".text-center").remove();
                                $(".cardImg img").fadeIn();
                                $(".cardImg img").fadeIn("slow");
                                $(".cardImg img").fadeIn(3000);

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
}



