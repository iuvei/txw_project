$(function  () {
	//end
	
	var logoData;
	var lunboData = [];
	var promoData = [];
	var gonggaoData;
	if (getCookie('lunbo') == '') {
		//首页打开时的公告
		
		var a = "display";


        if (a == "display") {
            $('.mask').css({ 'display': 'block' });
            center($('.mess'));
            setTimeout(function () {
                $('.mask').css({ 'display': 'none' });
                closedPop($('.mess'));
            }, 60000);
            $(".closePopbtn").click(function () {
                closedPop($('.mess'));
            });
        } else {
            $('.mask').css({ 'display': 'none' });
            closedPop($('.mess'));
        }

        // 居中
        function center(obj) {
            var screenWidth = $(window).width(), screenHeight = $(window).height(); //当前浏览器窗口的 宽高
            var scrolltop = $(document).scrollTop(); //获取当前窗口距离页面顶部高度

            var objLeft = (screenWidth - obj.width()) / 2;
            var objTop = (screenHeight - obj.height()) / 2 + scrolltop;

            obj.css({ left: objLeft + 'px', top: objTop + 'px', 'display': 'block' });
            //浏览器窗口大小改变时
            $(window).resize(function () {
                screenWidth = $(window).width();
                screenHeight = $(window).height();
                scrolltop = $(document).scrollTop();

                objLeft = (screenWidth - obj.width()) / 2;
                objTop = (screenHeight - obj.height()) / 2 + scrolltop;
        if($(obj).is(":visible")){
                obj.css({ left: objLeft + 'px', top: objTop + 'px', 'display': 'block' });
        }

            });
            //浏览器有滚动条时的操作、
            $(window).scroll(function () {
                screenWidth = $(window).width();
                screenHeight = $(window).height();
                scrolltop = $(document).scrollTop();

                objLeft = (screenWidth - obj.width()) / 2;
                objTop = (screenHeight - obj.height()) / 2 + scrolltop;

                obj.css({ left: objLeft + 'px', top: objTop + 'px', 'display': 'block' });
            });

        }

        //关闭
        function closedPop(obj) {
            obj.remove();
            closed($('.mask'), $('.mess'));
        }

        // 隐藏 的操作
        function closed(obj1, obj2) {
            obj1.hide();
            obj2.hide();
        }
		
		
		

		
	$.ajax({
		type:"post",
		url:xpj_src+"webcom.do",
		data:{cagent:cagent},
		async:true,
		cache:false,
		success:function  (data) {
			var lunbo_code=-1;
			var promo_code=-1;
			var logo_code=-1;
			var gonggao_code=-1;
			var ad_code = -1;
			for (var i = 0; i < data.length; i++) {
				if (data[i][0].type == '1') {
					lunbo_code = i; 
				}else if (data[i][0].type == '4') {
					promo_code = i;
				}else if (data[i][0].type =='5') {
					gonggao_code = i;
				}else if(data[i][0].type =='3'){
					ad_code = i;
				}
			}
			//首页公告
			if(gonggao_code>-1){
				$('#gonggao_img').attr('src',data[gonggao_code][0].img1);
				var gonggaoData = data[gonggao_code][0].img1; 
				setCookie('gonggao',gonggaoData,1);  //设置公告cookie
			}
			//两侧广告
			// if (ad_code>-1) {
			// 	var adData = new Array();
				
			// 	if (data[ad_code].length == 1) {
			// 		$('#service_left img').attr('src',data[ad_code][0].img1);
			// 		adData.push(data[ad_code][0].img1);
			// 	}
			// 	if(data[ad_code].length == 2){
			// 		$('#service_left img').attr('src',data[ad_code][1].img1);
			// 		adData.push(data[ad_code][1].img1);
			// 	}
			// 	setCookie('ad',adData,1);
				
			// }else{
			// 	$('#service').css('display','none');
			// 	$('#service_left').css('display','none');
			// }
			//轮播
			if (lunbo_code>-1) {
				var swiper_li;
			$('#swiper_container').empty();
			for (var i = 0; i < data[lunbo_code].length; i++) {
				lunboData[i] = data[0][i].img1;
                swiper_li = '<li>'+
                                '<img src="'+ data[0][i].img1+'" width="100%" height="400" />'+
                            '</li>';

				$('#swiper_container').append(swiper_li);
			}
			setCookie('lunbo',lunboData,1); //设置lunbo cookie
			//       banner调用 函数
            jQuery(".fullSlide").slide({ mainCell:".bd ul",effect:"fold",autoPlay:true,autoPage:"<li><a></a></li>", delayTime:600,titCell:".hd",trigger:"click"});

			}
			
			//优惠活动
			if (promo_code>-1) {
				var promo_li; 
			$('#MemberExclusive_area').empty();
			for (var i = 0; i < data[promo_code].length; i++) {
				//将获取到的数据封装进对象
				eval('var prObj'+i+'= new Array()'); 
					eval('prObj'+i)[0] = data[promo_code][i].img1;
					eval('prObj'+i)[1] = data[promo_code][i].img2;
					eval('prObj'+i)[2] = data[promo_code][i].title;
					promoData.push(eval('prObj'+i));
                    promo_li = '<div class="MemberExclusive" data-type="'+ data[promo_code][i].img2 +'">'+
                                    '<div class="memExclusive">'+
                                    '<img src="'+data[promo_code][i].img1+'" />'+
                                    '</div>'+
                                    // '<div class="eventtext" style=" display: none">'+
                                    // '<img src="'+data[promo_code][i].img2+'" />'+
                                    // '</div>'+
                                '</div>';
					
				$('#MemberExclusive_area').append(promo_li);
			}
			
			//   优惠特效

                    $('.memExclusive').on('click',function(){
                    	var index = $(this).parents($('.MemberExclusive')).attr('data-type');
                    	var txwinow =  window.open('');
						txwinow.document.body.innerHTML = '';
						txwinow.document.write("<p>正在加载中，请稍后.....</p>");
						txwinow.location.href = "promotion_index.html?index="+ index;
                        // $(this).next('.eventtext').slideToggle();
                    });

			//将对象存入cookie
			setCookie('promo',promoData,1);  //设置公告cookie

			
			}
				}
		
			
			});
			}
			//有cookie数据的情况下
			else{
				var gongCookies = getCookie('gonggao');
				var lunboCookies = getCookie('lunbo');
				var promoCookies = getCookie('promo');
				var adCookies = getCookie('ad');
				if (gongCookies!='') {
					$('#gonggao_img').attr('src',gongCookies);
				}
				// if (adCookies!='') {
				// 	var adArr = adCookies.split(',');
				// 	if (adArr.length == 1) {
				// 		$('#service_left img').attr('src',adArr[0]);
				// 	}
				// 	if (adArr.length == 2) {
				// 		$('#service_left img').attr('src',adArr[1]);
				// 	}
				// }
				
				if (lunboCookies!='') {
					var swArr = lunboCookies.split(',');//将字符串转换为数组
					//轮播图
					var swiper_lis;
					$('#swiper_container').empty();
					for (var i = 0; i < swArr.length; i++) {
                        //swiper_lis = '<li style="background:url('+ swArr[i]+') center 0 no-repeat;">'+'</li>';
                        swiper_lis = '<li>'+
                                        '<img src="'+ swArr[i]+'" width="100%" height="400" />'+
                                     '</li>'
                            $('#swiper_container').append(swiper_lis);
                        //       banner调用 函数
                        jQuery(".fullSlide").slide({ mainCell:".bd ul",effect:"fold",autoPlay:true,autoPage:"<li><a></a></li>", delayTime:600,titCell:".hd",trigger:"click"});
					}

				}
				
				if (promoCookies!='') {
					// console.log(promoCookies);
				var promoAll  = promoCookies.split(',');
				var allP = [];
				var proLength = promoAll.length;
				for (var i = 0; i < proLength; i++) {
					var weight;
					if (i%3 == 0) {
						weight = i/3;
						eval('var proArr'+weight+'= new Array');
						
					}else{weight = Math.floor(i/3);}
					eval('proArr'+weight).push(promoAll[i]);
					if (i%3 == 0) {allP.push(eval('proArr'+weight))};
							
				}
				// console.log(allP);
				//优惠活动
				for (var i = 0; i < allP.length; i++) {
                    promo_lis ='<div class="MemberExclusive" data-type="'+allP[i][1]+'">'+
                                    '<div class="memExclusive">'+
                                    '<img src="'+allP[i][0]+'" />'+
                                    '</div>'+
                                    // '<div class="eventtext" style=" display: none">'+
                                    // '<img src="'+allP[i][1]+'" />'+
                                    // '</div>'+
                                '</div>';
							
						$('#MemberExclusive_area').append(promo_lis);
				}
                    //   优惠特效

                    $('.memExclusive').on('click',function(){
                    	var index = $(this).parents($('.MemberExclusive')).attr('data-type');
                    	var txwinow =  window.open('');
						txwinow.document.body.innerHTML = '';
						txwinow.document.write("<p>正在加载中，请稍后.....</p>");
						txwinow.location.href = "promotion_index.html?index="+ index;
                        // $(this).next('.eventtext').slideToggle();
                    });

				}
				
				
			

				
		}
			
			$.ajax({
				type:"post",
				url:xpj_src+"gonggao.do",
				data:{cagent:cagent},
				async:true,
				success:function  (data) {
					if (data.length>0) {
						$('#announcement_marquee').empty();
						for (var i = 0; i < data.length; i++) {
							var marquee_li = '<li>'+(i+1)+'.&nbsp;'+data[i].rmk +'</li>';
							$('#announcement_marquee').append(marquee_li);
						}
		
          			  $("#announcement_marquee").marquee({
				        yScroll: "bottom",
				        pauseOnHover: true,
				        direction: 'left',
				        delayBeforeStart: 0,
				        scrollSpeed: 30,
				        duration: 12500
    				});
    				
    				
	
          				
                       
					}
					
				}
			});


    /*左右浮窗滚动js*/
    $(function() {
        $(window).bind("scroll", function() {
            var n = 200 + $(window).scrollTop();
            $(".service").animate({
                top: n
            }, {
                duration: 600,
                queue: !1
            })
        });
        $("#scroll").click(function() {
            $("html,body").animate({
                scrollTop: 0
            }, 200)
        })
    })



})
