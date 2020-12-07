(function($) {
    $(document).ready(function() {
        var params = window.location.search.substring(1).split("&");
        var disabledownload = false;
        var disableprint = false;
        var disabletext = false;
        var disabledoc = false;
        for (var i = 0; i < params.length; i++) {
            var value = params[i].split("=");
            if (value && value.length == 2)
                if (value[0] == "disabledownload" && value[1] == 1) disabledownload = 1;
                else if (value[0] == "disableprint" && value[1] == 1) disableprint = 1;
            else if (value[0] == "disabletext" && value[1] == 1) disabletext = 1;
            else if (value[0] == "disabledoc" && value[1] ==
                1) disabledoc = 1
        }
        var extracss = "";
        if (disabledownload) extracss += " .download {display:none!important;}";
        if (disableprint) extracss += " .print {display:none!important;}";
        if (disabletext) extracss += " .textLayer {-webkit-touch-callout: none !important; -webkit-user-select: none !important; -khtml-user-select: none !important; -moz-user-select: none !important; -ms-user-select: none !important; user-select: none !important;} .selectTool { display: none !important;}";
        if (disabledoc) extracss += " #documentProperties {display:none !important;}";
      	extracss+= '.openFile {display:none!important;}';
        if (extracss) {
            var style = document.createElement("style");
            style.type = "text/css";
            style.innerHTML = extracss;
            document.getElementsByTagName("head")[0].appendChild(style)
        }
        $(document).bind("pagerendered", function(e) {
            if (disabledownload) $(".download").remove();
            if (disableprint) $(".print").remove();
            if (disabletext) {
                $(".selectTool").remove();
                $(".textLayer").remove();
                if (PDFViewerApplication) PDFViewerApplication.pdfCursorTools.switchTool(1)
            }
            if (disabledoc) {
                $(".documentProperties").prev(".horizontalToolbarSeparator").remove();
                $(".documentProperties").remove()
            }
        })
    })
})(jQuery);