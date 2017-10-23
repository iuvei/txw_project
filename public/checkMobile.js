(function(){var BASE64_MAPPING=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/"];var _toBinary=function(ascii){var binary=new Array();while(ascii>0){var b=ascii%2;ascii=Math.floor(ascii/2);binary.push(b)}binary.reverse();return binary};var _toDecimal=function(binary){var dec=0;var p=0;for(var i=binary.length-1;i>=0;--i){var b=binary[i];if(b==1){dec+=Math.pow(2,p)}++p}return dec};var _toUTF8Binary=function(c,binaryArray){var mustLen=(8-(c+1))+((c-1)*6);var fatLen=binaryArray.length;var diff=mustLen-fatLen;while(--diff>=0){binaryArray.unshift(0)}var binary=[];var _c=c;while(--_c>=0){binary.push(1)}binary.push(0);var i=0,len=8-(c+1);for(;i<len;++i){binary.push(binaryArray[i])}for(var j=0;j<c-1;++j){binary.push(1);binary.push(0);var sum=6;while(--sum>=0){binary.push(binaryArray[i++])}}return binary};var __BASE64={encoder:function(str){var base64_Index=[];var binaryArray=[];for(var i=0,len=str.length;i<len;++i){var unicode=str.charCodeAt(i);var _tmpBinary=_toBinary(unicode);if(unicode<128){var _tmpdiff=8-_tmpBinary.length;while(--_tmpdiff>=0){_tmpBinary.unshift(0)}binaryArray=binaryArray.concat(_tmpBinary)}else{if(unicode>=128&&unicode<=2047){binaryArray=binaryArray.concat(_toUTF8Binary(2,_tmpBinary))}else{if(unicode>=2048&&unicode<=65535){binaryArray=binaryArray.concat(_toUTF8Binary(3,_tmpBinary))}else{if(unicode>=65536&&unicode<=2097151){binaryArray=binaryArray.concat(_toUTF8Binary(4,_tmpBinary))}else{if(unicode>=2097152&&unicode<=67108863){binaryArray=binaryArray.concat(_toUTF8Binary(5,_tmpBinary))}else{if(unicode>=4000000&&unicode<=2147483647){binaryArray=binaryArray.concat(_toUTF8Binary(6,_tmpBinary))}}}}}}}var extra_Zero_Count=0;for(var i=0,len=binaryArray.length;i<len;i+=6){var diff=(i+6)-len;if(diff==2){extra_Zero_Count=2}else{if(diff==4){extra_Zero_Count=4}}var _tmpExtra_Zero_Count=extra_Zero_Count;while(--_tmpExtra_Zero_Count>=0){binaryArray.push(0)}base64_Index.push(_toDecimal(binaryArray.slice(i,i+6)))}var base64="";for(var i=0,len=base64_Index.length;i<len;++i){base64+=BASE64_MAPPING[base64_Index[i]]}for(var i=0,len=extra_Zero_Count/2;i<len;++i){base64+="="}return base64},decoder:function(_base64Str){var _len=_base64Str.length;var extra_Zero_Count=0;if(_base64Str.charAt(_len-1)=="="){if(_base64Str.charAt(_len-2)=="="){extra_Zero_Count=4;_base64Str=_base64Str.substring(0,_len-2)}else{extra_Zero_Count=2;_base64Str=_base64Str.substring(0,_len-1)}}var binaryArray=[];for(var i=0,len=_base64Str.length;i<len;++i){var c=_base64Str.charAt(i);for(var j=0,size=BASE64_MAPPING.length;j<size;++j){if(c==BASE64_MAPPING[j]){var _tmp=_toBinary(j);var _tmpLen=_tmp.length;if(6-_tmpLen>0){for(var k=6-_tmpLen;k>0;--k){_tmp.unshift(0)}}binaryArray=binaryArray.concat(_tmp);break}}}if(extra_Zero_Count>0){binaryArray=binaryArray.slice(0,binaryArray.length-extra_Zero_Count)}var unicode=[];var unicodeBinary=[];for(var i=0,len=binaryArray.length;i<len;){if(binaryArray[i]==0){unicode=unicode.concat(_toDecimal(binaryArray.slice(i,i+8)));i+=8}else{var sum=0;while(i<len){if(binaryArray[i]==1){++sum}else{break}++i}unicodeBinary=unicodeBinary.concat(binaryArray.slice(i+1,i+8-sum));i+=8-sum;while(sum>1){unicodeBinary=unicodeBinary.concat(binaryArray.slice(i+2,i+8));i+=8;--sum}unicode=unicode.concat(_toDecimal(unicodeBinary));unicodeBinary=[]}}return unicode}};window.BASE64=__BASE64})();

var browser={  
    versions:function(){   
           var u = navigator.userAgent, app = navigator.appVersion;   
           return {//移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };  
         }(),  
         language:(navigator.browserLanguage || navigator.language).toLowerCase()  
}   

if(browser.versions.mobile || browser.versions.ios || browser.versions.android ||
  browser.versions.iPhone || browser.versions.iPad){
    	window.location.href = 'http://mtxn.tx1888.com';
}else{}
//if(browser.versions.mobile || browser.versions.ios || browser.versions.android ||
//    browser.versions.iPhone || browser.versions.iPad){
//      var href = window.location.href;
//      // console.log(href);
//      if (href.indexOf('?PC=true') == -1) {
//        	var hostname = window.location.host;
//        	var host = hostname.slice(0,4) == "www."?hostname.slice(4):hostname;
//        	var protocol = window.location.protocol;
//        	var mobile =protocol+"//m."+host;
//          window.location.href = mobile;
//      }
//}else{}
