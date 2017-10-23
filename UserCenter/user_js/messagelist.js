function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
    return y + "-" + m + "-" + d;
}

//时间格式转换
function Format_cov(time) {
    var date = new Date(time);
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() + ' ';
    h = (date.getHours()<10? '0'+ date.getHours():date.getHours())+ ':';
    m = (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()) + ':';
    s = (date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds());
    var fommat_time = Y + M + D + h + m + s;
    return fommat_time;
}

var begint = $('#begin_time');
var endt = $('#end_time');
	
function today() { 
begint.val(GetDateStr(-1)); 
endt.val(GetDateStr(0)); 
    
} 
function weekday() { 
begint.val(GetDateStr(-7)); 
endt.val(GetDateStr(0)); 
} 

function threeDay() { 
begint.val(GetDateStr(-3)); 
endt.val(GetDateStr(0)); 
}

function monthDay() { 
begint.val(GetDateStr(-29)); 
endt.val(GetDateStr(0)); 
}

//获取站内信内容	
	function getcontent (_this) {
		var id = _this.attributes['code'].value;
		$.ajax({
			type:"post",
			url:xpj_src+"User/getMessageInfo",
			data:{id:id},
			async:true,
			cache:false,
			success:function  (data) {
				$(_this).parents('.eveb_letter_title').next().find('.detail_content').text(data.message);
			getMessageNum();
			}
		})
	}
	
	//删除站内信
	
	function deletelist (_this) {
		$('.xploading_bg').show();
		$('.xploading').show();
		var id = $(_this).attr('code');
		var status = $(_this).attr('status');
		$.ajax({
			type:"post",
			url:xpj_src+"User/deleteMessage",
			data:{id:id},
			async:true,
			cache:false,
			success:function  (data) {
				if (data.status=='success') {
					alert('删除成功');
					getMessageNum();
					if (status == 0) {
						getList(0);
					}else if (status == 1) {
						getList(1);
					}else{
						getAllList('');
					}
				}else{
					alert("删除失败");
				}
				$('.xploading_bg').hide();
		        $('.xploading').hide();
			},
			error:function  () {
				$('.xploading_bg').hide();
		        $('.xploading').hide();
			}
		})
	}
	
	//批量删除站内信
	
	function alldelete (str,status) {
		$('.xploading_bg').show();
		$('.xploading').show();
		$.ajax({
			type:"post",
			url:xpj_src+"User/deleteMessage",
			data:{id:str},
			async:true,
			cache:false,
			success:function  (data) {
				if (data.status=='success') {
					alert('删除成功');
					getMessageNum();
					if (status == 0) {
						getList(0);
					}else if (status == 1) {
						getList(1);
					}else{
						getAllList('');
					}
					
				}else{
					alert("删除失败");
				}
				$('.xploading_bg').hide();
		        $('.xploading').hide();
				
			},
			error:function  () {
				$('.xploading_bg').hide();
		        $('.xploading').hide();
			}
		})
	}
	
	//读取站内列表
	
	
	function getList (status) {
		$('.xploading_bg').show();
		$('.xploading').show();
		var bTime = begint.val();
		var eTime = endt.val();
		$.ajax({
			type:"post",
			url:xpj_src+"User/getMessageList",
			data:{
				status:status,
				bdate:bTime,
				edate:eTime
			},
			async:true,
			cache:false,
			success:function  (data) {
				var noData = '<li id = "noData">'+
	        					'<div class="eveb_letter_title eveb_letter_title_no"><span>无符合条件的记录</span></div>'+	
      						'</li>';
				if (data=='') {
					$('#no_data').empty();
					$('#list_container').empty();
					$('#no_data').append(noData);
					$('.xploading_bg').hide();
		        	$('.xploading').hide();
					return;
				}else{
					$('#no_data').empty();
					$('.xploading_bg').hide();
		        	$('.xploading').hide();
				}
				$('#list_container').empty();
				for (var i = 0; i < data.length; i++) {
					var module_div = '<div class="eveb_letter">'+
		            '<div class="eveb_letter_title">'+
		                '<span class="fl">'+
		                    '<input type="checkbox"  class = "checkboxes"  status ="'+data[i].status+'" code ="'+data[i].id+'">'+
		                    '<strong class="eveb_letter_title_em"><a href="javascript:;" code ="'+data[i].id+'" onclick="getcontent (this)">'+data[i].message+'</a></strong>'+
		                '</span>'+
		                '<span class="fr">'+Format_cov( parseInt(data[i].addtime.time))+'</span>'+
		            '</div>'+
		            '<div class="detail">'+
		                '<p class="detail_content"></p>'+
		                '<div class="eveb_letter_control">'+
		                    '<a name="deleteMessage"  status ="'+data[i].status+'" code ='+data[i].id+' class="button_small button_3 delete_confirm" onclick = "deletelist(this)" >删除</a>'+
		                '</div>'+
		            '</div>'+
		            '</div>';
		         
		         $('#list_container').append(module_div);
		            
				}
				$('.xploading_bg').hide();
		        $('.xploading').hide();
				
			},
			error:function  () {
				$('.xploading_bg').hide();
		        $('.xploading').hide();
			}
		})
		
	}
	function getAllList (status) {
		$('.xploading_bg').show();
		$('.xploading').show();
		var bTime = begint.val();
		var eTime = endt.val();
		$.ajax({
			type:"post",
			url:xpj_src+"User/getMessageList",
			data:{
				status:status,
				bdate:bTime,
				edate:eTime
			},
			async:true,
			cache:false,
//			xhrFields:{withCredentials:true},
			success:function  (data) {
				var noData = '<li id = "noData">'+
	        					'<div class="eveb_letter_title eveb_letter_title_no"><span>无符合条件的记录</span></div>'+	
      						'</li>';
				if (data=='') {
					$('#no_data').empty();
					$('#list_container').empty();
					$('#no_data').append(noData);
					$('.xploading_bg').hide();
		        	$('.xploading').hide();
					return;
				}else{
					$('#no_data').empty();
					$('.xploading_bg').hide();
		        	$('.xploading').hide();
				}
				$('#list_container').empty();
				for (var i = 0; i < data.length; i++) {
					var module_div = '<div class="eveb_letter">'+
		            '<div class="eveb_letter_title">'+
		                '<span class="fl">'+
		                    '<input type="checkbox"  class = "checkboxes"  status ="3" code ="'+data[i].id+'">'+
		                    '<strong class="eveb_letter_title_em"><a href="javascript:;" code ="'+data[i].id+'" onclick="getcontent (this)">'+data[i].message+'</a></strong>'+
		                '</span>'+
		                '<span class="fr">'+Format_cov( parseInt(data[i].addtime.time))+'</span>'+
		            '</div>'+
		            '<div class="detail">'+
		                '<p class="detail_content"></p>'+
		                '<div class="eveb_letter_control">'+
		                    '<a name="deleteMessage" status ="3" code ='+data[i].id+' class="button_small button_3 delete_confirm" onclick = "deletelist(this)" >删除</a>'+
		                '</div>'+
		            '</div>'+
		            '</div>';
		         
		         $('#list_container').append(module_div);
		            
				}
				
				$('.xploading_bg').hide();
		        $('.xploading').hide();
			},
			error:function  () {
				$('.xploading_bg').hide();
		        $('.xploading').hide();
			}
		})
		
	}
	
	function  getMessageNum() {
		//获取站内信数量
	$.ajax({
			type:"post",
			url:xpj_src+"User/getMessageNum",
			async:true,
			cache:false,
			success:function  (data) {
				var isread = data.isread;
				var noread = data.noread;
				var alllist = isread + noread;
				$('#showAll').find('em').text(alllist);
				$('#showUnReaded').find('em').text(noread);
				$('#showReaded').find('em').text(isread);
			}
		})
	}
	
