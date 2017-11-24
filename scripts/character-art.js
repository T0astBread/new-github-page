/////////////////
//// LOADING ////
/////////////////

let loadArtwork = (callback) =>
{
    $("#character-art-bg").load(getRandomCharacterArtworkPath(), callback);
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
    stepSize = calcStepSize(stepSize);

    let artworkParts = $("#character-art-bg pre font");
    artworkParts.each((i, part) => part.setAttribute("tb-temp-color", part.getAttribute("color")));
    artworkParts.attr("color", "white").css("opacity", 0);

    let showArtworkParts = (index, amount=1) =>
    {
        for(let i = 0; i < amount; i++)
        {
            let part = artworkParts.eq((backwards ? artworkParts.length - index : index));
            index++;
            if(part.attr("has-been-faded") != "") part.css("opacity", 1);
            if(colorAnimationType === 1) part.attr("color", part.attr("tb-temp-color"));
        }
        if(index < artworkParts.length - 1) setTimeout(() => showArtworkParts(index, stepSize), stepDelay);
        else if(colorAnimationType === 2) artworkParts.each((i, part) => part.setAttribute("color", part.getAttribute("tb-temp-color")));
    }
    showArtworkParts(0);
}

let recentFadingTimeout;
let fadeArtwork = ({toOpacity=0, stepDelay=0, stepSize=50, backwards=false, callback=()=>{}} = {}) =>
{
    stepSize = calcStepSize(stepSize);
    let artworkParts = $("#character-art-bg pre font");
    
    let showArtworkParts = (index, amount=1) =>
    {
        for(let i = 0; i < amount; i++)
        {
            let part = artworkParts.eq((backwards ? artworkParts.length - index : index));
            index++;
            part.attr("has-been-faded", "");
            part.css("opacity", toOpacity);
        }
        if(index < artworkParts.length - 1)
        {
            clearTimeout(recentFadingTimeout);
            clearTimeout(scheduledFading);
            recentFadingTimeout = setTimeout(() => showArtworkParts(index, stepSize), stepDelay);
        }
        else if(callback) callback();
    }
    showArtworkParts(0);
}

let calcStepSize = baseStepSize => baseStepSize * ($("html").is(".gecko") ? 3 : 1);  // To compensate for Firefox's slow JS engine


///////////////////
//// SELECTING ////
///////////////////

const ARTWORKS =
[
    "agiri",
    // "ai",
    "chen-theblackcat",
    "chen",
    // "dagashikashi",
    // "idk",
    "mokou"
]

let getRandomCharacterArtwork = () => ARTWORKS[Math.floor(Math.random() * ARTWORKS.length)];

let getRandomCharacterArtworkPath = () => "/character-art/" + getRandomCharacterArtwork() + ".html";