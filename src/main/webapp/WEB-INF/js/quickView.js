$.ajaxSetup({cache: false });

var src = new Array();
var email;
var goodsName;
var goodsPrice;
var goodsImg;
var goodsEmail;
$.ajax({
    url: "/goodsMsg",
    success: function (data) {
        console.log(data)
        src.push(data.data["goodsPath"].split("&"))
        $("#costAndSeller h2").text("￥" + data.data["goodsPrice"])
        goodsPrice = data.data["goodsPrice"];
        goodsEmail=data.data["email"]
        $("#costAndSeller h6 span").text(data.data["userName"])
        $("#goodsName").text(data.data["goodsName"])
        goodsName = data.data["goodsName"];
        $("#goodsDetail").text(data.data["goodsDetail"])
        goodsImg=data.data["goodsPath"].split("&")[0]
        $.ajax({
            url: "/sortImg",
            type: "post",
            data: {"src": JSON.stringify(src)},
            success: function (data) {
                for (var x = 0; x < 3; x++) {
                    $(".cardImg img").eq(x).attr("src", "data:image/png;base64," + data["sortImg" + x]);
                    if ($(".cardImg img").eq(x).attr("src") != "") {
                        $(".text-center").remove();
                        $(".cardImg img").fadeIn();
                        $(".cardImg img").fadeIn("slow");
                        $(".cardImg img").fadeIn(3000);

                    }
                }
            }
        })
    }
})

function addToCar() {
    $.ajax({
        url: "/checkUser",
        type: "get",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
            if (data.userName == null) {
                alert("请先登录后操作")
                window.location.href = "/registerPage"
            }
             email = data.email;

            var msg = {"goodsEmail":goodsEmail,"email": email, "goodsName": goodsName, "goodsPrice": goodsPrice, "goodsImg": goodsImg}
            var msg2={"email":email,"goodsName":goodsName};
            $.ajax({
                url:"/checkShopCar",
                data:msg2,
                type:"post",
                success:function (data) {
                    if (!Boolean(data)){
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
    })
}

function addToWishList() {
    $.ajax({
        url: "/checkUser",
        type: "get",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (data) {
            if (data.userName == null) {
                alert("请先登录后操作")
                window.location.href = "/registerPage"
            }
            email = data.email;

            var msg = {"goodsEmail":goodsEmail,"email": email, "goodsName": goodsName, "goodsPrice": goodsPrice, "goodsImg": goodsImg}
            var msg2={"email":email,"goodsName":goodsName};
            $.ajax({
                url:"/checkWishList",
                data:msg2,
                type:"post",
                success:function (data) {
                    if (!Boolean(data)){
                        $.ajax({
                            url: "/addToWishList",
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
                    alert("该商品已经在收藏夹啦")
                }
            })


        }
    })
}

