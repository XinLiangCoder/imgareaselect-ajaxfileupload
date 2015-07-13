<?php
header("Content-type:text/html;charset=utf-8");
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
	if ((($_FILES["file"]["type"] == "image/gif")
			|| ($_FILES["file"]["type"] == "image/jpeg")
			|| ($_FILES["file"]["type"] == "image/pjpeg")
			|| ($_FILES["file"]["type"] == "image/png"))){
//			    echo "Upload: " . $_FILES["file"]["name"] . "<br />";
//			    echo "Type: " . $_FILES["file"]["type"] . "<br />";
//			    echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
//			    echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br />";
//                echo "X:".$_POST['x']."<br />";
//                echo "Y:".$_POST['y']."<br />";
//                echo "W:".$_POST['w']."<br />";
//                echo "H:".$_POST['h']."<br />";
			      move_uploaded_file($_FILES["file"]["tmp_name"],
			      "upload/" . $_FILES["file"]["name"]);
			      //echo "Stored in: " . "upload/" .  $_FILES["file"]["name"];
					$src = 'upload/'.$_FILES["file"]["name"];
					if($_FILES["file"]["type"]== "image/jpeg"||$_FILES["file"]["type"] == "image/pjpeg"){
                $img_r = imagecreatefromjpeg($src);
            }else if($_FILES["file"]["type"] == "image/png"){
                $img_r = imagecreatefrompng($src);
            }else if($_FILES["file"]["type"] == "image/gif"){
                $img_r = imagecreatefromgif($src);
            }

            $dst_r = ImageCreateTrueColor($_POST['w'],$_POST['h'] );

            imagecopyresampled($dst_r,$img_r,0,0,$_POST['x'],$_POST['y'],
                $_POST['w'],$_POST['h'],$_POST['w'],$_POST['h']);

        $imgname = "upload/small_".$_FILES["file"]["name"];
        imagejpeg($dst_r,$imgname);
        $data['filename'] = $imgname;
        $data['status']   = 'success';
        if ($_POST['type']=='form') {
            echo '<img src="'.$imgname.'" alt=""/>';
        } else {
            echo json_encode($data);
        }
	  }else{
        if ($_POST['type']=='form') {
            echo "你没有选择图片，<a href='formpost.html'> 返回 </a>";
        } else {
            echo json_encode(array('status'=>'error','mes'=>'请选择图片！'));
        }
	  }
	exit;
}