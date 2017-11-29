let loadMain = ownNavItem =>
{
    console.log("Loading main body");
    let ownBody = $("body");
    let ownContent = $("#own-page").html();
    ownBody.load(pathToRoot + " #page-wrapper", () =>
    {
        let navItem = $("#page-wrapper nav #" + ownNavItem);
        navItem.addClass("active").append("<div class='page'>" + PAGE_HTML + ownContent + "</div>");
        ownBody.attr("tb-theme", $("#page-wrapper").attr("tb-theme"));
        registerNavClickListeners();
        loadArtwork(() => $("#character-art-bg pre font").css("opacity", 0));
        navItem.addClass("no-transition");
        moveNavItemToPageTop(navItem);
        setTimeout(() => navItem.removeClass("no-transition"), 250);
    });
}