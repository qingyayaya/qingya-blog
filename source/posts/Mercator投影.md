---
title: Mercator 投影
date: 2021-09-19 12:00:00
cover: https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/cover/cover8.png
---


作为一个轻度的地图控，我一直想探索地图投影这一块的知识。不知道大家有没有这样的疑问：高德地图、谷歌地图为什么都采用 Mercator 投影？

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/amap.png" width="400"/></div>

这种地图高纬度地区严重失真，格陵兰岛看起来比非州还要大，究竟有什么好处？

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/knowledge.jpg" width="180"/></div>

# 等距柱状投影

因为本文涉及的投影方式都是圆柱投影，所以在介绍 Mercator 投影之前，不妨先了解一下比较简单的等距柱状投影。

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/Equirectangular.png" width="400"/></div>

这种投影用一个底面直径、高均等于地球直径的圆柱面卡住地球，圆柱的轴线与地轴重合。从地轴上一点出发，沿与赤道平行的方向把地表上一点投影到圆柱面上，再把圆柱面展开，就得到了等距柱状投影的地图。投影形成的各矩形网格单元具有相同的长宽。我愿用一句话来形容这个过程：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/juan.jpg" width="200"/></div>

所谓地图投影，无非就是把地表一点 $(\lambda,\phi)$ 映射到平面上的一点 $(x,y)$，不然 map 这个单词为什么会有映射的意思呢（~~我瞎猜的~~）？等距柱状投影的映射关系足够简单：
$$
\begin{aligned}
x(\lambda,\phi) &= R (\lambda-\lambda_{0}) \\
y(\lambda,\phi) &= R \phi
\end{aligned}
$$
由于映射关系简单，所以在轨道力学中，经常用等距柱状投影绘制航天器的星下点轨迹，因为基本不需要经过复杂的转换。下面是几颗航天器的星下点轨迹：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/PreviSat.png" width="400"/></div>

# Mercator 投影

首先需要交代 Mercator 投影的提出年代是 16 世纪，彼时大航海时代方兴未艾，世界需要一张准确清晰的航海图。对于远洋航行来说，最方便的地图是能够让航线在地图上是一条直线，这样只需用直线把起点与目的地连接起来，就得到了航线。

1569 年，Gerhardus Mercator 出版了他的世界地图，在这张地图上，平行的经线与平行的纬线垂直交错形成了经纬网，并且投影前后角度没有发生变化。这是一个开拓性的创造，Mercator 开创了地理学史新的篇章。

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/Mercator%20portrait1.jpeg" width="180"/></div>

<p style="color: #939393; text-align: center;">（Gerhardus Mercator 1512-1594）</p>

和等距柱状投影一样，Mercator 投影也是圆柱投影，投影遵循等角约束（具体如何实现，先按下不表）

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/Mercator.png" width="400"/></div>

地图上经纬线垂直的意义不言而喻，需要说明一下投影前后角度不变的意义：

在 Mercator 的年代，航海导航全靠指南针，指南针会给出当地经线的方向，船的航行方向与经线夹成一定的角度。在 Mercator 的地图上，由于经线互相平行，我们任意画一条直线航线，会发现它与每条经线所夹的角度是相同的，那么根据角度不变，还原回地表，这条航线与球面的每条经线所夹的角度依然是相同的，这样我们让船的航行方向与指南针始终夹成这个角度，就可以实现沿着这条航线航行，到达目的地。这样的航线被称为等角航线。

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/rhumb%20line.jpg" width="220"/></div>

在 Mercator 的地图上，用直线就可以轻松规划出一条等角航线，排除风浪等因素的干扰，只要利用指南针使得航行方向保持这个角度，就可以导航到目的地，非常便于测量和纠正，这就是 Mercator 的地图的先进性，直到今天仍然没有过时。

回到本文开头的问题，各大地图软件为什么偏爱 Mercator 投影，答案就是方向不变。垂直的十字路口在 Mercator 投影上依然是垂直的，笔直的道路在 Mercator 投影上依然是笔直的。用一张图来说明：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/amap%20kejilu.png" width="300"/></div>

下面，我们将根据等角约束，分别考虑地球是球体和椭球体两种情况，推导出 Mercator 投影的投影公式。

