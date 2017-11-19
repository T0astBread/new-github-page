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

let showArtworkAnimated = () =>
{
    console.log("show");
    let artworkParts = $("#character-art-bg pre font");
    console.log(artworkParts);
    artworkParts.hide();

    let showArtworkParts = (index, amount=1) =>
    {
        console.log("show " + index);
        for(let i = 0; i < amount; i++) artworkParts.eq(index++).show();
        if(index < artworkParts.length - 1) setTimeout(() => showArtworkParts(index, 5), 1);
    }
    showArtworkParts(0);
}