const contentArea = document.getElementById("page");

function setContent(payload) {
    contentArea.innerHTML = payload;
}

function httpGet(myUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", myUrl, true);
    xmlHttp.send(null);
}

function load(navbutt, source) {
    //reset buttons
    var temp = document.getElementsByClassName("active");
    try {
        temp[0].className = "nav-button";
    }
    catch {
    }

    //activate the pressed button
    navbutt.className += " active";

    var page = "pages/" + source;

    httpGet(page, setContent);
}
