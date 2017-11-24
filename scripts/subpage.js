let loadMain = ownNavItem =>
{
    let ownBody = $("body");
    let ownContent = $("#own-page").html();
    ownBody.load("/ #page-wrapper", () =>
    {
        let navItem = $("#page-wrapper nav #" + ownNavItem);
        navItem.addClass("active").append("<div class='page'>" + ownContent + "</div>");
        ownBody.attr("tb-theme", $("#page-wrapper").attr("tb-theme"));
        registerNavClickListeners();
        loadArtwork(() => $("#character-art-bg pre font").css("opacity", 0));
        navItem.addClass("no-transition");
        moveNavItemToPageTop(navItem);
        setTimeout(() => navItem.removeClass("no-transition"), 250);
    });
}