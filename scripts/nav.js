const PAGE_HTML = "<div class='page-corners'><div class='upper left'></div><div class='lower left'></div><div class='upper right'></div><div class='lower right'></div></div>";

let scheduledFading, scheduledPageStateChange;

let registerNavClickListeners = () =>
{
    $("nav a").click(evt =>
    {
        let body = $("body");
        let target = $(evt.target);
        let navItem = target.parent("li");

        if(!navItem.has(".page").length)
        {
            navItem.append("<div class='page'></div>");
            console.log("Loading subpage");
            let page = navItem.find(".page");
            page.load(window.location.origin + evt.target.pathname + "/ #own-page", () =>
            {
                console.log("Done loading subpage");
                page.find("#own-page").removeAttr("id").addClass("page-content");
                page.prepend(PAGE_HTML);
            });
        }

        let isExpanding = body.attr("tb-page-state") !== "expanded";
        // body.attr("tb-page-state", isExpanding ? "expanded" : "normal");
        // $("title").text(isExpanding ? navItem.find)

        navItem.parent().find(".active").removeClass("active");
        if(isExpanding) navItem.addClass("active");

        let transistPage = () =>
        {
            clearTimeout(scheduledPageStateChange);
            if (isExpanding)
            {
                setPageState("expanded");
                moveNavItemToPageTop(navItem);
            }
            else
            {
                setPageState("collapsing");
                scheduledPageStateChange = setTimeout(() => setPageState("normal"), 250);
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

        history.pushState(null, null, isExpanding ? evt.target.href : pathToRoot);
        if(!isExpanding) pathToRoot = "./";
        evt.preventDefault();
    });
}

let moveNavItemToPageTop = navItem =>
{
    let targetPos = navItem.offset();
    navItem.css("margin-top", -targetPos.top);
}

let setPageState = newState => $("body").attr("tb-page-state", newState);