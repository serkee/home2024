// JavaScript Document
var navBoo = false
var script_h = 123
var scriptBoo = false
var pageNum = 0
var tabNum = 0
var vol = 1
//check browser
var mobileBoo
var nav_w
var wh
var horiBoo
var navi_hori
var play_check = false
var v_playing
var video
var videoBoo

var t_time = 40;
var c_time = 0;
var ani_id;
var quiz_num = 0;
var correct = []
var answerArr = []
var c_length = 0
var life = 2
var obj
var bgm
var s_o
var s_x
var s_pop
var quiz_start
var quiz_re
var quiz_next
var v_playing = false

var tween1;
var tween2;
var tween3;
var tween4;
var tween5;

var ani_start
var urlArr
var xmlIndex
var _xml
var classNum
var pageCode
var ieBoo
var oldIE;
var finishBoo = false


$(function(){
	//
	urlArr = location.href.split("/")
	classNum = Number(urlArr[urlArr.length-2])
	
	if($('#c_01').height()) pageCode = 1;
	else if($('#c_02').height()) pageCode = 2;
	/*else if($('#c_03').height()) pageCode = 3;*/
	else if($('#c_04').height()) pageCode = 4;
	else if($('#c_05').height()) pageCode = 5;
	else if($('#c_06').height()) pageCode = 6;
	if(pageCode) xmlIndex = pageCode-1
	//alert(xmlIndex)
	if(xmlIndex>=3){
		xmlIndex = xmlIndex-1
		//alert(xmlIndex)
	}
	/*$.ajax({
		url:'../common/xml/script.xml',
		dataType: "xml",
		success:function(data){
			_xml = $(data).find("script")
			//alert(xmlIndex)
			$('#script .txtarea').text(_xml.find("unit").eq(Number(urlArr[urlArr.length-2])-1).find("page").eq(xmlIndex).text())
			if(xmlIndex == 2){
				setQuizFn()
			}else init()
		}
	})*/
	init()
	
	
})
function setQuizFn(){
	$.ajax({
		url:'../common/xml/quiz.xml',
		dataType: "xml",
		success:function(data){
			_xml = $(data).find("quiz")
			_xml.find("unit").eq(Number(urlArr[urlArr.length-2])-1)
			//correct =[]
			for(i = 0; i<2; i++){
				var q_txt = _xml.find("unit").eq(Number(urlArr[urlArr.length-2])-1).find('question').eq(i)
				//alert(q_txt.find('text').text())
				$('#contents .quiz').eq(i).find('p.txt em').text(q_txt.find('text').text())
				for(j=0; j<4; j++){
					$('#contents .quiz').eq(i).find('ul li').eq(j).find('em.text').text(q_txt.find('choice num').eq(j).text())
				}
				$('#contents .quiz').eq(i).find('.answer em.text').text(q_txt.find('answer').text())
				$('#contents .quiz').eq(i).find('.help em.text').text(q_txt.find('explain').text())
				correct.push(q_txt.find('answer').attr('num'))
			}
			
			init()
		}
	})
}

function init(){
	var ua = window.navigator.userAgent;
	if(/lgtelecom/i.test(ua) || /Android/i.test(ua) || /blackberry/i.test(ua) || /iPhone/i.test(ua) || /X11/i.test(ua) || /iPad/i.test(ua) || /samsung/i.test(ua) || /symbian/i.test(ua) || /sony/i.test(ua) || /SCH-/i.test(ua) || /SPH-/i.test(ua) || /nokia/i.test(ua) || /bada/i.test(ua) || /semc/i.test(ua) || /IEMobile/i.test(ua) || /Mobile/i.test(ua) || /PPC/i.test(ua) || /Windows CE/i.test(ua) || /Windows Phone/i.test(ua) || /webOS/i.test(ua) || /Opera Mini/i.test(ua) || /Opera Mobi/i.test(ua) || /POLARIS/i.test(ua) || /SonyEricsson/i.test(ua) || /symbos/i.test(ua)){
		mobileBoo = true
		$('head').append('<link rel="stylesheet"  href="../common/css/mobile.css" />');
		$('html').css({'position':'fixed'})
	}else{
		mobileBoo = false
		$('.wrap footer').css({'min-width':'960px'})
		
	}
	
    if ($('html').is('.lt-ie7, .lt-ie8, .lt-ie9')) {
        oldIE = true;
    }
	//resizeWindow()
	
	var bStyle = document.body.style; 
	var canvas = document.createElement('canvas'); 
	//canvas가 없어 - 8 
	if( !('getContext' in canvas) ) ieBoo = true; 
	//transtion이 불가 - 9 
	if( !('msTransition' in bStyle) && !('transition' in bStyle) ){
		ieBoo = true;
	}
	//webGL이 없어 - 10 
	
	setFn()
}
	
