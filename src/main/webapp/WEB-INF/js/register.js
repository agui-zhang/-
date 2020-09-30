$.ajaxSetup({cache: false});

function register() {
    var userName = $("#userName").val();
    var email = $("#email").val();
    var password = $("#password").val();
    if ($(".msg input").hasClass("is-invalid")){
        alert("您还有信息未完成")
    }else if (userName=="" || userName==null || email=="" || email==null || password==null || password ==""){
        alert("不能提交空值")
    }else {
        var userName = $("#userName").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var user = {"userName": userName, "email": email, "password": password};
        var user2 = {"email": email, "password": password};
        $.ajax({
            url: "/register",
            type: "post",
            data: user,
            dataType: "text",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function () {
                alert("注册成功");
                $.ajax({
                    url: "/login",
                    type: "post",
                    data: user2,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    success: function (data) {
                        $("#login").text(data.userName);
                        $("#userNameO").text(data.userName);
                        if ($("#login").val() != "登录") {
                            $("#loginForm").html($("#userForm").html());
                            window.location.href = "/shopPage";
                        }
                    }
                })
            }
        });
    }

}

function checkEmail() {
    const email = $("#email").val();
    const format = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
    if (!format.test(email)) {
        $("#email").removeClass("is-valid")
        $("#email").addClass("is-invalid")
        $(".feedback2").removeClass("valid-feedback")
        $(".feedback2").addClass("invalid-feedback")
        $(".feedback2").text("请您输入正确的邮箱")
    } else {
        $.ajax({
            url: "/checkEmail",
            data: {"email": email},
            success: function (data) {
                $("#email").removeClass("is-invalid")
                $("#email").addClass("is-valid")
                $(".feedback2").removeClass("invalid-feedback")
                $(".feedback2").addClass("valid-feedback")
                var msg = data.msg;
                if (msg == 0) {
                    $(".feedback2").text("邮箱通过验证")
                } else {
                    $("#email").removeClass("is-valid")
                    $("#email").addClass("is-invalid")
                    $(".feedback2").removeClass("valid-feedback")
                    $(".feedback2").addClass("invalid-feedback")
                    $(".feedback2").text("邮箱已存在")
                }
            }
        })

    }
}

function checkUserName() {
    var reg1 = /^[a-zA-Z_]{1,10}$/;
    var reg2 = /^[\u4e00-\u9fa5]{3,6}$/;
    const userName = $("#userName").val();
    if (reg1.test(userName) || reg2.test(userName)) {
        $("#userName").removeClass("is-invalid")
        $("#userName").addClass("is-valid")
        $(".feedback1").removeClass("invalid-feedback")
        $(".feedback1").addClass("valid-feedback")
        $(".feedback1").text("用户名通过验证")

    } else {
        $("#userName").removeClass("is-valid")
        $("#userName").addClass("is-invalid")
        $(".feedback1").removeClass("valid-feedback")
        $(".feedback1").addClass("invalid-feedback")
        $(".feedback1").text("用户名格式不正确")
    }
}

function checkPassword() {
    const password = $("#password").val();
    var reg = /^[0-9a-zA-Z]{8,16}$/;
    if (reg.test(password)) {
        $("#password").removeClass("is-invalid")
        $("#password").addClass("is-valid")
        $(".feedback3").removeClass("invalid-feedback")
        $(".feedback3").addClass("valid-feedback")
        $(".feedback3").text("密码格式正确")
    } else if (password.length < 8) {
        $("#password").removeClass("is-valid")
        $("#password").addClass("is-invalid")
        $(".feedback3").removeClass("valid-feedback")
        $(".feedback3").addClass("invalid-feedback")
        $(".feedback3").text("密码过短")
    } else {
        $("#password").removeClass("is-valid")
        $("#password").addClass("is-invalid")
        $(".feedback3").removeClass("valid-feedback")
        $(".feedback3").addClass("invalid-feedback")
        $(".feedback3").text("密码过长")
    }
}
