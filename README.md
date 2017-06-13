# $B
支持PC拖动的轮播图，本插件基于jquery，请先引入jquery。

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
   
    contentBox  
        
        string，配置外层容器，可以填写id，class，注意是jquery选择器的写法；
        
    content
        
        string，配置内层容器必须包括img轮播图，与contentBox一样为jquery选择器写法；
        
    infinity
    
        boolean，配置轮播图是否开始循环模式，可选参数，默认为false；注意：为保证轮播图的流畅，开启infinity必须在首长图片插入最后一张图片，
        在原本计划最后一张图片后插入第一张图片
        
    infinity
    
        boolean，配置轮播图是否开始循环模式，可选参数，默认为false；注意：为保证轮播图的流畅，开启infinity必须在首长图片插入最后一张图片，
        在原本计划最后一张图片后插入第一张图片
        
    
