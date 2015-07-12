window.onload = function() {
    var remote = require('remote');
    var normalizeURL = remote.require('normalize-url');

    var $ = document.querySelector.bind(document);

    var $bar = $("wolfram-bar");
    var $page = $(".page");
    
    var controls = {
        back: $("paper-icon-button[icon=arrow-back]"),
        forward: $("paper-icon-button[icon=arrow-forward]"),
        refresh: $("paper-icon-button[icon=refresh]"),
        home: $("paper-icon-button[icon=home]")
    };

    controls.back.addEventListener("click", goBack);
    controls.forward.addEventListener("click", goForward);
    controls.refresh.addEventListener("click", refresh);
    controls.home.addEventListener("click", goHome);

    var webview = document.createElement("webview");
    webview.src = "https://google.com";

    $page.appendChild(webview);

    webview.addEventListener("dom-ready", function() {
        window.home = "https://www.google.com";
        window.webview = this;
        $bar.where = this.getUrl();
        document.title = "Wolfram - " + this.getTitle();

        controls.back.disabled = !this.canGoBack();
        controls.forward.disabled = !this.canGoForward();

        // Why doesn't this work?
        /*this.executeJavaScript({
            code: "document.querySelector('meta[name=theme-color]').content"
        }, function(result) {
            console.log(result);
        });*/
    });
};

function goBack() {
    window.webview.goBack();
}

function goForward() {
    window.webview.goForward();
}

function refresh() {
    window.webview.reload();
}

function goHome() {
    window.webview.src = window.home;
}