let loadArtwork = (callback) =>
{
    $("#character-art-bg").load("/character-art/mokou-color.html", callback);
}

let hideArtwork = () =>
{
    $("#character-art-bg").hide();
}

let showArtwork = () =>
{
    $("#character-art-bg").show();
}

let showArtworkAnimated = ({colorAnimationType=2, stepDelay=0, stepSize=50, backwards=true} = {}) =>
{
    stepSize *= $("html").is(".gecko") ? 2 : 1;  // To compensate for Firefox's slow JS engine

    let bg = $("#character-art-bg");
    bg.width(bg.width());

    let artworkParts = $("#character-art-bg pre font");
    artworkParts.each((i, part) => part.setAttribute("tb-temp-color", part.getAttribute("color")));
    artworkParts.attr("color", "white").css("opacity", 0);

    let showArtworkParts = (index, amount=1) =>
    {
        for(let i = 0; i < amount; i++)
        {
            let part = artworkParts.eq((backwards ? artworkParts.length - index : index));
            index++;
            part.css("opacity", 1);
            if(colorAnimationType === 1) part.attr("color", part.attr("tb-temp-color"));
        }
        if(index < artworkParts.length - 1) setTimeout(() => showArtworkParts(index, stepSize), stepDelay);
        else if(colorAnimationType === 2) artworkParts.each((i, part) => part.setAttribute("color", part.getAttribute("tb-temp-color")));
    }
    showArtworkParts(0);
}