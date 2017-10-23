/**
 * Created by PC6 on 2017/9/20.
 */
var addCard = avalon.define({
    $id:'addCard',
    config:{
        bankName:'', //银行卡val
        name:'',      //个人姓名
        bankNumber:'',//银行卡号
        bankAddress:'',//银行地址
        withDrawPwd:''//
    },
    //输入验证
    Verification:function(){
        var bankNameReg = /^(\d{14,19})$/;
        var pwdReg = /^[0-9]{4,6}$/;
        var userNameReg = /^[\u4e00-\u9fa5]{2,4}$/;
        if ($.trim(this.config.bankName) == '' || $.trim(this.config.bankName) == 0){
            vm.messageAlert('请选择银行卡！',false);
            return false;
        }else if(!userNameReg.test($.trim(this.config.name))){
            vm.messageAlert('开户人为2-4位中文！',false);
            return false;
        }else if(!bankNameReg.test($.trim(this.config.bankNumber))){
            vm.messageAlert('银行卡格式不正确！',false);
            return false;
        }else if($.trim(this.config.bankAddress) == ''){
            vm.messageAlert('请输入开户行地址！',false);
            return false;
        }else if(!pwdReg.test($.trim(this.config.withDrawPwd))){
            vm.messageAlert('请输入4或6为提款密码！',false);
            return false;
        }else {
            return true;
        }

    },
    //添加银行卡
    addCard:function(){
        var _this = this;
        if (this.Verification()){
            console.log(_this.config);
            $.ajax({
                type:"post",
                url:xpj_src + "User/addUserCard",
                data:{
                    cardUserName: $.trim(_this.config.name),
                    bankCode: $.trim(_this.config.bankName),
                    cardNum: $.trim(_this.config.bankNumber),
                    cardAddress: $.trim(_this.config.bankAddress),
                    password: $.trim(_this.config.withDrawPwd)
                },
                success:function(data){
                    var cardMsg = data.msg;
                    if (cardMsg == 'success'){
                        alert('银行卡添加成功！');
                        window.location.href = "/UserCenter/withdraw/withdraw.html";
                    }else{
                        vm.messageAlert(cardMsg,false);
                    }
                }
            })
        }

    }
})