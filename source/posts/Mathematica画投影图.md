---
title: Mathematica 画投影图
date: 2021-09-11 12:00:00
cover: https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/cover/cover7.png
---


以前读论文，经常看到下面这样的三维轨道的投影图：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post7/Peng1.png" width="400"/></div>

<p style="color: #939393; text-align: center;">（作者：Peng Hao）</p>

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post7/Peng2.png" width="400"/></div>

<p style="color: #939393; text-align: center;">（作者：Peng Hao）</p>

把三维轨迹和三个平面投影结合起来，可以更加明了地展示轨道的立体结构，后来我也深受这种画图技巧的影响。但是，无论是 Mathematica 还是 MATLAB，目前主流的版本均没有提供直接画三维投影的内置函数。MATLAB 向来不在我们的讨论范围之内，这次我们讨论怎样用 Mathematica 画投影图。

# 官方给出的解决方案

在 Mathematica 帮助文档的搜索框输入一串鲜为人知的字符：`Compatibility/tutorial/Graphics/Graphics3D`，将进入一个**兼容性信息**页面，这个页面里面说明了很多**特殊**且**很有实用价值**的画图技巧：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post7/document1.png" width="500"/></div>

在这个页面的**最底端**，有一个绘制投影图的示例：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post7/document2.png" width="500"/></div>

这个示例就是官方给出的绘制投影图**最好的解决方案**，它适用于各种图形元素，包括点、线、曲面、实体等等，基本没有 bug。所以，画投影图首选这种方式。

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post7/good.jpg" width="240"/></div>

但是，每次画投影图都需要写这么长的代码，恐怕不是我们所希望的。而且，如果只想画出某些投影面，或者想令投影面偏移到特定的位置，此时如何进行设置也是很大的问题。

# ShadowFigure 扩展包

