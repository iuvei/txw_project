/**
 * Created by PC11 on 2017/6/10.
 */

/* 左边导航js*/
$(document).ready(function(){
    $('#indexMain_left3').hover(function(){
        $('#indexMain_left3_son').show();
        $('.indexMain_left3').css({
            'border-top':'1px solid #bf1810',
            'border-bottom':'1px solid #bf1810'
        });
        $('.indexMain_left3_ico').css({
            'right':'-1px'
        });
        $('.indexMain_left3_ico i').css('color','#fff');

    },function(){
        $('#indexMain_left3_son').hide();
        $('.indexMain_left3').css({
            'border-top':'1px dashed #d8d8d8',
            'border-bottom':'1px dashed #d8d8d8'
        });

        $('.indexMain_left3_ico').css({
            'right':'0px'
        });
        $('.indexMain_left3_ico i').css('color','#cacaca');

    })

//       banner调用 函数
    jQuery(".slideBox").slide({ mainCell:".bd ul",effect:"fold",autoPlay:true,autoPage:"<li><a></a></li>", delayTime:600,titCell:".hd",trigger:"click"});


//        网站公告tab
    $('#naw_tab_ul li').click(function(){
        $('#naw_tab_ul li').eq($(this).index()).addClass("cur2").siblings().removeClass('cur2');
        $('.new_conternlist').hide().eq($(this).index()).show();
    })
//最新中奖
    $("#winning_marquee").marquee({
        yScroll: "bottom",
        pauseOnHover: true,
        direction: 'up',
        delayBeforeStart: 0,
        duration: 12500

    });

});
