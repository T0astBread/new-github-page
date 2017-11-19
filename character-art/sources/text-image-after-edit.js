// Script that makes white background on http://www.text-image.com transparent

$$("font[color=white]").forEach(i =>
{
    i.setAttribute("color", "#eab");
    i.style.color = "transparent";
});
