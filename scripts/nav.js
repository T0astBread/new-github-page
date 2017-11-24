let scheduledFading;

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
        // body.attr("tb-page-state", isExpanding ? "expanded" : "normal");
        // $("title").text(isExpanding ? navItem.find)

        let transistPage = () =>
        {
            body.attr("tb-page-state", isExpanding ? "expanded" : "normal");
            if (isExpanding)
            {
                moveNavItemToPageTop(navItem);
            }
            else
            {
                navItem.css("margin-top", "");
            }
        };

        if(isExpanding)
        {
            showArtwork();
            fadeArtwork({toOpacity: 0, backwards: false, stepSize: 100, callback: transistPage});
        }
        else
        {
            transistPage();
            scheduledFading = setTimeout(() =>
            {
                showArtwork();
                fadeArtwork({toOpacity: 1, backwards: true, stepSize: 100});
            }, 1250);
        }

        history.pushState(null, null, isExpanding ? evt.target.href : "/");
        evt.preventDefault();
    });
}

let moveNavItemToPageTop = navItem =>
{
    let targetPos = navItem.offset();
    navItem.css("margin-top", -targetPos.top);
}