## 球体

在平面投影图上，分别以 $0^{\circ}$ 经线和 $0^{\circ}$ 纬线为 $x$ 轴和 $y$ 轴建立直角坐标系。在地球表面取 $d\lambda$ 和 $d\phi$ 构成的微元，对应的弧长微元为 $dX$ 和 $dY$。根据 Mercator 投影经纬线互相垂直的特点，这个微元的平面投影是矩形，矩形的宽和高分别记作 $dx$ 和 $dy$。

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/angle.png" width="500"/></div>

有
$$
\begin{eqnarray*}
&& dX = R \cos \phi d\lambda \\
&& dY = R d\phi
\end{eqnarray*}
$$
引入等角约束，即必须满足：
$$
\require{extpfeil}
\tan \alpha = \frac{dY}{dX} = \frac{R d\phi}{R \cos \phi d\lambda}
\xlongequal{等角约束} \tan \beta = \frac{dy}{dx}
$$
另外
$$
x = R (\lambda-\lambda_{0})
$$
所以
$$
dx = R d\lambda
$$
把上式代入到等角约束的表达式中，化简，得到
$$
dy = R \sec \phi d\phi
$$
两边积分，得到
$$
y(\phi) = R \ln \left| \tan \left( \frac{\phi}{2}+\frac{\pi}{4} \right) \right| + C
$$
另外，根据所建直角坐标系的特点
$$
y(0)=0 \Longrightarrow C=0
$$
又由于纬度 $\phi \in (-\frac{\pi}{2},\frac{\pi}{2})$，所以 $y(\phi)$ 里的绝对值可以去掉。最终的投影公式为：
$$
\begin{aligned}
x(\lambda,\phi) &= R (\lambda-\lambda_{0}) \\
y(\lambda,\phi) &= R \ln \left[ \tan \left( \frac{\phi}{2}+\frac{\pi}{4} \right) \right]
\end{aligned}
$$
还有一些变形形式：
$$
\begin{aligned}
y(\phi)
&=R \ln \left[ \tan \left( \frac{\phi}{2}+\frac{\pi}{4} \right) \right] \\
&=R\ln (\tan \phi+\sec \phi) \\
&=\frac{R}{2} \ln \left(\frac{1+\sin \phi}{1-\sin \phi}\right) \\
&=R\sinh ^{-1}(\tan \phi) \\
&=R\tanh ^{-1}(\sin \phi)
\end{aligned}
$$
Mercator 投影的逆变换：
$$
\begin{aligned}
\lambda(x,y) &= \frac{x}{R} \\
\phi(x,y) &= \tanh ^{-1}(\sinh \frac{y}{R})
\end{aligned}
$$

当 $\phi \rightarrow \frac{\pi}{2}$ 时，$y \rightarrow \infty$，所以需要对 $\phi$ 的范围进行限制。各大地图软件采用的是 Web Mercator 投影，即地图的宽度和高度相等。解算一下 Web Mercator 投影 $\phi$ 的范围：令 $y(\phi)$ 等于地图的宽度的一半，即 $\pi R$，解得
$$
\phi = 2 \tan^{-1}e^{\pi} - \frac{\pi}{2} \approx 85.05^{\circ}
$$
即 Web Mercator 投影表示的是 $\phi \in (-85.05^{\circ},85.05^{\circ})$ 这一范围。

## 椭球体

