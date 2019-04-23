const contentArea = document.getElementById("page");

//name of navs in both languages
//might not be good practice but it sure is easier than loading the dict through ajax
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

function setLanguage() 
{
    //swap languages
    var temp = languages[0];
    languages[0] = languages[1];
    languages[1] = temp;

    //change buttons languages
    var divs = document.getElementsByClassName("nav-button");

    //thanks god the buttons are in order
    //remember to change the i max when adding tabs
    for(i = 0; i < 3; i++)
    {
        divs[i].innerHTML = dict[languages[0]][i];
    }

    //set default tab or reset buttons if there is no initial page
    try
    {
        document.getElementById("initial").click();
    }
    catch(TypeError) //the getElement returns null
    {
        resetButtons();
    }
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
    
    var load = "pages/" + languages[0] + "/" + source;
    console.log(load);

    navbutt.className += " active";
    httpGet(load, setContent);
}

function setContent(payload) 
{
    contentArea.innerHTML = payload;
}

//init page
//set language and click default tab (or not)
setLanguage();
