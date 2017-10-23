/**
 * Created by PC6 on 2017/9/15.
 */
var cashPay  = avalon.define({
    $id:'CardPay',
    forms:{
        amount:'',       //存款金额
        bankAccount:'',   //银行账号
        depositorName:'',   //存款人姓名
        depositTime:'',   //存款时间
        typeSelected:'1',    //存款方式
        isHandsel:'0'       //是否彩金
    },
    initCashPay:function(){
        //初始化存款时间
        this.forms.depositTime = vm.timeFormat(new Date());
    },
    //提交验证
    Verification:function(){
        var amount = this.forms.amount;
        var amounts = $('#bankAccount').val();
        var bankAccount = this.forms.bankAccount;
        var depositorName = this.forms.depositorName;
        var depositTime = this.forms.depositTime;

        var bankReg = /^(\d{14,19})$/;
        var usernameReg = /^[\u4e00-\u9fa5]{2,4}$/;
        if (!usernameReg.test(depositorName)) {
            vm.messageAlert('存款人姓名请输入2-4位汉字', false);
            return false;
        }
        if (!bankReg.test(bankAccount)) {
            vm.messageAlert('请输入正确的银行卡号', false);
            return false;
        }
        if (isNaN(amount) || amount=='' ) {
            vm.messageAlert('请输入正确的金额格式', false);
            return false;
        }
        if (depositTime == '') {
            vm.messageAlert('请输入正确的银行卡号', false);
            return false;
        }

        return true;
    },
    //支付提交
    cashPay:function(){
    	//loading层
		var load = layer.load(1, {
		  shade: [0.3,'#000000'],
		  time: 5000
		});
        //检查登录状态
        vm.checkLogin();
        var config  = {
            name:cashPay.forms.depositorName,
            account:cashPay.forms.bankAccount,
            amount:cashPay.forms.amount,
            ctime:cashPay.forms.depositTime,
            type:cashPay.forms.typeSelected,
            caijin:cashPay.forms.isHandsel
        }
        $.post(xpj_src+"bk/BankPay.do",config,function(data){
			layer.close(load);
            if(data.status == 'success') {
                vm.messageAlert('提交成功，如有疑问请联系客服', true);
                //清空数值
                cashPay.forms.depositorName = '';
                cashPay.forms.bankAccount = '';
                cashPay.forms.amount = '';
            }
            //else {
            //    vm.messageAlert('汇款失败,请稍后再试');
            //}
        })

    },
    //提交事件
    cashSubmit:function(){
        this.Verification()&&this.cashPay();
    }


})

$(function(){
    cashPay.initCashPay();
})