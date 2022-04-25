---
title: MaTeX 与 LaTeX
date: 2021-08-02 22:08:00
cover: https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/cover/cover4.png
---


本文算是一篇教程，推荐的 MaTeX 扩展包可以让 Mathematica 使用 LaTeX 的输出效果，简直是如虎添翼。

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/int.png" width="280"/></div>

如果你还没用过 MaTeX，可以先**收藏本文**，方便需要的时候查看。

# 为什么要用 LaTeX

我还没正儿八经的用 LaTeX 排版过东西，对于 LaTeX 的排版功能不好评价，看看某博主是怎么说的：

> LaTeX 在**有干货**的**理工科**学术/毕业论文里面对 Word 有着（大概）压倒性的优势。

一方面可见博主用词之严谨，另一方面“天下苦 Word 久矣”之情溢于言表。换句话说，哪个用 LaTeX 的人没深受过 Word 的毒害？（当然了，春秋责备贤者，希望 Word 党听完不要生气。~~不过世界上真的有 Word 党吗，哈哈哈~~）

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/cry.jpg" width="150"/></div>

LaTeX 的公式我倒是频繁使用，不过使用范围也仅限于 Typora，不得不说那种<u>纯键盘输入</u>、<u>所思即所得</u>的感觉的确可以满足广大研究生的一个基本需求——装 X

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/xizhilang.jpg" width="150"/></div>

# Mathematica 对 LaTeX 的支持情况

在 Mathematica 里书写一个表达式，选中，可以很轻松的复制成 LaTeX 公式：

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/input1.png" width="300"/></div>

效果是下面的样子（我是直接粘贴过来的）
$$
\prod _{i=2}^{\infty } \left(1-\frac{1}{i^4}\right)=\frac{\sinh (\pi )}{4 \pi }
$$
美中不足的是，Mathematica **自身并不能渲染**出 LaTeX 公式。只有一个差强人意的 TraditionalForm：

<div style="text-align:left;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/snap1.png" width="440"/></div>

但是，有人就说了：

> 我只爱看 LaTeX 渲染的公式，看别的我头晕，你 Mathematica 就不能输出 LaTeX 给我吗？

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/stuck.jpg" width="150"/></div>

Mathematica 说抱歉我还真做不到，但是有退而求其次的法子——MaTeX。

# 安装 MaTeX

