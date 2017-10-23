var CardPay = avalon.define({
	$id:'CardPay',
	$TRAN_TYPE:'1', //支付类型
	PaymentList:'', //通道列表
	BankList:'',  //银行列表
	CradConfig:{
		RangeValues:'',
		PayId:'',
		BankCode:'',
		BankSelected:'',
		PayListSelected:0,
		Amount:'',
		OrderNumber:3
	},
	getPaymentList:function  () {
		$.post(xpj_src+'PlatformPay/getPaymentList',{type:this.$TRAN_TYPE},function  (data) {
			if (data.status == 'success') {
				CardPay.PaymentList = data.typeList;
				CardPay.GeneList(0);
			}
			//else{
			//	vm.messageAlert('网络繁忙，请稍后再试',false);
			//}
		})
		//无银行列表时改变序号
		this.CradConfig.OrderNumber = this.PaymentList?3:2;
	},
	//生成银行列表绑定视图
	GeneList:function  (index) {
		var PayName = CardPay.PaymentList[index].paymentName;
		//清空银行列表
		this.BankList = '';
		//初始化金额
		this.CradConfig.Amount = '';
		//支付商编码为DC时传递固定参数B2C ,支付商为 JFK 编码为固定值:1003
		if (PayName=='JFK') {
			this.CradConfig.BankCode ='1003'; 
		}else if (PayName=='DC') {
			this.CradConfig.BankCode ='B2C'; 
		}else{
			//赋值给当前的用户列表
			this.BankList = BankData[PayName];
			//初始化银行selected
			this.CradConfig.BankSelected = CardPay.BankList[0].bankcode;
			//初始化存放bankid
			this.CradConfig.BankCode = CardPay.BankList[0].bankcode;
		}
		
		//银行列表为空时改变序号
		this.CradConfig.OrderNumber = this.BankList?3:2;
		//初始化支付通道选项
		this.CradConfig.PayListSelected = index;
		//金额大小值
		this.CradConfig.RangeValues = CardPay.PaymentList[index];
		//存放支付id
		this.CradConfig.PayId = CardPay.PaymentList[index].id;

	},
	//获取银行code 
	GetBankCode:function  (BankIndex,Selected) {
		//判断被点击的
		this.CradConfig.BankSelected = Selected;
		this.CradConfig.BankCode = this.BankList[BankIndex].bankcode;
	},
	//验证
	Verification:function  () {
		var amount = parseFloat(this.CradConfig.Amount);
		var max = parseFloat(this.CradConfig.RangeValues.maxquota);
		var min = parseFloat(this.CradConfig.RangeValues.minquota);
		if (!this.PaymentList) {
			vm.messageAlert('无可用通道',false);
			return false;
		}
		
		if (amount> max|| amount<min) {
			vm.messageAlert('单笔充值金额最少'+min+'元，最多'+max+'元',false);
			return false;
		}
		if (this.CradConfig.Amount=='') {
			vm.messageAlert('请填写金额',false);
			return false;
		}
		if (isNaN(amount)) {
			vm.messageAlert('金额输入格式不正确',false);
			return false;
		}
		return true;
	},
	//提交充值
	PaySubmit:function  () {
		vm.checkLogin();
		if (this.Verification()) {
		var bankcode = this.CradConfig.BankCode;
		var amount =  this.CradConfig.Amount;
		var id = this.CradConfig.PayId;
		var url = xpj_src+"PlatformPay/onlineBanking?bankcode="+bankcode+"&acounmt="+amount+"&payId=" + id;
		window.open(url,'banks'+Math.random());
		}
	}
})

$(function  () {
	//初始化列表
	CardPay.getPaymentList();
	
})
