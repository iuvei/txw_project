var alipay = avalon.define({
    $id: 'AliPay',   //视图控制范围
    $TRAN_TYPE: '2', //支付类型
    payList: '',
    /*支付数据存放*/
    payConfig: {
        isSelected: 0, //点击后添加类
        PayId: '',     //支付商id
        maxQuota: '',
        minQuota: '',
        amount: ''
    },
    /*获取支付商列表，初始化列表金额*/
    getPayList: function () {
        $.post(xpj_src + 'PlatformPay/getPaymentList', {type: this.$TRAN_TYPE}, function (data) {
            if (data.status == 'success') {
                alipay.payList = data.typeList;
                //初始化支付通道id,金额范围
                alipay.payConfig.PayId = data.typeList[0].id;
                alipay.payConfig.maxQuota = data.typeList[0].maxquota;
                alipay.payConfig.minQuota = data.typeList[0].minquota;
            }
            //else {
            //    vm.messageAlert('网络繁忙，请稍后再试', false);
            //}
        })
    },
    /*支付通道切换*/
    switchPayList: function (routeIndex) {
        //切换css选择类
        this.payConfig.isSelected = routeIndex;

        //存放支付id，同步限额数据
        alipay.payConfig.PayId = this.payList[routeIndex].id;
        alipay.payConfig.maxQuota = this.payList[routeIndex].maxquota;
        alipay.payConfig.minQuota = this.payList[routeIndex].minquota;

        //清空支付数据
        alipay.payConfig.amount = '';
    },
    /*输入验证*/
    Verification: function () {
        var amount = parseFloat(this.payConfig.amount);
        var maxQuota = parseFloat(this.payConfig.maxQuota);
        var minQuota = parseFloat(this.payConfig.minQuota);
        if (!this.payList) {
            vm.messageAlert('无可用支付通道', false);
            return false;
        }
        if (isNaN(amount)) {
            vm.messageAlert('请输入正确的金额格式', false);
            return false;
        }
        if (amount == 0 || amount > maxQuota || amount < minQuota) {
            vm.messageAlert('单笔充值金额最少' + minQuota + '元最多' + maxQuota + '元', false);
            return false;
        }
        return true;
    },
    payHandle: function () {
    	//loading层
		var load = layer.load(1, {
		  shade: [0.3,'#000000'],
		  time: 5000
		});
        //检测是否登录
        vm.checkLogin();
        var amount = this.payConfig.amount;
        var id = this.payConfig.PayId;

        //打开窗口插入loading
        var aliwindow = window.open('', 'wxwindow');
        var img = '<body style="background:#fff;">' +
            '<p style="text-align: center;margin-top: 100px;font-weight: bold;">' +
            '正在生成二维码,请勿重复点击.....' + '</p>' +
            '<div style="position: absolute;width: 276px;left: 50%;margin-left: -138px;margin-top: 200px;text-align:center;">' +
                /*---------注意----------改版时注意更改链接*/
            '<img src="http://192.168.0.140:81/TXWN/images/game_loading.gif"/>' + '</div>' +
                /*---------注意----------*/
            '<div style="visibility: hidden;" id="forms"></div>' +
            '</body>';
        aliwindow.document.write(img);

        $.ajax({
            type: "post",
            url: xpj_src + "PlatformPay/scanPay",
            async: true,
            cache: false,
            data: {acounmt: amount, scancode: 'ali', payId: id},
            success: function (data) {
				layer.close(load);
                if (data.status == 'success') {
                    var type = data.res_type;
                    switch (type) {
                        case '1':
                            //表单提交
                            $(aliwindow.document.getElementById('forms')).append(data.html.replace('body', 'div'));
                            aliwindow.document.getElementById('actform').submit();
                            payAfter();// 点击支付后弹窗
                            break;
                        case '2':
                            //二维码生成
                            var url = data.qrcode, OddNumber = data.order_no, userName = data.user_name, amount = data.acount;//获取返回信息
                            //code=2标记二维码生成
                            var winHref = 'JumpPage/ali.html?url=' + url + '&OddNum=' + OddNumber + '&amounts=' + amount + '&userName=' + userName + '&code=2';
                            aliwindow.location.href = winHref;
                            payAfter();// 点击支付后弹窗
                            break;
                        case '3':
                            //跳转二维码链接
                            var url = data.qrcode_url, OddNumber = data.order_no, userName = data.user_name, amount = data.acount;//获取返回信息
                            //code=3 时标记生成图片并赋予链接
                            var winHref = 'JumpPage/ali.html?url=' + url + '&OddNum=' + OddNumber + '&amounts=' + amount + '&userName=' + userName + '&code=3';
                            aliwindow.location.href = winHref;
                            payAfter();// 点击支付后弹窗
                            break;
                        case '4':
                            //直接跳转地址
                            aliwindow.location.href = data.html;
                            vm.payAfter();// 点击支付后弹窗
                            break;
                    }
                    //清空输入框数值
                    alipay.payConfig.amount = '';
                } else {
					layer.close(load);
                    aliwindow.close();
                    vm.messageAlert('网络繁忙,请稍后再试', false);
                }
            },
            error: function () {
				layer.close(load);
                aliwindow.close();
                vm.messageAlert('网络错误！', false);
            }
        });

    },
    /*检测提交是否登录*/
    submitAli: function () {
        this.Verification() && this.payHandle();
    }

})

$(function () {
    alipay.getPayList();
})