function setFn(){
	if(!mobileBoo){
		if(ieBoo && !oldIE) setCookie('ie9Boo3','true')
		$('.wrap').css({'display':'block'})
		$('body').css({'background-image':'url(../common/images/common/img_bg0'+pageCode+'.jpg)','-webkit-background-size': 'cover',
	  '-moz-background-size': 'cover',
	  '-o-background-size': 'cover',
	  'background-size': 'cover'})
		$('.btn_start').css({'display':'none'})
	}
	if(String(classNum).length == 1) classNum = "0"+classNum
	//if(String(pageCode).length == 1) pageCode = "0"+pageCode
	if(!mobileBoo) $('#top h2').css({'background-image':'url(../common/images/contents/img_h2_'+classNum+'.png)'})
	else $('.wrap nav .nav_inner .open').css({'background-image':'url(../common/images/contents/img_h2_'+classNum+'_mobile.png)'})
	//alert(classNum+"   "+pageCode)
	
	if(pageCode<3) {
		//$("#video").html('<source src="http://dw-tscream.dl.cdn.cloudn.co.kr/media/1080/1080_'+classNum+'_0'+pageCode+'.mp4" type="video/mp4"></source>' );
		videoBoo = true
	}
	
	
	$('footer .nav').click(function(){
		navFn()
	})
	$('.btn_nav_close').click(function(){
		navBoo = true
		navFn()
	})
	$('.btn_nav_open').click(function(){
		navBoo = false
		navFn()
	})
	
	$('.btn_script').click(function(e){
		if($('#script').height()){
			$('#script').animate({"height":0},200)
			scriptBoo = false
		}else{
			$('#script').animate({"height":script_h},200)
			scriptBoo = true
		}
		
	})
	$('.btn_script_close').click(function(e){
		$('#script').animate({"height":0},200)
		scriptBoo = false
	})
	
	$('#roadmap .tab li').click(function(){
		tabFn($('#roadmap .tab li').index(this))
	})
	$('#roadmap .close').click(function(){
		$('#roadmap').removeClass('on')
		$('footer .inner .tit').removeClass('on')
		tabOnOffFn(false)
	})
	$('.wrap #roadmap .roadmap_inner .paging .arrow.prev').click(function(){
		if(pageNum>0) pagingFn(false)
	})
	$('.wrap #roadmap .roadmap_inner .paging .arrow.next').click(function(){
		if(tabNum==0 &&pageNum==0 || tabNum==1 && pageNum<2) pagingFn(true)
	})
	$('footer .inner .tit').click(function(){
		if($(this).hasClass('on')){//켜기
			$(this).removeClass('on')
			$('#roadmap').removeClass('on')
			
			tabOnOffFn(false)
		}else{//끄기
			$(this).addClass('on')
			$('#roadmap').addClass('on')
			if($('#script').height()) $('#script').animate({"height":0},200)
			tabFn(0)
			tabOnOffFn(true)

		}
	})
	
	$('.btn_sound').click(function(){
		
		if(!$(this).hasClass('mute')){
			$(this).addClass('mute')
			volumefn(0)
		}else{
			$(this).removeClass('mute')
			volumefn(vol)
		}
	})
	
	$('.volume').click(function(e){
		var parentOffset = $(this).offset(); 
	    var relX = e.pageX - parentOffset.left;
		relX = Math.floor(relX)
		var t = $(this).width()-2
		$('.volume span').css({"width":relX})
		vol = relX / t
		volumefn(relX / t)
	})
	
	$('.p_arrow.prev').click(function(){
		if(pageCode>=4) pageCode--
		gopage(pageCode-1)
	})
	$('.p_arrow.next').click(function(){
		if(pageCode>=4) pageCode--
		gopage(pageCode+1)
	})
	
	if(pageCode==1){
		$('.p_arrow.prev').css({'display':'none'})
	}else if(pageCode==6){
		$('.p_arrow.next').css({'display':'none'})
	}
	
	
	
	
	/*비디오 관련*/
	if(videoBoo){
		video = document.getElementById("video")
		if(mobileBoo){
			video.controls = true
		}else{
			video.controls = false
		}
		
		$('.btn_full').click(function(){
			if (video.requestFullscreen) {
			  video.requestFullscreen();
			} else if (video.msRequestFullscreen) {
			  video.msRequestFullscreen();
			} else if (video.mozRequestFullScreen) {
			  video.mozRequestFullScreen();
			} else if (video.webkitRequestFullscreen) {
			  video.webkitRequestFullscreen();
			}
		})
		
		if($('.btn_skip')){
			$('.btn_skip').click(function(){
				if(videoBoo) video.currentTime = 43
				
			})
		}
		
		
		$('.rate li').click(function(){
			$('.rate li').removeClass('on')
			$(this).addClass('on')
			if(!$('.rate li').index(this)){
				video.playbackRate = 1
			}else{
				video.playbackRate = 1.2
			}
			//alert(video.playbackRate);
		})
		$('.rate li').eq(0).addClass('on')
		//id = setInterval('enterframe()',10)
		$('footer .nar').css({'display':'none'})
	}else{
		
		if(pageCode==4) t_time = 10
		else if(pageCode==5) t_time = 10
		else if(pageCode==6) t_time = 10
		$('.time .total').text(time_transform(t_time))
		
		bgm = document.getElementById('bgm');
		bgm.addEventListener('play', audio_playing);
		bgm.addEventListener('pause', audio_stop);

		//if(bgm) bgm.play();
		
		$('footer .nar').click(function(){
			if($('footer .nar').hasClass('on')){
				bgm.pause();
			}else{
				bgm.play();
			}
		})
		
		//ani_id = setInterval('enterframe()',10)
		if(pageCode==4){
			s_o = document.getElementById('s_o');
			s_x = document.getElementById('s_x');
			s_pop = document.getElementById('s_pop');
			quiz_start = document.getElementById('quiz_start');
			quiz_re = document.getElementById('quiz_re');
			quiz_next = document.getElementById('quiz_next');
			
			$('.btn_quiz_start').click(function(){
				$('body#c_04 .wrap #contents .intro').animate({'opacity':0},function(){
					$('body#c_04 .wrap #contents .intro').css({'display':'none'})
					$('body#c_04 .wrap #contents .quiz#q1').css({'display':'block','opacity':0}).animate({'opacity':1})
				})
				seekfn(.9)
				bgm.pause()
				quiz_start.play()
				enterframe()
			})
			obj = $('body#c_04 .wrap #contents .pop')
			$('.quiz li').click(function(){
				//alert(correct[quiz_num]-1 +"    "+ $(this).index())
				$(this).find('.correct').css({'display':'block'})
				if(correct[quiz_num]-1 == $(this).index()){//정답
					if(s_o) s_o.play()
					resultFn(true)
				}else{//오답
					if(s_x) s_x.play()
					life--;
					if(life ==0){//아쉽습니다
						resultFn(false)
					}else{//다시 한번 생각해보세요
						//alert("aaa")
						obj.find('img').css({'opacity':1})
						obj.css({'display':'block','opacity':0}).animate({'opacity':1})
						
						obj.find('img').css({'display':'none'})
						obj.find('img').eq(2).css({'display':'inline-block'})
						setTimeout(function(){
							
							obj.animate({'opacity':0},function(){
								obj.css({'display':'none'})
							})
							$('.quiz li .correct').css({'display':'none'})
						},2000)
					}
				}
			})
			$('body#c_04 .wrap #contents .quiz .btn_next').click(function(){
				nextFn()
			})
			$('body#c_04 .wrap #contents .result .btn_re').click(function(){
				answerArr = []
				quiz_num = 0;
				c_length = 0;
				life = 2;
				c_time = 0
				enterframe()
				clearInterval(ani_id)
				ani_id = setInterval('enterframe()',10)
				$('body#c_04 .wrap #contents .result').css({'display':'none'})
				$('.quiz li .correct').css({'display':'none'})
				$('body#c_04 .wrap #contents .intro').css({'display':'block','opacity':1})
				$('body#c_04 .wrap #contents .intro p').css({'opacity':0})
				//quiz_re.play()
				bgm.currentTime = 0
				bgm.play();
				seekfn(0)
			})
		}
	}
	$('.btn_play').click(function(){
		if(!$(this).hasClass('pause')){
			play()
		}else{
			pause()
		}
	})
	$('.seekbar p').click(function(e){
		
		var parentOffset = $(this).offset(); 
		
		var relX = e.pageX - parentOffset.left;
		relX = Math.floor(relX)
		var t = $(this).width()
		//$('.seekbar p span').css({"width":relX})
		//alert(relX)
		clearInterval(ani_id)
		ani_id = setInterval('enterframe()',10)
		seekfn(relX / t)
	})
	play()
	resizeFn()
	startFn()
}
function startFn(){
	if(videoBoo){
		id = setInterval('enterframe()',10)
	}
}

