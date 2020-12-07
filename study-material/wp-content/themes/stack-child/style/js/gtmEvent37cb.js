var eventCategory = {
    "StartDT": "StartDT",
    "OnClickView": "View",
    "OnClickHome" : "Home",
    "OnClickSubChapter": "SubChapter",
    "OnClickChapter": "Chapter",
    "OnClickModelPaper": "Model Paper",
    "OnClickRevisionNotes": "Revision Notes",
    "OnClickRevisionNotesChapter" : "Revision Notes Chapter",
    "OnClickDT": "Diagnostic Test",
    "OnClickLM": "Learning Material",
    "OnCliCkLMProgress" : "Learning Material Progress",
    "OnClickLMSubChapter" : "Learning Material Subchapter",
    "OnClickSubject" : "Subject",
    "OnClickClass" : "Class",
    "OnClickBoard" : "Board",
    "OnClickQuestionPapers" : "Model Paper",
    "SelectBoard" : "Select Board",
    "SelectGrade" : "Select Grade",
    "SelectSubject" : "Select Subject",
    "OnClickVideo" : "Video",
    "Search" : "Search",
    "OnSearch" : "Search",
    "EmailRevisionNotes": "Email Revision Notes",
    "EmailRevisionNotesSend": "Email Revision Notes Send",
    "NextButtonLM": "Next Learning Material",
    "NextButtonRN": "Next Revision Notes",
    "PrevButtonLM": "Previous Learning Material",
    "PrevButtonRN": "Previous Revision Notes",
    "OnClickTakeQuiz": "Take a Quiz",
    "OnClickModelCorrect": "Take a Quiz - Correct Popup",
    "OnClickModelWrong": "Take a Quiz - Wrong Popup"
}

