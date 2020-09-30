$.ajaxSetup({cache: false });
var emailC;
$.ajax({
    url: "/checkUser",
    type: "get",
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function (data) {
        if (data.userName != null) {
            emailC=data.email;
        }
    }
})

function showImg1(obj) {
    var file = document.getElementById('img_file1').files[0];
    var re = new FileReader();
    re.readAsDataURL(file);
    re.onload = function (re) {
        $('#img_id1').attr("src", re.target.result);
        $(".file1").css("opacity", "0")
    }
}
function showImg2(obj) {
    var file = document.getElementById('img_file2').files[0];
    var re = new FileReader();
    re.readAsDataURL(file);
    re.onload = function (re) {
        $('#img_id2').attr("src", re.target.result);
        $(".file2").css("opacity", "0")
    }
}
function showImg3(obj) {
    var file = document.getElementById('img_file3').files[0];
    var re = new FileReader();
    re.readAsDataURL(file);
    re.onload = function (re) {
        $('#img_id3').attr("src", re.target.result);
        $(".file3").css("opacity", "0")
    }
}


function clear() {
    $(".msg input").removeClass("is-valid")
    $(".msg input").removeClass("is-invalid")
    $(".valid-feedback").text("")
}

function checkGoodsName() {
    const goodsName = $("#goodsName").val();
    $.ajax({
        url:"/checkGoodsName",
        data: {"goodsName":goodsName,"email":emailC},
        type:"post",
        success:function (data) {
            if (goodsName.length==0) {
                $("#goodsName").removeClass("is-valid")
                $("#goodsName").addClass("is-invalid")
                $(".feedback1").removeClass("valid-feedback")
                $(".feedback1").addClass("invalid-feedback")
                $(".feedback1").text("请您输入您的商品名字");
                return;
            } else if (goodsName.length>50){
                $("#goodsName").removeClass("is-valid")
                $("#goodsName").addClass("is-invalid")
                $(".feedback1").removeClass("valid-feedback")
                $(".feedback1").addClass("invalid-feedback")
                $(".feedback1").text("您的商品名字过长")
                return;
            }else if(data.goodsName!=null){
                $("#goodsName").removeClass("is-valid")
                $("#goodsName").addClass("is-invalid")
                $(".feedback1").removeClass("valid-feedback")
                $(".feedback1").addClass("invalid-feedback")
                $(".feedback1").text("您已经上传过该商品名啦，请换一个");
                return;
            }else {
                $("#goodsName").removeClass("is-invalid")
                $("#goodsName").addClass("is-valid")
                $(".feedback1").removeClass("invalid-feedback")
                $(".feedback1").addClass("valid-feedback")
                $(".feedback1").text("")
            }
        }
    })

}

function checkGoodsPrice() {
    const reg=/^(?!(0[0-9]{0,1}$))[0-9]+[.]?[0-9]{0,2}$/;
    const goodsPrice = $("#price").val();
    if (goodsPrice.length==0 || goodsPrice==0) {
        $("#price").removeClass("is-valid")
        $("#price").addClass("is-invalid")
        $(".feedback2").removeClass("valid-feedback")
        $(".feedback2").addClass("invalid-feedback")
        $(".feedback2").text("请您输入您的商品价格")
    } else if (goodsPrice.length>10){
        $("#price").removeClass("is-valid")
        $("#price").addClass("is-invalid")
        $(".feedback2").removeClass("valid-feedback")
        $(".feedback2").addClass("invalid-feedback")
        $(".feedback2").text("商品价格太大")
    }else if (!reg.test(goodsPrice)){
        $("#price").removeClass("is-valid")
        $("#price").addClass("is-invalid")
        $(".feedback2").removeClass("valid-feedback")
        $(".feedback2").addClass("invalid-feedback")
        $(".feedback2").text("商品价格格式错误")
    }else {
        $("#price").removeClass("is-invalid")
        $("#price").addClass("is-valid")
        $(".feedback2").removeClass("invalid-feedback")
        $(".feedback2").addClass("valid-feedback")
        $(".feedback2").text("")
    }
}


function upload() {
    var file1 = document.getElementById('img_file1').files[0];
    var file2 = document.getElementById('img_file2').files[0];
    var file3 = document.getElementById('img_file3').files[0];
    var goodsName=$("#goodsName").val();
    var goodsPrice=$("#price").val();
    var goodsDetail=$("#goodsDetail").val();
    var email=$("#email").val();
    var goodsMsg={"email":email,"goodsName":goodsName,"goodsPrice":goodsPrice,"goodsDetail":goodsDetail};
    var formData=new FormData();
    formData.append("Img",file1);
    formData.append("Img",file2);
    formData.append("Img",file3);
    formData.append("goodsMsg",JSON.stringify(goodsMsg));
    if ($(".msg input").hasClass("is-invalid")){
        alert("请完善您的表格")
    }else {
        $.ajax({
            url:"/upload",
            type:"post",
            data: formData,
            contentType: false,
            processData: false,
            success: function(data) {
                if (data.type == "success") {
                    alert(data.msg);
                    window.location.href="/shopPage"
                }
                if (data.type=="error"){
                    alert(data.msg)
                }
            },
            error:function() {
                alert("上传失败")
            }
        });
    }
}