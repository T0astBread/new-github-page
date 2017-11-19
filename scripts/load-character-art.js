// const CURSOR_CHARACTER = "█";

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

// /**
//  * 
//  * @param {*string} htmlStr 
//  * @param {*number} pos 
//  * @param {*string} insertStr 
//  */
// let insertAtPos = (htmlStr, pos, insertStr) =>
// {
//     let insertPos = 0;
//     for(let i = 0; i < pos; i++)
//     {
//         let char = htmlStr.charAt(insertPos);
//         while(char === "<")
//         {
//             while(char !== ">") char = htmlStr.charAt(++insertPos);
//             char = htmlStr.charAt(++insertPos)
//         }
//         insertPos++;
//     }
//     return htmlStr.substring(0, insertPos) + insertStr + htmlStr.substring(insertPos, htmlStr.length);
// }

// let insertAtPosTest = () =>
// {
//     console.log(insertAtPos("<span>u<b>wu</b></span><span>o</span>", 4, "x"));
// }

// // let stripHtmlTags = (htmlStr) => htmlStr.replace(/<[^>]+>/g, "");
// let stripHtmlTags = (htmlStr) => $(htmlStr).text();

// let showArtworkAnimated = () =>
// {
//     let pre = $("#character-art-bg pre");
//     let finishedLines = [];
//     let animationInterval = setInterval(() =>
//     {
//         let htmlLines = pre.html().split("<br>");

//         if(finishedLines.length == htmlLines.length && finishedLines.every(l => l === true))
//         {
//             console.log("finished");
//             clearInterval(animationInterval);
//             return;
//         }

//         let newHtmlLines = [];
//         htmlLines.forEach((htmlLine, lineNumber) =>
//         {
//             let newHtmlLine;
//             if(!finishedLines[lineNumber])
//             {
//                 let textLine = stripHtmlTags("<span>" + htmlLine + "</span>");
//                 htmlLine = htmlLine.replace("<span class='invisible-line-portion'>", "").replace(/<\/span>$/, "");
//                 let cursorPosition = textLine.indexOf(CURSOR_CHARACTER);
                
//                 finishedLines[lineNumber] = cursorPosition == textLine.length - 2;
    
//                 newHtmlLine = insertAtPos(htmlLine, cursorPosition + 2, CURSOR_CHARACTER + "~");
//                 if(cursorPosition !== -1) newHtmlLine = newHtmlLine.replace(CURSOR_CHARACTER, "");
//                 newHtmlLine = newHtmlLine.replace("~", "<span class='invisible-line-portion'>");
//             }
//             else newHtmlLine = htmlLine.replace(new RegExp(CURSOR_CHARACTER, "g"), "");
//             newHtmlLines.push(newHtmlLine);
//         });
//         pre.html(newHtmlLines.join("</span><br>"));
//     }, 1);
// }

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