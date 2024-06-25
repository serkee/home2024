// JavaScript Document
$(function(){
	<!--롤링링크-->
	$('.wide .boxImg').click(function(){
		popOpen()
	})
	$('.wide .boxTitle').click(function(){
		popOpen()
	})
	$('.wide strong').click(function(){
		popOpen()
	})
	$('.wide .go').click(function(){
		popOpen()
	})
	<!--//롤링링크-->
	<!--gnb 클릭-->
	$('#header .gnb li').click(function(){
		selectArg = $('#header .gnb li').index(this);
		//if(arg != navi_idx) navi_idx = arg
		popOpen()
		setGnb()
		loadPage()
	})
	<!--메인 박스 클릭-->
	$('.article a').click(function(){
		boxClickPopOpen($('.article a').index(this));
	})
	<!--로고 클릭-->
	$('h1 a').click(function(){
		closeLayer()
	})
})
<!--내용부분div 오픈-->
function popOpen(){
	$('#layPop').css('display','block')	
	$('#container').css('display','none')
}
<!--gnb관련-->
function setGnb(){
	if(navi_idx !=1000){
		var image = $('.gnb li a').eq(navi_idx).children("img");
		var imgsrc = $(image).attr("src");
		var on = imgsrc.replace(/_on.png/,"_off.png");
		$(image).attr("src",on);
	}
	navi_idx = selectArg
	
	image = $('.gnb li a').eq(navi_idx).children("img");
	imgsrc = $(image).attr("src");
	on = imgsrc.replace(/_off.png/,"_on.png");
	$(image).attr("src",on);
	
}
<!--내용 불러오기-->
function loadPage(){
	//ABOUT
	if(selectArg == 0) $pageData = "about/about.html";
	//DUO TECH
	else if(selectArg == 1) $pageData = "duo/duo.html";
	//PRODUCT
	else if(selectArg == 2) $pageData = "product/product.html";
	//REVIEW
	else if(selectArg == 3) $pageData = "review/review.html";
	//STORY
	else if(selectArg == 4) $pageData = "story/story_list.html";
	//SUPPORT
	else if(selectArg == 5) $pageData = "support/support.html";
	
	$("#layPop").load($pageData);
}
function boxClickPopOpen(arg){
	if(arg == 0){
		$pageData = "story/story_list.html";
		selectArg = 4;
	}
	else if(arg == 1){
		$pageData = "about/about.html";
		selectArg = 0;
	}
	else if(arg == 2){
		$pageData = "";
	}
	else if(arg == 3){
		$pageData = "";
	}
	else if(arg == 4){
		$pageData = "product/product.html";
		selectArg = 2;
	}
	else if(arg == 5){
		$pageData = "";
	}
	else if(arg == 6){
		$pageData = "duo/duo.html";
		selectArg = 1;
	}
	else if(arg == 7){
		$pageData = "";
	}
	else if(arg == 8){
		$pageData = "";
	}
	
	$("#layPop").load($pageData);
	popOpen()
	setGnb()
}