设椭球的扁率为 $\varepsilon$，赤道半径为 $a$，$\lambda$ 和 $\phi$ 是地心经纬度，有
$$
\begin{aligned}
dX &= \frac{a \cos \phi}{\left( 1-\varepsilon^2\sin^2\phi \right)^{\frac{1}{2}}}d\lambda \\
dY &= \frac{a (1-\varepsilon^2)}{\left( 1-\varepsilon^2\sin^2\phi \right)^{\frac{3}{2}}} d\phi
\end{aligned}
$$
引入椭球条件下的等角约束：
$$
\require{extpfeil}
\tan \alpha = \frac{dY}{dX} = \frac{(1-\varepsilon^2) d\phi}{(1-\varepsilon^2\sin^2\phi) \cos \phi d\lambda}
\xlongequal{等角约束} \tan \beta = \frac{dy}{dx}
$$
所以
$$
dy = \frac{a(1-\varepsilon^2)}{(1-\varepsilon^2\sin^2\phi) \cos \phi} d\phi
$$
两边积分，得到
$$
\begin{aligned}
y
&=\int_{0}^{\phi} \frac{a\left(1-\varepsilon^{2}\right) d \phi}{\left(1-\varepsilon^{2} \sin ^{2} \phi\right) \cos \phi} \\
&=a \int_{0}^{\phi} \frac{d \phi}{\cos \phi}+\frac{a \varepsilon}{2} \int_{0}^{\phi} \frac{\varepsilon \cos \phi d \phi}{1-\varepsilon \sin \phi}-\frac{a \varepsilon}{2} \int_{0}^{\phi} \frac{\varepsilon \cos \phi d \phi}{1+\varepsilon \sin \phi} \\
&=a \int_{0}^{\phi} \frac{d \phi}{\sin \left(\frac{\pi}{2}+\phi\right)}+\frac{a \varepsilon}{2} \int_{0}^{\phi} \frac{\varepsilon \cos \phi d \phi}{1-\varepsilon \sin \phi}-\frac{a \varepsilon}{2} \int_{0}^{\phi} \frac{\varepsilon \cos \phi d \phi}{1+\varepsilon \sin \phi} \\
&=a \int_{0}^{\phi} \frac{\cos \left(\frac{\pi}{4}+\frac{\phi}{2}\right)}{\sin \left(\frac{\pi}{4}+\frac{\phi}{2}\right)} \frac{d \phi}{2}-a \int_{0}^{\phi} \frac{\sin \left(\frac{\pi}{4}+\frac{\phi}{2}\right)}{\cos \left(\frac{\pi}{4}+\frac{\phi}{2}\right)} \frac{d \phi}{2}+\frac{a \varepsilon}{2} \int_{0}^{\phi} \frac{\varepsilon \cos \phi d \phi}{1-\varepsilon \sin \phi}-\frac{a \varepsilon}{2} \int_{0}^{\phi} \frac{\varepsilon \cos \phi d \phi}{1+\varepsilon \sin \phi} \\
&=a \ln \sin \left(\frac{\pi}{4}+\frac{\phi}{2}\right)-a \ln \cos \left(\frac{\pi}{4}+\frac{\phi}{2}\right)+\frac{a \varepsilon}{2} \ln(1-\varepsilon \sin \phi)-\frac{a \varepsilon}{2} \ln\left(1+\varepsilon \sin \phi \right) \\
&=a \ln \tan \left(\frac{\pi}{4}+\frac{\phi}{2}\right)+\frac{a \varepsilon}{2} \ln\left(\frac{1-\varepsilon \sin \phi}{1+\varepsilon \sin \phi}\right) \\
&=a \ln\left[\tan \left(\frac{\pi}{4}+\frac{\phi}{2}\right) \cdot\left(\frac{1-\varepsilon \sin \phi}{1+\varepsilon \sin \phi}\right)^{\varepsilon / 2}\right]
\end{aligned}
$$

椭球条件下，Mercator 投影的投影公式为：
$$
\begin{aligned}
x(\lambda,\phi) &= a (\lambda-\lambda_{0}) \\
y(\lambda,\phi) &= a \ln\left[\tan \left(\frac{\pi}{4}+\frac{\phi}{2}\right) \cdot\left(\frac{1-\varepsilon \sin \phi}{1+\varepsilon \sin \phi}\right)^{\varepsilon / 2}\right]
\end{aligned}
$$

# 横轴 Mercator 投影

横轴 Mercator 投影是在 Mercator 投影的基础上，把投影圆柱倾斜 $90^{\circ}$ 形成的，它依然继承等角约束，投影示意图如下：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/TransverseMercator.png" width="400"/></div>

和 Mercator 投影相反，它的特点是两级的变形最小，赤道的变形最大。

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/TransverseMercator%20North.png" width="700"/></div>



