---
title: JSXGraph - 尺规作正十七边形
date: 2021-10-17 20:00:00
cover: https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/cover/cover12.png
---

<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/jsxgraph@1.3.2/distrib/jsxgraph.css"/>

<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jsxgraph@1.3.2/distrib/jsxgraphcore.js"></script>

<style type="text/css">
.jxgbox {
    width: 600px;
    height: 600px;
    margin-left: auto;
    margin-right: auto;
}
@media screen and (max-width: 500px) {
.jxgbox {
    width: 320px;
    height: 320px;
}
}
</style>

讲解尺规作正十七边形原理的博客多如牛毛，这里就不赘述了。我们用 JSXGraph 实现一种最经典的作法：

# 展示

<div id="jxgbox" class="jxgbox"></div>

<br />

| <input type="checkbox" checked="checked" onclick="AllChecked(this)"/> | 步骤                                                         |
| :----------------------------------------------------------: | ------------------------------------------------------------ |
| <input type="checkbox" class="mycheckbox" checked="checked" onclick="LineABVisible(this)"/> | 任意做线段 AB，B 点将作为正十七边形顶点之一                  |
| <input type="checkbox" class="mycheckbox" checked="checked" onclick="Line1Visible(this)"/> | 做线段 AB 的中垂线                                           |
| <input type="checkbox" class="mycheckbox" checked="checked" onclick="PointEVisible(this)"/> | 关键点 E 点                                                  |
| <input type="checkbox" class="mycheckbox" checked="checked" onclick="CircumCircleVisible(this)"/> | 以 E 为圆心，过点 A 做圆。这个圆将是正十七边形的外接圆       |
| <input type="checkbox" class="mycheckbox" checked="checked" onclick="Line2Visible(this)"/> | 做线段 EF 的中垂线                                           |
| <input type="checkbox" class="mycheckbox" checked="checked" onclick="Line3Visible(this)"/> | 做线段 EI 的中垂线                                           |
| <input type="checkbox" class="mycheckbox" checked="checked" onclick="PointLVisible(this)"/> | 关键点 L 点                                                  |
| <input type="checkbox" class="mycheckbox" checked="checked" onclick="LineBLVisible(this)"/> | 连接 BL，实际上用不到这条线，做视觉上的参考                  |
| <input type="checkbox" class="mycheckbox" checked="checked" onclick="Angle1Visible(this)"/> | 做角 BLE 的角平分线                                          |
| <input type="checkbox" class="mycheckbox" checked="checked" onclick="PointNVisible(this)"/> | 参考点 N 点                                                  |
| <input type="checkbox" class="mycheckbox" checked="checked" onclick="Angle2Visible(this)"/> | 做角 NLE 的角平分线                                          |
| <input type="checkbox" class="mycheckbox" checked="checked" onclick="PointQVisible(this)"/> | 关键点 Q 点                                                  |
| <input type="checkbox" class="mycheckbox" checked="checked" onclick="PointRSVisible(this)"/> | 交点 R 点和 S 点                                             |
| <input type="checkbox" class="mycheckbox" checked="checked" onclick="Line4Visible(this)"/> | 过点 L 做 LQ 的垂线                                          |
| <input type="checkbox" class="mycheckbox" checked="checked" onclick="PointTVisible(this)"/> | 参考点 T 点                                                  |
| <input type="checkbox" class="mycheckbox" checked="checked" onclick="Angle3Visible(this)"/> | 做角 TLQ 的角平分线                                          |
| <input type="checkbox" class="mycheckbox" checked="checked" onclick="PointWVisible(this)"/> | 关键点 W 点                                                  |
| <input type="checkbox" class="mycheckbox" checked="checked" onclick="Line5Visible(this)"/> | 做以 BW 为直径的圆与 b 的交点 A1                             |
| <input type="checkbox" class="mycheckbox" checked="checked" onclick="TempCircleVisible(this)"/> | 做以 A1 为圆心，过 Q 点的圆与线段 AB 的交点 B1               |
| <input type="checkbox" class="mycheckbox" checked="checked" onclick="Line6Visible(this)"/> | 过点 B1 做线段 AB 的垂线，与外接圆的交点就是正十七边形顶点之一，与顶点 B 相隔两个顶点 |
| <input type="checkbox" class="mycheckbox" checked="checked" onclick="Circle17Visible(this)"/> | 已经得到了两个顶点，基于二者，做 17 个圆                     |
| <input type="checkbox" class="mycheckbox" checked="checked" onclick="Poly17Visible(this)"/> | 顺次连接，得到正十七边形                                     |




