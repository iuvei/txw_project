var page_numsArr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var slotArr = [PTGAME.Table_Card, PTGAME.New_Slots, PTGAME.linesThree_ten, PTGAME.linesTen_twenty, PTGAME.linesTwentyMore, PTGAME.Featured_Slots, PTGAME.Video_Slots, PTGAME.Arcade_Slots, PTGAME.Fixed_Odds_Games, PTGAME.Classic_Slots, PTGAME.Scratch_Cards];

function PT_GAME(gatory, li_index) {
	var selArr = new Array();
	var pageNum = 18;
	var allPages = Math.ceil(gatory.length / pageNum); //计算总页数
	var start = pageNum * (page_numsArr[li_index] - 1);
	var end = page_numsArr[li_index] == allPages ? gatory.length : pageNum * (page_numsArr[li_index] - 1) + pageNum;
	selArr = gatory.slice(start, end);
	$('.content_listNumb_box').empty();
	$('#pages_numl_rm').text(allPages);
	$('#pages_numf_rm').text(page_numsArr[li_index]);
	var img_url, id, title;
	for(var i = 0; i < selArr.length; i++) {
		img_url = selArr[i].src;
		id = JSON.stringify(selArr[i].Game_code).replace(/\"/g, "'");
		title = selArr[i].title;
        var module_html = '<div class="gbox">'+
                        '<div class="game-name">' + title + '</div>'+
                        ' <img width="193" height="160" src=' + img_url + '>'+
                        '<div class="shadow"></div>'+
                        '<div class="cover">'+
                        '<a class="play gamein" href="javascript:void(0)" onclick="try_game_link(' + id + ')">免费试玩</a>'+
                        '<a class="free-register" href="javascript:void(0)" onclick="load_game_link_pt(' + id + ')">进入游戏</a>'+
                        '</div>'+
                        '</div>';


		$('.content_listNumb_box').append(module_html);

	}
		$('.ele_pages').show();
	

	//        鼠标移动
	$('.content_listNumb').hover(function() {
		$(this).find('p').show()
		$(this).find('.content_listNumb_zz').show();

	}, function() {
		$(this).find('p').hide()
		$(this).find('.content_listNumb_zz').hide();

	})

}

//搜索
function getGame(params) {

	var check_str = params; //获取输入的用户值 
	var proArr = new Array(); //存放搜索值的容器 

	var attrArr = new Array(); //属性数组 
	for(var key in PTGAME) {
		attrArr.push(key);
	}
	//遍历属性数组 
	for(var i = 0; i < attrArr.length; i++) {
		for(var j = 0; j < PTGAME[attrArr[i]].length; j++) {
			if(PTGAME[attrArr[i]][j].title.indexOf(check_str) != -1) {
				proArr.push(PTGAME[attrArr[i]][j]);
			}
		}
	}
	return proArr;
}

$(function() {
	PT_GAME(PTGAME.Table_Card, 0);

	$('#pages_top_btn_rm,#pages_bot_btn_rm').on('click', function(e) {
		var lis = $('#game_nav_bar li');
		var li_index;
		for(var i = 0; i < lis.length; i++) {
			if($(lis[i]).hasClass('nav_bar_on')) { li_index = $(lis[i]).index(); break; };
		}
		e.target == document.getElementById('pages_top_btn_rm') ? page_numsArr[li_index]-- : page_numsArr[li_index]++;
		var gamesec = slotArr[li_index];
		var max_page = Math.ceil(gamesec.length / 18);
		if(page_numsArr[li_index] > max_page) { page_numsArr[li_index] = max_page; return; };
		if(page_numsArr[li_index] < 1) { page_numsArr[li_index] = 1; return; };
		PT_GAME(gamesec, li_index);
	})

	//搜索结果

	$('#game_searchdo').on('click', function() {
		var checkvar = $('#game_input').val().trim();
		//非空验证
		if (checkvar == '') {
			layer.alert('搜索内容不能为空', {
				shade: 0.3,
				icon: 0
			});
			return;
		}
		var proARR = getGame(checkvar);
		if(proARR.length == 0) {
			$('.content_listNumb_box').empty();
			var search_null = '<strong>暂无搜索结果</strong>';
			$('.content_listNumb_box').append(search_null);
		} else {
			$('.content_listNumb_box').empty();
			for(var i = 0; i < 1; i++) {
				img_url = proARR[i].src;
				id = JSON.stringify(proARR[i].Game_code).replace(/\"/g, "'");
				title = proARR[i].title;
                var module_html = '<div class="gbox">'+
                    '<div class="game-name">' + title + '</div>'+
                    ' <img width="193" height="160" src="' + img_url + '">'+
                    '<div class="shadow"></div>'+
                    '<div class="cover">'+
                    '<a class="play gamein" href="javascript:void(0)" onclick="try_game_link(' + id + ')">免费试玩</a>'+
                    '<a class="free-register" href="javascript:void(0)" onclick="load_game_link_pt(' + id + ')">进入游戏</a>'+
                    '</div>'+
                    '</div>';

				$('.content_listNumb_box').append(module_html);

			}

		}

		$('.ele_pages').hide();
		//        鼠标移动
		//$('.content_listNumb').hover(function() {
		//	$(this).find('p').show()
		//	$(this).find('.content_listNumb_zz').show();
        //
		//}, function() {
		//	$(this).find('p').hide()
		//	$(this).find('.content_listNumb_zz').hide();
        //
		//})
	})

})