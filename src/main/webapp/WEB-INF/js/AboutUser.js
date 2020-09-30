$.ajaxSetup({cache: false });
$.ajax({
    url: "/checkUser",
    type: "get",
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function (data) {
        if (data.userName != null) {
            AU=data.userName;
            $("#login").text(data.userName);
            $("#userNameO").text(data.userName);

            $("#loginForm").html($("#userForm").html());

        }
    }
})

function logout() {
    $.ajax({
        url: "/logout",
        type: "get",
        success: function () {
            $("#login").text("登录");
            $("#loginForm").html($("#loginForm2").html());
            window.location.href="/shopPage"
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