<script type="text/javascript">
    var brd = JXG.JSXGraph.initBoard('jxgbox', {boundingbox:[-11,11,13,-13], axis:false, grid:false, keepaspectratio: true, showCopyright:false});
    /* 设置属性 */
    brd.options.point.size = 2;
    brd.options.point.color = 'blue';
    brd.options.line.strokeColor = '#aaa';
    brd.options.circle.strokeColor = '#aaa';
    /* 基本框架 */
    var A   = brd.create('point', [0,0], {name:'A'});
    var B   = brd.create('point', [6,0], {name:'B'});
    var a   = brd.create('line', [A,B], {straightFirst:false, straightLast:false});
    var _a  = brd.create('circle', [A,B]);
    var _b  = brd.create('circle', [B,A]);
    var C   = brd.create('intersection', [_a,_b,0], {name:'C'});
    var D   = brd.create('intersection', [_a,_b,1], {name:'D'});
    var b   = brd.create('line', [C,D], {straightFirst:false, straightLast:false});
    var E   = brd.create('intersection', [a,b], {name:'E'});
    var _c  = brd.create('circle', [E,A]);
    var F   = brd.create('intersection', [_c,b,0], {name:'F'});
    /* 四等分点 */
    var _d  = brd.create('circle', [F,E]);
    var G   = brd.create('intersection', [_d,_c,0], {name:'G'});
    var H   = brd.create('intersection', [_d,_c,1], {name:'H'});
    var c   = brd.create('line', [G,H], {straightFirst:false, straightLast:false});
    var I   = brd.create('intersection', [c,b], {name:'I'});
    var _e  = brd.create('circle', [I,E]);
    var _f  = brd.create('circle', [E,I]);
    var J   = brd.create('intersection', [_e,_f,0], {name:'J'});
    var K   = brd.create('intersection', [_e,_f,1], {name:'K'});
    var d   = brd.create('line', [J,K], {straightFirst:false, straightLast:false});
    var L   = brd.create('intersection', [d,b], {name:'L'});
    /* 四等分角 */
    var e   = brd.create('line', [L,B], {straightFirst:false, straightLast:false}); // 实际上用不到这条线
    var _g  = brd.create('circle', [L,B]);
    var M   = brd.create('intersection', [_g,b,1], {name:'M'});
    var _h  = brd.create('circle', [M,B]);
    var _i  = brd.create('circle', [B,M]);
    var N   = brd.create('intersection', [_h,_i,0], {name:'N'});
    var _j  = brd.create('circle', [L,N]);
    var O   = brd.create('intersection', [_j,b,1], {name:'O'});
    var _k  = brd.create('circle', [O,N]);
    var _l  = brd.create('circle', [N,O]);
    var P   = brd.create('intersection', [_k,_l,0], {name:'P'});
    var f   = brd.create('line', [L,P], {straightLast:false});
    var Q   = brd.create('intersection', [f,a], {name:'Q'});
    /* 45度角 */
    var R   = brd.create('intersection', [_g,f,0], {name:'R'});
    var S   = brd.create('intersection', [_g,f,1], {name:'S'});
    var _m  = brd.create('circle', [R,S]);
    var _n  = brd.create('circle', [S,R]);
    var T   = brd.create('intersection', [_m,_n,1], {name:'T'});
    var _o  = brd.create('circle', [L,T]);
    var U   = brd.create('intersection', [_o,f,0], {name:'U'});
    var _p  = brd.create('circle', [T,U]);
    var _q  = brd.create('circle', [U,T]);
    var V   = brd.create('intersection', [_p,_q,0], {name:'V'});
    var g   = brd.create('line', [L,V], {straightFirst:false, straightLast:false});
    var W   = brd.create('intersection', [g,a], {name:'W'});
    /* 第四个点 */
    var _r  = brd.create('circle', [W,B]);
    var _s  = brd.create('circle', [B,W]);
    var X   = brd.create('intersection', [_r,_s,0], {name:'X'});
    var Y   = brd.create('intersection', [_r,_s,1], {name:'Y'});
    var h   = brd.create('line', [X,Y], {straightFirst:false, straightLast:false});
    var Z   = brd.create('intersection', [h,a], {name:'Z'});
    var _t  = brd.create('circle', [Z,W]);
    var A1  = brd.create('intersection', [_t,b,0], {name:'A1'});
    var _u  = brd.create('circle', [Q,A1]);
    var B1  = brd.create('intersection', [_u,a,0], {name:'B1'});
    var _v  = brd.create('circle', [B1,E]);
    var C1  = brd.create('intersection', [_v,a,0], {name:'C1'});
    var _w  = brd.create('circle', [C1,E]);
    var _x  = brd.create('circle', [E,C1]);
    var D1  = brd.create('intersection', [_w,_x,0], {name:'D1'});
    var i   = brd.create('line', [B1,D1], {straightFirst:false});
    var _P = [];
    var _C = [];
    _P[0] = brd.create('intersection', [i,_c,0], {name:'P0'});
    _C[0] = brd.create('circle', [_P[0],B]);
    /* 其他点 */
    for(var idx = 1; idx < 17; idx++) {
        _P[idx] = brd.create('intersection', [_C[idx-1],_c,0], {name:'P'+idx});
        _C[idx] = brd.create('circle', [_P[idx],_P[idx-1]]);
    }
    /* 连线 */
    _L = [];
    for(var idx = 0; idx < 17; idx++) {
        _L[idx] = brd.create('line', [_P[idx],_P[(idx+6)%17]], {straightFirst:false, straightLast:false});
    }
    // 所有线
    function AllChecked(evt) {
        Visible([A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,A1,B1,C1,D1] , evt.checked );
        Visible([a,b,c,d,e,f,g,h,i] , evt.checked );
        Visible([_a,_b,_c,_d,_e,_f,_g,_h,_i,_j,_k,_l,_m,_n,_o,_p,_q,_r,_s,_t,_u,_v,_w,_x] , evt.checked );
        Visible(_C , evt.checked );
        Visible(_P , evt.checked );
        Visible(_L , evt.checked );
        $('.mycheckbox').each( function () {
            $(this).prop("checked", evt.checked);
        });
    }
    // 线段AB
    function LineABVisible(evt) {
        Visible( [A,B,a] , evt.checked );
    }
    // 1号中垂线
    function Line1Visible(evt) {
        Visible( [_a,_b,C,D] , evt.checked );
    }
    // 关键点E点
    function PointEVisible(evt) {
        Visible( [b,E] , evt.checked );
    }
    // 外接圆
    function CircumCircleVisible(evt) {
        Visible([_c,F] , evt.checked );
    }
    // 2号中垂线
    function Line2Visible(evt) {
        Visible( [_d,G,H,c,I] , evt.checked );
    }
    // 3号中垂线
    function Line3Visible(evt) {
        Visible( [_e,_f,J,K,d] , evt.checked );
    }
    // 关键点L点
    function PointLVisible(evt) {
        Visible( [L] , evt.checked );
    }
    // 线段BL
    function LineBLVisible(evt) {
        Visible( [e] , evt.checked );
    }
    // 1号角平分线
    function Angle1Visible(evt) {
        Visible( [_g,M,_h,_i] , evt.checked );
    }
    // 参考点N点
    function PointNVisible(evt) {
        Visible( [N] , evt.checked );
    }
    // 2号角平分线
    function Angle2Visible(evt) {
        Visible( [_j,O,_k,_l,P,f] , evt.checked );
    }
    // 关键点Q点
    function PointQVisible(evt) {
        Visible( [Q] , evt.checked );
    }
    // 关键点R点、S点
    function PointRSVisible(evt) {
        Visible( [R,S] , evt.checked );
    }
    // 4号中垂线
    function Line4Visible(evt) {
        Visible( [_m,_n] , evt.checked );
    }
    // 参考点T点
    function PointTVisible(evt) {
        Visible( [T] , evt.checked );
    }
    // 3号角平分线
    function Angle3Visible(evt) {
        Visible( [_o,U,_p,_q,g,V] , evt.checked );
    }
    // 关键点W点
    function PointWVisible(evt) {
        Visible( [W] , evt.checked );
    }
    // 5号中垂线
    function Line5Visible(evt) {
        Visible( [_r,_s,X,Y,h,Z,_t,A1] , evt.checked );
    }
    // 做圆
    function TempCircleVisible(evt) {
        Visible( [_u,B1] , evt.checked );
    }
    // 6号中垂线
    function Line6Visible(evt) {
        Visible( [_v,C1,_w,_x,D1,i] , evt.checked );
    }
    // 17个圆弧
    function Circle17Visible(evt) {
        Visible(_P , evt.checked );
        Visible(_C , evt.checked );
    }
    // 正17边形
    function Poly17Visible(evt) {
        Visible(_L , evt.checked );
    }
    // 是否可见
    function Visible( element, flag ) {
        if (flag) {
            Show( element );
        } else {
            Hide( element );
        }
    }
    // 隐藏元素
    function Hide( element ) {
        for(var idx = 0; idx < element.length; idx++) {
           element[idx].hideElement();
        }
    }
    // 显示元素
    function Show( element ) {
        for(var idx = 0; idx < element.length; idx++) {
           element[idx].showElement();
        }
    }