它的投影公式为：
$$
\begin{aligned}
x(\lambda,\phi) &= R \tan ^{-1} \left[ \frac{\tan \phi}{\cos (\lambda - \lambda_{0})} \right] \\
y(\lambda,\phi) &= \frac{R}{2} \ln \left[ \frac{
    1 + \sin (\lambda - \lambda_{0}) \cos \phi
    }{
    1 - \sin (\lambda - \lambda_{0}) \cos \phi
    } \right]
\end{aligned}
$$
具体推导过程暂且不表，后文的斜轴 Mercator 投影部分会进行推导。

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/eye.jpg" width="150"/></div>

------

看到横轴 Mercator 投影的地图，不由得让我想起初中地理课本上解释地球仪的一张插图，书上的插图我已经找不到了，这里大概复现了一下：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/divide1.png" width="400"/></div>

大概意思就是：像剥桔子皮一样，把地表沿着一些经线剥开，再展成平面图。它的逆过程就是制作地球仪的过程。上图中的每一个梭形区域都是用横轴 Mercator 投影计算出来的。

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/divide2.png" width="240"/></div>

# 三种投影的对比

以上介绍了等距柱状投影、Mercator 投影、横轴 Mercator 投影，下面分别从投影前后角度的变化和面积的变化进行对比。

## 角度的变化

前面已经介绍了等角航线，这种航线在导航方面容易实现，但是它的航程如何呢？很可惜，等角航线的航程不是最短的，两点间最短的航线是大圆航线。

> 通过地面上任意两点和地心做一平面，平面与地球表面相交得到的圆周是大圆，两点之间的大圆劣弧线就是大圆航线。

但是大圆航线与各经线的夹角不是恒定的，沿大圆航线航行需要不断地调整方向。

在地球表面取 4 个地点，分别构造 3 条大圆航线（<font color=red>红色</font>）和 3 条等角航线（<font color=purple>紫色</font>），如下图（这里不纠结航线经过陆地的问题，或者把它们理解为飞机的航线）

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/line1.png" width="250"/></div>

等距柱状投影

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/line2.png" width="300"/></div>

Mercator 投影

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/line3.png" width="300"/></div>

横轴 Mercator 投影

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/line4.png" width="300"/></div>

通过对比可以发现：

1. 在 Mercator 投影里，等角航线的确是直线，而大圆航线不是。
2. 在某些情况下，大圆航线和等角航线比较接近。此时完全可以沿着等角航线航行。在某些情况下，大圆航线和等角航线相差非常明显。

## 面积的变化

!> 提示：以下内容可能引起密集恐惧症患者不适，请有选择地阅读！

在地球表面取若干**等面积**的圆形区域，如下图：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/disk1.png" width="250"/></div>

等距柱状投影

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/disk2.png" width="300"/></div>

Mercator 投影

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/disk3.png" width="300"/></div>

横轴 Mercator 投影

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/disk4.png" width="300"/></div>

通过对比可以发现：

1. 三种投影都改变了圆形区域的面积。
2. Mercator 投影越靠近两级，面积被放大地越多；横轴 Mercator 投影越靠近赤道，面积被放大地越多。
3. 对于 Mercator 投影和横轴 Mercator 投影，投影前后形状没发生变化，再次体现了角度不变性。

# 斜轴 Mercator 投影

在横轴 Mercator 投影中，把投影圆柱倾斜了 $90^{\circ}$，那么如果把圆柱倾斜一个任意的角度呢？示意图如下：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/ObliqueMercator.png" width="300"/></div>

这样形成的投影图称为斜轴 Mercator 投影，先预览一下倾斜 $90^{\circ}$、$60^{\circ}$、$30^{\circ}$、$0^{\circ}$ 时的投影图：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/Oblique.png" width="400"/></div>

斜轴 Mercator 投影的投影公式为：

$$
\begin{aligned}
x(\lambda,\phi) &= R \tan ^{-1} \left[ \frac{\cos \alpha \tan \phi+\sin \alpha \sin (\lambda - \lambda_{0})}{\cos (\lambda - \lambda_{0})} \right] \\
y(\lambda,\phi) &= \frac{R}{2} \ln \left[ \frac{
    1 + \sin \alpha \sin \phi+\cos \alpha \sin (\lambda - \lambda_{0}) \cos \phi
    }{
    1 - \sin \alpha \sin \phi-\cos \alpha \sin (\lambda - \lambda_{0}) \cos \phi
    } \right] \\
