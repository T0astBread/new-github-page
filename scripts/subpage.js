let loadMain = ownNavItem =>
{
    let ownBody = $("body");
    let ownContent = $("#own-page").html();
    ownBody.load("/ #page-wrapper", () =>
    {
        $("#page-wrapper nav #" + ownNavItem).addClass("active").append("<div class='page'>" + ownContent + "</div>");
        ownBody.attr("tb-theme", $("#page-wrapper").attr("tb-theme"));
        registerNavClickListeners();
    });
}