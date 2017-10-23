/*mg*/
	var MG = 'MG';
 	var real = 'real';
function load_game_link_mg(id,gameType,model) {
	if (getCookie('login_judge')=='') {
			layer.alert('请先登录账户', {shade:0.3,icon: 0,offset: '300px'});
			return;
		}
	
	var txwinow =  window.open('',id);
	txwinow.document.body.innerHTML = '';
	txwinow.document.write("<p>正在加载中，请稍后.....</p>");
		$.ajax({
			type:"get",
			url:xpj_src+"checklogin.do",
			async:true,
			cache:false,
			success:function  (data) {
				if (data.msg == 'success') {
					$.ajax({
						type:"POST",
						url:xpj_src+"User/forwardGame",
						async:true,
						data:{gameID:id,gameType:gameType,model:model},
						success:function  (g_data) {
							if(g_data.msg == 'error'){layer.alert('网络繁忙，请稍后再试', {icon: 0,offset: '300px'}); txwinow.close(); return;} 
							if (g_data.type == 'link') {
							txwinow.location.href = g_data.msg;
						};
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
					alert('账号在别地登录！');
					changeImg();
				}
			}
		});
	}
   
   /*haba*/
   var HABA= 'HABA';
 	var real = 'real';
function load_game_link_hb(id,gameType,model) {
		if (getCookie('login_judge')=='') {
			layer.alert('请先登录账户', {shade:0.3,icon: 0,offset: '300px'});
			return;
		}
		var txwinow =  window.open('',id)
		txwinow.document.body.innerHTML = '';
		txwinow.document.write("<p>正在加载中，请稍后.....</p>");
		$.ajax({
			type:"get",
			url:xpj_src+"checklogin.do",
			async:true,
			cache:false,
			success:function  (data) {
				if (data.msg == 'success') {
						$.ajax({
						type:"POST",
						url:xpj_src+"User/forwardGame",
						async:true,
						data:{gameID:id,gameType:gameType,model:model},
						success:function  (g_data) {
							if(g_data.msg == 'error'){layer.alert('网络繁忙，请稍后再试', {icon: 0,offset: '300px'});txwinow.close(); return;} 
							if (g_data.type == 'link') {
							txwinow.location.href = g_data.msg;
						};
						},
						error:function  () {
							txwinow.close();
							layer.alert('网络繁忙，请稍后再试', {icon: 0,offset: '300px'});
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
			}
		});
	}
  
   /*pt*/
  
  var language_code = 'ZH-CN';

function load_game_link_pt(id) {
	if (getCookie('login_judge')=='') {
			layer.alert('请先登录账户', {shade:0.3,icon: 0,offset: '300px'});
			return;
		}
	var txwinow =  window.open('',id)
	txwinow.document.body.innerHTML = '';
	txwinow.document.write("<p>正在加载中，请稍后.....</p>");
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
                  async:false,
                  data:{gameType:"PT",gameID:id,model:""},
                  success:function  (g_data) {
                  	if(g_data.msg == 'error'){layer.alert('网络繁忙，请稍后再试', {icon: 0,offset: '300px'});txwinow.close(); return;} 
                     if (g_data.type == 'link') {
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
					alert('账号在别地登录！');
					changeImg();
				}
			}
		});
	}
	function try_game_link (id) {
					window.open( 'http://cache.download.banner.happypenguin88.com/casinoclient.html?language=ZH-CN&game='+id+'&mode=offline&affiliates=1¤cy=CNY');

	}
  