& = R \tanh ^{-1} \left[ \sin \alpha \sin \phi-\cos \alpha \cos \phi \sin \left(\lambda-\lambda_{0}\right) \right]
\end{aligned}
$$
下面进行推导：

------

记 $T$ 为平常意义下的北极，$Q$ 为人为定义的北极。在正常经纬度意义下，$Q$ 在 $\lambda_{0}$ 经线上，$QO$ 与赤道形成的夹角称为倾斜角，记为 $\alpha$。在北极 $T$ 的意义下，地表一点$P$的经纬度为 $(\lambda,\phi)$；在北极 $Q$ 的意义下，$P$ 点的经纬度为 $(\lambda^{\prime},\phi^{\prime})$。现在就是要寻找 $(\lambda,\phi)$ 到 $(\lambda^{\prime},\phi^{\prime})$ 的映射关系：
$$
(\lambda,\phi) \longrightarrow (\lambda^{\prime},\phi^{\prime})
$$
示意图如下：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/sketch1.png" width="500"/></div>

定义 $\omega$ 为球面角 $\angle TQP$ 的补角，$p$ 为 $\angle QOP$。则 $(\omega,p) \longrightarrow (\lambda^{\prime},\phi^{\prime})$ 为
$$
\begin{aligned}
\lambda^{\prime} &= \omega \\
\phi^{\prime} &= \frac{\pi}{2}-p
\end{aligned}
$$
角度的几何关系罗列如下：
$$
\begin{aligned}
\angle TQP &= \frac{\pi}{2}-\omega \\
\angle TOQ &= \frac{\pi}{2}-\alpha \\
\angle TOP &= \frac{\pi}{2}-\phi \\
\angle QOP &= p \\
\angle QTP &= \lambda - \lambda_{0}
\end{aligned}
$$
根据球面三角的公式，有：
$$
\cos p = \sin \alpha \sin \phi+\cos \alpha \cos (\lambda - \lambda_{0}) \cos \phi
$$
和
$$
\frac{\sin p}{\cos \phi} = \frac{\sin (\lambda - \lambda_{0})}{\cos \omega} \\
\sin p \sin \omega = \cos \alpha \sin \phi-\sin \alpha \cos (\lambda - \lambda_{0}) \cos \phi
$$
根据这两个公式，可以导出
$$
\tan \omega = \frac{\cos \alpha \tan \phi-\sin \alpha \cos (\lambda - \lambda_{0})}{\sin (\lambda - \lambda_{0})}
$$
这样就得到了 $(\lambda,\phi) \longrightarrow (\omega,p)$：
$$
\begin{aligned}
p &= \cos^{-1} \left[ \sin \alpha \sin \phi+\cos \alpha \cos (\lambda - \lambda_{0}) \cos \phi \right] \\
\omega &= \tan^{-1} \left[ \frac{\cos \alpha \tan \phi-\sin \alpha \cos (\lambda - \lambda_{0})}{\sin (\lambda - \lambda_{0})} \right]
\end{aligned}
$$
在北极 $Q$ 的意义下，$(\lambda^{\prime},\phi^{\prime}) \longrightarrow (x,y)$ 有如下关系（就是 Mercator 投影）：
$$
\begin{aligned}
x(\lambda^{\prime},\phi^{\prime}) &= R \lambda^{\prime} \\
y(\lambda^{\prime},\phi^{\prime}) &= \frac{R}{2} \ln \left(\frac{1+\sin \phi^{\prime}}{1-\sin \phi^{\prime}}\right)
\end{aligned}
$$
整理前面得到的各转换关系，得到 $(\lambda,\phi) \longrightarrow (\omega,p)  \longrightarrow (\lambda^{\prime},\phi^{\prime}) \longrightarrow (x,y)$ 的转换关系：
$$
\begin{aligned}
x(\lambda,\phi) &= R \tan ^{-1} \left[ \frac{\cos \alpha \tan \phi-\sin \alpha \cos (\lambda - \lambda_{0})}{\sin (\lambda - \lambda_{0})} \right] \\
y(\lambda,\phi) &= \frac{R}{2} \ln \left[ \frac{
    1 + \sin \alpha \sin \phi+\cos \alpha \cos (\lambda - \lambda_{0}) \cos \phi
    }{
    1 - \sin \alpha \sin \phi-\cos \alpha \cos (\lambda - \lambda_{0}) \cos \phi
    } \right]
