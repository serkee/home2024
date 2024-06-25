$(function(){
	init()
})

function init(){
	// 스크롤 애니메이션
	AOS.init({
		duration: 1200,
		initClassName: 'aos-init', // class applied after initialization
		animatedClassName: 'aos-animate', // class applied on animation
	});

	if ($(".ui-select").length){
		$(".ui-select.type-sort").selectmenu({
			classes: {
				"ui-selectmenu-menu": "type-sort"
			}
		});
		$(".ui-select.type-normal").selectmenu({
			classes: {
				"ui-selectmenu-menu": "type-normal"
			}
		}).on('selectmenuchange selectmenucreate', function(event, ui) {
			let text = ui.item.value;
			if (["선택해 주세요", "입학시 소재지", "졸업시 소재지"].includes(text)) {
				$(this).addClass("default");
			}else{
				$(this).removeClass("default");
			}
		})
		$(".ui-selectmenu-button").each(function(){
			let text = $(this).find(".ui-selectmenu-text").text();
			if (["선택해 주세요", "입학시 소재지", "졸업시 소재지"].includes(text)) {
				$(this).prev().addClass("default");
			}
		});
	}
	if($(".ui-datepicker").length){
		$.datepicker.setDefaults({
			dateFormat: 'yymmdd',
			prevText: '이전 달',
			nextText: '다음 달',
			monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			dayNames: ['일', '월', '화', '수', '목', '금', '토'],
			dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
			dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
			showMonthAfterYear: true,
		});
		if($(".type-month").length){
			$( ".ui-datepicker" ).monthpicker({
				changeYear: true,
				monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
				monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
				yearRange:'c-2:c+2',
				dateFormat : "yy.mm"
			});
		}else{
			$( ".ui-datepicker" ).datepicker({
				changeMonth: true,
				changeYear: true,
				dateFormat : "yy.mm.dd"
			});
		}
		
	}

	

	//faq 슬라이드
	$(".faqList > ul > li").click(function () {
		$(this).find(".faqList__content-a").slideToggle();
		$(this).toggleClass("active");
	})

	// 탭
	if($(".ui-tab input[name='tab']").length){
		var idx = getUrlParameter('idx');
		
		$(".ui-tab input[name='tab']").prop('checked', false);
		$(".ui-tab input[name='tab']").eq(idx).prop('checked', true);
		if(idx == 0 ){
			$('.tab_content').addClass("active")
		}else{
			$('.tab_content').removeClass("active")
			$('.tab_content').eq(idx - 1).addClass("active");
			$('.tab_content').eq(idx - 1).find('> *').each(function(){
				if( !$(this).hasClass('aos-animate') ) $(this).addClass('aos-animate')
			})
		}
	}
	$(".ui-tab input[name='tab']").change(function(){
		var val = $("input[name='tab']:checked").val();
		if(val == 0){
			$('.tab_content').addClass("active")
		}else{
			$('.tab_content').removeClass("active")
			$('.tab_content').eq(val - 1).addClass("active")
			$('.tab_content').eq(val - 2).find('> *').each(function(){
				if( !$(this).hasClass('aos-animate') ) $(this).addClass('aos-animate')
			})
		}
		var currentUrl = new URL(window.location.href);
		var params = currentUrl.searchParams;
		params.set('idx', val - 1);
		currentUrl.search = params.toString();
		window.history.replaceState(null, '', currentUrl.toString());
	});
	// $(".notice__unit ul").on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
	// 	var i = (currentSlide ? currentSlide : 0) + 1;
	// 	console.log(i + '/' + slick.slideCount);
	// });
	$(".notice__unit ul").slick({
		autoplay: true,
		autoplaySpeed: 4000
	});

	if( $(".main").length ){
		$('html').css( 'overflow-x', 'hidden' );
	}

	if( !$(".container .notice").length ){
		$(".container").css( 'padding-bottom:', 100 );
	}

}

// 팝업
function openPop(tar, type, options){
	console.log(options)
	if(type == "alert"){
		tar.dialog({
			modal: true,
			width:options.width || "400px",
			// buttons: [
			// 	{
			// 	text: "확인",
			// 	  click: function() {
			// 		$( this ).dialog( "close" );
			// 	  }
			// 	}
			// ],
			buttons: options.buttons,
			dialogClass: 'alert',
			options
		})
	}else if(type == "popupL"){
		tar.dialog({
			modal: true,
			width:options.width || "1200px",
			// buttons: [
			// 	{
			// 	text: "확인",
			// 	  click: function() {
			// 		$( this ).dialog( "close" );
			// 	  }
			// 	}
			// ],
			buttons: options.buttons,
			dialogClass: 'popupL',
			options
		})
	}else if(type == "popupM"){
		tar.dialog({
			modal: true,
			width:options.width || "700px",
			buttons: options.buttons,
			dialogClass: 'popupM',
			options
		})
	}
}

//url 파라미터
var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = window.location.search.substring(1),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
		}
	}
	return false;
};