# $B
支持PC拖动的轮播图，本插件依赖于jquery，请先引入jquery。

#  快速上手

首先你需要调整好你的HTML及CSS，使得一个外层容器固定大小，里面一个内层容器，内层容器中放图片即可，内层容器不用考虑层级；

简单的例子：

css code：
```
    img {
            width: 450px;
            height: 250px;
            float: left;
        }

        #contentbox {
            width: 450px;
            overflow: hidden;
            position: relative;
            height: 250px;
            margin:auto;
        }
        #content {
            width: 2250px;
            overflow: hidden;
            position: absolute;
            left: 0;
        }

```
html code：

```
<div id="contentbox">
    <div id="content" draggable="false">
        <img src='images/$B3.png' draggable="false">
        <img src='images/$B1.png' draggable="false">
        <img src='images/$B2.png' draggable="false">
        <img src='images/$B3.png' draggable="false">
        <img src='images/$B1.png' draggable="false">
    </div>
    <div class="btn">
        <button id="left">左</button><button id="right">右</button>
    </div>
</div>
```
从上面的code可以看出，轮播图的外层容器是id为contentbox的div，这个容器是轮播图的展示可视区域的大小；

然后里面的容器是id为content的div，这个容器装入5张图片，并且图片都是横向排列，

这个时候就可以使用$B进行制作轮播图了！

调用$B.init()传入配置信息；

```
    $B.init({
        contentBox:'#contentbox',  //配置外层容器
        content:"#content",        //配置内层移动容器
        infinity:true,              //是否开启循环
        autoPlay:true,              //是否自动轮播
        pcDrag:true,                //是否开启支持PC拖拽轮播
        dragTime:400,               //滑动动画速度
        moveTime:2000               //自动播放速度
    });
```
# 至此你的轮播图就实现了

# 配置项：

上面已经谈到外层容器和内层容器，接下来说下$B.init();

里面接收7个参数：

# contentBox
   
string，配置外层容器，可以填写id，class，注意是jquery选择器的写法；

# content

string，配置内层容器必须包括img轮播图，与contentBox一样为jquery选择器写法；
        
# infinity

boolean，配置轮播图是否开始循环模式，可选参数，默认为false；注意：为保证轮播图的流畅，开启infinity必须在首长图片插入最后一张图片，在原本计划最后一张图片后插入第一张图片

# autoPlay

boolean，配置轮播图是否自动播放，可选参数，默认为false；

# pcDrag

boolean，配置轮播图是否可以在PC端进行鼠标拖拽进行切换，可选参数，默认为false；

# dragTime

number，时间为毫秒，配置轮播图动作释放时的速度时间，可选参数，默认为500；

# moveTime

number，时间为毫秒，配置轮播图播放时间间隔，可选参数，默认为3000；


# 定义按钮操作轮播图左右切换：

# $B.clickLeft()

直接调用方法即可，轮播图会向右移动，显示左面的一张；

# $B.clickRight()

直接调用方法即可，轮播图会向左移动，显示右面的一张；


# 效果

下载code 执行index.html 即可
# 进阶

# 在需要点击轮播图标识符进行切换的时候可以采用修改$B.index来实现

我们看下面这段代码

html code:

```

    <div id="contentbox">
        <div id="content" draggable="false">
            <img src='images/$B3.png' draggable="false">
            <img src='images/$B1.png' draggable="false">
            <img src='images/$B2.png' draggable="false">
            <img src='images/$B3.png' draggable="false">
            <img src='images/$B1.png' draggable="false">
        </div>
        <div class="btn">
            <button id="left">左</button><button id="right">右</button>
        </div>
        <div class="msbtn">
            <ul>
                <li class="active"></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    </div>

```

需要使用class为msbtn下面的li来实现标示轮播图的功能，这个时候就需要使用$B.index来进行标识

js code:

```

    $(".msbtn li").each(function(i,val){
        $(val).click(function(){
            $B.index=i+1;
            $B.animatemove();
        })
    })

```

使用jquery的each方法进行遍历绑定点击事件，由于开启了循环，首尾各有一张重复图片，所以这里要i+1；然后调用$B.animatemove()进行轮播图的移动；

接下来实现下一个功能

# 轮播图移动后的callBack；

$B.init中允许传入一个callBack函数；callBack函数在轮播图每一次移动后调用，这样就可以满足通常的一个需求

# 标识轮播图的元素进行active切换；

```

    var config={
        contentBox:'#contentbox',  //配置外层容器
        content:"#content",        //配置内层移动容器
        infinity:true,              //是否开启循环
        autoPlay:true,              //是否自动轮播
        pcDrag:true,                //是否开启支持PC拖拽轮播
        dragTime:400,               //滑动动画速度
        moveTime:2000,               //自动播放速度
        callBack:function(){
            $(".msbtn li").removeClass('active');
            $(".msbtn li:eq("+($B.index-1)+")").addClass('active');
        }
    };
    $B.init(config);

```

首先清除全部class，然后再指定标识轮播的元素上添加active样式；