// 쿠키 저장하기
function setCookie(cName, cValue){
	cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
	document.cookie = cookies;
}

// 쿠키 가져오기
function getCookie(cName) {
	cName = cName + '=';
	var cookieData = document.cookie;
	var start = cookieData.indexOf(cName);
	var cValue = '';
	if(start != -1){
	   start += cName.length;
	   var end = cookieData.indexOf(';', start);
	   if(end == -1)end = cookieData.length;
	   cValue = cookieData.substring(start, end);
	}
	return unescape(cValue);
}
function audio_playing(){
	$('footer .nar').addClass('on')
}
function audio_stop(){
	$('footer .nar').removeClass('on')
}
$(window).load(function(){
	resizeFn()
})

$(window).resize(function(){
	resizeFn()	
})

function enterframe(){
	var arg
	
	if(pageCode == 1){//인트로
		if(video.currentTime > 43) $('.btn_skip').css({'display':'none'})
		else $('.btn_skip').css({'display':'block'})
	}
	else if(pageCode==4){//퀴즈
		if(!ani_start){
			tween1 = TweenLite.to($('body#c_04 .wrap #contents .intro p').eq(0), 1,{'opacity':1})
			tween2 = TweenLite.to($('body#c_04 .wrap #contents .intro p').eq(1), 1,{'opacity':1})
			tween3 = TweenLite.to($('body#c_04 .wrap #contents .intro p').eq(2), 1,{'opacity':1})
			tween4 = TweenLite.to($('body#c_04 .wrap #contents .intro p').eq(3), 1,{'opacity':1})
			tween2.pause()
			tween3.pause()
			tween4.pause()
		}else{
			if(c_time==200){
				tween2.seek(0)
				tween2.resume()
			}else if(c_time==300){
				tween3.seek(0)
				tween3.resume()
			}else if(c_time==400){
				tween4.seek(0)
				tween4.resume()
			}else if(c_time==900){
				clearInterval(ani_id)
			}
		}
	}else if(pageCode==5){//정리하기
		if(!ani_start){
			$('.step1 img').css({'margin-left':'1em'})
			tween1 = TweenLite.to($('.step1 img').eq(0), 1,{'opacity':1, 'margin-left':'0'})
			tween2 = TweenLite.to($('.step1 img').eq(1), 1,{'opacity':1, 'margin-left':'0'})
			tween3 = TweenLite.to($('.step1 img').eq(2), 1,{'opacity':1, 'margin-left':'0'})
			tween4 = TweenLite.to($('.step1 img').eq(3), 1,{'opacity':1, 'margin-left':'0'})
			tween5 = TweenLite.to($('.step1 img').eq(4), 1,{'opacity':1, 'margin-left':'0'})
			tween2.pause()
			tween3.pause()
			tween4.pause()
			tween5.pause()
		}else{
			//console.log(c_time)
			if(c_time==200){
				tween2.seek(0)
				tween2.resume()
			}else if(c_time==300){
				tween3.seek(0)
				tween3.resume()
			}else if(c_time==400){
				tween4.seek(0)
				tween4.resume()
			}else if(c_time==500){
				tween5.seek(0)
				tween5.resume()
			}
		}
	}else if(pageCode==6){//Outro
		if(!ani_start){
			$('.step1 img').eq(0).css({'margin-top':'.2em'})
			$('.step1 img').eq(1).css({'margin-top':'-.7em'})
			$('.step1 img').eq(2).css({'margin-top':'-1.2em'})
			tween1 = TweenLite.to($('.step1 img').eq(0), 1,{'opacity':1, 'margin-top':'1.2em'})
			tween2 = TweenLite.to($('.step1 img').eq(1), 1,{'opacity':1, 'margin-top':'.3em'})
			tween3 = TweenLite.to($('.step1 img').eq(2), 1,{'opacity':1, 'margin-top':'-.2em'})
			tween2.pause()
			tween3.pause()
		}else{
			//console.log(c_time)
			if(c_time==100){
				tween2.seek(0)
				tween2.resume()
			}else if(c_time==200){
				tween3.seek(0)
				tween3.resume()
			}
		}
	}
	ani_start = true
	if(videoBoo){
		$('.time .current').text(time_transform(Math.floor(video.currentTime)))
		$('.seekbar p span').css({"width":$('.seekbar p').width()*video.currentTime/video.duration})
		//console.log(video.currentTime/video.duration)
		$('.time .total').text(time_transform(Math.floor(video.duration)))
		
		if(Math.floor(video.currentTime) == Math.floor(video.duration)){
			$('#pop_next').css({'display':'block'}).animate({'opacity':1})
			finishBoo = true
			clearInterval(id)
			if(s_pop) s_pop.play()
			pause()
		}
		else $('#pop_next').css({'opacity':0, 'display':'none'})
	}else{
		if(Math.floor(c_time/100)==t_time){
			clearInterval(ani_id)
			$('#pop_next').css({'display':'block','opacity':0}).animate({'opacity':1})
			finishBoo = true
			if(s_pop) s_pop.play()
		}else{
			$('#pop_next').css({'display':'none'})
		}
		c_time++
		$('.seekbar p span').css({"width":$('.seekbar p').width()*c_time/t_time*0.01})
		//console.log(c_time/t_time*0.01)
		$('.time .current').text(time_transform(Math.floor(c_time/100)))
	}
}