根据上文的需求，我对官方提供的代码进行改造，并把它封装成一个函数，[代码](https://gitee.com/qingyaya/graphics3D)已经在 Gitee 开源（原创的代码，欢迎 Star，欢迎 Fork）。

ShadowFigure 包可以通过下面的命令一键导入：


```mathematica
Get["https://gitee.com/qingyaya/graphics3D/raw/master/ShadowFigure.m"]
```

用 ShadowFigure 函数绘制一个立方体的投影图：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post7/snap1.png" width="500"/></div>

ShadowFigure 函数可以指定以下属性：

| 名称            | 含义                  |
| --------------- | --------------------- |
| XShadow         | 是否绘制 X 方向的投影 |
| YShadow         | 是否绘制 Y 方向的投影 |
| ZShadow         | 是否绘制 Z 方向的投影 |
| XShadowPosition | X 方向投影的偏移量    |
| YShadowPosition | Y 方向投影的偏移量    |
| ZShadowPosition | Z 方向投影的偏移量    |

这样使用起来就方便多了。比如，不绘制 Z 方向的投影、并把 Y 方向投影的偏移量设为 3：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post7/snap2.png" width="500"/></div>

画一下 Spikey 的投影：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post7/snap3.png" width="500"/></div>

点和线也是可以的：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post7/snap4.png" width="500"/></div>

多边形：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post7/snap5.png" width="500"/></div>

这个函数还有很多不完美的地方，但是就以上几个例子来看，还是能满足一些简单的需求的。

# Graphics3D 扩展包

其实在 **Mathematica 5.2** 版本之前，画投影图是一件非常容易的事情，因为彼时 Graphics3D 扩展包还是内置的扩展包，只需运行：

```mathematica
<< Graphics`Graphics3D`
```

即可加载。包里有两个函数 **Shadow** 和 **Project**，专用于画投影图。不过，官方从 6.0 版本之后（10 多年前）开始信奉*去包化策略*，Graphics3D 扩展包被剔除。

## 下载

在 [http://library.wolfram.com/infocenter/MathSource/6766/](http://library.wolfram.com/infocenter/MathSource/6766/) 仍然可以下载到 Graphics3D 扩展包：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post7/document3.png" width="500"/></div>

但是，高版本的 Mathematica 无法兼容这个包，如果强行导入，将引起一连串的报错，比如：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post7/warning.png" width="500"/></div>

其中第一条错误就是：

> Graphics&#x60;Graphics3D&#x60; 已经过期. 正在加载的旧版本可能与目前的功能相冲突. 

## 修复

对于这个最近一次更新是在 2007 年的远古扩展包，里面有非常多的语法和函数不能和高版本的Mathematica 相兼容，是一件无可厚非的事情，而对其进行修复的主要任务也就是**处理这些不兼容项**。

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post7/Holmes.jpg" width="150"/></div>

经过仔细阅读提示信息，总结出不兼容项主要包括以下几类：

> 1. 提示 Graphics&#x60;Graphics3D&#x60; 已经过期
> 2. Graphics&#x60;Common&#x60;GraphicsCommon&#x60;、Utilities&#x60;FilterOptions&#x60;、Statistics&#x60;DataManipulation&#x60; 等，这些所依赖的其他扩展包已经被高版本的 Mathematica 移除
> 3. 包里的 BarChart3D 和 Histogram3D 等函数被保护，也就是现在高版本的 Mathematica 已经将它们收为内置函数

\>\> 对于第 1 条，可以不必关心。如果实在不想看到，不妨给它改个名字。

\>\> 对于第 2 条，通读源代码，发现有无 Graphics&#x60;Common&#x60;GraphicsCommon&#x60; 和 Statistics&#x60;DataManipulation&#x60; 影响不大（经过实际测试，将其删除后，的确影响不大）。但是，Utilities&#x60;FilterOptions&#x60; 包里的 FilterOptions 函数被多次使用，所以轻易不能删去。不过，Utilities&#x60;FilterOptions&#x60; 包在 Mathematica 9.0 版本后被彻底删除，那么该怎么替换掉 FilterOptions 函数呢？找到了[解决方案](https://mathematica.stackexchange.com/questions/31426/summa-package-problem/99139#99139)。

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post7/lucky.jpg" width="150"/></div>

只需要在包里增加下面这行代码即可：

```mathematica
If[$VersionNumber>=9,Graphics`Graphics3D`Private`FilterOptions[a_,b___]:=Sequence@@FilterRules[{b},Options[a]]];
```

\>\> 对于第 3 条，可以直接把包里的 BarChart3D 和 Histogram3D 等函数删除，因为它们已经成为内置函数。

到此为止，已经完成了修复。除了 **Shadow** 和 **Project** 函数，修复后的包里还包含一些其他的函数：

| 名称               | 保留 |  备注  |
| :----------------- | :--: | :----: |
| ScatterPlot3D      |  ✓   |        |
| ShadowPlot3D       |  ✓   |        |
| ListShadowPlot3D   |  ✓   |        |
| Project            |  ✓   |        |
| Shadow             |  ✓   |        |
| TransformGraphcs3D |  ✓   |        |
| SkewGraphics3D     |  ✓   | 有 Bug |
| StackGraphics      |  ✓   | 有 Bug |
| Histogram3D        |  ✗   | 已内置 |
| BarChart3D         |  ✗   | 已内置 |
| ListSurfacePlot3D  |  ✗   | 已内置 |

## 使用

修复后的 Graphics3D 扩展包的代码已经在 Gitee 开源（和上文的 ShadowFigure 放在同一个仓库里），通过下面的命令可以一键导入：

```mathematica
Get["https://gitee.com/qingyaya/graphics3D/raw/master/Graphics3D.m"]
```

运行上面的代码会报一个错误，即依然会提示 Graphics&#x60;Graphics3D&#x60; 已经过期，前面已经说过了，不用管它，如果实在不想看到，不妨给它改个名字。

导入之后，看 Shadow 函数的一个示例：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post7/snap6.png" width="500"/></div>

## 不足

通过在修复的过程中阅读源代码，我发现这个包被官方抛弃，是有原因的，因为源代码的思想已经较为落后。

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post7/dislike.jpg" width="100"/></div>

它可以支持 Point、Line、Polygon、Cuboid 等元素，但是不支持 Sphere、Ellipsoid、Cylinder 等元素，因为源代码是先匹配元素的种类，再根据每种元素的特点，对其投影单独进行处理。比如，对 Line 有一套投影算法，对 Cuboid 又是另一套投影算法，这就导致通用性和兼容性非常差。再比如，源代码根本没有考虑到 Ellipsoid 这种元素（事实上，Ellipsoid 是 2014 年 Mathematica 10.0 版本引入的，而 Graphics3D 扩展包在 2007 年停止维护），自然没法画出它的投影。

相比之下，官方最新给出的解决方案使用的是 Scale 函数进行投影，Scale 函数对所有元素具有通用性，因此这才是比较好的解决方案。所以，从现实的角度出发，非常不提倡去维护一个数字形式的老古董，否则就是自寻烦恼。

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post7/bug.jpg" width="150"/></div>

# 结尾

对于用 Mathematica 画投影图的问题，给出了 **ShadowFigure 扩展包**和**修复后的 Graphics3D 扩展包**，更推荐使用 ShadowFigure 扩展包。