var $jQ = jQuery;
$jQ(document).ready(function() {
var contentEventID = 50001;
var dataLayer = window.dataLayer;
var eventAction = {
    "StartDT": "Start DT",
    "OnClickView": "Navigate to TOC",
    "OnClickSubChapter": "Open elements pane",
    "OnClickChapter": "navigate to chapter details",
    "OnClickModelPaper": "Open Model paper",
    "OnClickRevisionNotes": "Open Revision Notes",
    "OnClickDT": "Open DT",
    "OnClickLM": "Open learning material",
    "OnClickSubject" : "Navigate to subject list",
    "OnClickClass" : "OnClickClass",
    "OnClickBoard" : "OnClickBoard",
    "OnClickQuestionPapers" : "Open Question Paper",
    "SelectBoard" : "Select Board",
    "SelectGrade" : "Select Grade",
    "SelectSubject" : "Select Subject",
    "WordSearch":"Word Search"
}

var eventUserAction = {
    "open" : "Open",
    "download" : "Download",
    "play" : "Play",
    "click" : "Click",
    "SelectBoard" : "Select Board",
    "SelectGrade" : "Select Grade",
    "SelectSubject" : "Select Subject",
    "taketest" : "TakeTest",
    "send": "Send"
}


function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function addLoginEventDimension() {
    dataLayer.push({
        'plcEventId': loginEventId
    })
}

function getUserObj(){
  return JSON.parse(window.localStorage.getItem("userData"));
}

window.logEventClick = function(eventType, otherParams = {}){

    var eventData = {};
    var userObject = getUserObj();
    var board = "NA";
    var className = "NA";
    var subject = "NA";

    var path = window.location.pathname;
    path = path.replace("study-material/", "");
    var pathArr = path.split("/");
    if(pathArr.length > 3) {
        var selectionArr = pathArr[2].split("-");
        board = selectionArr[0];
        className = selectionArr[1];
        subject = selectionArr[2];
    }


    // add user specific properties
    eventData["SessionId"] = guid();
    eventData["uid"] = guid();
    eventData["board"] = board;
    eventData["class"] = className;
    eventData["subject"] = subject;
    eventData["eventTag"] = "Content - Student Website";
    eventData["eventLabel"] = board + "-" + className + "-" + subject;
    eventData["value"] = "Menu";
    eventData["event"] = eventType;
    eventData["contentEventId"] = contentEventID;

    if(pathArr.length >= 5){
        if(pathArr[1] == "revision_note"){
            eventData["eventLabel"] += " | " + pathArr[4];
            eventData["chapterName"] = pathArr[4];
        }else {
            eventData["eventLabel"] += " | " + pathArr[3] + " | " + pathArr[4];
            eventData["chapterName"] = pathArr[3];
            eventData["subChapterName"] = pathArr[4];
        }
    }

    switch(eventType){
        case eventCategory.OnClickRevisionNotes:
            eventData["eventCategory"] = eventCategory.OnClickRevisionNotes;
            eventData["eventAction"] = eventUserAction.click;
            dataLayer.push(eventData);
            break;

        case eventCategory.OnClickRevisionNotesChapter:
            eventData["eventCategory"] = eventCategory.OnClickRevisionNotes;
            eventData["eventAction"] = eventUserAction.open;
            eventData["eventLabel"] += " | " + otherParams["chapterName"];
            eventData["chapterName"] = otherParams["chapterName"];
            dataLayer.push(eventData);
            break;

        case eventCategory.OnClickLMSubChapter:
            eventData["eventCategory"] = eventCategory.OnClickLM;
            eventData["eventAction"] = eventUserAction.open;
            dataLayer.push(eventData);
            break;

        case eventCategory.OnSearch:
            eventData["eventCategory"] = eventCategory.OnSearch;
            eventData["eventAction"] = eventAction.WordSearch;
            eventData["eventLabel"] += " | " + otherParams["WordSearch"];
            dataLayer.push(eventData);
            break;

        case eventCategory.OnClickModelPaper:
            eventData["eventCategory"] = eventCategory.OnClickModelPaper;
            eventData["eventAction"] = eventUserAction.open;
            dataLayer.push(eventData);
            break;

        case eventCategory.OnClickHome:
            eventData["eventCategory"] = eventCategory.OnClickHome;
            eventData["eventAction"] = eventUserAction.click;
            dataLayer.push(eventData);
            break;

        case eventCategory.OnClickView:
            eventData["eventCategory"] = eventCategory.OnClickView;
            eventData["eventAction"] = eventUserAction.click;
            dataLayer.push(eventData);
            break;

        case eventCategory.OnClickSubChapter:
            eventData["eventCategory"] = eventCategory.OnClickSubChapter;
            eventData["eventAction"] = eventUserAction.open;
            eventData["value"] = otherParams["subChapterName"];
            eventData["chapterName"] = otherParams["chapterName"];
            eventData["subChapterName"] = otherParams["subChapterName"];
            dataLayer.push(eventData);
            break;

        case eventCategory.OnClickChapter:
            eventData["eventCategory"] = eventCategory.OnClickChapter;
            eventData["eventAction"] = eventUserAction.open;
            eventData["value"] = otherParams["chapterName"];
            eventData["chapterName"] = otherParams["chapterName"];
            eventData["eventLabel"]+= " | " + otherParams["chapterName"];
            dataLayer.push(eventData);
            break;

        case eventCategory.OnClickLM:
            eventData["eventCategory"] = eventCategory.OnClickLM;
            eventData["eventAction"] = eventUserAction.click;
            dataLayer.push(eventData);
            break;

        case eventCategory.OnCliCkLMProgress:
            eventData["eventCategory"] = eventCategory.OnClickLM;
            eventData["eventAction"] = "Scroll | " + otherParams["progress"] + " | %";
            dataLayer.push(eventData);
            break;

        case eventCategory.OnClickDT:
            eventData["eventCategory"] = eventCategory.OnClickDT;
            eventData["eventAction"] = eventUserAction.click;
            dataLayer.push(eventData);
            break;

        case eventCategory.OnClickDT:
            eventData["eventCategory"] = eventCategory.OnClickDT;
            eventData["eventAction"] = eventUserAction.click;
            dataLayer.push(eventData);
            break;

        case eventCategory.OnClickSubject:
            eventData["eventCategory"] = eventCategory.OnClickSubject;
            eventData["eventAction"] = eventUserAction.click;
            dataLayer.push(eventData);
            break;

        case eventCategory.OnClickClass:
            eventData["eventCategory"] = eventCategory.OnClickClass;
            eventData["eventAction"] = eventUserAction.click;
            dataLayer.push(eventData);
            break;

        case eventCategory.OnClickBoard:
            eventData["eventCategory"] = eventCategory.OnClickBoard;
            eventData["eventAction"] = eventUserAction.click;
            dataLayer.push(eventData);
            break;
        case eventCategory.SelectBoard:
            eventData["eventCategory"] = eventCategory.Search;
            eventData["eventAction"] = eventUserAction.SelectBoard;
            eventData["eventLabel"] = otherParams["board"];
            dataLayer.push(eventData);
            break;
        case eventCategory.SelectGrade:
            eventData["eventCategory"] = eventCategory.Search;
            eventData["eventAction"] = eventUserAction.SelectGrade;
            eventData["eventLabel"] = otherParams["class"];
            dataLayer.push(eventData);
            break;
        case eventCategory.SelectSubject:
            eventData["eventCategory"] = eventCategory.Search;
            eventData["eventAction"] = eventUserAction.SelectSubject;
            eventData["eventLabel"] = otherParams["subject"];
            dataLayer.push(eventData);
            break;
        case eventCategory.OnClickVideo:
            eventData["eventCategory"] = eventCategory.OnClickVideo;
            eventData["eventAction"] = eventUserAction.play;
            dataLayer.push(eventData);
            break;
        case eventCategory.EmailRevisionNotes:
            eventData["eventCategory"] = eventCategory.EmailRevisionNotes;
            eventData["eventAction"] = eventUserAction.click;
            dataLayer.push(eventData);
            break;
        case eventCategory.EmailRevisionNotesSend:
            eventData["eventCategory"] = eventCategory.EmailRevisionNotesSend;
            eventData["eventAction"] = eventUserAction.send;
            eventData["eventLabel"] += " | " + otherParams["email"];
            dataLayer.push(eventData);
            break;
        case eventCategory.NextButtonLM:
            eventData["eventCategory"] = eventCategory.NextButtonLM;
            eventData["eventAction"] = eventUserAction.click;
            dataLayer.push(eventData);
            break;
        case eventCategory.NextButtonRN:
            eventData["eventCategory"] = eventCategory.NextButtonRN;
            eventData["eventAction"] = eventUserAction.click;
            dataLayer.push(eventData);
            break;
        case eventCategory.PrevButtonLM:
            eventData["eventCategory"] = eventCategory.PrevButtonLM;
            eventData["eventAction"] = eventUserAction.click;
            dataLayer.push(eventData);
            break;
        case eventCategory.PrevButtonRN:
            eventData["eventCategory"] = eventCategory.PrevButtonRN;
            eventData["eventAction"] = eventUserAction.click;
            dataLayer.push(eventData);
            break;

        case eventCategory.OnClickTakeQuiz:
            eventData["eventCategory"] = eventCategory.onClickTakeQuiz;
            eventData["eventAction"] = eventUserAction.click;
            dataLayer.push(eventData);
            break;

        case eventCategory.OnClickModelCorrect:
            eventData["eventCategory"] = eventCategory.OnClickModelCorrect;
            eventData["eventAction"] = eventUserAction.click;
            dataLayer.push(eventData);
            break;

        case eventCategory.OnClickModelWrong:
            eventData["eventCategory"] = eventCategory.OnClickModelWrong;
            eventData["eventAction"] = eventUserAction.click;
            dataLayer.push(eventData);
            break;
    }


}


    /**
     * CLICK HANDLERS FOR GTM START
     */

    if(dataLayer) {

        var viewLink = $jQ("#vn_view_link");
        var subChapter = $jQ('[class^="children"] .cat-item');
        var chapter = $jQ('[class^="list-group"] .cat-item');
        var revisionNotesBtn = $jQ('#revision_notes_view');
        var modelPaperBtn = $jQ('#model_papers_view');
        var learningMaterialBtn = $jQ('#learning_material_view');
        var diagnosticTestBtn = $jQ('#diagnostic_test_view');
        var revisionNotesChapterBtn = $jQ("#panel2 .vn_btn");
        var homeBtn = $jQ(".menu-home");
        var searchForm = $jQ("#searchform");
        
        var revisionNotesBtn1 = $jQ('#revision_notes_view1');
        var modelPaperBtn1 = $jQ('#model_papers_view1');
        var learningMaterialBtn1 = $jQ('#learning_material_view1');
        var diagnosticTestBtn1 = $jQ('#diagnostic_test_view1');
        var emailRevisionNotes = $jQ('.revision_notes_email_button');
        var emailRevisionNotesSend = $jQ('#sendMail');
        var prevBtnRN = $jQ('#prev_button_rn');
        var prevBtnLM = $jQ('#prev_button_lm');
        var nextBtnRN = $jQ('#next_button_rn');
        var nextBtnLM = $jQ('#next_button_lm');
        var takeAQuiz = $jQ('#slideOut');
        var modelCorrectQuiz = $jQ("#model_correct_quiz");
        var modelWrongQuiz = $jQ("#model_wrong_quiz");

        homeBtn.on('click', function (e) {
            logEventClick(eventCategory.OnClickHome);
        });

        viewLink.on('click', function (e) {
            logEventClick(eventCategory.OnClickView);
        });

        var alphaNumRegex = new RegExp("^[A-Za-z0-9? ,_-]+$");
        searchForm.on('submit',function(ev){
            var val = this[0].value.trim();
            if (val!='' && alphaNumRegex.test(val)){
                var otherParams = {};
                otherParams["WordSearch"] = val;
                logEventClick(eventCategory.OnSearch, otherParams);
            }
            else{
                if (!alphaNumRegex.test(val)){
                    alert("only alphabets and numbers are allowed for search");
                }
                ev.preventDefault();
            }
        });

        subChapter.on('click', function (ev) {
            console.log("EVENT TRIGGER");
            var a = ev.target.href;
            a = a.replace('undefined', '');
            ev.preventDefault();
            ev.stopPropagation();
            ev.stopImmediatePropagation();
            var target = ev.target || ev.srcElement;
            var otherParams = {};
            otherParams["subChapterName"] = target.innerHTML;
            var chapterNameArr = target.href.split("/");
            var chapterName = chapterNameArr[4];
            otherParams["chapterName"] = chapterName;
            console.log("OTHER PARAMS ARE", otherParams);
            logEventClick(eventCategory.OnClickSubChapter, otherParams);
            logEventClick(eventCategory.OnClickLMSubChapter, otherParams);
            window.location.href = a;
        });

        chapter.on('click', function (ev) {
            var a = ev.target.href;
            if(a !== undefined) {
                a = a.replace('undefined', '');
            }
            ev.preventDefault();
            ev.stopPropagation();
            ev.stopImmediatePropagation();
            var target = ev.target || ev.srcElement;
            var otherParams = {};
            if(target.innerHTML.indexOf("stack-down-open") > -1){
                otherParams["chapterName"] = target.previousElementSibling.innerHTML;
            }else{
                otherParams["chapterName"] = target.innerHTML;
                logEventClick(eventCategory.OnClickRevisionNotesChapter, otherParams);
            }
            logEventClick(eventCategory.OnClickChapter, otherParams);
            if(a!== undefined) {

                if(window.location.pathname.indexOf("revision_note") > -1)
                    window.location.href = a;
                if(a.indexOf("learning_material") > -1){
                    window.location.href = a;
                }
            }
        });

        $jQ(".cat-item-accordion").on("click", function(){
            var url = $j(this).attr('data-id');

            logEventClick(eventCategory.OnClickSubChapter);
            logEventClick(eventCategory.OnClickLMSubChapter);
        })

        revisionNotesBtn.on('click', function (ev) {
            logEventClick(eventCategory.OnClickRevisionNotes);
        });
        modelPaperBtn.on('click', function (ev) {
            logEventClick(eventCategory.OnClickModelPaper);
        });
        learningMaterialBtn.on('click', function (ev) {
            logEventClick(eventCategory.OnClickLM);
        });
        diagnosticTestBtn.on('click', function (ev) {
            logEventClick(eventCategory.OnClickDT);
            //ev.preventDefault();
        });


        revisionNotesBtn1.on('click', function (ev) {
            logEventClick(eventCategory.OnClickRevisionNotes);
        });
        modelPaperBtn1.on('click', function (ev) {
            logEventClick(eventCategory.OnClickModelPaper);
        });
        learningMaterialBtn1.on('click', function (ev) {
            logEventClick(eventCategory.OnClickLM);
        });
        diagnosticTestBtn1.on('click', function (ev) {
            logEventClick(eventCategory.OnClickDT);
            //ev.preventDefault();
        });

        revisionNotesChapterBtn.on('click', function (ev) {
            var a = ev.target.href;
            if(a !== undefined){
                var target = ev.target || ev.srcElement;
                ev.preventDefault();
                ev.stopPropagation();
                ev.stopImmediatePropagation();
                var otherParams = {};
                var chapterNameArr = target.href.split("/");
                var chapterName = chapterNameArr[4];
                otherParams["chapterName"] = chapterName;
                logEventClick(eventCategory.OnClickRevisionNotesChapter, otherParams);
                window.location.href = a;
            }
        });

        emailRevisionNotes.on('click',function(ev){
            var otherParams = {};
            var path = window.location.pathname;
            path = path.replace("study-material/", "");
            var pathArr = path.split("/");
            var bgArray = pathArr[2].split("-");

            var board = bgArray[0];
            var level = bgArray[1];
            var subject = bgArray[2];
            var chapter = pathArr[3];

            otherParams["board"] = board;
            otherParams["class"] = level;
            otherParams["subject"] = subject;
            otherParams["chapterName"] = chapter;

            logEventClick(eventCategory.EmailRevisionNotes, otherParams);
        });

        emailRevisionNotesSend.on('click',function(ev){
            var otherParams = {};
            var path = window.location.pathname;
            path = path.replace("study-material/", "");
            var pathArr = path.split("/");
            var bgArray = pathArr[2].split("-");

            var board = bgArray[0];
            var level = bgArray[1];
            var subject = bgArray[2];
            var chapter = pathArr[3];

            otherParams["board"] = board;
            otherParams["class"] = level;
            otherParams["subject"] = subject;
            otherParams["chapterName"] = chapter;
            otherParams["email"] = $jQ("#subscriberEmail").val();

            logEventClick(eventCategory.EmailRevisionNotesSend, otherParams);
        });


        takeAQuiz.find('.slideOutTab').on('click', function() {
            logEventClick(eventCategory.OnClickTakeQuiz);

        });

        modelCorrectQuiz.on('click', function (ev) {
            logEventClick(eventCategory.OnClickModelCorrect);
        });

        modelWrongQuiz.on('click', function (ev) {
            logEventClick(eventCategory.OnClickModelWrong);
        });

        $jQ(".icse-box").on('click',function(ev){
            var otherParams = {};
            otherParams["board"] = "ICSE";
            logEventClick(eventCategory.SelectBoard, otherParams);
        });

        $jQ(".cbse-box").on('click',function(ev){
            var otherParams = {};
            otherParams["board"] = "CBSE";
            logEventClick(eventCategory.SelectBoard, otherParams);
        });

        $jQ(".dropdown-item-class").on('click',function(ev){
            var clickedItem = ev.target;
            var otherParams = {};
            otherParams["class"] = $jQ(clickedItem).html().trim();
            logEventClick(eventCategory.SelectGrade, otherParams);
        });
        $jQ(".dropdown-item-subject").on('click',function(ev){
            var clickedItem = ev.target;
            var subject = $j(clickedItem).html().trim();
            var otherParams = {};
            otherParams["subject"] = subject;
            logEventClick(eventCategory.SelectSubject, otherParams);
        });

        nextBtnLM.on('click',function(ev){
            logEventClick(eventCategory.NextButtonLM);
        });
        nextBtnRN.on('click',function(ev){
            logEventClick(eventCategory.NextButtonRN);
        });
        prevBtnLM.on('click',function(ev){
            logEventClick(eventCategory.PrevButtonLM);
        });
        prevBtnRN.on('click',function(ev){
            logEventClick(eventCategory.PrevButtonRN);
        });

    }

    /**
     * CLICK HANDLERS FOR GTM END
     */



});