\end{aligned}
$$
当 $\alpha=\frac{\pi}{2}$ 时，北极 $Q$ 与平常意义下的北极 $P$ 重合，斜轴 Mercator 投影退化为 Mercator 投影。**为了确保公式的统一性**，需要在上式中用 $\lambda-\frac{\pi}{2}$ 替换 $\lambda$，替换后
$$
\begin{aligned}
x(\lambda,\phi) &= R \tan ^{-1} \left[ \frac{\cos \alpha \tan \phi+\sin \alpha \sin (\lambda - \lambda_{0})}{\cos (\lambda - \lambda_{0})} \right] \\
y(\lambda,\phi) &= \frac{R}{2} \ln \left[ \frac{
    1 + \sin \alpha \sin \phi+\cos \alpha \sin (\lambda - \lambda_{0}) \cos \phi
    }{
    1 - \sin \alpha \sin \phi-\cos \alpha \sin (\lambda - \lambda_{0}) \cos \phi
    } \right]
\end{aligned}
$$
此时，把 $\alpha=\frac{\pi}{2}$ 代入其中，化简之后会发现就是 Mercator 投影的投影公式。令 $\alpha=0$ 就得到了横轴 Mercator 投影的投影公式（填坑了）。需要特别注意的是，因为执行了换元的操作，所以使用这个公式时中央经线会与预想中的 $\lambda_{0}$ 相差 $\frac{\pi}{2}$。

得证。

------

斜轴 Mercator 投影的逆变换为
$$
\begin{aligned}
\phi(x,y) &= \sin ^{-1}\left(\sin \alpha \tanh y+\frac{\cos \alpha \sin x}{\cosh y}\right) \\
\lambda(x,y) &= \lambda_{0}+\tan ^{-1}\left(\frac{\sin \alpha \sin x-\cos \alpha \sinh y}{\cos x}\right)
\end{aligned}
$$

------

下面是本文最燃的一部分，让我们把倾斜角 $\alpha$ 从 $90^{\circ}$ 到 $0^{\circ}$ 的全过程用动图的形式呈现出来：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/animate1.gif" width="400"/></div>

<p style="color: #939393; text-align: center;">（正视图）</p>

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/animate2.gif" width="400"/></div>

<p style="color: #939393; text-align: center;">（后视图）</p>

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/animate3.gif" height="400"/></div>

<p style="color: #939393; text-align: center;">（俯视图）</p>

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/animate4.gif" width="400"/></div>

<p style="color: #939393; text-align: center;">（平面图）</p>

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/burn.gif" width="150"/></div>

按照惯例，此处应该附上代码，但是这个代码写的并不优雅，渲染上面 4 张动图足足用了 1 小时 57 分钟，所以就不公开出来了。

# 关于 Mercator 投影的思考

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/chui.jpg" width="150"/></div>

（我并不是 GIS 专业的，这里斗胆谈一点个人的看法属于是，大佬勿嘲）

## 疑问

搜索 Mercator 投影，会常到见一种看似很有道理的言论：

> ~~假设地球被套在一个圆柱中，赤道与圆柱相切，然后在地球中心放一盏灯，把球面上的图形投影到圆柱体上，再把圆柱体展开，就形成以一幅墨卡托投影的世界地图。~~

很多人在科普 Mercator 投影时都会引用上面这句话，甚至某百科都是这么说的。为此，他们还做了一张示意图：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/bad%20projection.jpg" width="100"/></div>

乍一听感觉道出了 Mercator 投影的本质，我一开始也深信不疑。但细细一品，果真如此的话，投影公式 $y(\phi) = R \ln \left[ \tan \left( \frac{\phi}{2}+\frac{\pi}{4} \right) \right]$ 里的 $\ln$ 是从哪里来的？再细细一品，更不对劲，这样的话 $y(\phi)$ 直接等于 $R \tan \phi$ 了。简直让人哭笑不得。

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/liusanjie.jpg" width="220"/></div>

