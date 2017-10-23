var tranfer = avalon.define({
    $id: 'tranferRecord',
    config: {
        //默认查询三天时间
        startTime: vm.GetDateStr(-3),
        endTime: vm.GetDateStr(0),
        type: '',
        game: ''
    },
    pageData: {
        totalCount: 0, //总行数
        totalMoney: 0,  //金额汇总
        pageMoney: 0 //金额小计
    },
    datas: '',
    layPage: function () {
    	//loading层
		var load = layer.load(1, {
		  shade: [0.3,'#000000'],
		  time: 5000
		});
        //表单数据
        var forms = {
            pageSize: 10,
            bdate: this.config.startTime,
            edate: this.config.endTime,
            pageNo: 1,
            Ttype: this.config.type,
            Type: this.config.game

        }
        //获取总行数
        $.post(xpj_src + "User/getTransferInfo", forms, function (data) {
			layer.close(load);
            tranfer.pageData.totalCount = data[0].cnt;
            tranfer.pageData.totalMoney = data[0].total;
            //无数据清况下
            if (data[0].cnt == 0) {
                //无数据情况清空数据
                tranfer.datas = [];   //分页数据清空
                tranfer.pageData.totalMoney = 0;// 金额总计
                tranfer.pageData.pageMoney = 0; //金额小计
                tranfer.pageData.totalCount = 0; //总行数
                return;
            }
            //分页
            laypage({
                cont: 'd_fenb',
                pages: Math.ceil(data[0].cnt / 10),
                curr: 1,
                skin: '#fff', //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                groups: 3, //连续显示分页数
                skip: true,
                first: false,
                last: false,
                prev: '<',
                next: '>',
                jump: function (e) {
                    forms.pageNo = e.curr;
                    $.post(xpj_src + 'User/getTransferInfo', forms, function (page_data) {
                        //赋值数据,去除数组中第一个元素
                        tranfer.datas = page_data.slice(1);

                    })
                }
            })


        })
    }


})

$(function(){
    //默认查询三天
    tranfer.layPage();
})