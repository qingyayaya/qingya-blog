---
title: JSXGraph - 前端交互式几何库
date: 2021-10-17 18:00:00
cover: https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/cover/cover11.png
---

<link rel="stylesheet" type="text/css" href="https://gcore.jsdelivr.net/npm/jsxgraph@1.3.2/distrib/jsxgraph.css"/>

<script type="text/javascript" src="https://gcore.jsdelivr.net/npm/jsxgraph@1.3.2/distrib/jsxgraphcore.js"></script>
<style type="text/css">
.jxgbox {
    width: 500px;
    height: 500px;
    margin-left: auto;
    margin-right: auto;
}
@media screen and (max-width: 500px) {
.jxgbox {
    width: 320px;
    height: 320px;
}
}
.widget {
    text-align: center;
}
.myborder {
    background-color: transparent;
    border: 1px solid #aa2233;
    padding: .375rem .75rem;
    border-radius: .25rem;
    margin-right: 0.7rem;
    margin-top: .4rem;
    margin-bottom: .4rem;
    font-size: 1rem;
    line-height: 1.5;
}
.mybtn {
    color: #aa2233;
    transition: color .15s ease-in-out,background-color .15s ease-in-out;
}
.mybtn:hover {
    background-color: #aa2233;
    color: #fff;
}
</style>


首先，这么好用的工具鲜为人知，在 Github 开源了 13 年仅收获 800 多个 Star，不禁让我想到“黄钟毁弃”一词。

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post11/star.png" width="300"/></div>

现代前端技术日新月异，前端可视化工具库也是层出不穷，一个比一个优秀。但是论及交互式几何绘制谁表现得最佳，我觉得非 JSXGraph 莫属。如果是 d3、ECharts 这样享有盛名的可视化工具库，我大可不写这篇博客，因为用的人大多了，但是 JSXGraph 的资料比较有限，还是有谈一谈的必要。

# 简介

