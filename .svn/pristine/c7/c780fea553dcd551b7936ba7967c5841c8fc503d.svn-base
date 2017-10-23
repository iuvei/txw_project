
var domin = document.domain; 
var login_bol;
var _userName;
var _userBalance;
	

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
	//设置cookie
	function setCookie (name,value,days) {
		var exday = new Date();
		 exday.setDate(exday.getDate()+days);
		document.cookie = name+'='+escape(value)+((days == null)? "" : ";expires="+ exday.toGMTString())+ "domin="+domin+";path=/";
	}
	
	//删除cookies
	function delCookie(name){
	    var exp = new Date();
	    exp.setTime(exp.getTime() - 1);
	    var cval=getCookie(name);
	    if(cval!=null)
	    document.cookie= name + "="+cval+";expires="+exp.toGMTString()+"domin="+domin+";path=/";
	}
	//浮窗
//	function getFloat() {
//			 $('#service_left_span').on('click',function(){
//			 	$('#service_left').hide();
//			 });
//			 $('#service_right_span').on('click',function(){ 
//           $('#service').hide(); 
//            
//        });
//			 
//		}
	
	
	//推广链接识别
		function geturl () {
			var url = document.location.toString();
			if (url.indexOf('?')!=-1) {
			var number1 = url.indexOf('?');
			var url2 = url.slice(number1);
				if (url2.indexOf('p')!=-1) {
				var mumber2 = url2.indexOf('p');
				var urlstring = url2.slice(mumber2+2);
				return urlstring;
				
				}else{
					
					return '';
				}
			}else{
				return '';
			}
		}
$(function  () {
		if (geturl()!=''){
			setCookie('agentCode',geturl(),1);
		}
		//获取信息
		$.ajax({
			type:"post",
			url:xpj_src + "User/getUserInfo",
			async:false,
			cache:false,
			success:function  (usercenter) {
				_userName = usercenter.username;//用户名
                _userBalance = usercenter.wallet;//账户余额
			}
		});
		//检查登录状态
		$.ajax({
			type:"get",
			url:xpj_src+"checklogin.do",
			async:true,
			cache:false,
			contentType: 'text/plain',
			success:function  (data) {
				var str = data.msg;
				if (str == 'success') {
//					login_bol = true;
					setCookie('login_judge','true',1);
					$('#login_after').show();
					$('#login').hide();
					$('#login_user_name').html(_userName.slice(3));
					$('#login_user_money').html(_userBalance);
				}
				else if(str == 'faild'){
					delCookie('login_judge');
					$('#login_after').hide();
					$('#login').show();
				}
				else if(str == 'outlogin'){
					delCookie('login_judge');
					$('#login_after').hide();
					$('#login').show();
					alert('账号在别地登录！');
				}
			}
		});
		
		$.ajax({
			type:"post",
			url:xpj_src+"User/getMessageNum",
			async:true,
			cache:false,
			success:function  (data) {
				var islist = data.noread;
				$('#message_count').text(islist);
			}
		})

	})
