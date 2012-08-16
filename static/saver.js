
$(document).ready(function() {

var ctrl_down = false;
var ctrl_key = 17;
var s_key = 83;

$(document).keydown(function(e) {
    if (e.keyCode == ctrl_key) ctrl_down = true;
}).keyup(function(e) {
    if (e.keyCode == ctrl_key) ctrl_down = false;
});

$(document).keydown(function(e) {
    if (ctrl_down && (e.keyCode == s_key)) {
        var doc = document.documentElement.outerHTML;
        doc = "<!DOCTYPE html>\n" + doc;
        $.post(document.URL, {content:doc});
        return false;
    }
});

$(window).unload(function() {
    alert('Handler for .unload() called.');
});

});

