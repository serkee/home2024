
$(function() {
	//메가메뉴
	$(".header .ham .ham__btn, .mega_wrap .mega .btn_close").click(function(){
		$(".header").toggleClass("mega_on");
	});

	var megaNum = 10000;
	$(".mega_wrap .nav__list > li > a").click(function(a){
		if($(window).width() < 1024){//모바일
			if($(this).next().length){
				a.preventDefault();
				$(".mega_wrap .nav__list-sub").slideUp(400)
				$(".mega_wrap .nav__list > li").removeClass("mOn")
				
				if(megaNum != $(this).parent().index()){
					$(this).next().slideToggle(400)
					$(this).parent().toggleClass("mOn")
					megaNum = $(this).parent().index()
				}
				else megaNum = 10000
			}
		}
	});

	//푸터 메뉴
	var footerNum = 10000;
	$(".footer .nav__list > li > a").click(function(a){
		if($(window).width() < 1024){//모바일
			if($(this).next().length){
				a.preventDefault();
				$(".footer .nav__list-sub").slideUp(400)
				$(".footer .nav__list > li").removeClass("mOn")
				
				if(footerNum != $(this).parent().index()){
					$(this).next().slideToggle(400)
					$(this).parent().toggleClass("mOn")
					footerNum = $(this).parent().index()
				}
				else footerNum = 10000
			}
		}
	});

	//상단이동이벤트
	$(".footer .lower__top").click(function(a){
		if(!$('body').hasClass('main')){
			a.preventDefault();
			$('html, body').animate({scrollTop: '0'}, 300);
		}
	});


	//모바일 테이블 드레그 안내
	$(".listTable").scroll(function(){
		if(!$(this).hasClass("scrollDone")) $(this).addClass("scrollDone");
	})

	//서브 페이지 모션
	$("body:not(.main)").addClass("load")

	//
	if($(".type-ani").length > 0){
		const io = new IntersectionObserver(entries => {
		  entries.forEach(entry => {
		  	// 관찰 대상이 viewport 안에 들어온 경우 'tada' 클래스를 추가
		    if (entry.intersectionRatio > 0) {
		      entry.target.classList.add('ani');
		    }
		    // 그 외의 경우 'tada' 클래스 제거
		    // else {
		    //   entry.target.classList.remove('ani');
		    // }
		  })
		})
		// 관찰할 대상을 선언하고, 해당 속성을 관찰시킨다.
		const boxElList = document.querySelectorAll('.type-ani-target');
		boxElList.forEach((el) => {
		  io.observe(el);
		})
	};

	$(".faq > ul > li .faq__tit").click(function(){
		if(!$(this).parent().hasClass("active")){
			$(".faq > ul > li").removeClass("active");
			$(this).parent().addClass("active");
			$(".faq > ul > li .faq__con").slideUp(400)
			$(this).parent().find('.faq__con').slideToggle(400)
		}else{
			$(".faq > ul > li").removeClass("active");
			$(".faq > ul > li .faq__con").slideUp(400)
		}
	});
	
	
	
	
	
	/*//gnb 드롭다운 배경처리
	$(".header .lower").append("<div class='bg_sub'></div>");
	$(".header .lower .nav > ul > li").mouseenter(function(){
		$(".header .lower").addClass("on");
		var idx = $(this).index();
		$(".bg_sub").height($(".header .lower .nav > ul > li").eq(idx).find(".sub").height());
	}).mouseleave(function(){
		$(".header .lower").removeClass("on");
	})
	
	//gnb 넓이 체크
	setTimeout(function(){
		var target = $(".header .lower .nav > ul");
		console.log(target.width());
		if(target.width() > 1170){
			$(".header .lower .nav").addClass("over_width");
		}
	},100)
	
	
	
	$('.tree').each(function(){
		var $this = $(this);
		$this.find('li').each(function(){   //li에
			if(!$(this).children('ul').length){ //자식 ul 없으면
				$(this).addClass('final');  //final 클래스 부여한다
			}
			if($(this).is(':last-child')){  //마지막 li이면
				$(this).addClass('last');   //last 클래스 부여한다
			}
			$(this).append('<span></span>');
		});
		$this.find('li>span').on('click',function(){ //span 클릭하면
			if($(this).parent('li').hasClass('unfold')){    //하위메뉴 열려 있을 경우
				$(this).parent('li').removeClass('unfold'); //닫고
			}else {  //하위메뉴 닫혀 있을 경우
				$(this).parent('li').addClass('unfold');    //연다
			}
		});
	});

	
	if($(".pop_scroll_box").length){
		$('html').addClass("full")
		//$(window).on('resize', resize_pop_scroll_fn)
		//resize_pop_scroll_fn();
	}

	if($(".tab_area").length){
		$(".tab_area").each(function(){
			var _this = $(this);
			_this.find("> ul > li > button").click(function(){
				var _idx = $(this).parent().index();
				$(this).parent().parent().find(">li").removeClass("active");
				$(this).parent().parent().find(">li").eq(_idx).addClass("active");
				$(this).parent().parent().parent().next().find("> .tab_content").removeClass("active");
				$(this).parent().parent().parent().next().find("> .tab_content").eq(_idx).addClass("active");
			})
		})
	}

	if($(".lnb").length){
		$(".lnb a").click(function(e){
			if($(this).next().length){
				e.preventDefault();
				var _idx = $(this).parent().index() + 1;
				activeLnb(_idx)
			}
		});
	}

	//lnb활성화 호출
	// var urlParams = new URL(location.href).searchParams;
	// var depth1 = urlParams.get('depth1');
	// var depth2 = urlParams.get('depth2');
	// if(depth1){
	// 	activeLnb(depth1,depth2)
	// }

	var depth1 = getParameterByName('depth1');
	var depth2 = getParameterByName('depth2');
	if(depth1){
	 	activeLnb(depth1,depth2)
	}
	

	//글쓰기
	if($(".board_list .txt_comment").length){
		$(".board_list .txt_comment").each(function(){
			$(this).parent().addClass("comment");
		});
	}




	
	$(".datepicker > input").datepicker({
		showOn: "button",
		buttonImage: "../resource/image/common/calendar.png",
		buttonImageOnly: true
	});

	$.datepicker.regional['ko'] = {
		closeText: '닫기',
		prevText: '이전달',
		nextText: '다음달',
		currentText: '오늘',
		monthNames: ['01(JAN)', '02(FEB)', '03(MAR)', '04(APR)', '05(MAY)', '06(JUN)',
			'07(JUL)', '08(AUG)', '09(SEP)', '10(OCT)', '11(NOV)', '12(DEC)'],
		monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월',
			'7월', '8월', '9월', '10월', '11월', '12월'],
		dayNames: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: ''
	};
	$.datepicker.setDefaults($.datepicker.regional['ko']);

	$('.calendar_ui').datepicker({
		// showOn: 'both',
		// buttonImage: '&amp;lt;?=$g4[path]?&amp;gt;/img/calendar.gif',
		// buttonImageOnly: true,
		buttonText: "달력",
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		yearRange: 'c-99:c+99',
		minDate: '+1d',
		beforeShowDay: function(day) {
			var result;
			// 포맷에 대해선 다음 참조(http://docs.jquery.com/UI/Datepicker/formatDate)
			var thisYear = $.datepicker.formatDate("yy", day);

			if (!result) {
				switch (day.getDay()) {
					case 0: // is sunday?
						result = [false, "date-sunday"];
						break;
					case 6: // is saturday?
						result = [true, "date-saturday"];
						break;
					default:
						result = [true, ""];
						break;
				}
			}

			return result;
		}
	});

	$(".calendar_ui.fix").datepicker("option", {
		changeMonth: false,
		changeYear: false,
		numberOfMonths: 3,
		yearSuffix: '-'
	});

	$(".ui-datepicker-calendar").append("<caption>테이블입니다.</caption>")
	$(".ui-datepicker-title > select").attr("title","기간선택")
	*/
})

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//LNB 활성화
function activeLnb(arg1, arg2){
	if(String(arg1).length){
		$(".lnb .depth_1 > li").removeClass("active");
		var tar = $(".lnb .depth_1 > li").eq(arg1 - 1);
		tar.addClass("active");
		if(String(arg2).length){
			$(".lnb .depth_2 > li").removeClass("active");
			tar.find(".depth_2 > li").eq(arg2 - 1).addClass("active");
		}
	}
}

//팝업 스크롤뷰
function resize_pop_scroll_fn(){
	var winH = $( window ).outerHeight();
	var headH = $(".wrap_popup .header_popup").outerHeight();
	var bottomH = $(".wrap_popup .btns.bottom").outerHeight() + 73;
	var totalH = winH - headH - bottomH;
	console.log(totalH, winH , headH , bottomH)
	$(".pop_scroll_box").height(totalH)
}