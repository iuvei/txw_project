/**
 * Created by PC6 on 2017/9/19.
 */
var withDraw = avalon.define({
    $id: 'withDraw',
    config: {
        userCard: '',//用户信息
        making: '',   //打码量
        isReached: '', //是否完成打码量
        amount: '',   //转账金额
        drawingPwd: '' //提款密码
    },
    win: {
        isDelShow: false, //是否显示删除弹窗
        rePwd: '' //确认密码
    },
    //获取银行卡信息并初始化
    getUserCard: function () {
        //获取银行卡信息
        $.post(xpj_src + "User/getUserCard", function (bankdata) {
            if (bankdata.length != 0) {
                withDraw.config.userCard = bankdata;
                //withDraw.config.userCard = bankdata;
            } else {
                //无数据的情况下清空列表
                withDraw.config.userCard = '';
            }

        })
        //获取打码量配置
        $.post(xpj_src + "User/selectWithdrawConfig", function (markdata) {
            withDraw.config.making = markdata;
            //user_quantity 完成打码量 ，marking_quantity 要求打码量
            //withDraw.config.isReached = markdata.user_quantity >= markdata.marking_quantity? true : false;
        })
    },
    //删除弹窗显示
    delShow: function () {
        this.win.isDelShow = true;
    },
    //删除弹窗消失
    delHide: function () {
        this.win.isDelShow = false;
    },
    //银行卡删除
    deleteCard: function () {
        var bankId = this.config.userCard[0].id;
        var pwd = this.win.rePwd.trim();
        //验证输入密码格式
        if (/^[0-9]{4,6}$/.test(pwd)) {
            $.ajax({
                type: 'post',
                url: xpj_src + 'User/delUserCard',
                data: {
                    cardId: bankId,
                    password: pwd
                },
                success: function (data) {
                    if (data.msg == 'success') {
                        withDraw.win.isDelShow = false; //隐藏弹窗
                        vm.messageAlert('银行卡删除成功！', true);
                        //重新获取银行卡列表
                        withDraw.getUserCard();
                    } else {
                        //错误信息
                        layer.alert(data.msg);
                    }
                },
                error: function () {
                    layer.alert('网络繁忙，请稍后再试！');
                }
            })
        } else {
            layer.alert('请输入4或6位提款密码！');
        }
    },
    //提款验证
    withDrawCheck: function () {
        var amount = this.config.amount.trim(); //金额
        var pwd = this.config.drawingPwd.trim();//提款金额

        if (isNaN(amount) || amount =='') {
            vm.messageAlert('金额格式不正确！', false);
            return false;
        }else if (!/^[0-9]{4,6}$/.test(pwd)) {
            vm.messageAlert('请输入4或6位提款密码！', false);
            return false;
        } else {
            return true;
        }
    },
    //检测是否完成打码量
    checkMark: function () {
        $.post(xpj_src + "User/selectWithdrawConfig", function (markdata) {
            
            if (markdata.status == 'success') {
                //判断是否完成打码量,未完成时获取税率  且不超过取款次数
                if (markdata.user_quantity >= markdata.marking_quantity && Number(markdata.withdraw_fee) == 0 && Number(markdata.withdraw_manage_fee) == 0) {
                    withDraw.withDrawHandle();
                } 
                else if (markdata.user_quantity < markdata.marking_quantity && Number(markdata.withdraw_fee) == 0 && Number(markdata.withdraw_manage_fee) == 0) {
                    // var confirm = window.confirm('未完成打码量，提款将收取' + markdata.withdrawConfig + '%的费率,是否继续提款？');
                    // if (confirm) {
                    //     withDraw.withDrawHandle();
                    // }
                    layer.confirm('未完成打码量，提款将收取' + markdata.withdrawConfig + '%的费率,是否继续提款？', {
                        area: '285px',
                        btn: ['确定', '取消']
                    }, function() {
                        layer.closeAll();
                        withDraw.withDrawHandle();
                    }, function() {
                        layer.closeAll();
                    });

                } 
                else if (markdata.user_quantity < markdata.marking_quantity && Number(markdata.withdraw_fee) > 0 && Number(markdata.withdraw_manage_fee) == 0) {
                    // var confirm = window.confirm('未完成打码量且今日提款次数过多，提款将收取' + markdata.withdrawConfig + '%的费率和' + markdata.withdraw_fee + '%的手续费,是否继续提款？');
                    // if (confirm) {
                    //     withDraw.withDrawHandle();
                    // }
                    layer.confirm('未完成打码量且今日提款次数过多，提款将收取' + markdata.withdrawConfig + '%的费率和' + markdata.withdraw_fee + '%的手续费,是否继续提款？', {
                                area: '285px',
                                btn: ['确定', '取消']
                            }, function() {
                                layer.closeAll();
                                withDraw.withDrawHandle();
                            }, function() {
                                layer.closeAll();
                            });
                }
                else if (markdata.user_quantity < markdata.marking_quantity && Number(markdata.withdraw_fee) == 0 && Number(markdata.withdraw_manage_fee) > 0) {
                    // var confirm = window.confirm('未完成打码量且今日提款次数过多，提款将收取' + markdata.withdrawConfig + '%的费率和' + markdata.withdraw_manage_fee + '的行政费,是否继续提款？');
                    // if (confirm) {
                    //     withDraw.withDrawHandle();
                    // }
                    layer.confirm('未完成打码量且今日提款次数过多，提款将收取' + markdata.withdrawConfig + '%的费率和' + markdata.withdraw_manage_fee + '的行政费,是否继续提款？', {
                        area: '285px',
                        btn: ['确定', '取消']
                    }, function() {
                        layer.closeAll();
                        withDraw.withDrawHandle();
                    }, function() {
                        layer.closeAll();
                    });                    
                }
                else if (Number(markdata.withdraw_fee) > 0 && Number(markdata.withdraw_manage_fee) > 0 && markdata.user_quantity >= markdata.marking_quantity) {
                    // var confirm = window.confirm('今日提款次数过多，提款将收取' + markdata.withdraw_fee + '%的手续费和' + markdata.withdraw_manage_fee + '的行政费,是否继续提款？');
                    // if (confirm) {
                    //     withDraw.withDrawHandle();
                    // }
                    layer.confirm('今日提款次数过多，提款将收取' + markdata.withdraw_fee + '%的手续费和' + markdata.withdraw_manage_fee + '的行政费,是否继续提款？', {
                            area: '285px',
                            btn: ['确定', '取消']
                        }, function() {
                            layer.closeAll();
                            withDraw.withDrawHandle();
                        }, function() {
                            layer.closeAll();
                        });                                                 
                } 
                else if (Number(markdata.withdraw_fee) > 0 && Number(markdata.withdraw_manage_fee) == 0 && markdata.user_quantity >= markdata.marking_quantity) {
                    // var confirm = window.confirm('今日提款次数过多，提款将收取' + markdata.withdraw_fee + '%的手续费,是否继续提款？');
                    // if (confirm) {
                    //     withDraw.withDrawHandle();
                    // }
                            layer.confirm('今日提款次数过多，提款将收取' + markdata.withdraw_fee + '%的手续费,是否继续提款？', {
                                area: '285px',
                                btn: ['确定', '取消']
                            }, function() {
                                layer.closeAll();
                                withDraw.withDrawHandle();
                            }, function() {
                                layer.closeAll();
                            });                    
                } 
                else if (Number(markdata.withdraw_manage_fee) > 0 && Number(markdata.withdraw_fee) == 0 && markdata.user_quantity >= markdata.marking_quantity) {
                    // var confirm = window.confirm('今日提款次数过多，提款将收取' + markdata.withdraw_manage_fee + '的行政费,是否继续提款？');
                    // if (confirm) {
                    //     withDraw.withDrawHandle();
                    // }
                            layer.confirm('今日提款次数过多，提款将收取' + markdata.withdraw_manage_fee + '的行政费,是否继续提款？', {
                                area: '285px',
                                btn: ['确定', '取消']
                            }, function() {
                                layer.closeAll();
                                withDraw.withDrawHandle();
                            }, function() {
                                layer.closeAll();
                            });                    
                } 
                else if (Number(markdata.withdraw_fee) > 0 && Number(markdata.withdraw_manage_fee) > 0 && markdata.user_quantity < markdata.marking_quantity) {
                    // var confirm = window.confirm('未完成打码量，提款将收取' + markdata.withdrawConfig + '%的费率,且今日提款次数过多，提款将收取' + markdata.withdraw_fee + '%的手续费和' + markdata.withdraw_manage_fee + '的行政费,是否继续提款？');
                    // //询问是否接受收取费用
                    // if (confirm) {
                    //     withDraw.withDrawHandle();
                    // }
                            layer.confirm('未完成打码量，提款将收取' + markdata.withdrawConfig + '%的费率,且今日提款次数过多，提款将收取' + markdata.withdraw_fee + '%的手续费和' + markdata.withdraw_manage_fee + '的行政费,是否继续提款？', {
                                area: '285px',
                                btn: ['确定', '取消']
                            }, function() {
                                layer.closeAll();
                                withDraw.withDrawHandle();
                            }, function() {
                                layer.closeAll();
                            });                    
                }
            } else {
                vm.messageAlert('网络繁忙请稍后再试',false);
            }            




        })
    },
    //提款处理
    withDrawHandle: function () {
        //loading层
        var load = layer.load(1, {
            shade: [0.3,'#000000']
        });
        vm.checkLogin();//检测登录状态
        var cardId = this.config.userCard[0].id; //id
        var credit = this.config.amount.trim(); //提款金额
        var password = this.config.drawingPwd.trim();//密码
        $.ajax({
            type: 'post',
            url: xpj_src + 'User/WithDraw',
            data: {
                cardid: cardId,
                password: password,
                credit: credit
            },
            success: function (data) {
                layer.close(load);
                var msg = data.msg;
                if (msg == 'success') {
                    // var confirm = window.confirm('提交成功，请耐心等候！是否查看提款记录？');
                    // confirm && (window.location.href = "/UserCenter/pages/record-withdraw.html");
                    layer.confirm('提交成功，请耐心等候！是否查看提款记录？', {
                        area: '285px',
                        btn: ['确定', '取消']
                    }, function() {
                        layer.closeAll();
                        window.location.href = "/UserCenter/pages/record-withdraw.html"
                    }, function() {
                        layer.closeAll();
                    });

                    //清空表单
                    withDraw.config.amount = '';
                    withDraw.config.drawingPwd = '';
                } else {
                    layer.close(load);
                    vm.messageAlert(msg, false);
                }
            },
            error: function () {
                layer.close(load);
                vm.messageAlert('网络繁忙，请稍后再试！', false);
            }

        })

    },
    //提交提款信息
    doWithDraw: function () {
        this.withDrawCheck() && this.checkMark();
    }
})

$(function () {
    //获取银行卡
    withDraw.getUserCard();
    //显示验证码
    vm.VerificationCode('#imgObj_zz');
})
