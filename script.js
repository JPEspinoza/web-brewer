const contentArea = document.getElementById("page");

//name of navs in both languages
const dict= {
    "es": {
        0: "Nav 1 es",
        1: "Nav 2 es",
        2: "Nav 3 es"
    },
    "en": {
        0: "Nav 1 en",
        1: "Nav 2 en",
        2: "Nav 3 en"
    }
}

var languages = ["en", "es"]; //first language is current

console.log(dict["es"][1]);

function setLanguage() 
{
    //swap languages
    var temp = languages[0];
    languages[0] = languages[1];
    languages[1] = temp;

    var divs = document.getElementsByClassName("nav-button");

    for(i = 0; i < 3; i++)
    {
        divs[i].innerHTML = dict[languages[0]][i];
    }
    resetButtons();
}

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
    
    var load = "pages/" + language + "/" + source + ".html";

    navbutt.className += " active";
    httpGet(source, setContent);
}

function setContent(payload) 
{
    contentArea.innerHTML = payload;
}

//set default language
setLanguage();
//default clicked element
document.getElementById("initial").click();
