$.ajaxSetup({cache: false });

function searchGoods() {
    var inputVal = $("#search input").val();
    if (inputVal.length > 0) {
        $.ajax({
            url: "/sortPage2",
            type:"get",
            data: {"defaultGoodsName": inputVal},
            success: function () {
                window.location.href = "/sortPage"
            }
        });
        return;
    }
    if (!inputVal.length > 0){
        $.ajax({
            url: "/sortPage2",
            type:"get",
            data: {"defaultGoodsName": inputVal},
            success: function () {
                window.location.href = "/sortPage"
            }
        });
    }
}
