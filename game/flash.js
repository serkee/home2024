// 플래시 object 코드 출력 함수
function flash(flashid, flashfilename, flashwidth, flashheight, flashvars) {
	document.write('<object id="' + flashid + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="'+ flashwidth +'" height="'+ flashheight +'">');
	document.write('<param name="allowScriptAccess" value="always" />');
	document.write('<param name="movie" value="'+ flashfilename +'">');
	if (flashvars) document.write('<param name="flashVars" value="'+ flashvars +'">');
	document.write('<param name="wmode" value="transparent">');
	document.write('<embed name="' + flashid + '"');
	if (flashvars) document.write(' flashVars="'+ flashvars +'" ');
	document.write(' src="'+ flashfilename +'" width="'+ flashwidth +'"wmode=transparent height="'+ flashheight +'" ');
	document.write(' allowScriptAccess="always" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" >');
	document.write('</embed>');
	document.write('</object>');
}

