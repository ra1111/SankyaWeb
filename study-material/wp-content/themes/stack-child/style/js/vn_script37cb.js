!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '482948281830009');
fbq('track', 'PageView');


var lsManager;
(function($) {

    var refData = {};

    /** UTM parmas init */

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    // Give the URL parameters variable names
    var source = getParameterByName('utm_source');
    var medium = getParameterByName('utm_medium');
    var campaign = getParameterByName('utm_campaign');
    console.log(source, medium, campaign);
    // // Put the variable names into the hidden fields in the form.
    // document.getElementsByName("utm_source").value = source;
    // document.getElementsByName("utm_medium").value = medium;
    // document.getElementsByName("utm_campaign").value = campaign;
    /** END utm params init */

    function isOrganic(ref) {
        if (ref.includes('google')) {
            return 'Google';
        }
        if (ref.includes('yahoo')) {
            return 'Yahoo';
        }
        if (ref.includes('bing')) {
            return 'Bing';
        }
    };
    var saveRefererData = function () {
        var refParam = document.referrer;
        var leadData = {};
        try {
            if (source || refParam) {
                if (source) {
                    leadData.Source = source
                }
                else if (refParam) {
                    if (isOrganic(refParam)) {
                        leadData.Source = 'Organic';
                        leadData.SourceDetail = isOrganic(refParam);
                    } else {
                        leadData.Source = 'Referral';
                        leadData.SourceDetail = refParam;
                    }
                }
            }
            else {
                leadData.Source = 'Direct'
            }


            if (medium) {
                leadData.SourceDetail = medium;
            }

            leadData.RecentSource = leadData.Source;
            leadData.RecentSourceDetail = leadData.Source;
            refData = leadData;
            console.log(refData);
        } catch (error) {

        }
    }
    saveRefererData();

    function createLeadAndActivity(email, board, level, subject, chapter, downloadurl) {

        //subject = subject.replace('Science', 'Biology,Chemistry,Physics');

        //var board = searchCriteria.board;
        //var level = searchCriteria.level;
        //var location = window._searchLocation.location;
        //var address = location.address;//tutorSearch.getAddress().route + ', ' + tutorSearch.getAddress().locality;
        var leadData = {
            "LeadDetails": [
                {"Attribute": "EmailAddress", "Value": email},
                {"Attribute": "mx_Revision_Notes_Link", "Value": downloadurl},
                // { "Attribute": "FirstName", "Value": name },
                // { "Attribute": "Phone", "Value": phone },
                // { "Attribute": 'mx_Street1', "Value": address },
                // { "Attribute": 'mx_Area', "Value": location.area },
                // { "Attribute": 'mx_City', "Value": location.city },
                // { "Attribute": 'mx_Pincode', "Value": location.pincode },

                {"Attribute": 'mx_Lead_Source_Details', "Value": refData.SourceDetail},
                {"Attribute": 'mx_Recent_Lead_Source', "Value": refData.RecentSource},
                {"Attribute": 'Source', "Value": refData.Source}
            ],
            "Activity": {
                "ActivityEvent": 282,
                "Fields": [
                    {"SchemaName": "mx_Custom_1", "Value": board},
                    {"SchemaName": "mx_Custom_2", "Value": level},
                    {"SchemaName": "mx_Custom_3", "Value": subject},
                    {"SchemaName": "mx_Custom_4", "Value": downloadurl},
                    {"SchemaName": "mx_Custom_5", "Value": chapter}
                    // {"SchemaName": "mx_Custom_4","Value": "Guur@zdfds.com"}
                ]
            }
        }

        leadData.Source = refData.Source;
        leadData.RecentSource = refData.RecentSource;
        leadData.SourceDetail = refData.SourceDetail;
        leadData.RecentSourceDetail = refData.RecentSourceDetail;
        //abhishek - change here
        var url = 'https://tdservices.vidyanext.com/' + 'api/v2/LeadManagement/Parent/CreateLeadAndActivity';
        $.ajax({
            type: "POST"
            , url: url
            , data: leadData
            , success: function (result) {
                console.log("RESULT IS", result);
                {
                    leadId = result.Message.Id;
                    // success
                }
            }, error: function (err) {
                // show error message
            }
        });
    }

    lsManager = {
        createLeadAndActivity: function (email, board, level, subject, chapter, downloadurl) {
            // build searchCriteria object
            createLeadAndActivity(email, board, level, subject, chapter, downloadurl);
        }
    }
})(jQuery);