function resizeFn(){
	var fh
	if(!mobileBoo){//pc버전
		fh = $('footer').height()
	}else{//모바일버전
		//$('#script').css({'bottom':0})
		//$('#pop_next').css({'bottom':0})
		$('.wrap .btn_footer').css({'display':'block'})
	}
	
	//컨텐츠 영역 리사이즈
	var wh
	if(mobileBoo){
		wh = document.body.clientHeight - $('.wrap footer').height()
		if($(window).width() < 1024){
			if($(window).width()*0.5625 > wh) {
				h = wh
				w = h*1.777777777777778
			}else{
				w = $(window).width()
				h = w*0.5625
			}
		}else{
			wh = $(window).height() - $('.wrap footer').height()
			w = 960
			h = w*0.5625
		}
	}else{
		wh = $(window).height() - $('.wrap footer').height()
		w = 960
		h = w*0.5625
	}
	
	$('.wrap #contents').css({'width':w, 'height':h})
	$('.wrap #contents .inner').css({'width':w, 'height':h})
	if(video) $('.wrap #contents #video').css({'width':w, 'height':h})
	var fs = $('.wrap #contents').width()/960*50;
	var l = ($(window).width() - $('.wrap #contents').width())/2
	var t = (wh - $('.wrap #contents').height())/2
	if(l<0) l = 0
	if(t<0) t = 0
	$('.wrap #contents').css({'font-size':fs+'px', 'margin-left':l, 'margin-top':t})
	$('.wrap #roadmap').css({'width':w,'height':h,'font-size':fs+'px','left':l,'top':t})
	$('body#c_04 .wrap #contents .result').css({'font-size':fs-(fs/6.5)+'px'})
	$('body#c_04 .wrap #contents .quiz').css({'height':h})
	
	if(!mobileBoo) $('body').css({'min-height':h+$('.wrap footer').height()})

	if(navBoo){
		if(mobileBoo){
			nav_w = $(window).width()
		}
		$('nav').css({'width':nav_w})
		$('nav .nav_inner').css({'width':nav_w})
		//if(!mobileBoo) $('.btn_nav_open').css({'margin-left':-$('.btn_nav_open').width()})
	}else{
		if(!mobileBoo) {
			nav_w = 242
			$('nav').css({'width':nav_w})
		}
		$('nav .nav_inner').css({'margin-left':-nav_w})
	}
	
	if(mobileBoo){
		if($(window).width() > 640){
			script_h = 92
		}else{
			script_h = 64
		}
	}
	else script_h = 123
	if(scriptBoo) $('#script').css({"height":script_h})
	
	
	//네비 중앙정렬
	t = (document.body.clientHeight-$('nav .open').height())/2
	
	$('nav .open').css({'margin-top':t})
	$('nav .close').css({'top':t})
}
/*비디오 관련*/
function play(){
	$('.btn_play').addClass('pause')
	if(videoBoo){
		video.play()
	}else{
		clearInterval(ani_id)
		ani_id = setInterval('enterframe()',10)
		if(tween1){
			seekfn(c_time/t_time*.01)
		}
		if($('footer .nar').hasClass('on')){
			bgm.pause();
		}else{
			bgm.play();
		}
	}
}
function pause(){
	$('.btn_play').removeClass('pause')
	if(videoBoo){
		video.pause()
	}else{
		//clearInterval(id)
		clearInterval(ani_id)
		if(tween1){
			tween1.pause()
			tween2.pause()
			tween3.pause()
			if(tween4) tween4.pause()
			if(tween5) tween5.pause()
		}
		$('footer .nar').removeClass('on')
		//alert("aaa")
		bgm.pause();
	}

}