if(window.location.protocol == "http:") {
    var tag = document.createElement('script');
    tag.src = "http://www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}else{
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubePlayerAPIReady() {
    for (var e = document.getElementsByTagName("iframe"), x = e.length; x--;) {
        if (/youtube.com\/embed/.test(e[x].src)) {
            // get player if exist or create one without listener
            var player = YT.get(e[x].id)||new YT.Player(e[x], {
                    events: {
                    }
                });
            // now you can add listener and keep behavior when player already declared
            player.addEventListener("onStateChange",onPlayerStateChange);
            player.addEventListener("onReady",onPlayerReady);
        }
    }

}

function onPlayerReady(event) {
    /// event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        logEventClick(eventCategory.OnClickVideo);
    }
    if (event.data == YT.PlayerState.PAUSED) {
    }
    if (event.data == YT.PlayerState.ENDED) {
    }
}


var path = window.location.pathname;
path = path.replace("study-material/", "");
var pathArr = path.split("/");
if(pathArr.length > 4 && window.logEventClick != undefined){

    var hasFinished25 = false;
    var hasFinished50 = false;
    var hasFinished100 = false;
    $jQ(window).scroll(function() {

        // calculate the percentage the user has scrolled down the page
        var scrollPercent = 100 * $jQ(window).scrollTop() / ($jQ(document).height() - $jQ(window).height());

        var otherParams = {};
        if(scrollPercent > 97 && !hasFinished100){
            hasFinished100 = true;
            otherParams["progress"] = 100;
            window.logEventClick(eventCategory.OnCliCkLMProgress, otherParams);
        }else if(scrollPercent > 50 && !hasFinished50){
            hasFinished50 = true;
            otherParams["progress"] = 50;
            window.logEventClick(eventCategory.OnCliCkLMProgress, otherParams);
        }else if(scrollPercent > 25 && !hasFinished25){
            hasFinished25 = true;
            otherParams["progress"] = 25;
            window.logEventClick(eventCategory.OnCliCkLMProgress, otherParams);
        }
    });
}