(function backDection(jQuery) {
    var $ = jQuery;
    var win = typeof window !== 'undefined' && window;
    var backDetectValues = {
        frameLoaded: 0,
        frameTry: 0,
        frameTime: 0,
        frameDetect: null,
        frameSrc: null,
        frameCallBack: null,
        frameThis: null,
        frameNavigator: window.navigator.userAgent,
        frameDelay: 0,
        frameDataSrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC',
    };

    /**
     * Back Detect
     *
     * @param function callback
     * @param int delay
     */
    $.fn.backDetect = function detectBackClick(callback, delay) {
        backDetectValues.frameThis = this;
        backDetectValues.frameCallBack = callback;
        if (delay !== null) {
            backDetectValues.frameDelay = delay;
        }
        if (backDetectValues.frameNavigator.indexOf('MSIE ') > -1 || backDetectValues.frameNavigator.indexOf('Trident') > -1) {
            setTimeout(function loadFrameIE() {
                $('<iframe src="' + backDetectValues.frameDataSrc + '?loading" style="display:none;" id="backDetectFrame" onload="jQuery.fn.frameInit();""></iframe>').appendTo(backDetectValues.frameThis);
            }, backDetectValues.frameDelay);
        } else {
            setTimeout(function loadFrame() {
                $("<iframe src='about:blank?loading' style='display:none;' id='backDetectFrame' onload='jQuery.fn.frameInit();'></iframe>").appendTo(backDetectValues.frameThis);
            }, backDetectValues.frameDelay);
        }
    };

    /**
     * Initialize Frame
     */
    $.fn.frameInit = function initFrame() {
        backDetectValues.frameDetect = document.getElementById('backDetectFrame');
        if (backDetectValues.frameLoaded > 1) {
            if (backDetectValues.frameLoaded === 2) {
                backDetectValues.frameCallBack.call(this);
                win.history.go(-1);
            }
        }
        backDetectValues.frameLoaded += 1;
        if (backDetectValues.frameLoaded === 1) {
            backDetectValues.frameTime = setTimeout(function beginFrameSetup() {
                jQuery.fn.setupFrames();
            }, 500);
        }
    };

    /**
     * Frame Setup
     */
    $.fn.setupFrames = function frameSetup() {
        clearTimeout(backDetectValues.frameTime);
        backDetectValues.frameSrc = backDetectValues.frameDetect.src;
        if (backDetectValues.frameLoaded === 1 && backDetectValues.frameSrc.indexOf('historyLoaded') === -1) {
            if (backDetectValues.frameNavigator.indexOf('MSIE ') > -1 || backDetectValues.frameNavigator.indexOf('Trident') > -1) {
                backDetectValues.frameDetect.src = backDetectValues.frameDataSrc + '?historyLoaded';
            } else {
                backDetectValues.frameDetect.src = 'about:blank?historyLoaded';
            }
        }
    };


}(jQuery));