function seekfn(arg){
	if(video) video.currentTime  = video.duration*arg
	else{
		var arg1
		var arg2
		c_time = Math.floor(t_time*100*arg)
		//console.log(c_time*.01)
		arg1 = c_time*.01
		tween1.seek(arg1)
		tween1.resume();
		if(pageCode==4){
			if(arg1-2 < 0){
				arg2 = 0
				tween2.seek(0)
				tween2.pause()
			}else{
				arg2 = arg1-2
				tween2.seek(arg2)
				tween2.resume();
			}
			if(arg1-3 < 0){
				arg2 = 0
				tween3.seek(0)
				tween3.pause()
			}else{
				arg2 = arg1-3
				tween3.seek(arg2)
				tween3.resume();
			}
			if(arg1-4 < 0){
				arg2 = 0
				tween4.seek(0)
				tween4.pause()
			}else{
				arg2 = arg1-4
				tween4.seek(arg2)
				tween4.resume();
			}
		}
		else if(pageCode==5){
			if(arg1-2 < 0){
				arg2 = 0
				tween2.seek(0)
				tween2.pause()
			}else{
				arg2 = arg1-2
				tween2.seek(arg2)
				tween2.resume();
			}
			if(arg1-3 < 0){
				arg2 = 0
				tween3.seek(0)
				tween3.pause()
			}else{
				arg2 = arg1-3
				tween3.seek(arg2)
				tween3.resume();
			}
			if(arg1-4 < 0){
				arg2 = 0
				tween4.seek(0)
				tween4.pause()
			}else{
				arg2 = arg1-4
				tween4.seek(arg2)
				tween4.resume();
			}
			if(arg1-5 < 0){
				arg2 = 0
				tween5.seek(0)
				tween5.pause()
			}else{
				arg2 = arg1-5
				tween5.seek(arg2)
				tween5.resume();
			}
		}
		else if(pageCode==6){
			if(arg1-1 < 0){
				arg2 = 0
				tween2.seek(0)
				tween2.pause()
			}else{
				arg2 = arg1-1
				tween2.seek(arg2)
				tween2.resume();
			}
			if(arg1-2 < 0){
				arg2 = 0
				tween3.seek(0)
				tween3.pause()
			}else{
				arg2 = arg1-2
				tween3.seek(arg2)
				tween3.resume();
			}
		}
		if(pageCode == 3){
			//alert(c_time*0.01)
			if(c_time*0.01 < t_time-1){
				bgm.currentTime = c_time*.01
			}
		}else{
			if(c_time*0.01 < t_time) bgm.currentTime = c_time*.01
		}
		//alert("aaa")
	}
}

