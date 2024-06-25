// JavaScript Document

var selectedSub = 0
var timer;
var proTimer;
var intervalTime = 4000;
var on
var arg = 0;
var proCount = 0;
var proNum = 0;
var aniTimer;
var focusBoo = false;
$(function(){
	$('.dotUnit').click(function(){
		arg = $('.dot li').index(this);
		if(selectedSub != arg) bannerfn(arg)
	});
	$('.wide .pause').click(function(){
		var image = $('.wide .pause').children("img");
		var imgsrc = $(image).attr("src");
		if(imgsrc.substr(imgsrc.length-8,8) == "stop.png"){
			on = imgsrc.replace(/stop.png/,"play.png");
			clearInterval(timer)
		
		}else{
			on = imgsrc.replace(/play.png/,"stop.png");
			timer = setInterval("rollongfn()",intervalTime); 
		}
		$(image).attr("src",on);
	})
	timer = setInterval("rollongfn()",intervalTime);
	
	proCount = $('#container .article.single ul li').length
	proTimer = setInterval("proRollingfn()",intervalTime);
	
	aniTimer = setInterval("anifn()",intervalTime*2);
	anifn()
	key_down()
});
function anifn(){
	$('.tall .aniDiv').animate({height:'0px', top:'280px'},1000,function(){
		$('.tall .aniDiv').delay(4000).css({height:'0px', top:'0px'}).animate({height:'280px'},1000)

	})
}
function key_down(){
	 window.onkeydown = function() {
        var kcode = event.keyCode;
		
        if ( kcode == 8 && $('#layPop').css('display') == "block" && !focusBoo){
			alert("이전페이지 이동 및 닫으시려면 오른쪽 모서리 X버튼을 이용해주세요.")
			windowScroll(0);
			return false;
		}
	 }
}

function onfn(){
	focusBoo = true
}
function outfn(){
	focusBoo = false
}
function rollongfn(){
	arg++;
	if(arg == 4) arg = 0;
	bannerfn(arg)
}
function proRollingfn(){
	//alert(proNum)
	proNum++;
	//if(proNum == proCount) proNum = 0;
	var w = $('#container .article.single ul li img').width()
	//alert(w)
	$('#container .article.single ul').animate({'left':''+-proNum*w+'px' },500, function(){
		if(proNum == proCount-1){
			proNum = 0
			$('#container .article.single ul').css('left','0px')
		}
	}); 
}
function bannerfn(arg){
	
	var image = $('.dot li').eq(selectedSub).children("img");
	var imgsrc = $(image).attr("src");
	var on = imgsrc.replace(/_on.png/,"_off.png");
	$(image).attr("src",on);
	
	var div = $('.wide div').eq(selectedSub)
	$(div).css("display","none")
	
	selectedSub = arg
	
	image = $('.dot li').eq(arg).children("img");
	imgsrc = $(image).attr("src");
	on = imgsrc.replace(/_off.png/,"_on.png");
	$(image).attr("src",on);
	
	div = $('.wide div').eq(selectedSub)
	$(div).css("display","block")
	
}