var $j = jQuery.noConflict();
$j(document).ready(function() {

    $j(window).load(function(){
        $j('body').backDetect(function(e){
            // Callback function
            //alert("Look forward to the future, not the past!");
            $j("#dt-test").remove();
        });
    });

    const burl = window.location.href;
    if (burl.indexOf('#diagnostic-test')>=0){
        $j('#panel0').fadeIn();
    }
    else if (burl.indexOf('#question-paper')>=0){
        $j('#panel1').fadeIn();
    }

    var vals = [];
    var viewLink = $j("#vn_view_link");
    var selectedSlug = $j("#vn_selected_slug");
    var selection_error = $j("#selection_error");

    MathJax.Hub.Config( {
        TeX: {extensions: ["mhchem.js"]},
        tex2jax: { inlineMath: [["$","$"],["\\(","\\)"]] },
        "HTML-CSS": {
            availableFonts: ["Tex"],
            preferredFont: "Tex",
            font: "Tex",
            linebreaks: { automatic: true, width: "container" }
        },
    });

    $j(".vn_plus_btn").on("click",function(e){
        $j(this).parent().find('ul.children').toggleClass("open");
        e.preventDefault();
    });

    var currentCatParent = $j('li.current-cat').parent();
    if (currentCatParent.hasClass("collapse")){
        currentCatParent.addClass("open");
    }
    else{
        $j('li.current-cat').find('ul.children').addClass("open");
    }

    if (selectedSlug.length && selectedSlug.val()){
        var sl = selectedSlug.val();
        sl = sl.split('-');
        vals[0] = sl[0];
        vals[1] = sl[1];
        vals[2] = sl[2];

        if (vals[1]==4 || vals[1]==5){
            $j("#subject").find("options").remove();
            $j("#subject").html('<option value="">Select Subject</option><option>Maths</option><option value="EVS">Evs</option>');
        }
        else{
            $j("#subject").html('<option value="">Select Subject</option><option>Maths</option><option>Biology</option><option>Chemistry</option><option>Physics</option>');
        }

        $j("#board").val((sl[0]==='Grade' ? 'CBSE' : sl[0]));
        $j("#class").val(sl[1]);
        $j("#subject").val(sl[2]);

        if (vals.length==3){
            viewLink.attr("href",'/category/'+vals[0]+'-'+vals[1]+'-'+vals[2]);
        }
    }
    else{
        $j("#board").val("");
        $j("#class").val("");
        $j("#subject").val("");
    }

    $j(".vn_select").on("change",function(e){
        var dom = $j(this);
        switch(dom.attr("id")){
            case 'board':
                if (vals[1]==4 || vals[1]==5){
                    vals[0]='Grade';
                }
                else{
                    vals[0] = dom.val();
                }
                break;

            case 'class':
                vals[1] = dom.val();
                if (vals[1]==4 || vals[1]==5){
                    vals[0]='Grade';
                    $j("#subject").find("options").remove();
                    $j("#subject").html('<option value="">Select Subject</option><option>Maths</option><option>Evs</option>');
                }
                else{
                    vals[0]=$j("#board").val();
                    $j("#subject").html('<option value="">Select Subject</option><option>Maths</option><option>Biology</option><option>Chemistry</option><option>Physics</option>');
                }
                vals[2] = "";
                break;

            case 'subject':
                vals[2] = dom.val();
                break;
        }
        if (vals[0] && vals[1] && vals[2]){
            viewLink.attr("href",'/category/'+vals[0]+'-'+vals[1]+'-'+vals[2]);
        }
        else{
            viewLink.attr("href",'#');
        }
    });

    viewLink.on('click',function(e){
        if (viewLink.attr('href') == '#') selection_error.removeClass("hide");
    });

    $j('.vn_click_cards').on('click',function(e){
        $j(".collapse-panel").fadeOut();
        $j($j(this).attr("data-target")).fadeIn();
        if ($j(this).attr("data-target") == '#panel3'){
            var el = $j('.cat-item').eq(0);
            if (!el.find('ul.children').hasClass("open")) el.find('.vn_plus_btn').click();
        }
        //e.preventDefault();
    });

    $j('.hamburger-toggle').on('click',function(e){
        $j(".learn-dropdown").hide();
    });

    var players = [];
    function onYouTubeIframeAPIReady() {
        var $ = jQuery;
        $('iframe').filter(function(){return this.src.indexOf('http://www.youtube.com/') == 0}).each( function (k, v) {
            if (!this.id) { this.id='embeddedvideoiframe' + k }
            players.push(new YT.Player(this.id, {
                events: {
                    'onStateChange': function(event) {
                        if (event.data == YT.PlayerState.PLAYING) {
                            $.each(players, function(k, v) {
                                if (this.getPlayerState() == YT.PlayerState.PLAYING
                                    && this.getIframe().id != event.target.getIframe().id) {
                                    this.pauseVideo();
                                }
                            });
                        }
                    }
                }
            }))
        });
    }



    function loadLMStyling(){
        var els = $j("#vn_main_content .vn_content").find('h4');
        for(var i = 1, all = els.length; i < all; i++){
            var data = els[i].innerHTML.trim();
            console.log("Data is", data);
            data = data.toLowerCase();
            if(data == "suggested videos"){
                console.log("Matched");
                els[i].classList.add('suggested_videos_lm');
                break;
            }else if(data != "" && (data.indexOf("diagnostic test") < 0 && (data.indexOf("learning material") < 0 && data.indexOf("revision notes") < 0 && data.indexOf("question papers") < 0 ))){
                els[i].classList.add('heading_new');
            }

        }
    }

    loadLMStyling();

    $j(".learn_trigger").on('click',function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();
        $j(".learn-dropdown").toggle();
        var selectedClass = $j(".selected_class").html().trim();
        if(selectedClass == "Class 4" || selectedClass == "Class 5"){
            $j(".sub_evs").show();
        }else{
            $j(".sub_evs").hide();
        }

    });


    $j(".dropdown-item-class").on('click',function(ev){
        var clickedItem = ev.target;
        $j(".dropdown-item-class").removeClass("selected_class");

        $j(clickedItem).addClass("selected_class");

        var data = $j(clickedItem).html();
        if(data == "Class 4" || data == "Class 5"){
            $j(".sub_physics").hide();
            $j(".sub_chemistry").hide();
            $j(".sub_biology").hide();
            $j(".sub_maths").show();
            $j(".sub_evs").show();
        }else{
            $j(".sub_physics").show();
            $j(".sub_chemistry").show();
            $j(".sub_biology").show();
            $j(".sub_maths").show();
            $j(".sub_evs").hide();
        }


    });


    $j(".icse-box").on('click',function(ev){
        var clickedItem = ev.target;
        $j(".cbse-box").removeClass("selected_board");

        $j(clickedItem).addClass("selected_board");
    });

    $j(".cbse-box").on('click',function(ev){
        var clickedItem = ev.target;
        $j(".icse-box").removeClass("selected_board");

        $j(clickedItem).addClass("selected_board");
    });

    $j(".dropdown-item-subject").on('click',function(ev){
        var clickedItem = ev.target;
        var subject = $j(clickedItem).html().trim();
        var selectedClass = $j(".selected_class").html().trim();
        var selectedBoard = $j(".selected_board").html().trim();
        console.log("Subject is " + subject + " class is " +  selectedClass + " board is " + selectedBoard);

        selectedClass = parseInt(selectedClass.replace( /^\D+/g, ''));
        if(selectedClass == 4 || selectedClass == 5){
            selectedBoard = "Grade";
        }

        var url = selectedBoard + "-" + selectedClass + "-" + subject;
        var webPath = "";
        if(window.location.href.indexOf("quiznext.in/study-material") > -1){
            webPath = "study-material/";
        }
        window.location.href = "/" + webPath + url;
    });

    $j('body').click(function(evt){
        if(evt.target.id == "learn-dropdown")
            return;
        //For descendants of menu_content being clicked, remove this check if you do not want to put constraint on descendants.
        if($j(evt.target).closest('.learn-dropdown').length)
            return;

        $j(".learn-dropdown").hide();

        //Do processing of click event here for every element except with id menu_content

    });


    function initDefaultMenuSelection(){
        var path = window.location.pathname;
        var pathArr = path.split("/");
        var hyphenCount=pathArr[1].split("-").length
        if(pathArr.length > 2 && hyphenCount -1 > 1){
            //if(pathArr.length > 2 && pathArr[1].indexOf("-") > -1){
            var selectionArr = pathArr[1].split("-");
            var board = selectionArr[0];
            var grade = selectionArr[1];
            var subject = selectionArr[2];
            //SET THE SELECTION
            if(board == "CBSE"){
                $j(".cbse-box").addClass("selected_board");
                $j(".icse-box").removeClass("selected_board");
            }else if(board == "ICSE"){
                $j(".cbse-box").removeClass("selected_board");
                $j(".icse-box").addClass("selected_board");
            }else  if(board == "Grade"){
                $j(".cbse-box").addClass("selected_board");
                $j(".icse-box").removeClass("selected_board");
            }

            var gradeTxt = "class-" + grade;
            $j(".dropdown-item-class").removeClass("selected_class");
            $j("#" + gradeTxt).addClass("selected_class");

        }
    }

    initDefaultMenuSelection();


    $j('.revision_notes_email_button').on('click', function () {
        //$j('.email_form_revision_notes').show();
        $j('#myModal_rn').show();
        $j(".display_success_message").hide();
        $j(".email_form_left_section").show();
        $j(".email_form_right_section").show();

        var email = localStorage.getItem("subscribedEmail");
        if(email){
            $j("#subscriberEmail").val(email);
        }
    })

    $j('.close_revision_note_email').on('click', function () {
        $j('.email_form_revision_notes').hide();
    })

    $j('.close_rn').on('click', function () {
        $j('#myModal_rn').hide();
    })
    $j('.close_quiz_correct').on('click', function () {
        $j('#myModal_quiz_correct').hide();
    })
    $j('.close_quiz_wrong').on('click', function () {
        $j('#myModal_quiz_wrong').hide();
    })

    $j("form.email_submission_form").submit(function(e) {
        e.preventDefault(); // <-- add this
        var data = $j(this).serializeArray();
        //Data to send
        var pdfUrl = $j("#pdf_url").html();
        var email = data[0].value;
        var path = window.location.pathname;
        var pathArr = path.split("/");
        var bgArray = pathArr[2].split("-");

        var board = bgArray[0];
        var level = bgArray[1];
        var subject = bgArray[2];
        var chapter = pathArr[3];
        console.log("EMAIL IS", email, "PDF URL IS", pdfUrl, "Board", board, "Level", level, "subject", subject, "Chapter", chapter);

        localStorage.setItem("subscribedEmail", email);
        lsManager.createLeadAndActivity(email, board, level, subject, chapter, pdfUrl);


        $j(".display_success_message").show();
        $j(".email_form_left_section").hide();
        $j(".email_form_right_section").hide();
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        var modal = document.getElementById('myModal_rn');
        var modalCorrect = document.getElementById('myModal_quiz_correct');
        var modalWrong = document.getElementById('myModal_quiz_wrong');
        if (event.target == modal) {
            modal.style.display = "none";
        }
        if(event.target == modalCorrect){
            modalCorrect.style.display = "none";
        }
        if(event.target == modalWrong){
            modalWrong.style.display = "none";
        }
    }
    if(burl.indexOf("CBSE") > -1 || burl.indexOf("ICSE") > -1){
        $j('#menu-item-11222').css('border-bottom', 'none');
    }
    if(burl.indexOf("CBSE") > -1 || burl.indexOf("ICSE") > -1){
        $j('#menu-item-11222').css("border-bottom", "none");
        $j('.learn_trigger').first().css("border-bottom", "3px solid #29abe2");
    }else{
        $j('#menu-item-11222').css("border-bottom", "3px solid #29abe2");
        $j('.learn_trigger').first().css("border-bottom", "none");
    }


    $j('.view_more_list_toc').on('click', function () {
        $j(".view_more_list_toc").hide();
        $j('.single_chapter_item').removeClass("hidden");
    })
    $j('.view_more_intro').on('click', function () {
        $j(".view_more_intro").hide();
        $j('.more_data').removeClass("hidden");
    })


    this.$slideOut = $j('#slideOut');

// Slideout show
    this.$slideOut.find('.slideOutTab').on('click', function() {
        $j("#slideOut").toggleClass('showSlideOut');

        if($j(".arrow").hasClass('up_arrow_quiz')){
            $j(".arrow").removeClass('up_arrow_quiz');
            $j(".arrow").addClass('down_arrow_quiz');
        }else{
            $j(".arrow").addClass('up_arrow_quiz');
            $j(".arrow").removeClass('down_arrow_quiz');
        }

    });

    //Video remove h2 tags
    var d = document.getElementsByClassName("embed-responsive");
    for(var i = 0; i < d.length ; i++) {
        if (d[i].previousElementSibling.innerHTML.toLowerCase().indexOf("suggested") < 0) {
            d[i].previousElementSibling.innerHTML = "";
        }
    }


    var data = {};
    //Accordion in learning material
    $j('.accordion-toggle').on('click', function(event){
        event.preventDefault();
        // create accordion variables
        var accordion = $j(this);
        var accordionContent = accordion.next('.accordion-content');

        // toggle accordion link open class
        accordion.toggleClass("open");
        // toggle accordion content
        accordionContent.slideToggle(250);

        var id = $j(this).attr('id');
        var newUrl = $j(this).attr('data-id');
        if(data[id] == undefined){

            // var iframe = document.getElementById('quiz_test');
            // iframe.src = newUrl;

            $j.get(id, function(data, status){
                var contentR = document.getElementById("content-" + id);
                var div = document.createElement('div');
                div.innerHTML = data;
                var d = div.getElementsByClassName("embed-responsive");
                for(var i = 0; i < d.length ; i++) {
                    if (d[i].previousElementSibling.innerHTML.toLowerCase().indexOf("suggested") < 0) {
                        d[i].previousElementSibling.innerHTML = "";
                    }
                }
                contentR.innerHTML = div.innerHTML;

                MathJax.Hub.Queue(["Typeset",window.MathJax.Hub]);

            });

            data[id] = true;
        }

    });


    //TRIGGER ACCORDION CURRENT PAGE
    var url = window.location.href + "?ajax=true";
    var activeAccordion = document.getElementById(url);
    if(activeAccordion) {
        activeAccordion.click()
    }


});

if (window.addEventListener) {
    window.addEventListener("message", onMessage, false);
}
else if (window.attachEvent) {
    window.attachEvent("onmessage", onMessage, false);
}

function onMessage(event) {
    // Check sender origin to be trusted

    var data = event.data;

    if (typeof(window[data.func]) == "function") {
        window[data.func].call(null, data.message);
    }
}

// Function to be called from iframe
function parentFunc(message) {
    $j = jQuery;
    var iframe = document.getElementById('quiz_test');
    iframe.src = iframe.src;

    $j(".slideOutTab").trigger("click");
    if(message == "correct") {
        $j("#myModal_quiz_correct").show();
    }else{
        $j("#myModal_quiz_wrong").show();
    }
}