/*퀴즈 관련*/
function nextFn(){
	clearInterval(quizid)
	quiz_num++
	$('body#c_04 .wrap #contents .quiz .a_area').css({'display':'none'})
	$('body#c_04 .wrap #contents .quiz .btn_next').css({'display':'none'})
	if(quiz_num==2){//퀴즈완료
		quiz_re.play()
		$('body#c_04 .wrap #contents .quiz').css({'display':'none'})
		$('body#c_04 .wrap #contents .result').css({'display':'block','opacity':0}).animate({'opacity':1})
		obj.animate({'opacity':0},function(){
			obj.css({'display':'none'})
		})
		$('body#c_04 .wrap #contents .result p.ox span').removeClass('on')
		$('body#c_04 .wrap #contents .result p.count span strong').text(c_length)
		$('body#c_04 .wrap #contents .result p.ox span').each(function(index, element) {
			if(!answerArr[index]) $(this).addClass('on')
        });
		ani_id = setInterval('enterframe()',10)
	}else{//다음퀴즈
		quiz_next.play()
		obj.animate({'opacity':0},function(){
			obj.css({'display':'none'})
		})
		$('body#c_04 .wrap #contents .quiz').css({'display':'none'})
		$('body#c_04 .wrap #contents .quiz').eq(quiz_num).css({'display':'block','opacity':0}).animate({'opacity':1})
	}
}
var quizid
function resultFn(boo){
	life = 2
	answerArr.push(boo)
	
	if(boo){//정답
		c_length++
		obj.css({'display':'block','opacity':0}).animate({'opacity':1})
		obj.find('img').css({'display':'none'})
		obj.find('img').eq(1).css({'display':'inline-block'})
	}else{//아쉽습니다.
		obj.css({'display':'block','opacity':0}).animate({'opacity':1})
		obj.find('img').css({'display':'none'})
		obj.find('img').eq(0).css({'display':'inline-block'})
	}
	$('body#c_04 .wrap #contents .quiz .a_area').eq(quiz_num).css({'display':'block','opacity':0}).animate({'opacity':1})
	$('body#c_04 .wrap #contents .quiz').eq(quiz_num).find('.btn_next').css({'display':'block'})
	if(quiz_num==0){
		nextAnimation(true)
	}
	clearInterval(quizid)
	quizid = setTimeout(function(){
		//alert("aaa")
		obj.find('img').animate({'opacity':0},100)
	},3000)
}
function nextAnimation(boo){
	if(boo){
		$('body#c_04 .wrap #contents .quiz').eq(quiz_num).find('.btn_next').css({'opacity':0}).animate({'opacity':1},500,function(){nextAnimation(false)})
	}else{
		$('body#c_04 .wrap #contents .quiz').eq(quiz_num).find('.btn_next').delay(300).animate({'opacity':0},500,function(){nextAnimation(true)})
	}
}