</script>
# 源代码


```javascript
/* 初始化画板 */
var brd = JXG.JSXGraph.initBoard('jxgbox', {boundingbox:[-11,11,13,-13], axis:false, grid:false, keepaspectratio: true, showCopyright:false});
brd.options.point.size = 2;
brd.options.point.color = 'blue';
brd.options.line.strokeColor = '#aaa';
brd.options.circle.strokeColor = '#aaa';
/* 基本框架 */
var A   = brd.create('point', [0,0], {name:'A'});
var B   = brd.create('point', [6,0], {name:'B'});
var a   = brd.create('line', [A,B], {straightFirst:false, straightLast:false});
var _a  = brd.create('circle', [A,B]);
var _b  = brd.create('circle', [B,A]);
var C   = brd.create('intersection', [_a,_b,0], {name:'C'});
var D   = brd.create('intersection', [_a,_b,1], {name:'D'});
var b   = brd.create('line', [C,D], {straightFirst:false, straightLast:false});
var E   = brd.create('intersection', [a,b], {name:'E'});
var _c  = brd.create('circle', [E,A]);
var F   = brd.create('intersection', [_c,b,0], {name:'F'});
/* 四等分点 */
var _d  = brd.create('circle', [F,E]);
var G   = brd.create('intersection', [_d,_c,0], {name:'G'});
var H   = brd.create('intersection', [_d,_c,1], {name:'H'});
var c   = brd.create('line', [G,H], {straightFirst:false, straightLast:false});
var I   = brd.create('intersection', [c,b], {name:'I'});
var _e  = brd.create('circle', [I,E]);
var _f  = brd.create('circle', [E,I]);
var J   = brd.create('intersection', [_e,_f,0], {name:'J'});
var K   = brd.create('intersection', [_e,_f,1], {name:'K'});
var d   = brd.create('line', [J,K], {straightFirst:false, straightLast:false});
var L   = brd.create('intersection', [d,b], {name:'L'});
/* 四等分角 */
var e   = brd.create('line', [L,B], {straightFirst:false, straightLast:false}); // 实际上用不到这条线
var _g  = brd.create('circle', [L,B]);
var M   = brd.create('intersection', [_g,b,1], {name:'M'});
var _h  = brd.create('circle', [M,B]);
var _i  = brd.create('circle', [B,M]);
var N   = brd.create('intersection', [_h,_i,0], {name:'N'});
var _j  = brd.create('circle', [L,N]);
var O   = brd.create('intersection', [_j,b,1], {name:'O'});
var _k  = brd.create('circle', [O,N]);
var _l  = brd.create('circle', [N,O]);
var P   = brd.create('intersection', [_k,_l,0], {name:'P'});
var f   = brd.create('line', [L,P], {straightLast:false});
var Q   = brd.create('intersection', [f,a], {name:'Q'});
/* 45度角 */
var R   = brd.create('intersection', [_g,f,0], {name:'R'});
var S   = brd.create('intersection', [_g,f,1], {name:'S'});
var _m  = brd.create('circle', [R,S]);
var _n  = brd.create('circle', [S,R]);
var T   = brd.create('intersection', [_m,_n,1], {name:'T'});
var _o  = brd.create('circle', [L,T]);
var U   = brd.create('intersection', [_o,f,0], {name:'U'});
var _p  = brd.create('circle', [T,U]);
var _q  = brd.create('circle', [U,T]);
var V   = brd.create('intersection', [_p,_q,0], {name:'V'});
var g   = brd.create('line', [L,V], {straightFirst:false, straightLast:false});
var W   = brd.create('intersection', [g,a], {name:'W'});
/* 第四个顶点 */
var _r  = brd.create('circle', [W,B]);
var _s  = brd.create('circle', [B,W]);
var X   = brd.create('intersection', [_r,_s,0], {name:'X'});
var Y   = brd.create('intersection', [_r,_s,1], {name:'Y'});
var h   = brd.create('line', [X,Y], {straightFirst:false, straightLast:false});
var Z   = brd.create('intersection', [h,a], {name:'Z'});
var _t  = brd.create('circle', [Z,W]);
var A1  = brd.create('intersection', [_t,b,0], {name:'A1'});
var _u  = brd.create('circle', [Q,A1]);
var B1  = brd.create('intersection', [_u,a,0], {name:'B1'});
var _v  = brd.create('circle', [B1,E]);
var C1  = brd.create('intersection', [_v,a,0], {name:'C1'});
var _w  = brd.create('circle', [C1,E]);
var _x  = brd.create('circle', [E,C1]);
var D1  = brd.create('intersection', [_w,_x,0], {name:'D1'});
var i   = brd.create('line', [B1,D1], {straightFirst:false});
var _P = [];
var _C = [];
_P[0] = brd.create('intersection', [i,_c,0], {name:'P0'});
_C[0] = brd.create('circle', [_P[0],B]);
/* 其他点 */
for(var idx = 1; idx < 17; idx++) {
    _P[idx] = brd.create('intersection', [_C[idx-1],_c,0], {name:'P'+idx});
    _C[idx] = brd.create('circle', [_P[idx],_P[idx-1]]);
}
/* 连线 */
_L = [];
for(var idx = 0; idx < 17; idx++) {
    _L[idx] = brd.create('line', [_P[idx],_P[(idx+6)%17]], {straightFirst:false, straightLast:false});
}
```