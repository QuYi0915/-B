/**
 * Created by quyi on 2017/6/12.
 */
(function (window) {
    var $B = {};
    $B.infinity = null; //循环开关
    $B.startX = 0;  //开始时x位置
    $B.startTime = 0;  //开始时时间
    $B.left = 0;  //absolute left值
    $B.endX = 0;  //结束时x位置
    $B.endTime = 0;  //结束时时间
    $B.index = 0;  //用于标注当前位置
    $B.interval = null; //定时器；
    $B.isAutoPlay = false; //是否开启自动播放
    $B.isPcDrag = false;//是否开启pc滑动
    $B.time = 500;//动画时间切换下一张的速度时间；默认毫秒；
    $B.moveTime = 3000;//轮播的默认速度时间；
    $B.callBack=null;//callback 执行动画后的回调函数，用于标记当前图片active样式；
    var OFF = true;//动画阻塞开关；
    $B.init = function (CONFIG) {
        $B.contentBox = $(CONFIG.contentBox);  //外容器          -----------配置项
        $B.content = $(CONFIG.content);  //内整体容器            -----------配置项
        CONFIG.infinity ? $B.infinity = true : $B.infinity = false;    //-----------配置项
        CONFIG.autoPlay ? $B.isAutoPlay = true : $B.isAutoPlay = false;//-----------配置项
        //CONFIG.autoPlay&&($B.infinity=true);                   //如果开启自动播放默认开启循环
        CONFIG.pcDrag ? $B.isPcDrag = true : $B.isPcDrag = false;      //-----------配置项
        CONFIG.dragTime && ($B.time = CONFIG.dragTime);      //-----------配置项
        CONFIG.moveTime && ($B.moveTime = CONFIG.moveTime);      //-----------配置项
        (typeof (CONFIG.callBack)=='function') && ($B.callBack = CONFIG.callBack);      //-----------配置项
        $B.imgNumber = $B.content.find('img').length;              //有几张图片
        $B.imgWidth = $B.content.find('img')[0].offsetWidth;       //图片的宽度;
        $B.infinity && $B.content.css("left", -$B.imgWidth + "px");  //开启循环需要移动初始位置
        $B.infinity && ($B.index = 1);
        $B.isAutoPlay && $B.autoPlay();
        $B.contentBox.on("mouseenter", '', event, $B.stopPlay);
        $B.contentBox.on("mouseleave", '', event, $B.autoPlay);
        $B.bindEvent();
        return $B;
    };
    // 鼠标按下及touchstart
    $B.bindmousedown = function (e) {
        e.preventDefault();
        $B.startX = e.clientX || e.originalEvent.touches[0].clientX;
        $B.startTime = new Date().getTime();
        $B.left = parseFloat($B.content.css('left'));
        $B.drag = true;
        $B.isAutoPlay && $B.stopPlay();
    };
    // 鼠标移动及touchmove
    $B.bindmove = function (e) {
        if ($B.drag) {
            $B.content.css("left", ((e.clientX || e.originalEvent.touches[0].clientX) - $B.startX + $B.left) + "px");
        }
    };
    // 鼠标抬起及touchend
    $B.bindmouseup = function (e) {
        e.preventDefault();
        $B.endX = e.clientX || e.originalEvent.changedTouches[0].clientX;
        $B.endTime = new Date().getTime();
        if ($B.drag) {
            if (Math.abs($B.endX - $B.startX) > 100 || ($B.endTime - $B.startTime) < 120) {
                if ($B.endX - $B.startX < 0 && $B.index != $B.imgNumber - 1) {
//           左移动
                    ++$B.index;
                    $B.animatemove();
                } else if ($B.endX - $B.startX > 0 && $B.index != 0) {
//           右移动
                    --$B.index;
                    $B.animatemove();
                } else {
                    $B.animatemove();
                }
            } else {
                $B.animatemove();
            }
        }
        $B.drag = false;
    };
    // 是否循环
    $B.isinfinity = function () {
        if ($B.infinity) {
            if ($B.index == 0) {
                $B.index = $B.imgNumber - 2;
                $B.content.css("left", (-$B.imgWidth * $B.index) + 'px');
            } else if ($B.index == this.imgNumber - 1) {
                $B.index = 1;
                $B.content.css("left", (-$B.imgWidth * $B.index) + 'px');
            }
        }
    };
    // 移动动画
    $B.animatemove = function animatemove() {
        // 开启轮播但不开启循环。默认只运行一次；
        if (!$B.infinity && $B.index == $B.imgNumber) {
            $B.index = $B.imgNumber - 1;
            $B.stopPlay();
            return;
        } else if (!$B.infinity && $B.index == -1) {
            $B.index = 0;
            $B.stopPlay();
            return;
        }
        $B.offEvent();
        $B.content.css("transition", 'left ' + $B.time / 1000 + 's cubic-bezier(.25, .1, .25, 1)');
        $B.content.css("left", (-$B.imgWidth * $B.index) + 'px');
        var _this = $B;
        setTimeout(function () {
            $B.content.css("transition", '');
            _this.isinfinity();
            $B.bindEvent();
            OFF=true;
            $B.callBack();
        }, $B.time);
    };
    // 是否自动播放
    $B.autoPlay = function () {
        if ($B.isAutoPlay) {
            $B.interval = setInterval(function () {
                ++$B.index;
                if (!$B.infinity && $B.index == $B.imgNumber) {
                    $B.index = $B.imgNumber - 1;
                    $B.stopPlay();
                    OFF = true;
                    return;
                } else if (!$B.infinity && $B.index == -1) {
                    $B.index = 0;
                    $B.stopPlay();
                    OFF = true;
                    return;
                }
                $B.animatemove();
            }, $B.moveTime);
        }
    };
    // 停止自动播放
    $B.stopPlay = function () {
        clearInterval($B.interval);
        $B.interval = null;
    };
    // 绑定事件
    $B.bindEvent = function () {
        if ($B.isPcDrag) {
            $B.contentBox.on("mousedown", '', event, $B.bindmousedown);
            $B.contentBox.on("mousemove", '', event, $B.bindmove);
            $B.contentBox.on("mouseup mouseleave", '', event, $B.bindmouseup);
        }
        $B.contentBox.on("touchstart", '', event, $B.bindmousedown);
        $B.contentBox.on("touchmove", '', event, $B.bindmove);
        $B.contentBox.on("touchend", '', event, $B.bindmouseup);
    };
    //动画执行时解绑事件防止重复执行；
    $B.offEvent = function () {
        if ($B.isPcDrag) {
            $B.contentBox.off({
                'mousedown': $B.bindmousedown,
                'mousemove': $B.bindmove,
                'mouseup': $B.bindmouseup,
                'mouseleave': $B.bindmouseup
            });
        }
        $B.contentBox.off({
            'touchstart': $B.bindmousedown,
            'touchmove': $B.bindmove,
            'touchend': $B.bindmouseup
        });
    };
    //按钮点击移动；
    $B.btnClick=function (is) {
        if(OFF){
            OFF=false;
            $B.stopPlay();
            is?--$B.index:++$B.index;
            $B.animatemove();
        }
    };
    //左按钮点击 整体右移动；
    $B.clickLeft=function(){
        $B.btnClick(true);
    };
    //右按钮点击 整体左移动；
    $B.clickRight=function(){
        $B.btnClick(false);
    };

    window.$B = $B;
})(window);