function time_transform(arg){
	v_min = Math.floor(arg/60)
	v_sec = arg%60
	if(String(v_min).length==1) v_min = "0"+ v_min
	if(String(v_sec).length==1) v_sec = "0"+ v_sec
	val = v_min+":"+v_sec
	return val;
}

function volumefn(arg){
	if(arg){
		$('.volume span').css({'display':'block'})
		$('.btn_sound').removeClass('mute')
	}else{
		$('.volume span').css({'display':'none'})
		$('.btn_sound').addClass('mute')
	}
	if(videoBoo) video.volume = arg
	if(bgm) bgm.volume = arg
	if(s_o) s_o.volume = arg
	if(s_x) s_x.volume = arg
	if(s_pop) s_pop.volume = arg
	if(quiz_start) quiz_start.volume = arg
	if(quiz_re) quiz_re.volume = arg
	if(quiz_next) quiz_next.volume = arg
	
}

function tabOnOffFn(boo){
	if(boo){//로드맵 켜기
	
		$('.wrap #roadmap_dimmed').css({'display':'block'})
		//alert("aaaa   " + pageCode)
		play_check = v_playing
		
		if(pageCode ==1 || pageCode ==2 || pageCode ==3){
			//alert("ccccc   " + pageCode)
			if(videoBoo) video.pause()
		}
		else{
			//alert("aaa")
			pause()
		}
	}else{//로드맵 끄기
		$('.wrap #roadmap_dimmed').css({'display':'none'})
		if(pageCode ==1 || pageCode ==2 || pageCode ==3){
			if(videoBoo){
				if($('.time .current').text()  != $('.time .total').text()) video.play()
			}
		}else{
			play()
		}
	}
}


