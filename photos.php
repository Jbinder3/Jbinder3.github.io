<?php

    if (?_POST['action'] == "saveimage") {
        $filename = ?_POST['imagefilename'];
        $file = fopen($filename, "rb");
        $contents = fread($file, filesize($filename));
        echo($contents);
        fclose($file);
    }
    
    exit();

?>