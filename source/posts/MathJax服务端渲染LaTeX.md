---
title: MathJax 服务端渲染 LaTeX
date: 2022-03-10 19:00:00
cover: https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/cover/cover17.png
---

开始之前，先分清 SSR 和 CSR 的区别：

> Server Side Render，服务端渲染，指服务器生成完整的 html，浏览器直接显示出网页。
>
> Client Side Render，客户端渲染，指服务器只返回一个 html 模板，浏览器执行 js 代码渲染出网页。

我要把[我的博客](https://qingyaya.gitee.io/)从原本**客户端渲染**的方式修改成**服务端渲染**的方式。其中的一个难点是如何实现服务端渲染 LaTeX。

# MathJax

MathJax 是所有现代浏览器（ IE 不属于现代浏览器）通用的 LaTeX、MathML 和 AsciiMath 表示法的开源 Javascript 显示引擎。当今网页上显示的数学公式八九成都是由 MathJax 一手包揽的。

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post17/MathJax.png" width="400" style="border:1px solid black"/></div>

它的用法也足够简单，在 html 引入MathJax 的 js 文件，用`$`包围 LaTeX 代码，如此便搞定了。正如官网所说：

> No more setup for readers. It just works.

# 客户端渲染的弊端

在博客上显示 LaTeX 数学公式，一直很困扰我，倒不是说技术上有多难实现（前面也说了 MathJax 的用法是弱智级别的），而是我有些文章使用了上百个 LaTeX 公式，以《[从 ln(1+x) 的连分式展开谈起](https://qingyaya.gitee.io/post/%E4%BB%8E%20ln(1+x)%20%E7%9A%84%E8%BF%9E%E5%88%86%E5%BC%8F%E5%B1%95%E5%BC%80%E8%B0%88%E8%B5%B7/)》为例：

 <video src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post17/CSR.mp4" width="300" controls autoplay loop muted>your browser does not support the video tag</video>

整个渲染过程花了 10 多秒！我们总是希望一个页面显示的越快越好。而且，公式提取 → 公式处理 → 公式预显示 → 换成TeX字体的整个流程下来，公式的形式变来变去，页面上蹿下跳，真就还不如等 10 秒全部渲染完后再显示出来呢。不仅影响读者的阅读体验，对我个人来说这种糟糕的设计非常折磨人。

还有一个非常劳什子的右键菜单，根本用不到，即便可以配置成默认关闭，但是，这并不极简。

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post17/menu.png" width="300"/></div>

所以，客户端渲染 LaTeX 体现出了一些弊端（至少对我来说是弊端），于是我思考能否事先渲染好 LaTeX 公式，生成纯静态的页面，达到服务端一次生成，客户端后续无需重复渲染，从根源上解决问题呢？

# 如何服务端渲染

既然有了这样的需求，我就去 MathJax 的[官方文档](https://docs.mathjax.org/en/latest/index.html)寻找帮助，看到下面一段话：

> It was designed to be used as easily **on a server** (as part of a `node.js` application) as it is in a browser. This makes pre-processing of web pages containing mathematics much easier than with version 2, so **web sites can perform all the math processing once up front, rather than having the browser do it each time the page is viewed**.

好家伙，完美地契合了我的需求，借助 Node.js 环境即可。

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post17/nice.jpg" width="150"/></div>

那么这里又不得不提一下 MathJax 的版本问题，MathJax 3.X 相比 MathJax 2.X 做了不小的变动，我们较为关注的一点是：MathJax 3.X 既可**异步**，也可**同步**。同步是至关重要的，因为我想拿到字符串形式的转换结果，然后拼接进 html 总字符串，类似于`html += convert('E = mc^2')`，所以必须用 3.X 的版本。

------

另外也不得不提一个叫做 mathjax-node 的库，这个库就是为了方便在 Node.js 中使用 MathJax，之所以不用它，就是因为它基于 MathJax 2.X，只提供了异步操作。而且，我想尽量避免使用二次封装的库，想使用原生的 MathJax 来实现。

# 在 Node.js 中使用 MathJax

首先下载 MathJax 库，我用的是 3.2.0 版本：

```bash
npm i mathjax@3.2.0
```

如果阅读 MathJax 的源代码，你会发现里面有很多 dom 操作，毕竟是为浏览器而开发的嘛，然而 Node.js 可并没有给我们提供 dom 操作的 API，为之奈何？

> 答：有一种叫做虚拟 dom 的东西。

我们可以在 Node.js 中生成虚拟 dom，之后的操作就和浏览器几乎无异了。至于如何生成虚拟 dom，MathJax 也已经内置好了，无需过多关心。只需要`require`一下 MathJax 库：

```javascript
require('mathjax').init({
  loader: {
    load: ['input/tex', 'output/svg']
  }
}).then( (MathJax) => {
  // 此时获得了MathJax对象
  console.log(MathJax);
  ...
}).catch( (err) => {throw err} );
```

获得 MathJax 对象是关键，可以在 console 中打印出来，它长下面这样：

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post17/object.png" width="360"/></div>

一些有用的属性和方法列举如下：

```javascript
// 获取虚拟document
MathJax.startup.getDocument().document

// adaptor提供了一些dom操作
MathJax.startup.adaptor

// 比如，得到fooNode的子节点
MathJax.startup.adaptor.childNodes( fooNode );
```

# tex2chtml

可以用 CommonHTML 或 SVG 的形式在网页上显示 LaTeX（ MathML就直接 pass 吧），分别对应`MathJax.tex2chtml()`和`MathJax.tex2svg()`。

我一开始是倾向于使用 CommonHTML，因为输出的结果会更轻量一些。此时需要在导入的时候把`output`配置成 chtml：

```javascript
loader: {
  load: ['input/tex', 'output/chtml']
}
```

然后，使用`MathJax.tex2chtml()`把 TeX 字符串转换成 CommonHTML 节点：

```javascript
var html = MathJax.tex2chtml('E = mc^2');
```

注意，这里`html`是节点。如果想拿到字符串形式的节点，可以利用 adaptor 提供的 dom 操作：

```javascript
var outerHTML = MathJax.startup.adaptor.outerHTML(html);
```

为了方便演示，我直接用浏览器的 console 执行代码（本质和 Node.js 是一样的）

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post17/tex2chtml.png" width="500"/></div>

但是，当你新建一个 html 文件，把得到的字符串粘贴进去，用浏览器打开后，公式处会是空白，惊喜不惊喜，这是因为我们没有得到对应的层叠样式表 CSS。

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post17/vs.jpg" width="150"/></div>

抽丝剥茧一下，当把节点添加到 document 里，这些 CSS 会被 MathJax 自动地写入 document。以公式 $E=mc^2$ 里的数学斜体 E 为例，它的 Unicode 编码是`1D438`：

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post17/E_Unicode.png" width="300"/></div>

把节点添加到 document 里，可以找到`1D438`对应的标签，MathJax 给类名添加了`mjx-c`前缀：

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post17/E_html.png" width="300"/></div>

在浏览器里，可以找到`mjx-c1D438`类的 CSS：

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post17/E_css.png" width="300"/></div>

在 Node.js 里，这些 CSS 显然也被添加到了规则树里，想把它们提取出来还是有办法的，就算实在不行还有最笨的办法，比如我就在源代码里定位到了`addCharStyles()`函数，完全可以用来输出 CSS：

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post17/code.png" width="500"/></div>

但是，当推理进行到这里，我却转变了观念，我不想用 CommonHTML 的形式显示公式了，转而想用 SVG。一是因为提取 CSS 虽然可行却不优雅，二是 SVG 比 CommonHTML 更加鲁棒。

# tex2svg

输出 SVG，需要在导入的时候把`output`配置成 svg：

```javascript
loader: {
  load: ['input/tex', 'output/svg']
}
```

然后，把 TeX 字符串转换成 SVG 节点：

```javascript
var html = MathJax.tex2svg('E = mc^2');
```

放到浏览器里演示：

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post17/tex2svg.png" width="600"/></div>

结果是一个用`<mjx-container>`标签包裹的`<svg>`标签。

# fontCache

本来我以为把`tex2svg()`的结果再转成字符串就搞定了，但是仔细观察，输出的`<svg>`包括`<defs>`标签和`<g>`标签，`<defs>`存放每个字符的形状信息，`<g>`用来组合元素。`<defs>`的数据量最多：

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post17/defs.png" width="600"/></div>

所以问题来了，比如我需要渲染页面上的 100 个公式，每个公式里都有等于号，那么输出的每个 SVG 里都有等于号的`<path>`，这部分数据被重复保存成 100 份。明明保存 1 份等于号的形状，其他地方引用就行了啊。我们到底还能不能进一步优化？

> 答：可以，使用fontCache。

在导入的时候把 svg 的`fontCache`设置成`'global'`：

```javascript
loader: {
  load: ['input/tex', 'output/svg']
},
svg: {
  fontCache: 'global'
}
```

之后，每次`tex2svg()`的输出便不再包含`<defs>`标签，而是把它放入缓存。在转换 100 个公式的过程中，每当遇到新的字符，就把它的`<path>`加入缓存，之前出现过的字符便不再重复加入。这就达到了**最高程度的形状复用**。

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post17/xiaowanzi.gif" width="150"/></div>

最后，把缓存提取出来即可：

```javascript
var defs = MathJax.startup.output.fontCache.getCache();
```

问题又来了，当我们去渲染下一个页面时，上个页面的缓存依然存在，所以需要先把上个页面的缓存清理掉：

```javascript
MathJax.startup.output.fontCache.clearCache();
```

到此为止，算是把 TeX 转 SVG 彻底搞定了。对比一下引用`<path>`和不引用的区别，还以《[从 ln(1+x) 的连分式展开谈起](https://qingyaya.gitee.io/post/%E4%BB%8E%20ln(1+x)%20%E7%9A%84%E8%BF%9E%E5%88%86%E5%BC%8F%E5%B1%95%E5%BC%80%E8%B0%88%E8%B5%B7/)》为例，不引用时生成的静态 html 文件大小为 1.3 MB，引用后大小为 761 KB，**体积直接减半**，瘦身效果明显。

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post17/fat.gif" width="180"/></div>

------

那么我是怎么知道`MathJax.startup.output.fontCache.getCache()`这个函数的呢？因为俺去查看了 MathJax 的源代码，结合 console 一点点分析出来的。然而，我在写这篇文章的时候，发现原来[官方文档里有说明](https://docs.mathjax.org/en/latest/web/typeset.html#conversion-stylesheet)啊，明确告诉了有`clearCache()`这个东西，我直接裂开，说多了全是泪。好吧，也是有收获的，如果我事先就知道，真就没有动力去分析源码了，过程比结果更重要。

# 宏包

就在我沾沾自喜的时候，又报错啦！！！

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post17/dog.jpg" width="150"/></div>

仔细一看，有一个公式渲染不了：

```latex
$$
\require{extpfeil}
\tan \alpha = \frac{dY}{dX} = \frac{R d\phi}{R \cos \phi d\lambda}
\xlongequal{等角约束} \tan \beta = \frac{dy}{dx}
$$
```

原来它带有`\require{extpfeil}`，无法识别。引入这个宏包是为了使用长等号，我必须要用，为之奈何？

> 答：引入 package。

MathJax 提供了对三十多个常用宏包的支持，使用下面的代码即可查看支持的列表：

```javascript
MathJax.config.loader.provides["[tex]/all-packages"]
```

结果为：

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post17/package.png" width="360"/></div>

在导入的时候，可以有选择地导入多个宏包，以 extpfeil 宏包为例：

```javascript
loader: {
  load: ['input/tex', 'output/svg', '[tex]/extpfeil']
},
tex: {
  packages: {'[+]': ['extpfeil']}
},
svg: {
  fontCache: 'global'
}
```

如此便功德圆满了。

# 结尾

即便 MathJax 有着臃肿、迟钝等等缺点，也不乏有像 KaTeX 这样轻量又快速的渲染引擎，但我仍然是一个彻彻底底的 MathJax 党，因为它真的很强大，它是无可取代的，我也很喜欢它，其他引擎在它面前总显得不入流，它在一次次迭代中变得更好用，以前也没想过稍稍地探索它一下，这次确实是够折腾的。

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post17/exhausted.jpg" width="150"/></div>