function tabFn(arg){
	$('#roadmap .tab li').removeClass('on')
	$('#roadmap .tab li').eq(arg).addClass('on')
	
	$('.wrap #roadmap .roadmap_inner .tab_content').removeClass('on')
	$('.wrap #roadmap .roadmap_inner .tab_content').eq(arg).addClass('on')
	$('.wrap #roadmap .roadmap_inner .tab_content').eq(arg).find('table').removeClass('on')
	$('.wrap #roadmap .roadmap_inner .tab_content').eq(arg).find('table').eq(0).addClass('on')
	$('.wrap #roadmap .roadmap_inner .paging .num em.current').text('1')
	if(arg==0) $('.wrap #roadmap .roadmap_inner .paging .num em.total').text('2')
	else $('.wrap #roadmap .roadmap_inner .paging .num em.total').text('3')
	pageNum = 0
	tabNum = arg
}
function pagingFn(boo){
	if(boo){//next
		pageNum++
	}else{
		pageNum--
	}
	$('.wrap #roadmap .roadmap_inner .tab_content').eq(tabNum).find('table').removeClass('on')
	$('.wrap #roadmap .roadmap_inner .tab_content').eq(tabNum).find('table').eq(pageNum).addClass('on')
	$('.wrap #roadmap .roadmap_inner .paging .num em.current').text(pageNum+1)

}

function navFn(){
	if(!mobileBoo) nav_w = 220
	else{
		nav_w = $(window).width()
		//alert("aaa")
	}
	if(navBoo){//닫힘
		$('footer .nav').css({'background-position-x':10})
		$('nav .nav_inner').stop().animate({'margin-left':-nav_w},300,function(){
			//if($(window).width() < 1200) $('nav').css({'width':0})
			if(mobileBoo) $('nav').css({'width':0})
		})
		$('.btn_nav_open').animate({'margin-left':15})
		$('.wrap nav').css({'z-index':2})
		if($('footer .nar').hasClass('on')){
			if(mobileBoo) play()
			//alert("aaa")
		}
		if(mobileBoo) play()
	}else{//열림
		$('footer .nav').css({'background-position-x':-50})
		$('nav .nav_inner').css({'width':nav_w,'margin-left':-nav_w}).stop().animate({'margin-left':0},300)
		$('nav').css({'width':nav_w})
		$('.btn_nav_open').animate({'margin-left':-$('.btn_nav_open').width()-15})
		if(mobileBoo) $('.wrap nav').css({'z-index':4})
		if($('#script').height()) $('#script').animate({"height":0},200)
		if(mobileBoo) pause()
	}
	navBoo = !navBoo
}

function gopage(arg){
	if(arg == "next"){}
	else arg = "0"+arg
	
	var arg1 = xmlIndex+1
	arg1 = "0"+arg1
	
	if(finishBoo) studyProc('1080_'+classNum+'_'+arg1)
	location.href = arg+".html"
}