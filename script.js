const contentArea = document.getElementById("page");
console.log(contentArea);

function resetButtons() 
{
    var temp = document.getElementsByClassName("active");
    if(temp.length == 0)
    {
        return;
    }
    temp[0].className = "nav-button";
}

function httpGet(myUrl, callback) 
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() 
    { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", myUrl, true);
    xmlHttp.send(null);
}

function activatePage(navbutt, source) 
{
    resetButtons();
    console.log("click");
    navbutt.className += " active";
    httpGet(source, setContent);
}

function setContent(payload) 
{
    contentArea.innerHTML = payload;
}
document.getElementById("initial").click();