$(function  () {
	
	monthDay();
	getList('');
	getMessageNum();
	
	//删除站内信
	$('#btnDelete').on('click',function () {
		var codeArray = new Array();
		var checkboxes = $('.checkboxes');
		for (var i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i].checked == true) {
				codeArray.push(checkboxes[i].attributes['code'].value);
				var status =  checkboxes[i].attributes['status'].value;
			};
		}
		if (codeArray.length == 0) {
			alert('请勾选选项');
			return;
		}
		var codestr = codeArray.join(',');
		alldelete(codestr,status);
		
	})
	//点击全选
	$('#selectAll').on('click',function  () {
		var judge_bol = $(this).checked;
		var checkboxes = $('.checkboxes');
		
		if ($(this).get(0).checked == true) {
			checkboxes.attr('checked','true');
		}else{
			checkboxes.removeAttr("checked"); 
		}
	})
	
	
	//获取全部
	$('#showAll').on('click',function  () {
		getAllList('');
		$('#selectAll').removeAttr("checked"); 
	})
	//获取未读
	$('#showUnReaded').on('click',function  () {
		getList(0);
		$('#selectAll').removeAttr("checked"); 
	})
	//获取已读
	$('#showReaded').on('click',function  () {
		getList(1);
		$('#selectAll').removeAttr("checked"); 
	})
	//筛选
	$("#refreshDataList").on('click',function(){
		var numbers;
		var lis = $('.eveb_sub_nav_type li');
		for (var i = 0; i < lis.length; i++) {
			if ($(lis[i]).hasClass('active')) {
				numbers = $(lis[i]).index();
			}
		}
		if (numbers == 0) {
			getList('');
		}else if (numbers == 1) {
			getList(0);
		}else if(numbers == 2){
			getList(1);
		}
		
		$('#selectAll').removeAttr("checked"); 
	})
	
	$('.eveb_letter_title_em a').live('click',function () {
		$(this).parents(".eveb_letter_title").next().slideToggle(80);
	});
	
})
