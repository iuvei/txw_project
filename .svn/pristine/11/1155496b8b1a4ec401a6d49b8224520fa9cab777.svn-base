var oldselect = 4;
var PhoneoldSelect = 1;

var AppIndex = 1;
var IosIndex = 6;
var H5Index = 11;

var SpanAindex = 1;
var SpanBindex = 1;
var moving = false;

function selectDownload(num) {
    $('#do_' + oldselect).removeClass('active');
    $('#bglive' + oldselect).hide();
    $('#do_' + num).addClass('active');
    $('#bglive' + num).show();

    oldselect = num;
}

function Phoneselect(num) {
    $('#mntab' + PhoneoldSelect).removeClass('active').addClass('last');
    $('#phoneBox' + PhoneoldSelect).hide();
    $('#mntab' + num).removeClass('last').addClass('active');
    $('#phoneBox' + num).show();

    // $('#browserTabs' + PhoneoldSelect).hide();
    $('[id^="browserTabs"]').hide();
    $('#browserTabs' + num).show();

    PhoneoldSelect = num;
}

function browserSelect(num) {
    $('div.btn.active').removeClass('active');
    $('div.btn' + num).addClass('active');
    var tabObj = $('.phoneBox-right').find('.content');
    $.each(tabObj, function(i) {
        if (i + 1 == num) {
            $(this).css('display', 'block');
        } else {
            $(this).css('display', 'none');
        }
    });
}

function NextBtn(str, min, max) {
    if (moving) return;

    moving = true;
    var controlNum = 0;
    var Min = min;
    var Max = max;
    var spanObj = $(".indicatorWarpA span");
    if (str == "APP") {
        controlNum = AppIndex;
        spanObj = $(".indicatorWarpA span");
    } else if (str == "H5"){
        controlNum = H5Index;
        spanObj = $(".indicatorWarpC span");
    } else {
        controlNum = IosIndex;
        spanObj = $(".indicatorWarpB span");
    }
    $('#sslider' + controlNum).hide("drop", {
        direction: "right"
    }, 500);
    controlNum += 1;
    if (controlNum > Max) {
        controlNum = Min;
    }

    $('#sslider' + controlNum).delay(500).show("drop", {
        direction: "left"
    }, 800, function() {
        moving = false;
    });

    spanObj.each(function() {
        $(this).removeClass("cycle-pager-active");
    });

    $('#span_' + controlNum).addClass('cycle-pager-active');

    if (str == "APP") {
        AppIndex = controlNum;
    } else if (str == "H5") {
        H5Index = controlNum;
    } else {
        IosIndex = controlNum;
    }
}

function spanList(num, str) {
    if (moving) return;

    moving = true;
    var controlNum = 0;
    var spanObj = $(".indicatorWarpA span");
    if (str == "APP") {
        controlNum = AppIndex;
        spanObj = $(".indicatorWarpA span");
    } else if (str == "H5"){
        controlNum = H5Index;
        spanObj = $(".indicatorWarpC span");
    } else {
        controlNum = IosIndex;
        spanObj = $(".indicatorWarpB span");
    }
    spanObj.each(function() {
        $(this).removeClass("cycle-pager-active");
    });

    $('#span_' + num).addClass('cycle-pager-active');

    $('#sslider' + controlNum).hide("drop", {
        direction: "right"
    }, 500);
    $('#sslider' + num).delay(500).show("drop", {
        direction: "left"
    }, 800, function() {
        moving = false;
    });
    controlNum = num;
    if (str == "APP") {
        AppIndex = controlNum;
    } else if (str == "H5"){
        H5Index = controlNum;
    } else {
        IosIndex = controlNum;
    }
}
