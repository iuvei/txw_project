//平台数据
var PlatData = [
	{name: 'IG彩票(新)',code: 'IGPJ',blance:'--',src:'/coloum/slot.html',disable:false},
	{name: 'IG彩票',code: 'IG',blance:'--',src:'/coloum/slot.html',disable:false},
	{name: 'VR彩票',code: 'VR',blance:'--',src:'/coloum/slot.html',disable:false},
//	{name: 'BG(视讯/彩票)',code: 'BG',blance:'--',src:'/coloum/slot.html'},
	{name: '卡卡湾88(视讯)',code: 'CG',blance:'--',src:'/coloum/live-casino.html',disable:false},
	{name: 'AG极速厅(视讯)',code: 'AG',blance:'--',src:'/coloum/live-casino.html',disable:true},
	{name: 'AG国际厅/捕鱼王',code: 'AGIN',blance:'--',src:'/coloum/live-casino.html',disable:true},
	{name: 'BBIN(视讯/电子)',code: 'BBIN',blance:'--',src:'/coloum/live-casino.html',disable:true},
	{name: 'DS(视讯)',code: 'DS',blance:'--',src:'/coloum/live-casino.html',disable:false},
	{name: '欧博(视讯)',code: 'OB',blance:'--',src:'/coloum/live-casino.html',disable:false},
	{name: 'OG(视讯)',code: 'OG',blance:'--',src:'/coloum/live-casino.html',disable:false},
	{name: '申博(视讯/电子)',code: 'SB',blance:'--',src:'/coloum/live-casino.html',disable:false},
	{name: 'MG(电子)',code: 'MG',blance:'--',src:'/coloum/lobby.html',disable:false},
	{name: 'HABA(电子)',code: 'HABA',blance:'--',src:'/coloum/lobby_haba.html',disable:false},
	{name: 'PT(电子)',code: 'PT',blance:'--',src:'/coloum/lobby_pt.html',disable:false},
	{name: 'HG(体育)',code: 'HG',blance:'--',src:'/coloum/sports.html',disable:false},
	{name: 'GG(捕鱼)',code: 'GGBY',blance:'--',src:'/coloum/fishing.html',disable:false}
]
//下拉列表数据
var PlatList = [
	{name: '中心娱乐城',code: '0',disable:false},
	{name: 'IG彩票(新)',code: 'IGPJ',disable:false},
	{name: 'IG彩票',code: 'IG',disable:false},
	{name: 'VR彩票',code: 'VR',disable:false},
//	{name: 'BG(视讯/彩票)',code: 'BG'},
	{name: '卡卡湾88(视讯)',code: 'CG',disable:false},
	{name: 'AG极速厅(视讯)',code: 'AG',disable:true},
	{name: 'AG国际厅/捕鱼王',code: 'AGIN',disable:true},
	{name: 'BBIN(视讯/电子)',code: 'BBIN',disable:true},
	{name: 'DS(视讯)',code: 'DS',disable:false},
	{name: '欧博(视讯)',code: 'OB',disable:false},
	{name: 'OG(视讯)',code: 'OG',disable:false},
	{name: '申博(视讯/电子)',code: 'SB',disable:false},
	{name: 'MG(电子)',code: 'MG',disable:false},
	{name: 'HABA(电子)',code: 'HABA',disable:false},
	{name: 'PT(电子)',code: 'PT',disable:true},
	{name: 'HG(体育)',code: 'HG',disable:false},
	{name: 'GG(捕鱼)',code: 'GGBY',disable:false}
]


