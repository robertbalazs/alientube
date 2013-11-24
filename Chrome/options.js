/* jslint browser: true */
/* global chrome */
// Saves options to localStorage.


function save_options() {
    var hiddenCommentScoreThreshold = document.getElementById("hiddenCommentScoreThreshold");
    var wideCommentBox = document.getElementById("wideCommentBox");
    var featherDescriptionPlacement = document.getElementById("featherDescriptionPlacement");
    var disablePostHeader = document.getElementById("disablePostHeader");
    var disableTabs = document.getElementById("disableTabs");
    var enableAutomaticErrorReporting = document.getElementById("enableAutomaticErrorReporting");
    if (!hiddenCommentScoreThreshold.value.match(/[0-9]+/)) {
        hiddenCommentScoreThreshold.value = -4;
    }
    chrome.storage.sync.set({
        'hiddenCommentScoreThreshold': hiddenCommentScoreThreshold.value,
        'wideCommentBox': wideCommentBox.checked,
        'featherDescriptionPlacement': featherDescriptionPlacement.checked,
        'disablePostHeader': disablePostHeader.checked,
        'disableTabs': disableTabs.checked,
        'enableAutomaticErrorReporting' : enableAutomaticErrorReporting.checked
    }, function() {
            var status = document.getElementById("status");
            status.innerHTML = "Options Saved.";
            setTimeout(function() {
                status.innerHTML = "";
            }, 1000);
        });
}

//Restore options when option page is loaded
function restore_options() {
    var hiddenCommentScoreThreshold = document.getElementById("hiddenCommentScoreThreshold");
    var wideCommentBox = document.getElementById("wideCommentBox");
    var featherDescriptionPlacement = document.getElementById("featherDescriptionPlacement");
    var disablePostHeader = document.getElementById("disablePostHeader");
    var disableTabs = document.getElementById("disableTabs");
    var enableAutomaticErrorReporting = document.getElementById("enableAutomaticErrorReporting");
    chrome.storage.sync.get(null, function (items) {
        console.log(items);
        hiddenCommentScoreThreshold.value = items.hiddenCommentScoreThreshold ? items.hiddenCommentScoreThreshold : -4;
        wideCommentBox.checked = items.wideCommentBox;
        featherDescriptionPlacement.checked = items.featherDescriptionPlacement;
        disablePostHeader.checked = items.disablePostHeader;
        disableTabs.checked = items.disableTabs;
        enableAutomaticErrorReporting.checked = items.enableAutomaticErrorReporting;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById("saveButton").addEventListener("click", save_options);