//投注记录
var game = avalon.define({
    $id: 'game',
    config: {
        //默认查询三天时间
        startTime: vm.GetDateStr(-3)+' 00:00:00',
        endTime: vm.GetDateStr(0)+' 23:59:59',
        type: 'CG' // 默认开始搜索类型CG视讯
    },
    pageData: {
        totalCount: 0, //总行数
        touzhu:0 ,//总投注-当前页小计
        paici:0,//派彩-当前页小计
        shuying:0 //输赢-当前页小计
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
            type: this.config.type
        }
        //获取总行数
        $.post(xpj_src + "User/getBetInfo", forms, function (data) {
			layer.close(load);
            game.pageData.totalCount = data[0].cnt;//总行数
            game.pageData.touzhu = data[1].betamountSum; //总投注
            game.pageData.paici = data[1].payoutSum; //派彩
            game.pageData.shuying = data[1].netAmountSum;//输赢
            //无数据清况下
            if (data[0].cnt == 0) {
                //无数据情况清空数据
                game.datas = [];   //分页数据清空
                game.pageData.totalCount = 0; //总行数
                game.pageData.touzhu = 0; //总投注
                game.pageData.paici = 0; //派彩
                game.pageData.shuying = 0;//输赢
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
                    $.post(xpj_src + 'User/getBetInfo', forms, function (page_data) {
                        //赋值分页数据
                        game.datas = page_data.slice(2);
                    })
                }
            })


        })
    }


})

$(function(){
    //默认查询三天
    game.layPage();
})