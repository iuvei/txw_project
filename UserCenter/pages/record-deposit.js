var deposit = avalon.define({
    $id:'depsit',
    config:{
        //默认查询三天时间
        startTime:vm.GetDateStr(-3),
        endTime:vm.GetDateStr(0),
        type:'',
        status:''
    },
    pageData:{
        totalCount:0, //总行数
        totalMoney:0,  //金额汇总
        pageMoney:0 //金额小计
    },
    datas:'',//分页数据
    //分页
    layPage:function(){
    	//loading层
		var load = layer.load(1, {
		  shade: [0.3,'#000000'],
		  time: 5000
		});
        var startTime = this.config.startTime;
        var endTime = this.config.endTime;
        var forms = {
            pageSize:10,
            bdate:this.config.startTime,
            edate:this.config.endTime,
            pageNo:1,
            Type:this.config.type,
            status:this.config.status

        }
        $.post(xpj_src + 'User/getReChargeInfo',forms,function(data){
			layer.close(load);
            deposit.pageData.totalCount = data[0].cnt;
            deposit.pageData.totalMoney = data[0].total;
            //无数据清况下
            if(data[0].cnt == 0){
                //无数据情况清空数据
                deposit.datas = [];   //分页数据清空
                deposit.pageData.totalMoney = 0;// 金额总计
                deposit.pageData.pageMoney = 0; //金额小计
                deposit.pageData.totalCount= 0; //总行数
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
                jump:function(e){
                    forms.pageNo  = e.curr;
                    $.post(xpj_src+'User/getReChargeInfo',forms,function(page_data){
                        //赋值数据,去除数组中第一个元素
                        deposit.datas = page_data.slice(1);
                        //当前页金额小计
                        var subtotal = 0;
                        for (var i = 1;i<page_data.length;i++){
                            subtotal+=page_data[i].order_amount;
                        }
                        //金额小计汇总
                        deposit.pageData.pageMoney = subtotal;


                    })
                }
            })
        })
    }

})

$(function(){
    //默认三天搜索
    deposit.layPage();
})
