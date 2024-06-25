<?php 
#1st POST variable
$fileName = $_POST["filename"];
#2nd POST variable
$xmlContents = $_POST["xmlcontents"];
#remove backslashes from xml string (skip this for plain text)
$lastBackslashPos = strpos ($xmlContents, "\\");
while($lastBackslashPos >0){
   $xmlContents = substr($xmlContents,0,$lastBackslashPos)
      .substr($xmlContents,$lastBackslashPos+1,strlen($xmlContents));
   $lastBackslashPos = strpos ($xmlContents, "\\");
}
#write xml data to file on server
$fh = fopen($fileName, "w");
fwrite($fh, $xmlContents);
fclose($fh);
?>
 