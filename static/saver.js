
$(document).ready(function() {

var ctrl_down = false;
var ctrl_key = 17;
var s_key = 83;

$(document).keydown(function(e) {
    if (e.keyCode == ctrl_key) ctrl_down = true;
}).keyup(function(e) {
    if (e.keyCode == ctrl_key) ctrl_down = false;
});

var save = function() {
    var doc = document.documentElement.outerHTML;
    doc = "<!DOCTYPE html>\n" + doc;
    $.post(document.URL, {content:doc});
};


$(document).keydown(function(e) {
    if (ctrl_down && (e.keyCode == s_key)) {
        save();
        return false;
    }
});

$(window).bind('beforeunload', function() {
    save();
});

});

