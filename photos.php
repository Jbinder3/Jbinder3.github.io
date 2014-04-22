<?php

    if (?_POST['action'] == "saveimage") {
        $filename = ?_POST['imagefilename'];
        $file = fopen($filename, "r");
        $contents = fread($file, filesize($filename));
        $contents = addslashes($contents);
        echo($contents);
        fclose($file);
    }
    
    exit();

?>