var balance_vm =  avalon.define({
	$id: 'banlance',
	//平台数据
	balanceData: PlatData,
	//下拉列表数据
	PlatList:PlatList,
	$select:$('#selectedout')
	,
	$judge_bol:true,
	//下拉列表颜色
	active:{backgroundColor:'#f0f0f0'},

	//游戏平台余额数组
	blanceAll:[],

	// 钱包总金额
	wl_amount:'',

	//错误信息
	$errmsg:[
    '转账平台错误',
    '转账金额不正确',
    'token获取失败',
    '图形验证码错误',
    '转账未完成请稍后再试',
    '余额不足',
    '钱包查询出错',
	'系统错误,请稍后再试',
	'系统维护中，请稍后操作',
    '转账成功'
	],
	// 单平台刷新余额,
	refresh:function (index) {
		var _this = this;
		_this.balanceData[index].blance = '加载中..';
		var code = _this.balanceData[index].code;
		$.post(xpj_src+'User/getBalance',{BType: code},function  (data) {
			//游戏余额 放到数组中
			balance_vm.blanceAll[index]=data.balance;

			if (balance_vm.blanceAll[index] == '维护中') {
				$('.moneyIn').eq(index).attr("disabled","disabled");
				$('.moneyOut').eq(index).attr("disabled","disabled");
			};

			//用户中心余额为0时，转入按钮不可用,反之可用
			if (vm.UserInfo.wallet == 0) {
				$('.moneyIn').attr("disabled","disabled");
			}else{
				$('.moneyIn').attr("disabled",false);
			}


			_this.balanceData[index].blance = vm.numFormat(data.balance);

			if (_this.balanceData[index].blance ==  0 || _this.balanceData[index].blance == '维护中') {
				$('.moneyOut').eq(index).attr("disabled","disabled");
			}else{
				$('.moneyOut').eq(index).removeAttr("disabled","disabled");
			};

			/*演示站禁止转入游戏厅*/
			var banNumber = [4,5,6,13];
			for (var i =0;i<banNumber.length;i++ ){
				$('.moneyIn').eq(banNumber[i]).attr("disabled","disabled");
			}
			/*演示站禁止转入游戏厅*/
		})
	},
	// 刷新所有平台
	allrefresh:function(arr){

		for(var i=0;i<arr.length;i++){
			balance_vm.refresh(i);
		}

	},
	OutSelectEvent:function  () {
		//转出
		if ($('#selectedout').val() == 0) {
			
			$('#selectedin').get(0).selectedIndex = 1;
		}else{
			
			$('#selectedin').get(0).selectedIndex = 0;
		}
	},
	InSelectEvent:function  () {
		//转入
		if($('#selectedin').val() == 0){
			$('#selectedout').get(0).selectedIndex = 1;
		}else{
			$('#selectedout').get(0).selectedIndex = 0;
		}
	},
	//转入转出切换
	switchAccount:function  () {
		var s1 = $('#selectedout').val();
		var s2 = $('#selectedin').val();
		$('#selectedout').val(s2);
		$('#selectedin').val(s1);
	},
	//金额
	amountCheck:{
		amount:'',
		code:''
	},
	//提交验证
	validate:function  () {
		//四位数字验证
		var codeReg = /^[0-9]{4}$/;
		//平台转出
		var rollOut =  $('#selectedout').val();
		//平台转入
        var rollIn = $('#selectedin').val();
        
        if (rollOut == '') {
        	alert('请选择转出平台');
            return false;
        }
         if (rollIn == '') {
            alert('请选择转入平台');
            return false;
        }
        if (rollOut == rollIn ) {
         	alert('同平台不允许互转');
         	return false;
         }
        if (rollOut != "0" && rollIn != "0") {
            alert('游戏平台不允许互转');
            return false;
        }
        if(this.amountCheck.amount==''){
        	alert('请填写金额');
            return false;
        }
        if (parseFloat(this.amountCheck.amount) > 100000||parseFloat(this.amountCheck.amount)<1) {
            alert('输入金额范围不正确');
            return false;
        }
        if (!codeReg.test(this.amountCheck.code)) {
            alert('验证码不正确或为空');
            return false;
        }
        return true;
         
	},	
	//获取中心钱包
    getWallet: function(wl) {
        var wallet = $('#wallet');
        wallet.text('loading...');
        $.ajax({
            type: "POST",
            url: center_src + "User/getBalance",
            async: true,
            data: {
                BType: wl
            },
//          xhrFields:{withCredentials:true},
            success: function(data) {
                var wal = data.balance;
                vm.balance_vm.wl_amount = Number(wal);
                wallet.html(toDecimal(wal));
            }
        });
    },
	//转账
	tranferAccount:function  () {
		//loading层
		var load = layer.load(1, {
		  shade: [0.3,'#000000']
		});
		//检查登录状态
		vm.checkLogin();
		var rollOutVal =  $('#selectedout').val();
		var rollInVal = $('#selectedin').val();
		//获取转致平台的code
		var to = this.PlatList[parseInt(rollInVal)].code;
		var from = this.PlatList[parseInt(rollOutVal)].code;
		var isRollOut = rollOutVal == '0'? true:false;


		//先用userkey获取转账uuid
		$.post(xpj_src+'User/getToken',{userKey: vm.$userkey},function  (data) {	
			var tokenUuid = data.msg;
			//自平台转出
			if (isRollOut) {
				//转出数据（转账到游戏）
				var rollOutData = {
					credit:balance_vm.amountCheck.amount,
					type: to,
					uuid:tokenUuid,
					imgcode:balance_vm.amountCheck.code
				}
				$.ajax({
					type:"post",
					url:xpj_src+"User/TransferTo",
					data:rollOutData,	
					cache:false,
					success:function  (data) {
						layer.close(load);
						//二维码生成
						vm.VerificationCode('#imgObj_zz');
						if (data.msg == 'success') {
							layer.alert('转账成功');
							//更新中心钱余额及平台余额
							balance_vm.refresh(parseInt(rollInVal)-1);
							vm.getUserInfo();
							//清空表单数据
							balance_vm.amountCheck.amount = '';
							balance_vm.amountCheck.code = '';
						}else{
							layer.close(load);
							//错误处理
							balance_vm.errorHandling(data);
						}
					},
					error:function  () {
						layer.close(load);
						layer.alert('网络错误！');
						vm.VerificationCode('#imgObj_zz');
					}
				});
			}else {
				//转入数据（转账到平台）	
				var rollInData = {
					credit:balance_vm.amountCheck.amount,
					type: from,
					uuid:tokenUuid,
					imgcode:balance_vm.amountCheck.code
				}
				$.ajax({
					type:"post",
					url:xpj_src+"User/TransferFrom",
					data:rollInData,
					cache:false,
					success:function  (data) {
						layer.close(load);
						//验证码生成
						vm.VerificationCode('#imgObj_zz');

						if (data.msg == 'success') {
							layer.alert('转账成功');
							//更新中心钱余额及平台余额
							balance_vm.refresh(parseInt(rollOutVal)-1);
							vm.getUserInfo();
							//清空表单数据
							balance_vm.amountCheck.amount = '';
							balance_vm.amountCheck.code = '';
						}else{
							//错误处理
							balance_vm.errorHandling(data);
						}
					},
					error:function  () {
						layer.close(load);
						layer.alert('网络错误！');
						vm.VerificationCode('#imgObj_zz');
					}
				});
			}
	})

	},
	//错误处理
	errorHandling:function  (data) {
		if (data.msg == 'error') {
			layer.alert(this.$errmsg[7]);
		}else if (data.msg == 'process') {
			layer.alert(this.$errmsg[8]);
		}else {
			var arrKey = parseInt(data.msg)-1;
			layer.alert(this.$errmsg[arrKey]);
		}
	},
	//转账提交
	doSubmit:function(){
		this.validate()&&this.tranferAccount();
	},
	//游戏一键转出到平台
	allIn:function (obj) {
		//检查登录状态
		vm.checkLogin();
		var index_all = obj;
		var credit = balance_vm.blanceAll[index_all];
		//if (credit>100000 || credit<1) {
		//	layer.alert('单笔转账金额范围是1~100,000元之间');
		//	return false;
		//};
		//如果金额大于10000，金额为10000
		if (parseFloat(credit)>10000){
			credit = 10000;
		}
		var type = balance_vm.balanceData[index_all].code;
		//询问框
		layer.confirm('您确定转出到中心娱乐城吗？', {
		  	btn: ['确定','取消'], 
			skin: 'alert_box', 
			closeBtn: 1, 
			anim: 5,
			shadeClose: true
		}, function(index, layero){
		  layer.closeAll();
		  layer.load(1, {
			  shade: [0.3,'#000000']
		  });
		  $.post(xpj_src+'User/getToken',{userKey: vm.$userkey},function  (data) {
				  var tokenUuid = data.msg;
				  $.ajax({
					type:"post",
					url:xpj_src+"XUser/TransferFromOnekey",
					data:{credit:credit,type:type,uuid:tokenUuid},
					cache:false,
					success:function  (data) {
						if (data.msg == 'success') {
							layer.alert('转账成功!');
							//更新中心钱余额及平台余额,并延迟一秒调用余额接口
							setTimeout(function(){
								balance_vm.refresh(index_all);
								layer.closeAll();
							},1000)
							vm.getUserInfo();
						}else{
							//错误处理
							layer.closeAll();
							balance_vm.errorHandling(data);
						}
					},
					error:function  () {
						layer.closeAll();
						layer.alert('网络错误！');
					}
				});
		  }) 
		}, function(){
		  layer.closeAll();
		});
	},
	//平台一键转入到游戏
	allOut:function (obj) {
		//检查登录状态
		vm.checkLogin();
		var index_all = obj;
		var credit = '';
		$.post(xpj_src + "User/getUserInfo", function(data) {
			credit = data.wallet;
		});
		//if (parseFloat(credit)>100000 || parseFloat(credit)<1) {
		//	layer.alert('单笔转账金额范围是1~100,000元之间');
		//	return false;
		//};

		var type = balance_vm.balanceData[index_all].code;
		var name = balance_vm.balanceData[index_all].name;
		//询问框
		layer.confirm('您确定转入到'+ name +'吗？', {
		  	btn: ['确定','取消'], 
			skin: 'alert_box', 
			closeBtn: 1, 
			anim: 5,
			shadeClose: true
		}, function(index, layero){
		  layer.closeAll();
		  layer.load(1, {
			  shade: [0.3,'#000000']
		  });
		  $.post(xpj_src+'User/getToken',{userKey: vm.$userkey},function  (data) {
				  var tokenUuid = data.msg;
				  //如果金额大于10000，10000
				  if (parseFloat(credit)>10000){
					  credit = 10000;
				  }
				  $.ajax({
					type:"post",
					url:xpj_src+"XUser/TransferToOnekey",
					data:{credit:credit,type:type,uuid:tokenUuid},
					cache:false,
					success:function  (data) {
						if (data.msg == 'success') {
							layer.alert('转账成功!');
							//更新中心钱余额及平台余额,并延迟一秒调用余额接口
							setTimeout(function(){
								balance_vm.refresh(index_all);
								layer.closeAll();
							},1000)
							vm.getUserInfo();
						}else{
							layer.closeAll();
							//错误处理
							balance_vm.errorHandling(data);
						}
					},
					error:function  () {
						layer.closeAll();
						layer.alert('网络错误！');
					}
				});
		  }) 
		}, function(){
		  layer.closeAll();
		});
	},
	//游戏跳转
	gameJump:function(index){
		//点击的游戏代码
		var code = PlatData[index].code;
		//直接跳转的页面
		var url = PlatData[index].src;
		//视讯游戏跳转
		if (code == "SB"||code == "BBIN"){

			layer.confirm('请选择进入视讯或游戏', {
				btn: ['视讯','游戏'] //按钮
			}, function(index){
				loadgame(code,1);
				layer.close(index);
			}, function(index){
				loadgame(code,2);
				layer.close(index);
			});

		}else if(code == "HG"){
			loadgame(code,"PC");

		}else if (code == "IGPJ" || code == "IG" ){

			loadgame(code+'LOTTERY','2','PC');

		}else if(code == "VR"){

			loadgame(code,1);

		}else if(code == "MG" || code =="HABA" || code == "PT"){
			window.open(url);
		}else{
			loadgame(code);
		}
	}



})

$(function  () {
	//下拉初始化
	balance_vm.OutSelectEvent();
	
	//二维码生成
	vm.VerificationCode('#imgObj_zz');

	//获焦时切换二维码
	$('#Verification-code_zzs').on('focus',function(){
		vm.VerificationCode('#imgObj_zz');
	})

	
	//进入页面自动刷新各平台余额
	balance_vm.allrefresh(PlatData);


})



