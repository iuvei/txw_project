var b = false;
var $reguuidValue;

// 站内信接口
		
		function getlistnum () {
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
		}
		
		//获取url参数
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
		
	function User_login(tname,tpwd,savelogin,imgcode) { //用户登录
		var laylogin = layer.load(0,{
				shade:0.4
			});
		$.ajax({
			type: "post",
			url: xpj_src+"login.do",
			dataType: "json",
			async: false,
			data: {
				tname:cagent+tname,
				tpwd: tpwd,
				savelogin: savelogin,
				imgcode:imgcode
			},
			success: function(tdata) {
				layer.close(laylogin);
				var str = tdata.status;
				if(str == 'ok') {
				setCookie('login_judge','true',1);
					var balance = tdata.balance;
					var userName = tdata.userName;
					$('.login_after').show();
					$('.login').hide();
					$('#login_user_name').html(userName.slice(3));
					$('#login_user_money').html(balance);
					getlistnum ();//站内信接口
					 
				} else if(str == 'faild'){
					changeImg();
					$('.xploading_bg').hide();
					$('.xploading').hide();
					layer.alert(tdata.errmsg,{icon: 0});
				}

			},
			error:function  () {
				changeImg();
				layer.close(laylogin);
				layer.alert('网络繁忙，请稍后再试',{icon: 5});
			}
		});
	}


		//点击生成用户名
function randomName() {
	//四位随机数 
	var numnerArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
	var letArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'g', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	var beforeNames = '';
	var afterNumbers = '';
	for(var i = 0; i < 4; i++) {
		//1-9随机数 
		var ranCode = Math.ceil(Math.random() * 8);
		//0-25随机数 
		var randomTwentySix = Math.floor(Math.random() * 26);
		beforeNames += letArr[randomTwentySix];
		afterNumbers += numnerArr[ranCode];
	}
	return beforeNames + afterNumbers;
}

