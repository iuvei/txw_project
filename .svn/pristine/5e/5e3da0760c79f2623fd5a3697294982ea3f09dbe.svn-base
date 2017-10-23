var wxpay = avalon.define({
    $id: 'WxPay',
    $TRAN_TYPE: '3',//支付类型
    wxPayList: '',
    wxPayConfig: {
        isSelected: 0,
        amount: '',
        PayId: '',
        maxQuota: '',
        minQuota: ''
    },
    //初始化支付通道
    getPayList: function () {
        $.post(xpj_src + 'PlatformPay/getPaymentList', {type: this.$TRAN_TYPE}, function (data) {
            if (data.status == 'success') {
                wxpay.wxPayList = data.typeList;
                //初始化支付通道id,金额范围
                wxpay.wxPayConfig.PayId = data.typeList[0].id;
                wxpay.wxPayConfig.maxQuota = data.typeList[0].maxquota;
                wxpay.wxPayConfig.minQuota = data.typeList[0].minquota;
            }
            //else {
            //    vm.messageAlert('网络繁忙，请稍后再试', false);
            //}
        })
    },
    //支付通道选项卡
    switchRouter: function (routeIndex) {
        this.wxPayConfig.isSelected = routeIndex;

        //切换支付通道id,金额范围
        wxpay.wxPayConfig.PayId = wxpay.wxPayList[routeIndex].id;
        wxpay.wxPayConfig.maxQuota = wxpay.wxPayList[routeIndex].maxquota;
        wxpay.wxPayConfig.minQuota = wxpay.wxPayList[routeIndex].minquota;

        //清空输入框数值
        wxpay.wxPayConfig.amount = '';
    },
    //支付验证
    Verification: function () {
        var amount = parseFloat(this.wxPayConfig.amount);
        var maxQuota = parseFloat(this.wxPayConfig.maxQuota);
        var minQuota = parseFloat(this.wxPayConfig.minQuota);
        if (!this.wxPayList) {
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
    //支付处理
    payHandle: function () {
    	//loading层
		var load = layer.load(1, {
		  shade: [0.3,'#000000'],
		  time: 5000
		});
        //检测是否登录
        vm.checkLogin();
        var amount = this.wxPayConfig.amount;
        var id = this.wxPayConfig.PayId;

        var wxwindow = window.open('', 'wxwindow');
        var img = '<body style="background:#fff;">' +
            '<p style="text-align: center;margin-top: 100px;font-weight: bold;">' +
            '正在生成二维码,请勿重复点击.....' + '</p>' +
            '<div style="position: absolute;width: 276px;left: 50%;margin-left: -138px;margin-top: 200px;text-align:center;">' +
                /*---------注意----------改版时注意更改链接*/
            '<img src="http://192.168.0.140:81/TXWN/images/game_loading.gif"/>' + '</div>' +
                /*---------注意----------*/
            '<div style="visibility: hidden;" id="forms"></div>' +
            '</body>';
        wxwindow.document.write(img);

        $.ajax({
            type: "post",
            url: xpj_src + "PlatformPay/scanPay",
            async: true,
            cache: false,
            data: {acounmt: amount, scancode: 'wx', payId: id},
            success: function (data) {
				layer.close(load);
                if (data.status == 'success') {
                    var type = data.res_type;
                    switch (type) {
                        case '1':
                            //表单提交
                            $(wxwindow.document.getElementById('forms')).append(data.html.replace('body', 'div'));
                            wxwindow.document.getElementById('actform').submit();
                            payAfter();// 点击支付后弹窗
                            break;
                        case '2':
                            //二维码生成
                            var url = data.qrcode, OddNumber = data.order_no, userName = data.user_name, amount = data.acount;//获取返回信息
                            //code=2标记二维码生成
                            var winHref = 'JumpPage/Wx.html?url=' + url + '&OddNum=' + OddNumber + '&amounts=' + amount + '&userName=' + userName + '&code=2';
                            wxwindow.location.href = winHref;
                            payAfter();// 点击支付后弹窗
                            break;
                        case '3':
                            //跳转二维码链接
                            var url = data.qrcode_url, OddNumber = data.order_no, userName = data.user_name, amount = data.acount;//获取返回信息
                            //code=3 时标记生成图片并赋予链接
                            var winHref = 'JumpPage/Wx.html?url=' + url + '&OddNum=' + OddNumber + '&amounts=' + amount + '&userName=' + userName + '&code=3';
                            wxwindow.location.href = winHref;
                            payAfter();// 点击支付后弹窗
                            break;
                        case '4':
                            //直接跳转地址
                            wxwindow.location.href = data.html;
                            payAfter();// 点击支付后弹窗
                            break;
                    }
                    //清空输入框数值
                    wxpay.wxPayConfig.amount = '';
                } else {
					layer.close(load);
                    wxwindow.close();
                    vm.messageAlert('网络繁忙,请稍后再试', false);
                }
            },
            error: function () {
				layer.close(load);
                wxwindow.close();
                vm.messageAlert('网络错误！', false);
            }
        });


    },
    //支付检验提交
    submitWx: function () {
        this.Verification() && this.payHandle();
    }

})

$(function () {
    //初始化支付通道
    wxpay.getPayList();
})