MaTeX 的开源地址是 [https://github.com/szhorvat/MaTeX](https://github.com/szhorvat/MaTeX)。

在 Mathematica **11.3** 及更高的版本，只需运行下面的一行代码即可安装或升级 MaTeX：

```mathematica
ResourceFunction["MaTeXInstall"][]
```

低版本的 Mathematica 需要手动安装（当然，我没说高版本不可以手动安装，在 [https://github.com/szhorvat/MaTeX/releases](https://github.com/szhorvat/MaTeX/releases) 下载 MaTeX-1.x.x.paclet 文件，比如目前显示的最新版本为 1.7.8：

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/release.png" width="500" style="border:1px solid black"/></div>

需要用到 PacletInstall 函数：

```mathematica
Needs["PacletManager`"]
PacletInstall["~/Downloads/MaTeX-1.7.8.paclet"]
```

好，大功告成。有人又问了：

> 这个 2MB 的小东西真的能渲染 LaTeX 吗?

其实还不能，因为你的计算机还需要装有 **TeX系统** 和 **Ghostscript**。

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/difficult.jpg" width="150"/></div>

------

TeX 系统推荐直接安装 texlive，一步到位，免得各种报错，报得你怀疑人生，别问我是怎么知道的。

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/erkang.jpeg" width="150"/></div>

推荐在[清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/CTAN/systems/texlive/Images/)下载 texlive，安全稳定且速度快，进入之后，随便下载一个 .iso 文件：

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/texlive.png" width="500" style="border:1px solid black"/></div>

具体怎么安装，网上的教程铺天盖地，就不赘述啦（安装时间通常在一个小时左右，所以请提前合理分配时间）

------

Ghostscript 可以在其[官网](https://ghostscript.com/download/gsdnld.html)下载，然后正常安装就行了。

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/Ghostscript.png" width="500" style="border:1px solid black"/></div>

------

总的来说，安装过程的确比较繁琐，但如果你的计算机曾安装过 texlive 和 Ghostscript，且 Mathematica 版本高于 11.3，安装也不过是一行代码的事吗（~~真是听君一席话如听一席话呢~~）

安装完成后，需要运行：

<div style="text-align:left;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/input2.png" width="100"/></div>

或者

<div style="text-align:left;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/input3.png" width="170"/></div>

来加载 MaTeX 扩展包。官方文档解释说：

> 首次加载时，MaTeX 会尝试自动进行自我配置。如果自动配置失败，它将显示有关如何手动配置 pdflatex 和 Ghostscript 可执行文件的路径的说明。

可以用下面的代码测试是否安装成功：

<div style="text-align:left;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/snap2.png" width="660"/></div>

成功的话会给出 **pdflatex.exe** 和 <strong>gswin32c.exe (gswin64c.exe)</strong> 的路径。

# MaTeX 的一般用法

听别人说：（当然这句话的真实性有待考证）

> 市面上 80% 的 Mathematica 参考书都是抄的官方帮助文档。

（~~不过我寻思市面上统共能有几本 Mathematica 参考书，哈哈哈~~）因为 MaTeX 的帮助文档写的很全面，所以下面我引用了其中的很多例子。

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/dog.jpg" width="80"/></div>

------

使用之前需要先运行：

<div style="text-align:left;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/input2.png" width="100"/></div>

或者

<div style="text-align:left;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/input3.png" width="170"/></div>

来加载 MaTeX 扩展包。比如在重启 Mathematica 或者执行清除全部命令 **ClearAll** 之后。

------

上文举的例子改用 MaTeX 输出，顿时顺眼多了：

<div style="text-align:left;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/snap3.png" width="400"/></div>

------

MaTeX 也可以直接输出成矩阵：

<div style="text-align:left;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/snap4.png" width="480"/></div>

------

**MaTeX 不仅可以直接作用于表达式，还可以作用于字符串**，而且和 Mathematica 自带的函数一样，函数 MaTeX 可以穿过列表 **List**，即<strong>可以穿过 { }</strong>，比如：

<div style="text-align:left;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/snap5.png" width="320"/></div>

------

来研究一下 MaTeX 输出的东西的本质是什么，以最简单的“点”为例（实在想不出来 LaTeX 里除了空格还有比点更简单的字符吗）

<div style="text-align:left;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/snap6.png" width="700"/></div>

查看 “$.$” 的完全格式，发现是以 **Graphics** 开头的，所以本质是矢量图。

# MaTeX 的进阶用法

函数 MaTeX 可以指定参数，用于进一步修饰输出的样式。

------

**ContentPadding**——内容填充，指定为`False`时会尽可能的紧凑：

<div style="text-align:left;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/snap7.png" width="540"/></div>

------

<strong>"DisplayStyle"</strong>——指定为`False`时会输出行内样式：

<div style="text-align:left;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/snap8.png" width="540"/></div>

------

**FontSize**——用于指定字体大小：

<div style="text-align:left;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/snap9.png" width="400"/></div>

------

**LineSpacing**——指定为`{c,n}`，代表行距为 c 倍字体大小加上 n 个印刷点：

<div style="text-align:left;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/snap10.png" width="540"/></div>

------

**Magnification**——用于指定缩放比例：

<div style="text-align:left;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/snap11.png" width="480"/></div>

------

<strong>"Preamble"</strong>——指定导言

- 导入 color 宏包用于设定字体颜色：

<div style="text-align:left;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/snap12.png" width="440"/></div>

- 导入 epsdice 宏包用于输出特殊字符：

<div style="text-align:left;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/snap13.png" width="440"/></div>

其他的示例就不过多展示啦。

# MaTeX 在绘图中的应用

为了像某博主那样严谨，我说：

> 在**有干货**的**理工科**学术/毕业论文里，画图是一件令人头疼的事情。

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/cat%20cry.jpg" width="150"/></div>

用 Mathematica 画图时，默认的坐标轴标签、图例等元素都是默认的样式，但有时要求渲染成 LaTeX 的样式（~~此时 MATLAB 表示我可以做到。叉出去~~），目前不知道有什么更好的解决方案，但是 MaTeX 绝对可以胜任，比如：

<div style="text-align:left;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/snap14.png" width="500"/></div>

------

数据标签也可以渲染成 LaTeX：

<div style="text-align:left;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/snap15.png" width="500"/></div>

哇，这就是 MaTeX 吗，爱了爱了

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/cat.gif" width="150"/></div>

# MaTeX 的注意事项

函数 MaTeX 在接受字符串输入时，<strong>\\</strong> 一定要写成 <strong>\\\\</strong>，比如：

<div style="text-align:left;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/snap16.png" width="480"/></div>

一般经常在转义字符用到 <strong>\\</strong>，转义字符本身就够混乱的了，这里又得写成 <strong>\\\\</strong>，所以很容易翻车。

------

如果想要把 <strong>{x,y}</strong> 整体输出成 LaTeX 样式，需要先转化为 TeXForm 或用 HoldForm 保持表达式，否则函数 MaTeX 可以穿过 <strong>{ }</strong>，将把 **x** 和 **y** 输出成 LaTeX 样式，比如：

<div style="text-align:left;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/snap17.png" width="260"/></div>

上面这个例子还是很能说明问题的。

------

但是，使用 HoldForm 保持表达式时需要谨慎，比如对 <strong>IdentityMatrix[3]</strong> 使用 HoldForm 保持表达式，再用 MaTeX 输出，得到的是 LaTeX 文字样式：

<div style="text-align:left;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/snap18.png" width="400"/></div>

所以，使用 HoldForm 需要谨慎。

# 巧妙范例

在 Mathematica 官方的说明文档的结尾，一般都会给出几个巧妙范例，MaTeX 的作者在说明文档中也给出了巧妙范例：

<div style="text-align:left;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post4/snap19.png" width="500"/></div>

这是一个谢尔宾斯基三角形，有机会的话公众号会出一篇关于它的文章。
