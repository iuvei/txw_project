function CurentTime() {
        var now = new Date();
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss = now.getSeconds();          //秒
        if (month >= 0 && month <= 9) {
            month = "0" + month;
        }
        if (day  >= 0 && day  <= 9) {
            day  = "0"+day ;
        }
        if(hh >= 1 && hh <= 9){
            hh = "0"+hh;
        }
        if(mm >=0 && mm <=9){
            mm = "0" + mm;
        }
        if(ss >=0 && ss <=9){
            ss= "0"+ss;
        }
        $('#clocks').html(year+'-'+month+'-'+day+" "+" "+hh+':'+mm+':'+ss)
    }

$(function(){
CurentTime();
setInterval(function  () {
	CurentTime();
},1000)
	
})