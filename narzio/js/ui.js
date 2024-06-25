(function(a){jQuery.browser.mobile=/android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
if(window['console']==null) window['console']={log:function(){}};if(Array.prototype.forEach==null) Array.prototype.forEach=function(fnc){for(var i=0,len=this.length;i<len;i++){fnc(this[i],i,this);}};
Math.sub = function (n,m){return n>m?n-m:m-n;};
String.prototype.repeat = function(n){return new Array(n+1).join(this);};

console.log ( 'ver 0.4.3');
var contentMode, tileMode, oldScroll, singlePage, naviTimer, likeList, winWidth, winHeight;
var $layerTrigger;
var isRetina = true;
var ie8 = $.browser.msie && parseInt($.browser.version) <= 8;

/* onload */
$(document).ready(function(){

	if(!getCookie('pixel_ratio')) setCookie('pixel_ratio', window.devicePixelRatio, 365);
	
	if(!$('#container').length) singlePage = true;
	$(window).bind('resize', chkMode);
	chkMode();
	
	//navi control
	oldScroll = $(window).scrollTop();
	$(window).bind('onChangeContMode.naviCtrl scroll.naviCtrl', naviCtrl);
	
	
	//sns 
	likeList = new cookieList('conentIdList');

	$('.sns a.btnLike').die('click').live('click',function(){
		var like_count;
		if(likeList.items_len() > 0 ){
			if(likeList.items().join('').indexOf('content'+port_seq) > -1){
				alert('이미 선택 하셨습니다.');
				return false;
			}else{
				likeList.add('content'+port_seq);
			}
		}else{
			likeList.add('content'+port_seq);
		}
		$.ajax({
			type : 'post',
			url : '/portfolio/like_post.php',
			data : {port_seq : port_seq},
			success : function(data){
				if(data.indexOf('_OK_') > -1){
					like_count = data.replace('_OK_','');
					$('.sns a.btnLike').find('span').text(like_count)
				}else{
					alert('error 관리자에게 문의하세요');
				}
			},
			error:function(e){
				alert(e.responseText);
			}
		});
		return false;
	});

	setTileUI();
	setSortBtn();
	setFooterPos(); setTimeout(setFooterPos, 300); $(window).bind('onChangeContMode.setFooterPos', setFooterPos);
	$('body').setUI();
	
	
});

/* plugins */
(function($){

	//setUI
	$.fn.setUI = function(){
		var $this = $(this);
		if ($this.find('.visualWrap').length) $this.find('.visualWrap').fe_slideGallery({btnDisabledElem:'parent'});
		if ($this.find('#location_map').length) $this.find('#location_map').fe_setOfficialMap();
		if ($this.find('#people').length) $this.find('#people').fe_peopleGallery();
		if ($this.find('.acgSns .sns').length) $this.find('.acgSns .sns').fe_setSnsBox();
		$this.find('.close > button').bind('click.closeLayer', closeLayer);
		$this.find('.relatedList li a').fe_setLayerBtn();
		$this.onImgLoaded( setFooterPos );
	}
	
	$.fn.fe_tempVisible = function(bln){
		if ( bln ) {
			if ( $(this).parents(':hidden').length ) $(this).parents(':hidden').each(function(){
				$(this).data({
					'display':$(this).css('display'),
					'visibility':$(this).css('visibility')
				})
				$(this).addClass('fe_tempVisible').css('visibility','hidden').show();
			});
		} else {
			$('.fe_tempVisible').each(function(){
				$(this).css($(this).data()).removeClass('fe_tempVisible');
			});
		}
	}

	$.fn.fe_slideGallery = function(options){
		var opts = $.extend({}, $.fn.fe_slideGallery.defaults, options);
		return $(this).each(function() {
			//object
			var $this = $(this);
			var $imgContainer = $this.find(opts.imgContainer);
			var $imgWrap = $imgContainer.find(opts.imgWrap);
			var $imgArr = $imgContainer.find(opts.img);
			var $nextBtn = $this.find(opts.nextBtn);
			var $prevBtn = $this.find(opts.prevBtn);
			var $indicator = $this.find(opts.indicator);
			//number
			var stepWidth, totalWidth, maxMove;
			var startX,startY,startLeft,startTime,isV,isH,activeNum=opts.activeNum||0;
			var bc = opts.btnDisabledClass, ic = opts.indicatorClass;
			if ( $imgArr.length == 1 ) {
				if ( !$nextBtn.hasClass(bc) ) {
					$nextBtn.add($prevBtn).each(function(){
						var $chkElem = opts.btnDisabledElem == 'parent' ? $(this).parent() : $(this);
						$chkElem.addClass(bc);
						$(this).bind('click',function(){return false});
					});
					$indicator.bind('click',function(){return false});
					imgHeightChk();
					$this.data('galleryObject', true);
				}
				return;
			}
			//public method
			$this[0].mouseEnable = bindMouseEvent;
			$this[0].touchEnable = bindTouchEvent;
			$this[0].resetElement = resetElement;
			$this[0].activeFn = activeFn;

			init();

			function init() {
				resetElement();
				bindBtnEvent();
				bindTouchEvent(true);
				bindMouseEvent(true);
				$(window).bind('resize.fe_slideGallery',resizeFn);
				activeFn(0);

				imgHeightChk();
				$this.data('galleryObject', true);
			}
			
			function imgHeightChk(){
				var imgCnt = 0;
				$imgArr.each(function(i,o){$(o).load(onComp).error(onComp);});
				function onComp(){if (++imgCnt==$imgArr.length) chkHeight();}
			}

			//view
			function resetElement(){
				$this.fe_tempVisible(true);
				stepWidth = $imgContainer.outerWidth();
				totalWidth = stepWidth * $imgArr.length;
				maxMove = totalWidth - stepWidth;
				$imgWrap.width(totalWidth);
				$this.fe_tempVisible(false);
			}

			//event bind
			function bindTouchEvent(bln){
				if ( !('ontouchstart' in window) ) return;
				var method = bln ? 'addEventListener' : 'removeEventListener';
				$imgContainer[0][method]('touchstart',touchStart);
				$imgContainer[0][method]('touchmove',touchMove);
				$imgContainer[0][method]('touchend',touchEnd);
			}

			function bindMouseEvent(bln){
				var method = bln ? 'bind' : 'unbind';
				$imgContainer[method]('mousedown.fe_slideGallery',downFn);
			}

			function bindBtnEvent(){
				$($nextBtn).add($prevBtn).bind('click.fe_slideGallery',function(e){
					e.preventDefault();
					e.stopPropagation();
					var $chkElem = opts.btnDisabledElem == 'parent' ? $(this).parent() : $(this);
					if ( $chkElem.hasClass(opts.btnDisabledClass) ) return;
					chkActiveNum($(this).is(opts.nextBtn)?1:-1);
					activeFn();
					if ( typeof opts.onBtnClick == 'function' ) opts.onBtnClick(e);
				});

				$indicator.each(function(i,o){
					$(o).bind('click.fe_slideGallery',function(e){
						e.preventDefault();
						e.stopPropagation();
						if ( activeNum == i ) return;
						activeNum = i;
						activeFn();
						if ( typeof opts.onBtnClick == 'function' ) opts.onBtnClick(e);
					});
				});
			}

			//functions
			function touchStart(e){
				if ( chkSkipElem(e) ) return true;
				$imgWrap.stop(true);
				isV = isH = false;
				defineStart(e);
			}

			function touchMove(e){
				if ( !startX ) defineStart(e);
				var to = e.type.substr(0,5) == 'touch' ? e.targetTouches[0] : e;
				var moveX = startX-to.pageX;
				var moveY = startY-to.pageY;

				if ( !isV && !isH ) {
					if ( Math.abs(moveX) == Math.abs(moveY) ) return;
					else if ( Math.abs(moveX) > Math.abs(moveY) ) isH = true, isV = false;
					else isH = false, isV = true;
				}

				if ( isV ) {
					touchEnd();
					upFn();
					return;
				}

				e.preventDefault();
				var targetLeft = startLeft - moveX;

				var frontOver = targetLeft > 0;
				var backOver = targetLeft < -maxMove;
				if ( frontOver || backOver ) {
					var gap = frontOver ? targetLeft : Math.sub(-maxMove, targetLeft);
					var movePos = (frontOver?1:-1)*gap*(0.3+(100-gap > 0? ((100-gap )*0.001):0));
					targetLeft = (frontOver?0:-maxMove)+movePos;
				}
				$imgWrap.css('marginLeft', targetLeft);
			}

			function touchEnd(e){
				if ( e ) e.preventDefault();
				var currentLeft = parseInt($imgWrap.css('marginLeft'));
				var time = new Date().getTime() - startTime;
				var gap = Math.sub(startLeft,currentLeft);
				var isSwipe = time < 300 && gap/time > 0.3;
				var du;
				if ( isSwipe ) {
					chkActiveNum(currentLeft > startLeft ? -1 : 1);
					du = (stepWidth)-((gap/time)*100);
				} else {
					if ( currentLeft>0 ) activeNum = 0;
					else if(currentLeft < -maxMove ) activeNum = $imgArr.length - 1;
					else activeNum = Math.floor((Math.abs(currentLeft)+(stepWidth/2))/stepWidth);
				}
				activeFn(du);
			}

			function defineStart(e){
				var to = e.type.substr(0,5) == 'touch' ? e.targetTouches[0] : e;
				startX = to.pageX;
				startY = to.pageY;
				startLeft = (parseInt($imgWrap.css('marginLeft'))||0);
				startTime = new Date().getTime();
			}
			//touch end
			
			//mouse
			function downFn(e){
				if ( chkSkipElem(e) ) return true;
				e.preventDefault();
				$(document).bind('mousemove.fe_slideGallery',touchMove);
				$(document).bind('mouseleave.fe_slideGallery',upFn);
				$(document).bind('mouseup.fe_slideGallery',upFn);
				touchStart(e);
			}

			function upFn(e){
				if ( e ) e.preventDefault();
				$(document).unbind('mousemove.fe_slideGallery');
				$(document).unbind('mouseup.fe_slideGallery');
				touchEnd(e);
			}

			function chkActiveNum(n){
				activeNum += n;
				if ( activeNum < 0 ) activeNum = 0;
				else if ( activeNum > $imgArr.length - 1 ) activeNum = $imgArr.length - 1;
			}
			
			//control
			function btnCtrl() {
				var $n = opts.btnDisabledElem == 'parent' ? $nextBtn.parent() : $nextBtn;
				var $p = opts.btnDisabledElem == 'parent' ? $prevBtn.parent() : $prevBtn;
				if ( activeNum == 0 ) $n.removeClass(bc),$p.addClass(bc);
				else if ( activeNum == $imgArr.length-1) $n.addClass(bc),$p.removeClass(bc);
				else $n.removeClass(bc),$p.removeClass(bc);
				indicatorCtrl();
				chkHeight();
			}
			
			function indicatorCtrl() {
				$indicator.filter('.'+ic).removeClass(ic);
				$indicator.eq(activeNum).addClass(ic);
			}
			
			function chkHeight() {
				if ( !opts.checkHeight || !$this.data('galleryObject') ) return;
				var h = $imgArr.eq(activeNum).height();
				var oh = $imgArr.eq(activeNum).parent().outerHeight(true);
				if ( !h ) return;
				var arrowBtnTop = parseInt((h-$nextBtn.height())/2);
				if ( parseInt($nextBtn.parent().css('top')) != arrowBtnTop ) $nextBtn.parent().add($prevBtn.parent()).stop().animate({'top':arrowBtnTop},{easing:'easeOutCubic',duration:300});
				if ( $imgContainer.outerHeight() != oh ) $imgContainer.stop().animate({'height':oh},{easing:'easeOutCubic',duration:300});
			}

			function activeFn(du, n){
				if ( typeof n != 'undefined' ) activeNum = n;
				var targetLeft = -activeNum*stepWidth;
				if ( typeof du == 'undefined' ) du = 200 + (Math.sub(parseInt($imgWrap.css('marginLeft'))||0, targetLeft)*opts.autoDuration);
				if ( typeof opts.onStartSlide == 'function' ) opts.onStartSlide();
				$imgWrap.stop().animate({marginLeft:targetLeft},{duration:du,easing:'easeOutCubic',complete:function(){
					if ( typeof opts.onCompleteSlide == 'function' ) opts.onCompleteSlide();
				}});
				startX = startLeft = startTime = null;
				btnCtrl();
				$this[0].activeNum = activeNum;
				$this.trigger('onActive');
			}
			
			//resize
			function resizeFn(e){
				if ( $imgContainer.is(':hidden') ) return;
				if ( $imgContainer.outerWidth() != stepWidth ) {
					resetElement();
					activeFn(0);
				}
			}
		});

		//utils
		function chkSkipElem(elem){
			if ( !opts.skipElem ) return false;
			var arr = opts.skipElem.split('|'), bln;
			for ( var i = 0 ; i < arr.length ; i++ ) {
				if ( $(elem.target).is(arr[i]) ) {
					bln = true;
					break;
				}
			}
			return bln;
		}
	}

	$.fn.fe_slideGallery.defaults = {
		imgContainer:'.figure.visual',
		imgWrap:'.imgList',
		img:'.imgList li img',
		nextBtn:'.next a',
		prevBtn:'.prev a',
		btnDisabledClass:'disabled',
		btnDisabledElem:null,
		indicator:'.navi a',
		indicatorClass:'atv',
		checkHeight:true,
		autoDuration:0.5,
		skipElem:null,					//ex- 'p|span|.aaa'
		onStartSlide:null,
		onCompleteSlide:null,
		onBtnClick:null,
		activeNum:0
	}
	
	$.fn.fe_peopleGallery = function(){
		var $this = $(this);
		var $controlWrap = $(this).find('.related');
		var $imgContainer = $(this).find('.peopleGal');
		var $imgWrap = $(this).find('.peopleWrap');
		var $thumb = $controlWrap.find('.relatedList li'), $arrowBtn = $(this).find('.storyControl2 > a'), $pageBtn = $controlWrap.find('.storyControl > a');
		var currentNum=typeof e_idx != 'undefined' ? parseInt(e_idx):0, currentPage=0, totalPage = Math.ceil($thumb.length / 3);
		var pageWidth = $controlWrap.width();
		var resetTimer, snsBoxObj = {}, snsBoxLoader;

		$this.fe_slideGallery({
			imgContainer:'.peopleGal',
			imgWrap:'.peopleWrap',
			img:'.peopleWrap .sect',
			nextBtn:'.storyControl2 > a.next',
			prevBtn:'.storyControl2 > a.prev',
			btnDisabledClass:'disabled',
			indicator:'.related .relatedList li',
			indicatorClass:'atv',
			checkHeight:false,
			autoDuration:0.3,
			skipElem:'ontouchstart' in window ? null:'p|h1|h2',
			activeNum:currentNum
		}).bind('onActive',function(){
			if ( currentNum == this.activeNum ) return;
			currentNum = this.activeNum;
			resetPage();
			var snsURL = $thumb.eq(currentNum).find('a').attr('href');
			var param = getUrlParam(snsURL);
			param.uri = snsURL.replace(/\?.*$/, '');
			if ( snsBoxLoader ) snsBoxLoader.abort();
			if ( !snsBoxObj[currentNum] ) {
				snsBoxLoader = $.ajax({
					url:'/portfolio/people_sns_ajax.php', data:param, type:'get', dataType:'html',
					success:function(dt){
						snsBoxObj[currentNum] = $(dt);
						appendSnsBox( snsBoxObj[currentNum] );
					},
					error:function(){/*console.log ( 'error' );*/}
				});
			} else {appendSnsBox( snsBoxObj[currentNum] );console.log ( snsBoxObj );}

			function appendSnsBox($o){
				$this.find('.acgSns .sns').remove();
				$this.find('.acgSns').append($o);
				port_seq = param.port_seq;
			}
		});

		$(window).bind('onChangeContMode.fe_peopleGallery' , function(){
			$this.fe_tempVisible(true);
			$controlWrap.find('.relatedList').width($thumb.length*$thumb.outerWidth());
			pageWidth = $controlWrap.width();
			pageCtrl(0);
			if ( contentMode == 'flex' ) {
				$(window).bind('resize.fe_peopleGallery_flex',function(){
					if ( contentMode != 'flex' ) return false;
					$imgWrap.find('.sect').width($imgContainer.width()||winWidth);
					$this[0].activeFn(0);
				}).trigger('resize.fe_peopleGallery_flex');
			}
			else {
				$(window).unbind('resize.fe_peopleGallery_flex');
				$imgContainer.attr('style',null);
				$imgWrap.find('.sect').attr('style',null);
			}
			$this.fe_tempVisible(false);
		}).triggerHandler('onChangeContMode.fe_peopleGallery');

		resetPage();

		//bind event
		$controlWrap.bind('mouseenter.fe_peopleGallery focusin.fe_peopleGallery focus.fe_peopleGallery', function(){
			if ( resetTimer ) {
				clearTimeout(resetTimer);
				resetTimer = null;
			}
		});

		$controlWrap.bind('mouseleave.fe_peopleGallery focusout.fe_peopleGallery blur.fe_peopleGallery', function(){
			resetTimer = setTimeout( function(){
				currentPage = Math.floor(currentNum/3);
				pageCtrl();
			}, 3000 );
		});
		

		$thumb.find('a').bind('focus.fe_peopleGallery',function(e){
			if ( $(this).offset().left < $this.offset().left ) {currentPage--;pageCtrl(0);}
			else if ( $(this).offset().left > $this.offset().left + $this.width() ) {currentPage++;pageCtrl(0);}
		});

		//pageBtn
		if ( totalPage <= 1 ) $pageBtn.addClass('disabled');
		else {
			$pageBtn.bind('click.fe_peopleGallery',function(e){
				if ( $(this).hasClass('disabled') ) return false;
				e.preventDefault();
				if ( totalPage <= 1 || $controlWrap.find('.relatedList').is(':animated') ) return;
				currentPage += $(this).is('.prev') ? -1 : 1;
				pageCtrl();
			});
		}
		
		function resetPage(){
			if ( currentPage != Math.floor(currentNum/3) ) currentPage = Math.floor(currentNum/3), pageCtrl();
		};

		function pageCtrl(du){
			if (typeof du == 'undefined' ) du = 500;
			if ( currentPage < 0 ) currentPage = 0;
			else if ( currentPage > totalPage -1 ) currentPage = totalPage-1;
			$controlWrap.find('.storyPaging .atv').text(currentPage+1);
			$controlWrap.find('.relatedList').stop().animate({'marginLeft':-currentPage*pageWidth},{duration:du, easing:'easeOutCubic'});
			var $p = $pageBtn.filter('.prev'), $n = $pageBtn.filter('.next');
			if ( currentPage == 0 ) $n.removeClass('disabled'), $p.addClass('disabled');
			else if ( currentPage == totalPage -1 ) $n.addClass('disabled'), $p.removeClass('disabled');
			else $n.removeClass('disabled'), $p.removeClass('disabled');
		}
	}

	$.fn.fe_setOfficialMap = function(){
		if ( typeof daum == 'undefined' || !daum.maps || !daum.maps.LatLng ) return;
		$(this).fe_tempVisible(true);
		var $this = $(this);
		var oldWidth = $this.width();
		var position = new daum.maps.LatLng(37.401284373202365, 127.10864481096672);
		var map = new daum.maps.Map($this[0], {
			center: position,
			level: 4,
			mapTypeId: daum.maps.MapTypeId.ROADMAP
		});

		//add controller
		var zoomControl = new daum.maps.ZoomControl();
		map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
		var mapTypeControl = new daum.maps.MapTypeControl();
		map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);

		//add marker
		var marker = new daum.maps.Marker({position: position});
		marker.setMap(map);
		$(this)[0].map = map;
		$(window).bind('resize.fe_setOfficialMap', function(e){
			if ( $this.is(':visible') && $this.width() != oldWidth ) {
				map.relayout();
				map.setCenter(position);
				oldWidth = $this.width();
			}
		}).triggerHandler('resize.fe_setOfficialMap');
		$(this).fe_tempVisible(false);
	}
	
	$.fn.fe_setSnsBox = function(){
		var $this = $(this);
		$(this).each(function(i,o){
			var $o = $(o);
			$o.find('.snsHide').bind('click.fe_setSnsBox',function(e){
				e.preventDefault();
				$o.toggleClass('atv');
			});
		});
		$(window).bind('onChangeContMode.fe_setSnsBox',function(){
			if ( contentMode != 'flex' ) $this.removeClass('atv');
		});
	}

	$.fn.fe_setLayerBtn = function(options){
		var opts = $.extend({},{defineTrigger:false},options);
		$(this).each(function(i,o){
			$(o).bind('click.setLayerBtn',function(e){
					if ( $(this).parents('#people').length ) return true;
					var url = $(this).attr('href');
					if ( typeof port_seq != 'undefined' ) port_seq = $(this).data('seq') || port_seq;
					if ( opts.defineTrigger ) $layerTrigger = $(this);
					if ( !url || url == '#' || url == '#none' ) return false;
					else if ( singlePage || url.match('.pdf') ) return true;
					else {
						viewLayer(url);
						e.preventDefault();
					}
			});
		});
	}

	$.fn.onImgLoaded = function(fnc){
		if ( !fnc ) return;
		var $imgArr = $(this).find('img:visible'), cnt = 0;
		$imgArr.load(function(){if (++cnt == $imgArr.length) {fnc();}});
	}
})($);
//plugin end

//global functions
function setTileUI(){
	var $sec = $('.section');
	
	$sec.show().css('position','relative').find('.article').css({'left':0,'top':0,'position':'absolute'});
	$sec.filter(':not(:first)').hide();

	//popup button
	$sec.find('.article > a').fe_setLayerBtn({defineTrigger:true});
	
	//tile text ctrl
	$sec.find(".article span").each(function(i,o){$(o).data('oriText',$(o).html());});
	$(window).unbind('onChangeTileMode.setTileUI onChangeContMode.setTileUI').bind('onChangeTileMode.setTileUI onChangeContMode.setTileUI', function(){
		var spanMaxText = 9999;
		if ( tileMode <= 320) spanMaxText = 80;
		else if (tileMode <= 480) spanMaxText = 140;
		$('.article span').each(function(i,o){ $(o).html(fncCutByte($(o).data('oriText'),spanMaxText,'...')); });

		if ( tileMode >= 720 ) {
			$('.wide').each(function(i,o){
				if (parseInt($(o).find('em').height()) > 50) $(o).find('span').height('93px');
				else if (parseInt($(o).find('em').height()) > 25) $(o).find('span').height('110px');
				else $(o).find('span').height('129px');
				$(o).find('span').css('marginTop','14px');
			});
			$('.wall').each(function(i,o){
				if(parseInt($(o).find('em').height()) > 60) $(o).find('span').height('52px');
				else if(parseInt($(o).find('em').height()) > 30) $(o).find('span').height('75px');
				else $(o).find('span').height('92px');
				$(o).find('span').css('marginTop','13px');
			});
		}
		else $('.wide, .wall').find('span').height('35px').css('marginTop','0');

		assemble($('#container').data('used') ? 800 : 0 , 800);
		$('#container').data('used', true);
	}).trigger('onChangeTileMode.setTileUI');


	//more button
	if ( $sec.length <= 1 ) $sec.find('> div:last-child').removeClass('more');
	else {
		$sec.filter(':not(:first)').hide().filter(':not(:last)').find('div:last-child').addClass('more');
		$sec.each(function(i,o){
			var $o = $(o);
			$o.find('.more').bind('click',function(e){
				e.preventDefault();
				if ( $o.next().length ) {
					$o.next().show();
					var $ts = tileMode <= 480 ? $(this) : $o.next();
					var targetScroll = $ts.offset().top;
					//alert(tileMode)
					$('#section_1 button').hide();
					secImgEnable($o.next());
					assemble();
					windowScroll(targetScroll-$('.headerWrap').outerHeight(true)+9, {duration:1000,easing:'easeInOutCubic',delay:100,chkOver:winHeight>$o.height(),complete:function(){$o.next().find('a:first').focus()}});
					//alert('aaa')
				}
				else{
					$('#section_2').hide();
					$('#section_1 button').show();
				}
			});
		});
	}

	secImgEnable($sec.filter(':first'));
	function secImgEnable( sec ) {
		sec.filter(':first').find('.article img').each(function(){
			if ( !$(this).attr('src') ) $(this).attr('src' , $(this).data('src') ).attr('data-src','');
		});
	}

	/* hover - ie6 */
	$(".section .figure").hover(function () {
		$(this).addClass("hover");
	}, function () {
		$(this).removeClass("hover");
	});
}

function setSortBtn() {
	var $sort = $('.sort');
	if ( !$sort.length ) return;
	var $btnArr = $sort.find('a');
	var dataIndex = $sort.attr('data-index');
	$btnArr.eq(dataIndex).addClass('atv').data('order','ASC');
	$btnArr.not(':eq('+dataIndex+')').removeClass('atv descend').data('order','DESC');

	$btnArr.bind('click.sort',function(e){
		e.preventDefault();
		var url = sort_url;
		var $btn = $(this);
		var order = $btn.data('order');

		var param = {'menu_cate':menu_cate,'port_cate':port_cate,'order_by_column':$btn.data('column'),'order_by':order};
		dimmCtrl(true);
		$.ajax({
			url:url, type:'get', dataType:'html', data:param,
			success:function(dt){
				$('#container').stop().animate({'opacity':0},{duration:200, complete:function(){
					$btnArr.removeClass('atv descend').data('order','DESC');
					$btn.addClass(order == 'ASC' ? 'descend' : 'atv');
					$btn.data('order', order == 'ASC' ? 'DESC' : 'ASC');
					$('#container').empty();
					var $dt = $(dt);
					$('#container').append($dt).animate({'opacity':1}, {duration:500});
					setTileUI();
					$('#container').onImgLoaded(setFooterPos); setTimeout(setFooterPos, 300);
					dimmCtrl(false);
				}});
			},
			error:function(e){
				dimmCtrl(false);
			}
		});
	});
	$(window).bind('resize.sort',function(){
		var cl = $('#container').offset().left;
		var targetLeft = cl - $sort.width() - 5;
		if ( targetLeft - 5 < 0 || $.browser.mobile ) targetLeft = 5;
		$('.sort').css('left', parseInt(targetLeft) );
	}).triggerHandler('resize.sort');

	$sort.show();
}

function chkMode(){
	//contentMode : full, slim, flex
	winWidth = window.innerWidth || $(window).width();
	winHeight = window.innerHeight || $(window).height();

	var t = '';
	if ( winWidth <= 480 ) t = 'flex';
	else if ( winWidth <= 720 ) t = 'slim';
	else t = 'full'
	if ( t != contentMode ) contentMode = t, $(window).trigger('onChangeContMode');
	
	//tileMode : 320, 480, 720, 940, 1200
	var n;
	if ( winWidth <= 320 ) n = 320;
	else if ( winWidth <= 480 ) n = 480;
	else if ( winWidth <= 720 ) n = 720;
	else if ( winWidth <= 960 ) n = 960;
	else if ( winWidth <= 1200 ) n = 1200;
	else n = 9999;
	if ( n != tileMode ) {
		tileMode = n;
		$(window).trigger('onChangeTileMode');
	}
}

function naviCtrl() {
	var $wrap = $('.headerWrap');
	if ( naviTimer ) clearTimeout(naviTimer);
	if ( contentMode == 'full' ) {
		if ( (parseInt($wrap.css('marginTop'))||0) ) {
			$wrap.stop().css('marginTop',0);
			$('.sort').stop().css({'marginLeft':0,'opacity':1});
		}
		return;
	}
	if ( $(window).scrollTop() < 0 || $(window).scrollTop() > $(document).height() - winHeight ) return;


	naviTimer = setTimeout(function(){
		var currentScroll = $(window).scrollTop();
		var targetTop = currentScroll > oldScroll ? -63 : 0;
		var targetAlpha = currentScroll > oldScroll ? 0 : 1;
		if ( currentScroll == oldScroll ) return;
		if ( parseInt($wrap.css('marginTop')) != targetTop ) {
			$wrap.stop().animate({'marginTop':targetTop},{easing:'easeOutCubic', duration:300});
			$('.sort').stop().animate({'marginLeft':targetTop, 'opacity':targetAlpha},{easing:'easeOutCubic', duration:300});
		}
		naviTimer = null;
		oldScroll = currentScroll;
	}, 100);
}

function assemble(du, cdu) {
	var delay = ie8 ? 5 : 0;
	if ( !delay ) init();
	else setTimeout( init, delay );
	function init() {
		if ( typeof du == 'undefined' ) du = 800;
		if ( typeof cdu == 'undefined' ) cdu = 0;
		var cw = tileMode > 480 ? 240 : $('.section .article.single, .section .article.figure').eq(0).outerHeight(true);
		if (!cw) cw = 240;

		$('.section').each(function(i,o){
			if ( $(o).css('display') == 'none' ) return true;
			var $sec = $(this);
			var tw = parseInt($('#container').css('maxWidth'));
			var mat = [];
			mat.push (getEmptyColumn(cw,tw));

			$sec.find('.article:visible').each(function(i,o){
				var w = tileMode > 480 ? Math.ceil($(this).width() / cw) : 1;
				var h = tileMode > 480 ? Math.ceil($(this).height() / cw) : 1;
				var tx, ty, isPos = false;
				
				for ( var i = 0 ; i < mat.length ; i++ ) {

					for ( var j = 0 ; j < mat[i].length ; j++ ){

						var chkW = mat[i][j] == 0 && j + w <= mat[i].length;
						if ( chkW ) {
							var cnt = 0;
							for ( var k = j ; k < mat[i].length ; k++ ) {
								cnt++;
								if ( cnt <= w && mat[i][k] == 1 ) {chkW = false; break;}
							}
						}

						if ( chkW ) {
							var chkH = i == mat.length-1 || h == 1;
							if ( !chkH ) {
								var bln = true;
								for ( k = i ; k < mat.length ; k++ ) {
									if ( mat[k][j] == 1 ) { bln = false; break;}
								};
								chkH = bln;
							}
						}

						if ( chkW && chkH ) {
							isPos = true;
							break;
						}
					}
					if ( isPos ) break;
				}

				if ( !isPos ) {
					i = mat.length;
					j = 0;
				}

				for ( var l = 0 ; l < w ; l++ ) {
					for ( var m = 0 ; m < h ; m++ ) {
						if ( !mat[m+i] ) mat.push(getEmptyColumn(cw,tw));
						mat[i+m][j+l] = 1;
					}
				}

				$(this).stop().animate({'left':j*cw,'top':i*cw},{duration:du,easing:'easeInOutCubic'});
			});

			if ( !cdu ) $(this).height(mat.length*cw), $(window).triggerHandler('resize.sort');
			else $(this).stop().animate({'height':mat.length*cw}, {duration:Math.min(cdu,du),easing:'easeInOutCubic', complete:function(){$(window).triggerHandler('resize.sort');}});
		});
	}

	function trace(mat){ //for matrix confirm
		var str = '';
		for ( var i = 0 ; i < mat.length ; i++ ) {
			str += mat[i].toString();
			str += '\n';
		};
		console.log ( str );
	};

	function getEmptyColumn ( cw, tw ) {
		var arr = [];
		for ( var i = 0 ; i < Math.floor(tw/cw) ; i++ ) { arr.push(0); }
		return arr;
	}
}

function setFooterPos(){
	if ( $('#layPop:visible').length ) {
		$("#conFooter").css('top',Math.max($("#layPop").outerHeight(true), $(".layBody").outerHeight(true))+parseInt($('#layPop').css('top')));
		if ( contentMode != 'flex' || (typeof navi_idx != 'undefined' && navi_idx == 0 )) $("#conFooter").show();
		else $("#conFooter").hide();
	}
	else $('#conFooter').attr('style','').show();
}

function viewLayer(url){
	dimmCtrl(true);
	$.ajax({
		url:url, type:'get', dataType:'html', data:'layer=Y',
		success:function(dt){
			$('#layPop').remove();
			if ( $('#conFooter').length ) $('#conFooter').before(dt);
			else $('#wrap').append(dt);
			$('#layPop').setUI();
			containerCtrl(false);
			dimmCtrl(false);
			setFooterPos(); setTimeout(setFooterPos, 300);
		},
		error:function(e,t,h){
			dimmCtrl(false);
		}
	});
}

function closeLayer(e){
	if ( e ) {
		e.preventDefault();
		var ac = $(e.target).parent().data('action');
		if ( singlePage && ac ) location.href = ac;
	}
	dimmCtrl(false);
	containerCtrl(true);
	$('#layPop').hide();
	
	$('#popFooter').css('display','none')
	
	$('#container').css('display','block')
	$('#conFooter').css('display','block')
	
	$("#layPop").load("blank.html");
	
	setFooterPos(); setTimeout(setFooterPos, 300);
	selectArg = 1000
	setGnb()
}

function containerCtrl( bln ) {
	var $con = $('#container');
	if ( !$con.length ) {
		if ( !bln ) windowScroll(0);
		return;
	}
	if ( bln ) {
		$con.show().find('.section').addClass('hide');
		assemble();
		$('.sort').show();
		setTimeout(function(){
			$con.find('.section').removeClass('hide');
			if ( $layerTrigger ) {
				windowScroll($layerTrigger.offset().top-$('.headerWrap').outerHeight(true)+9, {complete:function(){
					$layerTrigger.focus();
					$layerTrigger = null;
				}});
			}
		},10);
	} else {
		$con.hide();
		$('.sort').hide();
		windowScroll(0);
	}
}

function windowScroll(n,options){
	var opts = $.extend({}, {duration:500,easing:'easeInOutCubic',delay:0,chkOver:true,complete:function(){}}, options);
	if ( tileMode <= 480 && $.browser.mobile ) opts.duration = 0;
	var $scrollElem = $.browser.msie ? $('html') : $('body');
	if ( opts.chkOver && !ie8 ) {
		var dh = $(document).height(), wh = winHeight;
		if ( n > dh - wh) n = dh - wh;
	}
	
	$scrollElem.stop().delay(opts.delay).animate({scrollTop:n},opts);
}

function dimmCtrl(bln){
	if ( bln ) {
		if ( !$('#dimm').length ) $('body').append($('<div />',{'id':'dimm'}));
		$('#dimm').height(winHeight).css('top', 0).show();
	}
	else $('#dimm').hide();
}

function goSNS(val, url){
	var opt;
	switch (val) {
		case "facebook":
			opt = "width=770,height=450";
			break;
		case "yozm":
			opt = "width=450,height=350";
			break;
		default:
			opt = "";
	}
	var a = window.open(url, val, opt);
	if ( a ) a.focus();
}

//utils
function clipboard(url){
	if ($.browser.msie) window.clipboardData.setData("Text", url);
	else temp = prompt("해당 글의 단축 URL입니다.\nCtrl+C를 눌러 클립보드로 복사하세요", url);
}

function fncCutByte(str, len, tail) {
	var l = 0;
	for (var i=0; i<str.length; i++) {
		l += (str.charCodeAt(i) > 128) ? 2 : 1;
		if (l > len) return str.substring(0,i) + tail;
	}
	return str;
}

function getObjList( obj , options ) {
	var opts = { skipSub:false, subObj:'[object Object]', title:null, use:'html' };
	if ( $ && $.extend ) opts = $.extend( {}, opts, options );
	else console.log ( 'not loaded jquery. use default options');
	var str = '', ss=opts.skipSub, so=opts.subObj, t=opts.title, u=opts.use, ls='-'.repeat(20);
	for ( var s in obj ) {
		str += s+":"+typeof(obj[s])+'='+obj[s]+gl();
		if ( !ss ) {
			var subChk = false;
			if ( typeof so == 'object' ) {
				for ( var i = 0 ; i < so.length ; i++ ) { if ( obj[s] == so[i] ) str += getObjList(obj[s], {skipSub:ss, subObj:so, title:s, use:u}); }
			} else if ( typeof so == 'string' && obj[s] == so ) str += getObjList(obj[s], {skipSub:ss, subObj:so, title:s, use:u});
		}
	}
	if (t) str = ls+t+ls+gl()+str+ls+'//'+t+ls+gl();
	function gl() { return u == 'html' ? '<br />' : '\n' };
	return str;
}

function getUrlParam(url, vars) {
	var obj = {};
	(url||location.search).replace(/[^?]*(\?[^#]*|).*/, '$1')
	.replace(/([^?&]+)=([^&#]*)/g, function(str, name, val){obj[name]=decodeURIComponent(val);});
	return vars ? obj[vars] : obj;
}

//cookie
function setCookie(c_name, value, exdays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toGMTString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name) {  
	var i,x,y,ARRcookies=document.cookie.split(";");  

	for (i=0;i<ARRcookies.length;i++) {
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name) {
			return unescape(y);
		}
	}
	return undefined;
}

function deleteCookie(cookieName) {  
	try {
		var expireDate = new Date();
		expireDate.setDate(expireDate.getDate() - 1);
		var c_value="" + ((expireDate==null) ? "" : "; expires="+expireDate.toGMTString());
		document.cookie = cookieName + "=" + c_value;
	} catch (e) {
		alert(e.message);
	}
}

function cookieList( cookieName ) {
	var cookie = $.cookie(cookieName);
	var items = cookie ? cookie.split(/,/) : new Array();
	return {
		'add' : function(val){
			items.push(val);
			$.cookie(cookieName, items.join(','), { expires : 365, path : '/' });
		},
		'clear' : function(){
			items = null;
			$.cookie(cookieName, null);
		},
		'items' : function(){
			return items;
		},
		'items_len' : function(){
			return items.length;
		}
	}
}

function lodingFormCheck(){
	if($(".loadingForm[data-href*='.php']").length){
		$(".loadingForm[data-href*='.php']").each(function(i,o){
			var tgURL = $(o).attr("data-href");
			var tgID = $(o).attr("data-targetid");
			$.ajax({
				type : 'get',
				url : tgURL,
				success : function(data){
					$("#"+tgID).html(data);
				},
				error:function(e){
					alert(e.responseText);
				}
			});

		});
	}
}