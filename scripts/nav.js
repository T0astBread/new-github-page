const PAGE_HTML = "<div class='page-corners'><div class='upper left'></div><div class='lower left'></div><div class='upper right'></div><div class='lower right'></div></div><div class='page-spinner'></div>";

let scheduledFading;

let registerNavClickListeners = () =>
{
    $("nav a").click(evt =>
    {
        let pageName = evt.target.pathname.replace(/.*\//, "");
        let body = $("body");
        let target = $(evt.target);
        let navItem = target.parent("li");

        if(!navItem.has(".page").length)
        {
            navItem.append("<div class='page'></div>");
            reportSubpageLoadingStart(pageName);
            console.log("Loading subpage");
            let page = navItem.find(".page");
            page.load(window.location.origin + evt.target.pathname + "/ #own-page", () =>
            {
                console.log("Done loading subpage");
                let content = page.find("#own-page");
                content.removeAttr("id").addClass("page-content");
                page.prepend(PAGE_HTML);
                reportSubpageLoadingFinish(pageName);
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


let scheduledPageStateChange;

let moveNavItemToPageTop = navItem =>
{
    let targetPos = navItem.offset();
    navItem.css("margin-top", -targetPos.top);
}

let setPageState = newState => $("body").attr("tb-page-state", newState);


let pageLoadingCriteriaFullfilled = 0;

let reportSubpageLoadingFinish = pageName =>
{
    console.log("Page " + pageName + " finished loading");
    pageLoadingCriteriaFullfilled++;
    checkPageLoadingFinished(pageName);
}

let reportSubpageLoadingStart = pageName =>
{
    console.log("Page " + pageName + " reported that it starts loading");
    $("#nav-" + pageName + " .page").attr("loading-state", "loading");
    setTimeout(() =>
    {
        pageLoadingCriteriaFullfilled++;
        checkPageLoadingFinished(pageName);
    }, 3000);
}

let checkPageLoadingFinished = pageName =>
{
    console.log("Checking if page " + pageName + " finished loading");
    if(pageLoadingCriteriaFullfilled >= 2)
    {
        console.log("Check returned that the page finished loading");
        $("#nav-" + pageName + " .page").attr("loading-state", "finished");;
        pageLoadingCriteriaFullfilled = 0;
    }
    else console.log("Check returned that the page didn't finish loading");
}