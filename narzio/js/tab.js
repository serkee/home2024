$(function(){
	$('.whats_new_inner div').hide();
	$('.whats_new_inner div:first').show();
	$('.whats_new_inner h3 a').bind('click focusin',function(){
		$('.whats_new_inner h3 img').each(function(){
			$(this).attr('src', $(this).attr('src').replace('on.gif', 'off.gif'))
		});
		$(this).find('img').attr('src', $(this).find('img').attr('src').replace('off.gif', 'on.gif'));
		
		$('.whats_new_inner div').hide();
		$(this).parent().next().show();

		return false;
	});


	$('#tab_wr .tab_content').hide();
	$('#tab_wr .tab_content:first').show();	
	$('#tab_wr .tab_menu a').bind('focusin click', function(){
		$('#tab_wr .tab_menu li').removeClass('on');
		$(this).parent().addClass('on');
		$('#tab_wr .tab_content').hide();
		$('#tab_wr .tab_content').eq($(this).parent().index()).show();

	return false;
	});
});


$(function(){
	$('#tab_wr .content').hide();
	$('#tab_wr .content:first').show();	
	$('#tab_wr .tab_menu a').bind('focusin click', function(){
		$('#tab_wr .tab_menu li').removeClass('on');
		$(this).parent().addClass('on');
		$('#tab_wr .content').hide();
		$('#tab_wr .content').eq($(this).parent().index()).show();

	return false;
	});
});

$(function(){
	$('#tab_wr_history .content_history').hide();
	$('#tab_wr_history .content_history:first').show();	
	$('#tab_wr_history .tab_history a').bind('focusin click', function(){
		$('#tab_wr_history .tab_history li').removeClass('on');
		$(this).parent().addClass('on');
		$('#tab_wr_history .content_history').hide();
		$('#tab_wr_history .content_history').eq($(this).parent().index()).show();

	return false;
	});
});


//게시판 리스트 -> 뷰페이지 
$(function(){
	$('#layPop .layBody .layCont .board_view').hide();	
	$('#layPop .layBody .layCont .board_write').hide();
	$('#layPop .layBody .layCont .board_list .subject a').bind('focusin click', function(){		
		$('#layPop .layBody .layCont .board_list').hide();		
		$('#layPop .layBody .layCont .board_view').show();
	return false;
	});
});
//게시판 뷰페이지 -> 목록
$(function(){
	$('#layPop .layBody .layCont .board_btn .list').bind('focusin click', function(){	
		$('#layPop .layBody .layCont .board_view').hide();	
		$('#layPop .layBody .layCont .board_write').hide();
		$('#layPop .layBody .layCont .board_list').show();
	return false;
	});
});
$(function(){
	$('#layPop .layBody .layCont .board_list .btn .write').bind('focusin click', function(){	
		$('#layPop .layBody .layCont .board_list').hide();		
		$('#layPop .layBody .layCont .board_write').show();
	return false;
	});
});	