进入 JSXGraph 的[官网](https://jsxgraph.uni-bayreuth.de/wp/index.html)，会看到明显的 **Dynamic** 和 **Interactive** 这样的词汇，那么 JSXGraph 的 Interactive 究竟能达到怎样的效果？官网首页给出了一个演示，我直接搬运过来了。

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post11/girl.jpg" width="150"/></div>

请大胆地尝试拖动 $A$, $B$, $C$ 三个点：

<div id="jxgbox-EulerLine" class="jxgbox" style="height:500px;"></div>

<script type="text/javascript">
(function () {
    var brd = JXG.JSXGraph.initBoard('jxgbox-EulerLine', {boundingbox:[-1.5,2,1.5,-1], keepaspectratio:true, showCopyright:false});
    var cerise = {
            strokeColor: '#901B77',
            fillColor: '#CA147A'
        },
        grass = {
            strokeColor: '#009256',
            fillColor: '#65B72E',
            visible: true,
            withLabel: true
        },
        perpendicular = {
            strokeColor: 'black',
            dash: 1,
            strokeWidth: 1,
            point: JXG.deepCopy(cerise, {
                visible: true,
                withLabel: true
            })
        },
        median = {
            strokeWidth: 1,
            strokeColor: '#333333',
            dash:2
        },
        A = brd.create('point', [1, 0], cerise),
        B = brd.create('point', [-1, 0], cerise),
        C = brd.create('point', [0.2, 1.5], cerise),
        pol = brd.create('polygon',[A,B,C], {
            fillColor: '#FFFF00',
            lines: {
                strokeWidth: 2,
                strokeColor: '#009256'
            }
        });
    var pABC, pBCA, pCAB, i1;
    perpendicular.point.name = 'H_c';
    pABC = brd.create('perpendicular', [pol.borders[0], C], perpendicular);
    perpendicular.point.name = 'H_a';
    pBCA = brd.create('perpendicular', [pol.borders[1], A], perpendicular);
    perpendicular.point.name = 'H_b';
    pCAB = brd.create('perpendicular', [pol.borders[2], B], perpendicular);
    grass.name = 'H';
    i1 = brd.create('intersection', [pABC, pCAB, 0], grass);
    var mAB, mBC, mCA;
    cerise.name = 'M_c';
    mAB = brd.create('midpoint', [A, B], cerise);
    cerise.name = 'M_a';
    mBC = brd.create('midpoint', [B, C], cerise);
    cerise.name = 'M_b';
    mCA = brd.create('midpoint', [C, A], cerise);
    var ma, mb, mc, i2;
    ma = brd.create('segment', [mBC, A], median);
    mb = brd.create('segment', [mCA, B], median);
    mc = brd.create('segment', [mAB, C], median);
    grass.name = 'S';
    i2 = brd.create('intersection', [ma, mc, 0], grass);
    var c;
    grass.name = 'U';
    c = brd.create('circumcircle',[A, B, C], {
        strokeColor: '#000000',
        dash: 3,
        strokeWidth: 1,
        point: grass
    });
    var euler;
    euler = brd.create('line', [i1, i2], {
        strokeWidth: 2,
        strokeColor:'#901B77'
    });
    brd.update();
})();
</script>

好家伙，这简直就是一个在线的 GeoGebra 呀。

## 特点

- 支持欧氏几何和射影几何，你能想到的平面几何元素它都支持
- 函数绘制（还可以求切线、求导）
- 专门优化过性能（从体验上来看，此言不虚）
- 纯 JavaScript 编写，不依赖任何其他库
- 使用 SVG, VML 或 Canvas 绘图
- 支持多点触发，完美适配移动端
- 开源，LGPL 和 MIT 协议
- 甚至兼容 IE 6，简直绝了

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post11/niu.jpg" width="150"/></div>

它的数学库支持：

- 线性代数
    - 行列式
    - 求解线性方程组
    - 求特征值和特征向量
- 数值分析
    - Runge-Kutta（euler、heun 和 rk4）
    - Lagrange 插值
    - 样条插值
    - Newton-Cotes 求积
    - Romberg 求积
- 函数
    - 求最小值
    - 求零点
    - Newton 法求根
    - 求导数
    - 求积分
    - 黎曼和
- 统计
- 多项式
- 欧氏几何和射影几何
- ......

## 文档

学习一个工具最好的地方莫过于它的官方文档，JSXGraph 也是如此。官网给出了最全的 [API](https://jsxgraph.org/docs/index.html) 以及 [**289**个示例](https://jsxgraph.uni-bayreuth.de/wiki/index.php/Category:Examples)，没有比官网更良心的了，生怕用户学不会属于是。除了官网，有大佬编写了自己的教程 [JSXGraph Book](https://ipesek.github.io/jsxgraphbook/1_introduction.html)，比官网更适合入门。

# 示例

从官网和 JSXGraph Book 搬运了一些示例：

## 限制性三体问题

<div id="jxgbox-CRTBP" class="jxgbox"></div>

<script type="text/javascript">
(function () {
    var brd = JXG.JSXGraph.initBoard('jxgbox-CRTBP', {boundingbox:[-1.5,1.5,1.5,-1.5], axis:false, grid:false, showCopyright:false}),
        mu = 1.0/81.45, i,
        ode = function () {
            var I = [17.066, 0],
                x0 = [0.994, 0, 0, -2.0015851063790825],
                N = 10000,
                data, dataX, dataY, i,
                f = function(t, x) {
                    var m  = 1.0/81.45,
                        D1 = Math.sqrt(Math.pow((x[0]+m)*(x[0]+m)+x[2]*x[2],3)),
                        D2 = Math.sqrt(Math.pow((x[0]-(1-m))*(x[0]-(1-m))+x[2]*x[2],3)),
                        y = [];
                    y[0] = x[1];
                    y[1] = x[0]+2*x[3]-(1-m)*(x[0]+m)/D1-m*(x[0]-(1-m))/D2;
                    y[2] = x[3];
                    y[3] = x[2]-2*x[1]-(1-m)*x[2]/D1-m*x[2]/D2;
                    return y;
                };
            data = JXG.Math.Numerics.rungeKutta('rk4', x0, I, N, f);
            dataX = [];
            dataY = [];
            for(i in data) {
                dataX[i] = data[i][0];
                dataY[i] = data[i][2];
            }
            return [dataX, dataY];
        };
    // earth
    brd.create('point', [-mu, 0], {
        withLabel: false,
        strokeColor: 'none',
        fillColor: '#4096EE',
        size: 12,
        fixed: true
    });
    // moon
    brd.create('point', [1-mu, 0], {
        withLabel: false,
        strokeColor: 'none',
        fillColor: 'gray',
        size: 3,
        fixed: true
    });
    // our space shuttle
    var apolloPath = brd.create('curve', ode(), {
        strokeColor: 'red',
        strokeOpacity: 0.3,
        strokeWidth: 3,
        visible: true,
        needsRegularUpdate: false
    });
    apolloPath.hasPoint = function () {
        return false;
    };
    var apollo = brd.create('point', [1, 0], {
        withLabel: false,
        strokeColor: 'red',
        fillColor: 'red',
        size: 3,
        face: '<>',
        fixed: true
    });
    apollo.moveAlong(function (i) {
        return [apolloPath.dataX[i%apolloPath.dataX.length], apolloPath.dataY[i%apolloPath.dataY.length]];
    }, 2000);
    // a text in upper right corner to stop the animation
    brd.create('text', [0.8, 1.3, '<div id="stop-animation">Stop Animation</div>'], {fontSize:8});
    document.getElementById('stop-animation').addEventListener('click', function () {
        brd.stopAllAnimation();
    });
})();
</script>

```javascript
var brd = JXG.JSXGraph.initBoard('jxgbox', {boundingbox:[-1.5,1.5,1.5,-1.5], axis:false, grid:false}),
    mu = 1.0/81.45, i,
    ode = function () {
        var I = [17.066, 0],
            x0 = [0.994, 0, 0, -2.0015851063790825],
            N = 10000,
            data, dataX, dataY, i,
            f = function(t, x) {
                var m  = 1.0/81.45,
                    D1 = Math.sqrt(Math.pow((x[0]+m)*(x[0]+m)+x[2]*x[2],3)),
                    D2 = Math.sqrt(Math.pow((x[0]-(1-m))*(x[0]-(1-m))+x[2]*x[2],3)),
                    y = [];
                y[0] = x[1];
                y[1] = x[0]+2*x[3]-(1-m)*(x[0]+m)/D1-m*(x[0]-(1-m))/D2;
                y[2] = x[3];
                y[3] = x[2]-2*x[1]-(1-m)*x[2]/D1-m*x[2]/D2;
                return y;
            };
        data = JXG.Math.Numerics.rungeKutta('rk4', x0, I, N, f);
        dataX = [];
        dataY = [];
        for(i in data) {
            dataX[i] = data[i][0];
            dataY[i] = data[i][2];
        }
        return [dataX, dataY];
    };
// earth
brd.create('point', [-mu, 0], {
    withLabel: false,
    strokeColor: 'none',
    fillColor: '#4096EE',
    size: 12,
    fixed: true
});
// moon
brd.create('point', [1-mu, 0], {
    withLabel: false,
    strokeColor: 'none',
    fillColor: 'gray',
    size: 3,
    fixed: true
});
// our space shuttle
var apolloPath = brd.createElement('curve', ode(), {
    strokeColor: 'red',
    strokeOpacity: 0.3,
    strokeWidth: 3,
    visible: true,
    needsRegularUpdate: false
});
apolloPath.hasPoint = function () {
    return false;
};
var apollo = brd.create('point', [1, 0], {
    withLabel: false,
    strokeColor: 'red',
    fillColor: 'red',
    size: 3,
    face: '<>',
    fixed: true
});
apollo.moveAlong(function (i) {
    return [apolloPath.dataX[i%apolloPath.dataX.length], apolloPath.dataY[i%apolloPath.dataY.length]];
}, 2000);
// a text in upper right corner to stop the animation
brd.create('text', [0.8, 1.3, '<div id="stop-animation">Stop Animation</div>'], {fontSize:8});
document.getElementById('stop-animation').addEventListener('click', function () {
    brd.stopAllAnimation();
});
```

## Lissajous 曲线

参数方程：
$$
x=A\sin(at+\delta) \\
y=B\sin(bt)
$$

<div id="jxgbox-Lissajous" class="jxgbox"></div>

<script type="text/javascript">
(function () {
    var brd = JXG.JSXGraph.initBoard('jxgbox-Lissajous', {axis:true, boundingbox:[-12,12,12,-12], keepaspectratio:true, showCopyright:false});
    var a = brd.create('slider', [[5,10],[9,10],[0,3,6]], {name:'a'});
    var b = brd.create('slider', [[5,9],[9,9],[0,2,6]], {name:'b'});
    var A = brd.create('slider', [[5,8],[9,8],[0,5,8]], {name:'A'});
    var B = brd.create('slider', [[5,7],[9,7],[0,5,8]], {name:'B'});
    var d = brd.create('slider', [[5,6],[9,6],[0,0,Math.PI]], {name:'&delta;'});
    brd.create('curve', [
            function(t){ return A.Value()*Math.sin(a.Value()*t+d.Value()); },
            function(t){ return B.Value()*Math.sin(b.Value()*t); },
            0, 2*Math.PI], {strokeColor:'#aa2233', strokeWidth:2}
    );
})();
</script>

```javascript
var brd = JXG.JSXGraph.initBoard('jxgbox', {axis:true, boundingbox:[-12,12,12,-12], keepaspectratio:true});
var a = brd.create('slider', [[5,10],[9,10],[0,3,6]], {name:'a'});
var b = brd.create('slider', [[5,9],[9,9],[0,2,6]], {name:'b'});
var A = brd.create('slider', [[5,8],[9,8],[0,5,8]], {name:'A'});
var B = brd.create('slider', [[5,7],[9,7],[0,5,8]], {name:'B'});
var d = brd.create('slider', [[5,6],[9,6],[0,0,Math.PI]], {name:'&delta;'});
brd.create('curve', [
        function(t){ return A.Value()*Math.sin(a.Value()*t+d.Value()); },
        function(t){ return B.Value()*Math.sin(b.Value()*t); },
        0, 2*Math.PI], {strokeColor:'#aa2233', strokeWidth:2}
);
```

## 函数作图

<div id="jxgbox-Fcn" class="jxgbox" style="height:300px;"></div>

<div class="widget">
    <input type="text" id="fcn-input" class="myborder" value="sin(x)*x" style="outline: none;">
    <input type="button" id="demo3-btn1" class="myborder mybtn" value="Plot">
    <input type="button" id="demo3-btn2" class="myborder mybtn" value="Clear"> 
    <input type="button" id="demo3-btn3" class="myborder mybtn" value="Add Tangent">
    <input type="button" id="demo3-btn4" class="myborder mybtn" value="Add Derivative">
</div>
<script type="text/javascript">
(function () {
    var brd = initBoard();
    var fcn, curve;
    plot();
    function initBoard()
    {
        if (brd) {
            JXG.JSXGraph.freeBoard(brd);
        }
        return JXG.JSXGraph.initBoard('jxgbox-Fcn', {boundingbox:[-5,8,8,-5], axis:true, showCopyright:false});
    }
    function plot()
    {
        var txtfcn = document.getElementById('fcn-input').value;
        fcn = brd.jc.snippet(txtfcn, true, 'x', true);
        curve = brd.create('functiongraph', [fcn,xLim1,xLim2], {strokeWidth:2});
    }
    function clear()
    {
        brd = initBoard();
        fcn = null;
        curve = null;
    }
    function addTangent()
    {
        if (JXG.isFunction(fcn)) {
            var p = brd.create('glider', [1,0,curve], {name:'drag me'});
            brd.create('tangent', [p], {strokeWidth:1});
        }
    }
    function addDerivative()
    {
        if (JXG.isFunction(fcn)) {
            brd.create('functiongraph', [JXG.Math.Numerics.D(fcn),xLim1,xLim2], {strokeWidth:1, dash:2});
        }
    }
    function xLim1()
    {
        var c = new JXG.Coords(JXG.COORDS_BY_SCREEN, [0,0], brd);
        return c.usrCoords[1];
    }
    function xLim2()
    { 
        var c = new JXG.Coords(JXG.COORDS_BY_SCREEN, [brd.canvasWidth,0], brd);
        return c.usrCoords[1];
    }
    document.getElementById('demo3-btn1').addEventListener('click', plot);
    document.getElementById('demo3-btn2').addEventListener('click', clear);
    document.getElementById('demo3-btn3').addEventListener('click', addTangent);
    document.getElementById('demo3-btn4').addEventListener('click', addDerivative);
})();
</script>

```html
<input type="text" value="sin(x)*x">
<input type="button" value="Plot" onClick="plot()">
<input type="button" value="Clear" onClick="clear()"> 
<input type="button" value="Add Tangent" onClick="addTangent()">
<input type="button" value="Add Derivative" onClick="addDerivative()">
```

```javascript
var brd = initBoard();
var fcn, curve;
plot();
function initBoard()
{
    if (brd) {
        JXG.JSXGraph.freeBoard(brd);
    }
    return JXG.JSXGraph.initBoard('jxgbox', {boundingbox:[-5,8,8,-5], axis:true});
}
function plot()
{
    var txtfcn = document.getElementById('fcn-input').value;
    fcn = brd.jc.snippet(txtfcn, true, 'x', true);
    curve = brd.create('functiongraph', [fcn,xLim1,xLim2], {strokeWidth:2});
}
function clear()
{
    brd = initBoard();
    fcn = null;
    curve = null;
}
function addTangent()
{
    if (JXG.isFunction(fcn)) {
        var p = brd.create('glider', [1,0,curve], {name:'drag me'});
        brd.create('tangent', [p], {strokeWidth:1});
    }
}
function addDerivative()
{
    if (JXG.isFunction(fcn)) {
        brd.create('functiongraph', [JXG.Math.Numerics.D(fcn),xLim1,xLim2], {strokeWidth:1, dash:2});
    }
}
function xLim1()
{
    var c = new JXG.Coords(JXG.COORDS_BY_SCREEN, [0,0], brd);
    return c.usrCoords[1];
}
function xLim2()
{ 
    var c = new JXG.Coords(JXG.COORDS_BY_SCREEN, [brd.canvasWidth,0], brd);
    return c.usrCoords[1];
}
```

## Riemann Sum

<div id="jxgbox-RiemannSum" class="jxgbox" style="height:400px;"></div>

<script type="text/javascript">
(function () {
    var brd = JXG.JSXGraph.initBoard('jxgbox-RiemannSum', {axis:true, boundingbox:[-8,4,8,-4], showCopyright:false});
    var s = brd.create('slider', [[1,3.5],[5,3.5],[1,10,50]], {name:'n', snapWidth:1});
    var a = brd.create('slider', [[1,2.5],[5,2.5],[-10,-3,0]], {name:'start'});
    var b = brd.create('slider', [[1,1.5],[5,1.5],[0,2*Math.PI,10]], {name:'end'});
    var f = function(x){ return Math.sin(x); };
    var plot = brd.create('functiongraph', [f,function(){return a.Value();}, function(){return b.Value();}]);
    var os = brd.create('riemannsum',[f,
        function(){ return s.Value(); }, function(){ return "left"; },
        function(){ return a.Value(); },
        function(){ return b.Value(); }
        ], {fillColor:'#ffff00', fillOpacity:0.3}
    );
    brd.create('text', [-6,-3,function(){ return 'Sum='+(JXG.Math.Numerics.riemannsum(f,s.Value(),'left',a.Value(),b.Value())).toFixed(4); }], {fontSize:12});
})();
</script>

```javascript
var brd = JXG.JSXGraph.initBoard('jxgbox', {axis:true, boundingbox:[-8,4,8,-4]});
var s = brd.create('slider', [[1,3.5],[5,3.5],[1,10,50]], {name:'n', snapWidth:1});
var a = brd.create('slider', [[1,2.5],[5,2.5],[-10,-3,0]], {name:'start'});
var b = brd.create('slider', [[1,1.5],[5,1.5],[0,2*Math.PI,10]], {name:'end'});
var f = function(x){ return Math.sin(x); };
var plot = brd.create('functiongraph', [f,function(){return a.Value();}, function(){return b.Value();}]);
var os = brd.create('riemannsum',[f,
    function(){ return s.Value(); }, function(){ return "left"; },
    function(){ return a.Value(); },
    function(){ return b.Value(); }
    ], {fillColor:'#ffff00', fillOpacity:0.3}
);
brd.create('text', [-6,-3,function(){ return 'Sum='+(JXG.Math.Numerics.riemannsum(f,s.Value(),'left',a.Value(),b.Value())).toFixed(4); }], {fontSize:12});
```

## 计算交点

<div id="jxgbox-Intersection" class="jxgbox" style="height:300px;"></div>

<script type="text/javascript">
(function () {
    var brd = JXG.JSXGraph.initBoard('jxgbox-Intersection', {boundingbox:[-5,3,5,-3], keepAspectRatio:true, showCopyright:false});
    var A = brd.create('point', [-2,0], {name:"A"});
    var B = brd.create('point', [-1,-1], {name:"B", visible:false});
    var C = brd.create('point', [0,0], {name:"C"});
    var circle1 = brd.create('circle', [A,B]);
    var circle2 = brd.create('circle', [C,A]);
    var inter1 = brd.create('intersection', [circle1,circle2,0], {name:'I_1'});
    var inter2 = brd.create('intersection', [circle1,circle2,1], {name:'I_2'});
    var line = brd.create('line', [inter1,inter2]);
})();
</script>

```javascript
var brd = JXG.JSXGraph.initBoard('jxgbox', {boundingbox:[-5,3,5,-3], keepAspectRatio:true});
var A = brd.create('point', [-2,0], {name:"A"});
var B = brd.create('point', [-1,-1], {name:"B", visible:false});
var C = brd.create('point', [0,0], {name:"C"});
var circle1 = brd.create('circle', [A,B]);
var circle2 = brd.create('circle', [C,A]);
var inter1 = brd.create('intersection', [circle1,circle2,0], {name:'I_1'});
var inter2 = brd.create('intersection', [circle1,circle2,1], {name:'I_2'});
var line = brd.create('line', [inter1,inter2]);
```

## Limacon

<div id="jxgbox-Limacon" class="jxgbox" style="height:300px;"></div>

<script type="text/javascript">
(function () {
    var brd = JXG.JSXGraph.initBoard('jxgbox-Limacon', {boundingbox:[-15,18,15,0], keepAspectRatio:true, showCopyright:false});
    var p3 = brd.create('point', [0,4], {face:'x', size:2, name:"P_{3}", fixed:true});
    var p4 = brd.create('point', [0,8], {face:'x', size:3, name:"P_{4}", fixed:true});
    var c1 = brd.create('circle', [p4,p3]);
    var p6 = brd.create('glider', [0,0,c1], {face:'o', size:3, name:"P_{6}"});
    var g = brd.create('line', [p3,p6]);
    var c2 = brd.create('circle', [p6,3]);
    var p14_1 = brd.create('intersection', [c2,g,0], {size:2, name:"M", trace:true});
    var p14_2 = brd.create('intersection', [c2,g,1], {size:2, name:"N", trace:true});
})();
</script>

```javascript
var brd = JXG.JSXGraph.initBoard('jxgbox', {boundingbox:[-15,18,15,0], keepAspectRatio:true});
var p3 = brd.create('point', [0,4], {face:'x', size:2, name:"P_{3}", fixed:true});
var p4 = brd.create('point', [0,8], {face:'x', size:3, name:"P_{4}", fixed:true});
var c1 = brd.create('circle', [p4,p3]);
var p6 = brd.create('glider', [0,0,c1], {face:'o', size:3, name:"P_{6}"});
var g = brd.create('line', [p3,p6]);
var c2 = brd.create('circle', [p6,3]);
var p14_1 = brd.create('intersection', [c2,g,0], {size:2, name:"M", trace:true});
var p14_2 = brd.create('intersection', [c2,g,1], {size:2, name:"N", trace:true});
```

## P 范数

<div id="jxgbox-PNorm" class="jxgbox" style="height:300px;"></div>

<script type="text/javascript">
(function () {
    var brd = JXG.JSXGraph.initBoard('jxgbox-PNorm', {axis:true, boundingbox:[-5,3,5,-3], keepaspectratio:true, showCopyright:false});
    var pNorm = brd.create('slider', [[0,2.5],[3,2.5],[0,3.5,10]], {name:'p'});
    var m = brd.create('point',[0,0], {name:'m'});
    brd.create('curve', [fcn, [
        function(){ return m.X(); },
        function(){ return m.Y(); }
        ], 0, Math.PI*2], {curveType:'polar', strokeColor:'#aa2233', strokeWidth:2}
    );
    function fcn(t)
    {
        var p = pNorm.Value();
        return 2.0 / Math.pow( Math.pow(Math.abs(Math.cos(t)),p) + Math.pow(Math.abs(Math.sin(t)),p) , 1.0/p );
    }
})();
</script>

```javascript
var brd = JXG.JSXGraph.initBoard('jxgbox', {axis:true, boundingbox:[-5,3,5,-3], keepaspectratio:true});
var pNorm = brd.create('slider', [[0,2.5],[3,2.5],[0,3.5,10]], {name:'p'});
var m = brd.create('point',[0,0], {name:'m'});
brd.create('curve', [fcn, [
    function(){ return m.X(); },
    function(){ return m.Y(); }
    ], 0, Math.PI*2], {curveType:'polar', strokeColor:'#aa2233', strokeWidth:2}
);
function fcn(t)
{
    var p = pNorm.Value();
    return 2.0 / Math.pow( Math.pow(Math.abs(Math.cos(t)),p) + Math.pow(Math.abs(Math.sin(t)),p) , 1.0/p );
}
```

## Newton 法

<div id="jxgbox-Newton" class="jxgbox"></div>

<br />

<div class="table-box">
    <table width="600">
        <tr>
            <th>$f(x)$</th>
            <th>
                <input style="width:120px; border:none; padding:5px; margin-left:2px;" type="text" id="fcn-Newton" value="(x-2)*(x+1)*x*0.2" size="30"/>
                <input id="demo4-btn" type="button" value="Set">
            </th>
        </tr>
        <script type="text/javascript">
            var STEP = 10; // 迭代步数
            for (let i=0; i<STEP; i++)
            {
                document.write('<tr><td align="center">$x_{' + i + '}$</td><td align="center"><font id="xv' + i + '"></font></td></tr>');
            }
        </script>
    </table>
</div>


<script type="text/javascript">
(function () {
    var txtfcn = document.getElementById('fcn-Newton').value;
    var x0 = 3; // 迭代初值
    var brd = JXG.JSXGraph.initBoard('jxgbox-Newton', {boundingbox:[-5,5,5,-5], axis:true, showCopyright:false});
    var ax = brd.defaultAxes.x;
    var g = brd.create('functiongraph', [txtfcn], {strokeWidth: 2});
    var x = brd.create('glider', [x0,0,ax], {name:'x_{0}', color:'magenta', size:4});
    newGraph();
    Newton(x, STEP);
    brd.on('update', xval);
    xval();
    function Newton(p, i)
    {
        if (i>0) {
            var f = brd.create('glider', [
                function(){ return p.X(); },
                function(){ return g.Y(p.X()); },
                g], {name:'', style:3, color:'green'}
            );
            var l = brd.create('segment', [p,f], {strokeWidth:0.5, dash:1, strokeColor:'black'});
            var t = brd.create('tangent', [f], {strokeWidth:0.5, strokeColor:'#0080c0', dash:0});
            var x = brd.create('intersection', [ax,t,0], {name:'x_{' + (STEP-i+1) + '}', style:4, color:'red'});
            Newton(x, --i);
        }
    }
    function newGraph()
    {
        txtfcn = document.getElementById('fcn-Newton').value;
        g.generateTerm('x', 'x', txtfcn);
        brd.update();
    }
    function xval()
    {
        for (let i=0; i<STEP; i++)
        {
            document.getElementById('xv' + i).innerHTML = (brd.select('x_{' + i + '}').X()).toFixed(14);
        }
    }
    document.getElementById('demo4-btn').addEventListener('click', newGraph);
})();
</script>

```html
<table width="600" border="0" cellpadding="0" cellspacing="0">
    <tr>
        <th>f(x)</th>
        <th>
            <input style="width:120px; border:none; padding:5px; margin-left:2px;" type="text" id="fcn-input" value="(x-2)*(x+1)*x*0.2" size="30"/>
            <input type="button" value="Set" onClick="newGraph()">
        </th>
    </tr>
    <script type="text/javascript">
    	var STEP = 10;
    	for (let i=0; i<STEP; i++)
        {
         	document.write('<tr><td align="center">$x_{' + i + '}$</td><td align="right"><font id="xv' + i + '"></font></td></tr>');
    	}
    </script>
</table>
```

```javascript
var txtfcn = document.getElementById('fcn-input').value;
var x0 = 3; // 迭代初值
var brd = JXG.JSXGraph.initBoard('jxgbox', {boundingbox:[-5,5,5,-5], axis:true});
var ax = brd.defaultAxes.x;
var g = brd.create('functiongraph', [txtfcn], {strokeWidth: 2});
var x = brd.create('glider', [x0,0,ax], {name:'x_{0}', color:'magenta', size:4});
newGraph();
Newton(x, STEP);
brd.on('update', xval);
xval();
function Newton(p, i)
{
    if (i>0) {
        var f = brd.create('glider', [
            function(){ return p.X(); },
            function(){ return g.Y(p.X()); },
            g], {name:'', style:3, color:'green'}
        );
        var l = brd.create('segment', [p,f], {strokeWidth:0.5, dash:1, strokeColor:'black'});
        var t = brd.create('tangent', [f], {strokeWidth:0.5, strokeColor:'#0080c0', dash:0});
        var x = brd.create('intersection', [ax,t,0], {name:'x_{' + (STEP-i+1) + '}', style:4, color:'red'});
        Newton(x, --i);
    }
}
function newGraph()
{
    txtfcn = document.getElementById('fcn-input').value;
    g.generateTerm('x', 'x', txtfcn);
    brd.update();
}
function xval()
{
    for (let i=0; i<STEP; i++)
    {
        document.getElementById('xv' + i).innerHTML = (brd.select('x_{' + i + '}').X()).toFixed(14);
    }
}
```

## Lindenmayer 系统

<textarea id="inputtext-Lindenmayer" rows=15 cols=35 wrap="off">
var level = 6;
var axiom = 'A';
var rules = {
    'A':'B-A-B',
    'B':'A+B+A',
    '+' : '+',
    '-' : '-'
};
var symbols = { 'A':'F', 
                'B':'F', 
                '+':'+', 
                '-':'-', 
                '[':'[',
                ']':']' 
              };
var angle = 60;
var len = 500/Math.pow(2,level);
turtle.setPos(-250*Math.pow(-1,level),-250);
turtle.rt(90*Math.pow(-1,level));
</textarea>
<div class="widget">
    <input type="button" id="demo9-btn1" class="myborder mybtn" value="Run">
    <input type="button" id="demo9-btn2" class="myborder mybtn" value="Clear">
</div>
<div id="jxgbox-Lindenmayer" class="jxgbox" style="height:300px;"></div>

<script type="text/javascript">
(function () {
    brd = JXG.JSXGraph.initBoard('jxgbox-Lindenmayer', {boundingbox:[-500,300,500,-300], keepAspectRatio:true, showCopyright:false});
    var turtle = brd.create('turtle');
    var shrink = 1.0;
    run();
    function expander(level, axiom, rules)
    {
        this.axiom = axiom;
        this.rules = rules;
        this.source = (level>1) ? new expander(level-1,axiom,rules) : (new function() {
            // Axiom:
            this.code = axiom;
            this.pos = 0;
            this.next = function() {
                if (this.pos>=this.code.length) {
                    return null;
                }
                return this.code.charAt(this.pos++);
            }
        });
        this.code = '';
        this.pos = 0;
        this.next = function() {
            while (this.pos>=this.code.length) // produce new symbols from source
            {
                this.pos = 0;
                var pattern = this.source.next();
                if (!pattern) {
                    return null; // Finished
                }
                this.code = this.rules[pattern];
            }
            return this.code.charAt(this.pos++);
        }
    }
    function plot(generator, symbols, len, angle, t, shrink)
    {
        for (var c; c=generator.next(); c)
        {
            switch(symbols[c]) {
                case 'F':
                    t.fd(len);
                    break;
                case 'f':
                    t.penUp();
                    t.fd(len);
                    t.penDown();
                    break;
                case '+':
                    t.lt(angle);
                    break;
                case '-':
                    t.rt(angle);
                    break;
                case '[':
                    t.pushTurtle();
                    len *= shrink;
                    break;
                case ']':
                    t.popTurtle();
                    len /= shrink;
                    break;
                default:
                    return;
            }
        }
    }
    function run()
    {
        var code = document.getElementById('inputtext-Lindenmayer').value;
        if (!code) {
            return;
        }
        turtle.cs();
        turtle.hideTurtle();
        eval(code);
        var generator = new expander(level, axiom, rules);
        plot(generator, symbols, len, angle, turtle, shrink);
    }
    function clearTurtle()
    {
        turtle.cs();
    }
    document.getElementById('demo9-btn1').addEventListener('click', run);
    document.getElementById('demo9-btn2').addEventListener('click', clearTurtle);
})();
</script>

```html
<textarea id="input-code" rows=15 cols=35 wrap="off">
var level = 6;
var axiom = 'A';
var rules = {
    'A':'B-A-B',
    'B':'A+B+A',
    '+' : '+',
    '-' : '-'
};
var symbols = { 'A':'F', 
                'B':'F', 
                '+':'+', 
                '-':'-', 
                '[':'[',
                ']':']' 
              };
var angle = 60;
var len = 500/Math.pow(2,level);
turtle.setPos(-250*Math.pow(-1,level),-250);
turtle.rt(90*Math.pow(-1,level));
</textarea>
<input type="button" value="Run" onClick="run()">
<input type="button" value="Clear" onClick="clearTurtle()">
```

```javascript
brd = JXG.JSXGraph.initBoard('jxgbox', {boundingbox:[-500,300,500,-300], keepAspectRatio:true});
var turtle = brd.create('turtle');
var shrink = 1.0;
run();
function expander(level, axiom, rules)
{
    this.axiom = axiom;
    this.rules = rules;
    this.source = (level>1) ? new expander(level-1,axiom,rules) : (new function() {
        // Axiom:
        this.code = axiom;
        this.pos = 0;
        this.next = function() {
            if (this.pos>=this.code.length) {
                return null;
            }
            return this.code.charAt(this.pos++);
        }
    });
    this.code = '';
    this.pos = 0;
    this.next = function() {
        while (this.pos>=this.code.length) // produce new symbols from source
        {
            this.pos = 0;
            var pattern = this.source.next();
            if (!pattern) {
                return null; // Finished
            }
            this.code = this.rules[pattern];
        }
        return this.code.charAt(this.pos++);
    }
}
function plot(generator, symbols, len, angle, t, shrink)
{
    for (var c; c=generator.next(); c)
    {
        switch(symbols[c]) {
            case 'F':
                t.fd(len);
                break;
            case 'f':
                t.penUp();
                t.fd(len);
                t.penDown();
                break;
            case '+':
                t.lt(angle);
                break;
            case '-':
                t.rt(angle);
                break;
            case '[':
                t.pushTurtle();
                len *= shrink;
                break;
            case ']':
                t.popTurtle();
                len /= shrink;
                break;
            default:
                return;
        }
    }
}
function run()
{
    var code = document.getElementById('input-code').value;
    if (!code) {
        return;
    }
    turtle.cs();
    turtle.hideTurtle();
    eval(code);
    var generator = new expander(level, axiom, rules);
    plot(generator, symbols, len, angle, turtle, shrink);
}
function clearTurtle()
{
    turtle.cs();
}
```

## Infinity

<div id="jxgbox-Infinity" class="jxgbox" style="height:590px;"></div>

<script type="text/javascript">
(function () {
    var brd = JXG.JSXGraph.initBoard('jxgbox-Infinity', {boundingbox: [-6,6,6,-6], keepAspectRatio:true, showCopyright:false});
    var S = brd.create('slider', [[-5,-6],[3,-6],[0,0.95,1]], {name:'S'});
    var hue = brd.create('slider', [[-5,-7],[3,-7],[0,8,36]], {name:'color'});
    var points = [];
    points[0] = brd.create('point',[5,5], {name:''});
    points[1] = brd.create('point',[-5,5], {name:''});
    points[2] = brd.create('point',[-5,-5], {name:''});
    points[3] = brd.create('point',[5,-5], {name:''});
    function quadrangle(pt, n)
    {
        var col;
        var arr = new Array();
        for(var i = 0; i < 4; i++)
        {
            arr[i] = brd.create('point', 
                [function(t) {
                    return function () {var x = pt[t].X(); var x1 = pt[(t+1)%4].X(); var s = S.Value(); return x+(x1-x)*s; }
                }(i),
                function(t) {
                    return function () {var y = pt[t].Y(); var y1 = pt[(t+1)%4].Y(); var s = S.Value(); return y+(y1-y)*s; }
                }(i)
                ], {size:1, name:'', withLabel:false,visible:false});
        }
        col = function() { return JXG.hsv2rgb(hue.Value()*n,0.7,0.9); };
        brd.create('polygon', pt, {fillColor: col});
        if (n>0)
        {
            quadrangle(arr, --n);
        }
    }
    quadrangle(points,30);
})();
</script>

```javascript
var brd = JXG.JSXGraph.initBoard('jxgbox-Infinity', {boundingbox: [-6,6,6,-6], keepAspectRatio:true, showCopyright:false});
var S = brd.create('slider', [[-5,-6],[3,-6],[0,0.95,1]], {name:'S'});
var hue = brd.create('slider', [[-5,-7],[3,-7],[0,8,36]], {name:'color'});
var points = [];
points[0] = brd.create('point',[5,5], {name:''});
points[1] = brd.create('point',[-5,5], {name:''});
points[2] = brd.create('point',[-5,-5], {name:''});
points[3] = brd.create('point',[5,-5], {name:''});
function quadrangle(pt, n)
{
    var col;
    var arr = new Array();
    for(var i = 0; i < 4; i++)
    {
        arr[i] = brd.create('point', 
            [function(t) {
                return function () {var x = pt[t].X(); var x1 = pt[(t+1)%4].X(); var s = S.Value(); return x+(x1-x)*s; }
            }(i),
            function(t) {
                return function () {var y = pt[t].Y(); var y1 = pt[(t+1)%4].Y(); var s = S.Value(); return y+(y1-y)*s; }
            }(i)
            ], {size:1, name:'', withLabel:false,visible:false});
    }
    col = function() { return JXG.hsv2rgb(hue.Value()*n,0.7,0.9); };
    brd.create('polygon', pt, {fillColor: col});
    if (n>0)
    {
        quadrangle(arr, --n);
    }
}
quadrangle(points,30);
```

## Lagrange 插值

<div id="jxgbox-Lagrange" class="jxgbox" style="height:300px;"></div>

<div class="widget">
    <input type="button" class="myborder mybtn" id="demo11-btn" value="Add Point">
</div>
<script type="text/javascript">
(function () {
    var brd = JXG.JSXGraph.initBoard('jxgbox-Lagrange', {boundingbox:[-5,10,7,-6], axis:true, showCopyright:false});
    var p = [];
    p[0] = brd.create('point', [-1,2], {size:4});
    p[1] = brd.create('point', [3,-1], {size:4});
    var f = JXG.Math.Numerics.lagrangePolynomial(p);
    var graph = brd.create('functiongraph', [f,-10,10], {strokeWidth:3});
    var d1 = brd.create('functiongraph', [JXG.Math.Numerics.D(f), -10, 10], {dash:1});
    var d2 = brd.create('functiongraph', [JXG.Math.Numerics.D(JXG.Math.Numerics.D(f)), -10, 10], {dash:2});
    function addPoint()
    {
        var point = brd.create('point', [(Math.random()-0.5)*10,(Math.random()-0.5)*3], {size:4});
        p.push(point);
        brd.update();
    }
    document.getElementById('demo11-btn').addEventListener('click', addPoint);
})();
</script>

```html
<input type="button" value="Add Point" onClick="addPoint()">
```

```javascript
var brd = JXG.JSXGraph.initBoard('jxgbox', {boundingbox:[-5,10,7,-6], axis:true});
var p = [];
p[0] = brd.create('point', [-1,2], {size:4});
p[1] = brd.create('point', [3,-1], {size:4});
var f = JXG.Math.Numerics.lagrangePolynomial(p);
var graph = brd.create('functiongraph', [f,-10,10], {strokeWidth:3});
var d1 = brd.create('functiongraph', [JXG.Math.Numerics.D(f), -10, 10], {dash:1});
var d2 = brd.create('functiongraph', [JXG.Math.Numerics.D(JXG.Math.Numerics.D(f)), -10, 10], {dash:2});
function addPoint()
{
    var point = brd.create('point', [(Math.random()-0.5)*10,(Math.random()-0.5)*3], {size:4});
    p.push(point);
    brd.update();
}
```

## 摆线

<div id="jxgbox-Rolling" class="jxgbox" style="height:170px;"></div>

<script type="text/javascript">
(function () {
    var brd = JXG.JSXGraph.initBoard('jxgbox-Rolling', {boundingbox:[-2,4,2,-2.5], axis:false, keepAspectRatio:true, showCopyright:false, showClearTraces:true, showNavigation:false});
    var M = brd.create('point',[-2,0],{name:'M', face:'o', size:1, visible:false});
    var N = brd.create('point',[2,0],{name:'N', face:'o', size:1, visible:false});
    brd.create('line', [M,N], {color:'black'});
    var r = brd.create('slider', [[-1,-1.5], [1,-1.5], [0,1,3]], {name:'r'});
    var l = brd.create('slider', [[5,-1.5], [10,-1.5], [-2.,0,18.]], {name:'l'});
    var C = brd.create('point', [function(){return l.Value()}, function(){return r.Value()}], {color:'blue', size:1, name:'C'});
    var c = brd.create('circle', [C, function(){return r.Value()}], {color:'orange', fillOpacity:0.1});
    var A0 = brd.create('point', [function(){return C.X()}, function(){return 2*r.Value()}], {visible:false});
    var A = brd.create('point', [function(){return ((A0.X()-C.X())*Math.cos(l.Value()/r.Value())+(A0.Y()-C.Y())*Math.sin(l.Value()/r.Value()))+C.X()},
                                 function(){return (-(A0.X()-C.X())*Math.sin(l.Value()/r.Value())+(A0.Y()-C.Y())*Math.cos(l.Value()/r.Value()))+C.Y()}],
                                 {size:1, color:'red', trace:true});
})();
</script>

```javascript
var brd = JXG.JSXGraph.initBoard('jxgbox-Rolling', {boundingbox:[-2,4,2,-2.5], axis:false, keepAspectRatio:true, showCopyright:false, showClearTraces:true, showNavigation:false});
var M = brd.create('point',[-2,0],{name:'M', face:'o', size:1, visible:false});
var N = brd.create('point',[2,0],{name:'N', face:'o', size:1, visible:false});
brd.create('line', [M,N], {color:'black'});
var r = brd.create('slider', [[-1,-1.5], [1,-1.5], [0,1,3]], {name:'r'});
var l = brd.create('slider', [[5,-1.5], [10,-1.5], [-2.,0,18.]], {name:'l'});
var C = brd.create('point', [function(){return l.Value()}, function(){return r.Value()}], {color:'blue', size:1, name:'C'});
var c = brd.create('circle', [C, function(){return r.Value()}], {color:'orange', fillOpacity:0.1});
var A0 = brd.create('point', [function(){return C.X()}, function(){return 2*r.Value()}], {visible:false});
var A = brd.create('point', [function(){return ((A0.X()-C.X())*Math.cos(l.Value()/r.Value())+(A0.Y()-C.Y())*Math.sin(l.Value()/r.Value()))+C.X()},
                             function(){return (-(A0.X()-C.X())*Math.sin(l.Value()/r.Value())+(A0.Y()-C.Y())*Math.cos(l.Value()/r.Value()))+C.Y()}],
                             {size:1, color:'red', trace:true});
```

## 调和共轭点

参考自 [JSXGraph Book 3.5](https://ipesek.github.io/jsxgraphbook/3_2c_example.html)。$A$, $B$, $C$ 三点共线，满足
$$
\frac{AD}{BD}=\frac{AC}{BC}
$$
的共线的 $D$ 点，称为 $C$ 相对 $A$ 和 $B$ 的调和共轭点。

<div id="jxgbox-Harmonic" class="jxgbox" style="height:400px;"></div>

<script type="text/javascript">
(function () {
    var brd = JXG.JSXGraph.initBoard('jxgbox-Harmonic', {boundingbox:[-5,5,5,-3], showCopyright:false});
    var A = brd.create('point', [-4,-2]);
    var B = brd.create('point', [0,-2]);
    var a = brd.create('line', [A,B], {color:'green'});
    var C = brd.create('glider', [4,0,a]);
    var E = brd.create('point', [1,4], {name:'E', size:2, color:'blue'});
    var b = brd.create('line', [A,E], {color:'green'});
    var c = brd.create('line', [B,E], {color:'green'});
    var F = brd.create('glider', [0,0,b], {name:'F', size:2, color:'blue'});
    var d = brd.create('line', [C,F], {color:'green'});
    var G = brd.create('intersection', [d,c,0], {name:'G', size:2, color:'blue'});
    var e = brd.create('line', [A,G], {color:'grey', dash:"2"});
    var f = brd.create('line', [B,F], {color:'grey', dash:"2"});
    var H = brd.create('intersection', [e,f], {name:'H', size:2, color:'blue'});
    var g = brd.create('line', [E,H], {color:'grey', dash:"2"});
    var D = brd.create('intersection', [a,g,0]);
})();
</script>

```javascript
var brd = JXG.JSXGraph.initBoard('jxgbox', {boundingbox:[-5,5,5,-5]});
var A = brd.create('point', [-4,-2]);
var B = brd.create('point', [0,-2]);
var a = brd.create('line', [A,B], {color:'green'});
var C = brd.create('glider', [4,0,a]);
var E = brd.create('point', [1,4], {name:'E', size:2, color:'blue'});
var b = brd.create('line', [A,E], {color:'green'});
var c = brd.create('line', [B,E], {color:'green'});
var F = brd.create('glider', [0,0,b], {name:'F', size:2, color:'blue'});
var d = brd.create('line', [C,F], {color:'green'});
var G = brd.create('intersection', [d,c,0], {name:'G', size:2, color:'blue'});
var e = brd.create('line', [A,G], {color:'grey', dash:"2"});
var f = brd.create('line', [B,F], {color:'grey', dash:"2"});
var H = brd.create('intersection', [e,f], {name:'H', size:2, color:'blue'});
var g = brd.create('line', [E,H], {color:'grey', dash:"2"});
var D = brd.create('intersection', [a,g,0]);
```

# 实现

首先，把下面的代码保存成`index.html`文件：

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" type="text/css" href="http://jsxgraph.uni-bayreuth.de/distrib/jsxgraph.css"/>
        <script type="text/javascript" src="http://jsxgraph.uni-bayreuth.de/distrib/jsxgraphcore.js"></script>
    </head>
    <body>
        <div id="jxgbox" class="jxgbox" style="width:500px; height:500px;"></div>

        <!-- 把HTML代码放在下面（如果有HTML） -->

        <!-- 把javascript代码放在下面 -->
        <script type="text/javascript">

        </script>
    </body>
</html>
```

针对以上示例，分别把 HTML 和 javascript 代码复制到对应的位置。保存，用浏览器打开即可。