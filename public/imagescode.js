
   // 页面弹窗登录
   function changeImg() {   
       var imgSrc = $("#Verification_img");
       imgSrc.attr("src", xpj_src+"validateCode?timesp"+(new Date()).valueOf());   
   }   
   //注册页面验证码刷新图片
   function changeImg_zc() {   
       var imgSrc_zc= $("#imgObj_zc");   
       var src_zc = imgSrc_zc.attr("src");   
       imgSrc_zc.attr("src", xpj_src+"validateCode?timesp"+(new Date()).valueOf());   
   }   
   
  
   
   $(function  () {
   		changeImg_zc();
	   	changeImg();
	   	 //获取焦点刷新验证码
		$('#Verification').focus(function(){     
			$('#Verification').val('');
	         changeImg();
	    });
	    //注册
	     $('#Verification-code_zc').focus(function(){     
   				$('#Verification-code_zc').val('');
          	 	changeImg_zc();
          	 });
	    $("#Verification_img").on('click',function  () {
	    	changeImg();
	    })
   })
  
   
 