从历史的角度来看，Mercator 投影是 1569 年提出的，**此时微积分尚且没有发明**，而且投影公式里的**对数 $\ln$ 是 17 世纪初才发表的**。所以，先不谈不用微积分能否推导出投影公式，你不可能在没有发明对数的年代使用对数吧？

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/girl.jpg" width="150"/></div>

所以，需要分清楚 **Mercator 投影**和 **Mercator 的投影**。1569 年，Mercator 出版了他的世界地图，他的确可能是根据“地球中心放一盏灯”这种说法绘制的地图。我们看下面这张邮票也体现着这种思想：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/Mercator%20portrait2.jpg" width="240"/></div>

这是 **Mercator 的投影**。但是，**Mercator 投影**是后人修正后的。这多少有点类似**明史**与**《明史》**的关系。

## 探索

不妨尝试对比一下 $y(\phi) = \tan \phi$ 和 $y(\phi) = \ln \left[ \tan \left( \frac{\phi}{2}+\frac{\pi}{4} \right) \right]$ 之间的差距：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/figure1.png" width="500"/></div>

纬度高于 $45^{\circ}$ 之后，二者的差距还是比较大的。

------

把上面的邮票放大：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/Mercator%20portrait3.png" width="200"/></div>

发现发光点并不在圆心，而是偏移了一定的距离？？？不妨假设地球半径是 $R$，发光点相对圆心的偏移是 $\Delta$，针对纬度是 $\phi$ 的一点

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/sketch2.png" width="400"/></div>

根据正弦定理：
$$
\frac{R}{\sin \theta} = \frac{\Delta}{\sin(\phi-\theta)}
$$
反解出 $\theta$：（有请 Mathematica）

<div style="text-align:left;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/snap1.png" width="500"/></div>

那么，此时
$$
\begin{aligned}
y(\phi) 
& = (\Delta + R) \tan \theta \\
& = (\Delta + R) \tan \left[ \cot^{-1} \left(\frac{\csc \phi (\Delta +R \cos \phi)}{R}\right) \right] \\
& = \frac{R (\Delta +R) \sin \phi}{\Delta +R \cos \phi}
\end{aligned}
$$
这就是**修正后的投影公式**。如果令 $\Delta=0$，上式就退化成了 $y(\phi) = R \tan \phi$。

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/good.jpg" width="150"/></div>

尝试计算一下它的逆变换：

<div style="text-align:left;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/snap2.png" width="800"/></div>

有点过于复杂。

那么这个 $\Delta$ 究竟取多少才最合适呢？在 $\Delta \in [0,R]$ 的区间内取几组数据，对比 $y=\frac{R (\Delta +R) \sin \phi}{\Delta +R \cos \phi}$ 和 $y(\phi) = R \ln \left[ \tan \left( \frac{\phi}{2}+\frac{\pi}{4} \right) \right]$ 的图像：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/figure2.png" width="600"/></div>

当 $\Delta$ 介于 $0.3R$ 和 $0.5R$ 之间时，修正的效果最好。说明把发光点进行一定程度的偏移**是行得通的**，而且竟然比圆心发光**更加有效**！

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/zhaobenshan.png" width="220"/></div>

下面研究不同的发光点偏移与等角投影点的距离偏差，即下式的图像：
$$
\delta y(\phi) = 
\frac{R (\Delta +R) \sin \phi}{\Delta +R \cos \phi}
-
R \ln \left[ \tan \left( \frac{\phi}{2}+\frac{\pi}{4} \right) \right]
$$

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/figure3.png" width="500"/></div>

可以看出，在低于 $75^{\circ}$ 纬度的范围内，当 $\Delta=0.45R$ 基本可以保证偏差在 $0.01R$ 以内。

# 结尾

!> 强烈谴责Mathematica的中国地图不完整！！！
!>
!> 坚决抵制使用Mathematica绘制中国地图！！！

?> 正确的中国地图如下：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post8/China%20Map.png" width="400"/></div>

