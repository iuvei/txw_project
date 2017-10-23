//页面效果
function show_sub_bar($nav) {
	var $sub_div = $('#' + $nav.attr("id") + '_hide_bar');
	var $icon = $nav.find('div');

	$sub_div.removeClass('hide');
	$sub_div.animate({
		height: $sub_div.attr('attr-height')
	}, 500, function() {});
	//$nav.addClass("active");
	$icon.attr("attr-value", "top");
	$icon.attr("class", "icon-top");
}

function hide_sub_bar($nav) {
	var $sub_div = $('#' + $nav.attr("id") + '_hide_bar');
	var $icon = $nav.find('div');

	$sub_div.animate({
		height: 0
	}, 500, function() {
		$sub_div.addClass("hide");
	});
	$nav.removeClass("active");
	$icon.attr("attr-value", "down");
	$icon.attr("class", "icon-down");
}
//添加模板页面
function puli(url, el) {
	$.ajax({
		url: url,
		async: false,
		cache: false,
		success: function(data) {
			$(el).html(data);
		}
	})
}

//获取cookie
function getCookie(cookie_name) {
	if (document.cookie.length>0) {
		c_start = document.cookie.indexOf(cookie_name+'=');
		if (c_start!=-1) {
			c_start = c_start +cookie_name.length+1;
			c_end = document.cookie.indexOf(';',c_start);
			if (c_end == -1 ) c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		};
	};
	return '';
}

//检测是否添加过银行卡，未登录跳转添加银行卡
function isbankcard() {
    //获取银行卡信息
    $.post(xpj_src + "User/getUserCard", function (bankdata) {
        if (bankdata.length == 0) {
            window.location.href = "/UserCenter/withdraw/bank_add.html";
        } else {
            window.location.href = "/UserCenter/withdraw/withdraw.html";
        }

    })
}




// 支付后弹窗

function payAfter(){
	$('.dialog_bg').show();
	$('.dialog_box').show();
}

function payClose(){
	$('.dialog_bg').hide();
	$('.dialog_box').hide();
}

//视图
var vm = avalon.define({
	$id: "index",
	$userkey:'',//存放userkey
	alert_msg:false,
	//vm_payafter:false,
	img_bol:true,
	imgError:
		{'src':'http://192.168.0.140:81/TXWN/user_img/error_img.png'}
	,
	imgRight:{
		'src':'http://192.168.0.140:81/TXWN/user_img/smile.png'
	},
	UserInfo: {
		wallet:''
	}, //用户信息
	loginOut:function  () {
		$.post( xpj_src+'logout.do',function  () {
			window.location.href = '/index.html';
		})
	},
	checkLogin:function  () {
		$.post(xpj_src+'checklogin.do',function  (data) {
			if (data.msg != 'success') {
				alert('登录状态失效,请重新登录');
				window.location.href = '/index.html';
				return false;
			}else{
				//存放userkey
				vm.$userkey = data.userkey;
			}
		})
	},
	getUserInfo:function  () {
		vm.UserInfo.wallet = '加载中..'; 
		$.post(xpj_src + "User/getUserInfo", function(data) {
            //默认无号码
            if(data.mobile == "00000000000"){data.mobile ="暂无"}
		vm.UserInfo = data;
		/*会员等级*/
		var vipLevel = data.vip_level;
		var arr = new Array('一星', '二星', '三星', '四星', '五星');
		var arr2 = new Array('21px', '42px', '63px', '84px', '105px');
		// $('.vipLevel').text(arr[vipLevel - 1]);
		$('.vipLevel_img').css('width', arr2[vipLevel - 1]);
	})
	},
	//格式化数字
	numFormat:function  (num) {
		if (isNaN(num)) {
			return num;
		}else{
			return parseFloat(num).toFixed(2);
		}
	},
	//验证码显示
	VerificationCode:function  (id) {
		$(id).attr("src",xpj_src+"validateCode?timesp"+(new Date()).valueOf());
	},
	//普通警告框，msg：信息  bol：返回正确或错误信息
	messageAlert:function  (msg,bol) {
		vm.alert_msg = msg;
		vm.img_bol = bol;
	},
	closeAlert:function  () {
		vm.alert_msg = false;
	},
	//格式化时间
	timeFormat:function(time){
		var date = new Date(time);
		Y = date.getFullYear() + '-';
		M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		D = date.getDate() + ' ';
		h = (date.getHours()<10? '0'+ date.getHours():date.getHours())+ ':';
		m = (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()) + ':';
		s = (date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds());
		var fommat_time = Y + M + D + h + m + s;
		return fommat_time;
	},
	//获取当前时间及之前的时间
	GetDateStr:function(AddDayCount) {
		var dd = new Date();
		dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
		var y = dd.getFullYear();
		var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0
		var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
		return y + "-" + m + "-" + d;
	}
	
})

$(document).ready(function() {
	var judge_bol  = true;
	//防止重复点击
	$(".dpt-sd-lnk.has_sub").click(function() {
		if(!judge_bol){return}
		judge_bol = false;
		var $icon = $(this).find('div');
		if($icon.attr("attr-value") == "down") {
			show_sub_bar($(this));
			setTimeout(function(){
				judge_bol = true;
			},500)

		} else {
			hide_sub_bar($(this));
			setTimeout(function(){
				judge_bol = true;
			},500)
		}
	});
	//检测登录
	vm.checkLogin();
	//获取用户信息
	vm.getUserInfo();
});