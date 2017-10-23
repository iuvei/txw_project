var credit = avalon.define({
    $id: 'credit',
    config: {
        //默认查询三天时间
        startTime: vm.GetDateStr(-3),
        endTime: vm.GetDateStr(0),
        type: ''
    },
    pageData: {
        totalCount: 0,
        pageMoney:0
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
            startTime: this.config.startTime+' 00:00:00',
            endTime: this.config.endTime+' 23:59:59',
            pageNo: 1,
            Ttype: this.config.type

        }
        //获取总行数
        $.post(xpj_src + "User/queryByTreasurePage", forms, function (data) {
			layer.close(load);
            credit.pageData.totalCount = data.total;
            //无数据清况下
            if (data.total == 0) {
                //无数据情况清空数据
                credit.datas = [];   //分页数据清空
                credit.pageData.totalCount = 0; //总行数
                credit.pageData.pageMoney = 0;
                return;
            }
            //分页
            laypage({
                cont: 'd_fenb',
                pages: Math.ceil(data.total / 10),
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
                    $.post(xpj_src + 'User/queryByTreasurePage', forms, function (page_data) {
                        //赋值分页数据
                        credit.datas = page_data.data;
                    })
                }
            })


        })
    }


})

$(function(){
    //默认查询三天
    credit.layPage();
})