let registerNavClickListeners = () =>
{
    $("nav a").click(evt =>
    {
        let body = $("body");
        let target = $(evt.target);
        let navItem = target.parent("li");

        navItem.parent().find(".active").removeClass("active");
        navItem.addClass("active");

        if(!navItem.has(".page").length)
        {
            navItem.append("<div class='page'></div>");
            navItem.find(".page").load(evt.target.href + " #own-page");
        }

        let isExpanding = body.attr("tb-page-state") !== "expanded";
        body.attr("tb-page-state", isExpanding ? "expanded" : "normal");
        // $("title").text(isExpanding ? navItem.find)

        if (isExpanding)
        {
            let targetPos = navItem.offset();
            navItem.css("top", targetPos.top).css("left", targetPos.left - 100);
            navItem.animate(
            {
                top: 0,
                left: 0
            }, 200, 0);
        }
        else
        {
            navItem.css("top", "").css("left", "");
        }

        history.pushState(null, null, isExpanding ? evt.target.href : "/");
        evt.preventDefault();
    });
}