<!-- Active X 비활성화 대응 : 플래시 -->
function flash(a,b,c,d) {
 var flash_tag = "";
 flash_tag = '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ';
 flash_tag +='codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" ';
 flash_tag +='WIDTH="'+a+'" HEIGHT="'+b+'"  id="'+d+'">';
 flash_tag +='<param name="movie" value="'+c+'">';
 flash_tag +='<param name="quality" value="high">';
 flash_tag +='<param name="wmode" value="transparent">';//플래시 배경 투명 설정
 flash_tag +='<embed src="'+c+'" quality="high" wmode="transparent" pluginspage="http://www.macromedia.com/go/getflashplayer" ';
 flash_tag +='type="application/x-shockwave-flash"  WIDTH="'+a+'" HEIGHT="'+b+'"></embed></object>'
 document.write(flash_tag);
}