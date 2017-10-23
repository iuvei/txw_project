	
	function loadgame(gameType,gameID,model) {
		if (getCookie('login_judge')=='') {
			layer.alert('请先登录账户', {shade:0.3,icon: 0,offset: '300px'});
			return;
		}
		var txwinow =  window.open('',gameType+gameID);
		 	img = 	'<div  style="width:200px;height:32px;position: absolute;top: 200px; left:50%;margin-left: -100px; text-align: center;">'+
					'<img  src="http://192.168.0.140:81/TXWN/images/game_loading.gif"/></div>'+
					'<p style="font-size: 12px;text-align: center;margin-top: 280px;width: 200px;position: absolute;left: 50%;margin-left: -100px;">正在加载..</p>';
		txwinow.document.body.innerHTML='';
		txwinow.document.write(img);
		$.ajax({
			type:"get",
			url:xpj_src+"checklogin.do",
			async:true,
			cache:false,
			success:function  (data) {
				if (data.msg == 'success') {
					$.ajax({
							type:"get",
							url:xpj_src+"User/forwardGame",
							async:true,
							data:{gameType:gameType,gameID:gameID},
							success:function  (g_data) {
								if (g_data.msg=='error') {
									layer.alert('系统错误', {icon: 0,offset: '300px'});
									txwinow.close();
								}else if(g_data.msg=='process'){
									layer.alert('系统维护中', {icon: 0,offset: '300px'});
									txwinow.close();
								}else{
									txwinow.location.href = g_data.msg;
								}
								
							},
							error:function  () {
								layer.alert('网络繁忙，请稍后再试', {icon: 0,offset: '300px'});
								txwinow.close();
							}
					});
				}else if(data.msg == 'faild'){
					txwinow.close();
					delCookie('login_judge');
					$('.login_after').hide();
					$('.login').show();
					changeImg();
				}else if(data.msg == 'outlogin'){
					txwinow.close();
					delCookie('login_judge');
					$('.login_after').hide();
					$('.login').show();
					changeImg();
					alert('账号在别地登录！');
				}
			},
			error:function  () {
				layer.alert('网络繁忙，请稍后再试', {icon: 0,offset: '300px'});
			}
		});
		
		
	}

//BG试玩
	function try_loadgame (gameID,model) {
		var txwinow =  window.open('',model+gameID);
		var img = '<div  style="position: absolute;width: 276px;left: 50%;margin-left: -138px;margin-top: 200px; text-align: center;">'+
					'<img src="http://192.168.0.140:81/TTC/images/5-121204193R0.gif"/>'+
					'<p style="text-align: center;margin-top: 100px;font-weight: bold;">'+'正在加载..'+'</p>'+
					'</div>';

		txwinow.document.body.innerHTML='';
		txwinow.document.write(img);
		$.ajax({
			type:"post",
			url:xpj_src+"bg/bgTrialGame",
			async:true,
			data:{gameID:gameID,agent:cagent,model:model},
			success:function  (g_data) {
				if (g_data.msg=='error') {
						layer.alert('系统错误', {icon: 0});
						txwinow.close();
						}else if(g_data.msg=='process'){
							layer.alert('系统维护中', {icon: 0});
							txwinow.close();
						}else{
							txwinow.location.href = g_data.msg;
							}

							},
					error:function  () {
						layer.alert('网络繁忙，请稍后再试', {icon: 0});
						txwinow.close();
							}
					});
	}
			//IG试玩
	function try_lottery (gameID) {
		var number = Math.ceil(Math.random()*100000);
		var randomCode= 'TX'+number.toString();
		if (getCookie('accountCode')=='') {
			aaccountCode = randomCode;
			setCookie('accountCode',randomCode,1);
		}else{
			aaccountCode = getCookie('accountCode');
		}
		var txwinow =  window.open('',number+gameID);
		var img = '<div  style="position: absolute;width: 276px;left: 50%;margin-left: -138px;margin-top: 200px; text-align: center;">'+
					'<img src="http://192.168.0.140:81/TTC/images/5-121204193R0.gif"/>'+
					'<p style="text-align: center;margin-top: 100px;font-weight: bold;">'+'正在加载..'+'</p>'+
					'</div>';

		txwinow.document.body.innerHTML='';
		txwinow.document.write(img);
		$.ajax({
			type:"post",
			url:xpj_src+"DemoPlay/IG",
			async:true,
			data:{gameType:'IGLOTTERY',gameID:gameID,model:'PC',cagent:cagent,accountCode:aaccountCode},
			success:function  (g_data) {
				if (g_data.msg=='error') {
						layer.alert('系统错误', {icon: 0});
						txwinow.close();
						}else if(g_data.msg=='process'){
							layer.alert('系统维护中', {icon: 0});
							txwinow.close();
						}else{
							txwinow.location.href = g_data.msg;
							}

							},
					error:function  () {
						layer.alert('网络繁忙，请稍后再试', {icon: 0});
						txwinow.close();
							}
					});
	}

//BG视讯试玩
	function try_loadgame_sx () {
		var data = {
			gameType:'BG',
			gameID:1,
			agent:cagent,
			model:'fun'
		}
		var txwinow =  window.open('',data.model+data.gameID);
		var img = '<div  style="position: absolute;width: 276px;left: 50%;margin-left: -138px;margin-top: 200px; text-align: center;">'+
					'<img src="http://192.168.0.140:81/TTC/images/5-121204193R0.gif"/>'+
					'<p style="text-align: center;margin-top: 100px;font-weight: bold;">'+'正在加载..'+'</p>'+
					'</div>';

		txwinow.document.body.innerHTML='';
		txwinow.document.write(img);
		
		$.ajax({
			type:"post",
			url:xpj_src+"bg/bgTrialGame",
			async:true,
			data:data,
			success:function  (g_data) {
				if (g_data.msg=='error') {
						layer.alert('系统错误', {icon: 0});
						txwinow.close();
						}else if(g_data.msg=='process'){
							layer.alert('系统维护中', {icon: 0});
							txwinow.close();
						}else{
							txwinow.location.href = g_data.msg;
							}

							},
					error:function  () {
						layer.alert('网络繁忙，请稍后再试', {icon: 0});
						txwinow.close();
							}
					});
	}