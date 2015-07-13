var Upload={
    'maxWidth'  : 600,
    'maxHeight' : 600,
    'rate'      : 1,
    'url'       : 'upload.php',
    'x'         : 0,
    'y'         : 0,
    'w'         : 0,
    'h'         : 0,
    'clacImgZoomParam' : function(maxWidth, maxHeight, width, height) {
        var param = {top:0, left:0, width:width, height:height};
        //console.log(param);
        if(maxWidth){
            rateWidth = width / maxWidth;
            rateHeight = height / maxHeight;
            if( rateWidth > rateHeight )
            {
                param.width =  maxWidth;
                param.height = Math.round(height / rateWidth);
                Upload.rate=rateWidth;
            }else
            {
                param.width = Math.round(width / rateHeight);
                param.height = maxHeight;
                Upload.rate=rateHeight;
            }
            /*param.left = Math.round((maxWidth - param.width) / 2);
             param.top = Math.round((maxHeight - param.height) / 2);*/
        }
        //console.log(Upload.rate);
        return param;
    },
    'change' : function(file) {
        // Get a reference to the fileList
        var files = !!file.files ? file.files : [];
        // If no files were selected, or no FileReader support, return
        if (!files.length || !window.FileReader) return;

        // Create a new instance of the FileReader
        var reader = new FileReader();

        // Read the local file as a DataURL
        reader.readAsDataURL(files[0]);

        // When loaded, set image data as background of div
        reader.onloadend = function(){
            var img=$('#photo');
            img.attr("src",this.result);
            $("#view_photo").attr("src",this.result);
            img.load(function(){
                // 加载完成
                var img=$('#photo');
                img.width('100%');
                img.height('100%');
                console.log("width:"+img.width());
                console.log("height:"+img.height());
                var rect = Upload.clacImgZoomParam(Upload.maxWidth, Upload.maxHeight, img.width(), img.height());
                img.width(rect.width);
                img.height(rect.height);
                /** rect 设置最大宽度和高度后的属性**/
                console.log("rect_width:"+img.width());
                console.log("rect_height:"+img.height());
                $("#preview").width(img.width()/3);
                $("#preview").height(img.width()/3*1);
                Upload.init();
            });
        }
    },

    'preview' : function(img, selection) {
        if (!selection.width || !selection.height){
            return;
        }
        var img=$("#view_photo");
        var scaleX =  $("#preview").width() / selection.width;
        var scaleY =  $("#preview").height() / selection.height;

        $('#preview img').css({
            width : Math.round(scaleX *  $("#photo").width()),
            height : Math.round(scaleY * $("#photo").height()),
            marginLeft : -Math.round(scaleX * selection.x1),
            marginTop : -Math.round(scaleY * selection.y1)
        });

        $(".startX").val(Math.round(selection.x1*Upload.rate));
        Upload.x = Math.round(selection.x1*Upload.rate);
        $(".startY").val(Math.round(selection.y1*Upload.rate));
        Upload.y = Math.round(selection.y1*Upload.rate);
        $(".width").val(Math.round(selection.width*Upload.rate));
        Upload.w = Math.round(selection.width*Upload.rate);
        $(".height").val(Math.round(selection.height*Upload.rate));
        Upload.h = Math.round(selection.height*Upload.rate);
    },
    'init' : function() {
        var width=$('#photo').width();
        var height=$('#photo').height();
        $('#photo').imgAreaSelect({
            aspectRatio : "1:1",
            handles : true,
            fadeSpeed : 200,
            onSelectChange : Upload.preview,
            //x1: 0, y1: 0, x2: 100, y2: 100
        });
    },
};