$(function() {
  	//点击生成用户名
	$('#regi-btn').on('click', function() {
		$('#userid').val(randomName());
		checkUseName($('#userid'));
	})
	
	var checkUseName = function(obj) {
		var username = $.trim(obj.val());
		if(!/^[A-Za-z](?![a-zA-Z]+$)[0-9A-Za-z]{4,9}$/.test(username)) {
			obj.siblings("h4").show().html('<i class="ico ico-error"></i>以字母开头，5-10位字母，数字组成');
			obj.siblings("h4").css('font-weight','bolder');
			obj.siblings("strong").hide();
			b = false;
		} else {
			obj.siblings("h4").hide();
			obj.siblings("strong").show();			
			b = true;
		}
	};
	
	
	$('#userid').on('focus',function  () { 
       $(this).siblings("strong").hide(); 
       $(this).siblings("h4").show().html('<i class="ico ico-notic"></i>以字母开头，5-10位字母，数字组成'); 
       $(this).siblings("h4").css('font-weight','lighter');
   })
	$('#password1').on('focus',function  () { 
       $(this).siblings("strong").hide(); 
       $(this).siblings("h4").show().html('<i class="ico ico-notic"></i>6-12位字母或数字组成'); 
       $(this).siblings("h4").css('font-weight','lighter');
   })
	// $('#confirmpassword1').on('focus',function  () { 
 //       $(this).siblings("strong").hide(); 
 //       $(this).siblings("h4").show().html('<i class="ico ico-notic"></i>6-12位字母或数字组成'); 
 //       $(this).siblings("h4").css('font-weight','lighter');
 //   })
	// $('#realname').on('focus',function  () { 
 //       $(this).siblings("strong").hide(); 
 //       $(this).siblings("h4").show().html('<i class="ico ico-notic"></i>请输入您的真实姓名'); 
 //       $(this).siblings("h4").css('font-weight','lighter');
 //   })
	// $('#tel').on('focus',function  () { 
 //       $(this).siblings("strong").hide(); 
 //       $(this).siblings("h4").show().html('<i class="ico ico-notic"></i>请输入真实的手机号码'); 
 //       $(this).siblings("h4").css('font-weight','lighter');
 //   })
	$('#Verification-code_zc').on('focus',function  () { 
       $(this).siblings("strong").hide(); 
       $(this).siblings("h4").show().html('<i class="ico ico-notic"></i>请输入验证码'); 
       $(this).siblings("h4").css('font-weight','lighter');
   })
	
	
	
	$("#userid").blur(function() {
		checkUseName($(this));
	});
	
	 // var checkrealname = function(obj) {
	 //     var checkrealname = $.trim(obj.val());
	 //     var reg1 = /^[\u4e00-\u9fa5]{2,4}$/;
	 //     if (!reg1.test(checkrealname)) {
	 //         obj.siblings("h4").show().html('<i class="ico ico-error"></i>必须为2-4位中文');
	 //         obj.siblings("h4").css('font-weight','bolder');
		// 	 obj.siblings("strong").hide();
	 //         b = false;
	 //     } else {
	 //         obj.siblings("h4").hide();
  //            obj.siblings("strong").show();
	 //         b = true;
	 //     }
	 // };
	 // $("#realname").blur(function() {
	 //     checkrealname($(this));
	 // });
	// var checktel = function(obj) {
	// 	var checktel = $.trim(obj.val());
	// 	var reg2 = /^1[3,4,5,7,8]\d{9}$/;
	// 	if(!reg2.test(checktel)) {
	// 		obj.siblings("h4").show().html('<i class="ico ico-error"></i>请输入真实的手机号码');
	// 		obj.siblings("h4").css('font-weight','bolder');
	// 		obj.siblings("strong").hide();
	// 		b = false;
	// 	} else {
	// 		obj.siblings("h4").hide();
 //            obj.siblings("strong").show();
	// 		b = true;
	// 	}
	// };
	// $("#tel").blur(function() {
	// 	checktel($(this));
	// });
	var checkPassword = function(obj) {
		var pwd = $.trim(obj.val());
		if(!/^[0-9a-zA-Z]{6,12}$/.test(pwd)) {
			
			obj.siblings("h4").show().html('<i class="ico ico-error"></i>6-12位字母或数字组成');
			obj.siblings("h4").css('font-weight','bolder');
			obj.siblings("strong").hide();
			b = false;
		} else {
			obj.siblings("h4").hide();
            obj.siblings("strong").show();
			b = true;
		}
	};
	$("#password1").blur(function() {
		checkPassword($(this));
	});

	
	// var checkConfirmPassword = function(obj) {
	// 		var confirmPwd = $.trim(obj.val());
	// 		if($.trim($("#password1").val()) != '') {
	// 			if($("#password1").val() != confirmPwd) {
	// 				obj.siblings("h4").show().html('<i class="ico ico-error"></i>两次不一样');
	// 				obj.siblings("h4").css('font-weight','bolder');
 //                    obj.siblings("strong").hide();
	// 				b = false;
	// 			} else {
	// 				obj.siblings("h4").hide();
 //                    obj.siblings("strong").show();
	// 				b = true;
	// 			}
	// 		}
	// 	};
	// 	$("#confirmpassword1").blur(function() {
	// 	checkConfirmPassword($(this));
	// });

	  var checkCode;

	  $("#Verification-code_zc").blur(function () {
	      checkCode($(this));
	  });
	  checkCode = function (obj) {
	  	  var  codetest = /^[0-9]{4}$/;
	      var checkCode = $.trim(obj.val());
	      if (!codetest.test(checkCode)) {
//	      if (checkCode == '' || checkCode == undefined ) {
				obj.siblings("h4").show().html('<i class="ico ico-error"></i>请输入验证码');
				obj.siblings("h4").css('font-weight','bolder');
               	obj.siblings("strong").hide();
	          	b = false;
	      } else {
	          obj.siblings("h4").hide();
              obj.siblings("strong").show();
	          b = true;
	      }
	  }; 
	
	

		
			
		

	//    注册事件
	$("#btnSubmit").click(function() {
		
		
			$.ajax({
				type:"get",
				url:xpj_src+"User/getToken",
				async:true,
				success:function  (token_data) {
					$reguuidValue = token_data.msg;
					// var selectArr = $('.tgSelect');
					// var tpwd = '';
					// for (var i = 0; i < selectArr.length; i++) {
					// 		if (selectArr[i].value == "-") {
					// 				alert('请选择取款密码！');
					// 				return;
					// 		}
					// 		tpwd = tpwd.concat(selectArr[i].value) ;
					// }

		
		var $userName = $("#userid");
		var $password = $("#password1");
		// var $rePassword = $("#confirmpassword1");
		var $rePassword = $("#password1");
		
		var $imgCode = $('#Verification-code_zc');
		
		var qkpwd = '0000';
		var reqkpwd = '0000';
		checkUseName($userName);
		if(!b) return;
		// checkrealname($realName);
		// if (!b) return;
		// checktel($phone);
		// if(!b) return;
		checkPassword($password);
		if(!b) return;
		// checkConfirmPassword($rePassword);
		// if(!b) return;
		checkCode($imgCode);
		if (!b) return;
		if($("#agree:checked").length == 0) {
			$("#b_agree").show().find("span").html("如果您同意我们的条件和条款，且年满18岁，请勾选");
			b = false;
		}
		if(b) {
			var layload = layer.load(1,{
				shade:0.3
			});
			var userNameValue = $userName.val();
			var phoneValue = '00000000000';
			var passwordValue = $password.val();
			var rePasswordValue = $rePassword.val();
			var imgcode = $imgCode.val();
			var realName = '会员';

		register ();
		function register() {
			var _data;
			var data1 ={
				userName: userNameValue,
				reguuid :$reguuidValue,
				passWord: passwordValue,
				mobileNo: phoneValue,
				repassWord: rePasswordValue,
				imgcode:imgcode,
				realName:realName,
				qkpwd:qkpwd,
				reqkpwd:reqkpwd,
				cagent:cagent
			}
			var data2 = {
				userName: userNameValue,
				reguuid :$reguuidValue,
				passWord: passwordValue,
				mobileNo: phoneValue,
				repassWord: rePasswordValue,
				imgcode:imgcode,
				realName:realName,
				qkpwd:qkpwd,
				reqkpwd:reqkpwd,
				cagent:cagent,
				proxyname: getCookie('agentCode')
			}
			getCookie('agentCode') == ''?_data = data1:_data = data2;
			$.ajax({
				type: "POST",
				url: xpj_src+"User/register",
				dataType: "json",
				data: _data,
				success: function(data) {
					layer.close(layload);
					changeImg_zc();
					var str = data.msg;
					switch(str) {

						case '001':
						$('.xploading_bg').hide();
						$('.xploading').hide();
							alert('用户名不能为空');
							break;
						case  '002':
						$('.xploading_bg').hide();
						$('.xploading').hide();
							alert('用户名格式不正确');
							break;
						case '003':
							$('.xploading_bg').hide();
							$('.xploading').hide();
							alert('手机号不能为空');
							break;
						case '004':
							$('.xploading_bg').hide();
							$('.xploading').hide();
							alert('手机号不正确');
							break;
						case '005':
							$('.xploading_bg').hide();
							$('.xploading').hide();
							alert('密码不能为空');
							break;
						case '006':
							$('.xploading_bg').hide();
							$('.xploading').hide();
							alert('确认密码不能为空');
							break;
						case '007':
							$('.xploading_bg').hide();
							$('.xploading').hide();
							alert('两次密码不一致');
							break;
						case '008':
							$('.xploading_bg').hide();
							$('.xploading').hide();
							alert('密码格式不正确');
							break;
						case '009':
							$('.xploading_bg').hide();
							$('.xploading').hide();
							alert('账号已存在');
							break;
						case '010':
							$('.xploading_bg').hide();
							$('.xploading').hide();
							alert('调用错误');
							break;
						case '011':
							$('.xploading_bg').hide();
							$('.xploading').hide();
							alert('验证码不能为空');
							break;
						case '012':
							$('.xploading_bg').hide();
							$('.xploading').hide();
							alert('验证码错误');
							break;
						case 'success':
							setCookie('login_judge','true',1);
							$('.xploading_bg').hide();
							$('.xploading').hide();
//							alert('恭喜您，注册成功');
							layer.alert('恭喜您，注册成功', {icon: 1,yes:function  () {
								window.location.href ="/index.html";
							},cancel:function  () {
								window.location.href ="/index.html";
							}});
//							var tname = userNameValue;
//							var tpwd = passwordValue;
								
							break;
						case 'error':
							alert('网络异常');
							$('.xploading_bg').hide();
							$('.xploading').hide();
							break;
					}
				},
				error: function(xhr, textStatus, errorThrown) {
					layer.close(layload);
					changeImg_zc();
					alert('网络错误');
					
				}
			});
		}

		}
		},
				error:function  () {
					alert('网络繁忙 ，请稍后再试');
				}
			});
	});
	
    //点击登录
	$('#login_btn_login').on('click', function() {
		var tname = $('#login_username').val();
		var tpwd = $('#login_password').val();
		var imgcode = $('#Verification').val();
		var  savelogin = 1;
		if (tpwd == ''||tname == '') {
			alert('请输入用户名和密码');
		}else if(imgcode == ''){

			alert('请输入验证码');
		}else{
			User_login(tname,tpwd,savelogin,imgcode);
		}

	});
	$('#Login').on('click',function  () {
		var tname = $('#accountid').val();
		var tpwd = $('#accpassword').val();
		var imgcode = $('#accCodes').val();
		var  savelogin = 1;
		if (tpwd == ''||tname == '') {
			alert('请输入用户名和密码');
		}else{
			User_login(tname,tpwd,savelogin,imgcode);
		}
	});
	//回车点击登录
	var top_btn = document.getElementById('login_btn_login');
	var login = document.getElementById('Login');
	document.onkeydown = function  (e) {
		var e = e || event;
		if (e.keyCode == 13 && getCookie('login_judge') == '') {
			//注册弹窗弹出时禁止
			if (document.getElementById('register-pup').style.display == 'none') {
				top_btn.click();
			}else{
				return false;
			}
	}
};
	//注销
	$('#login_out').on('click', function() {
		
		$.ajax({
			type: "get",
			url: xpj_src+"logout.do",
			async: true,
			success: function() {
//				changeImg_zc();
				changeImg();
//				changeImg_zcn();
			delCookie('login_judge');
			$('.login_after').hide();
			$('.login').show();
			}
		});
		


	});

});
