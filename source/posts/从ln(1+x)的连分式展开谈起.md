---
title: 从 ln(1+x) 的连分式展开谈起
date: 2021-07-15 17:51:00
cover: https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/cover/cover1.png
---

第一次听说《An Introduction to the Mathematics and Methods of Astrodynamics》这本航天动力学最经典的教材，是在本科 Orbit Mechanics 这门课上。后来费了很大力气找到了电子版，一看 800 多页，旋即放弃。假期从图书馆找到了中文译本，打算好好啃一啃这本书。

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post1/book%20cover.png" width="300"/></div>

<p style="color: #939393; text-align: center;">（本书封面）</p>

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post1/book%20cover%20cn.jpg" width="300"/></div>

<p style="color: #939393; text-align: center;">（中文译本）</p>

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post1/battin.jpg" width="300"/></div>

<p style="color: #939393; text-align: center;">（作者 Battin）</p>

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post1/ppt.png" width="600" style="border:1px solid black"/></div>

<p style="color: #939393; text-align: center;">（老师的 PPT 截图）</p>

# 本文的价值（读了之后你能收获什么）

- 本文并不是对书本内容的简单搬运，事实上，本文是在解答作者留下的习题
- 所以，可以收获一份习题答案
- 当然，只做题是不够的
- 所以，在文末我对比了连分式展开和 Taylor 展开的精度
- 还有，即使书本的作者已经非常严谨，但还是被我找到一处笔误（几位译者也没发现）

# 提示

- 既然是习题答案，所以文风活泼（严肃）且生动（枯燥）
- 只要懂 Taylor 级数就能读懂本文

- 通篇都是长公式，所以，推荐横屏阅读（最好在大屏设备上阅读）

# $\ln(1+x)$ 的连分式展开（习题 1-9）

Taylor 展开：
$$
\ln(1+x)=x-\frac{x^2}{2}+\frac{x^3}{3}-\frac{x^4}{4}+\cdots
$$
不妨令 $x\neq0$（事实上，$x=0$ 时根本没有展开的必要，$\ln(1+0)=0$），两边同时除以 $x$，得
$$
\frac{1}{x}\ln(1+x)=1-\frac{x}{2}+\frac{x^2}{3}-\frac{x^3}{4}+\cdots
$$
由**超几何函数**的定义
$$
F(\alpha,\beta;\gamma;x)=1+\frac{\alpha\beta}{\gamma}\frac{x}{1!}+\frac{\alpha(\alpha+1)\beta(\beta+1)}{\gamma(\gamma+1)}\frac{x^2}{2!}+\frac{\alpha(\alpha+1)(\alpha+2)\beta(\beta+1)(\beta+2)}{\gamma(\gamma+1)(\gamma+2)}\frac{x^3}{3!}+\cdots
$$
可以看出
$$
\frac{1}{x}\ln(1+x)=F(1,1;2;-x)
$$
根据**高斯连分式展开定理**（先拿来用，后面再证明）
$$
\begin{eqnarray*}
F(\alpha,1;\gamma;x)
&&=1+\frac{\alpha}{\gamma}x+\frac{\alpha(\alpha+1)}{\gamma(\gamma+1)}x^2+\cdots\\
&&=\cfrac{1}{1-
 \cfrac{\beta_1x}{1-
 \cfrac{\beta_2x}{1-
 \cfrac{\beta_3x}{1-\ddots} } } }
\end{eqnarray*}
$$
其中，对 $n=0,1,2,\cdots$
$$
\begin{eqnarray*}
&\beta_{2n+1}=\frac{(\alpha+n)(\gamma+n-1)}{(\gamma+2n-1)(\gamma+2n)}\\
&\beta_{2n}=\frac{n(\gamma-\alpha+n-1)}{(\gamma+2n-2)(\gamma+2n-1)}
\end{eqnarray*}
$$
换句话说，奇偶项的系数的表达式是有区别的。

当 $\alpha=1$，$\gamma=2$ 时
$$
\begin{eqnarray*}
&\beta_{2n+1}=\frac{(1+n)}{2(1+2n)}\\
&\beta_{2n}=\frac{n}{2(1+2n)}
\end{eqnarray*}
$$
此时，做一个恒等变形
$$
\begin{eqnarray*}
\frac{1}{x}\ln(1+x)&&=F(1,1;2;-x)\\
&&
=\cfrac{1}{1+
 \cfrac{\beta_1x}{1+
 \cfrac{\beta_2x}{1+
 \cfrac{\beta_3x}{1+\ddots} } } }=
 \cfrac{1\times1}{1\times1+
 \cfrac{1\times2\beta_1x}{2\times1+
 \cfrac{2\times3\beta_2x}{3\times1+
 \cfrac{3\times4\beta_3x}{4\times1+\ddots} } } }
\end{eqnarray*}
$$
继续展开下去，对于奇数项
$$
\frac{(2n+1)(2n+2)\beta_{2n+1}x}{(2n+2)\times1+\ddots}=\frac{(n+1)^2x}{(2n+2)+\ddots}
$$
对于偶数项
$$
\frac{2n(2n+1)\beta_{2n}x}{(2n+1)\times1+\ddots}=\frac{n^2x}{(2n+1)+\ddots}
$$
即
$$
\frac{1}{x}\ln(1+x)=
 \cfrac{1}{1+
 \cfrac{1^2x}{2+
 \cfrac{1^2x}{3+
 \cfrac{2^2x}{4+
 \cfrac{2^2x}{5+
 \cfrac{3^2x}{6+
 \cfrac{3^2x}{7+\ddots} } } } } } }
$$
因此，$\ln(1+x)$ 的连分式展开为
$$
\ln(1+x)=
\cfrac{x}{1+
\cfrac{1^2x}{2+
\cfrac{1^2x}{3+
\cfrac{2^2x}{4+
\cfrac{2^2x}{5+
\cfrac{3^2x}{6+
\cfrac{3^2x}{7+\ddots} } } } } } }
$$

# 高斯连分式展开定理

引理（习题 1-3）

> $$
> \begin{eqnarray*}
> &
> F(\alpha,\beta+1;\gamma+1;x)-F(\alpha,\beta;\gamma;x)
> =\frac{\alpha(\gamma-\beta)}{\gamma(\gamma+1)}xF(\alpha+1,\beta+1;\gamma+2;x)\\
> &
> F(\alpha+1,\beta+1;\gamma+2;x)-F(\alpha,\beta+1;\gamma+1;x)
> =\frac{(\beta+1)(\gamma+1-\alpha)}{(\gamma+2)(\gamma+2)}xF(\alpha+1,\beta+2;\gamma+3;x)
> \end{eqnarray*}
> $$

对 $n=0,1,2,\cdots$，记 $F_n$ 的偶数项和奇数项分别为
$$
\begin{eqnarray*}
&F_{2n}=F(\alpha+n,\beta+n;\gamma+2n;x)\\
&F_{2n+1}=F(\alpha+n,\beta+n+1;\gamma+2n+1;x)
\end{eqnarray*}
$$
那么
$$
\begin{eqnarray*}
&F_{2n+2}=F(\alpha+n+1,\beta+n+1;\gamma+2n+2;x)\\
&F_{2n-1}=F(\alpha+n-1,\beta+n;\gamma+2n-1;x)
\end{eqnarray*}
$$
因此
$$
\begin{eqnarray*}
&&F_{2n+1}-F_{2n}\\
&&=F(\alpha+n,(\beta+n)+1;(\gamma+2n)+1;x)-F(\alpha+n,\beta+n;\gamma+2n;x)\\
&&= \frac{(\alpha+n)(\gamma-\beta+n)}{(\gamma+2n)(\gamma+2n+1)}xF((\alpha+n)+1,(\beta+n)+1;(\gamma+2n)+2;x)\\
&&\equiv \delta_{2n+1}xF(\alpha+n+1,\beta+n+1;\gamma+2n+2;x)\\
&&= \delta_{2n+1}xF_{2n+2}
\end{eqnarray*}
$$

和
$$
\begin{eqnarray*}
&&F_{2n}-F_{2n-1}\\
&&=F((\alpha+n-1)+1,(\beta+n-1)+1;(\gamma+2n-2)+2;x)-F(\alpha+n-1,(\beta+n-1)+1;(\gamma+2n-2)+1;x)\\
&&= \frac{(\beta+n)(\gamma-\alpha+n)}{(\gamma+2n-1)(\gamma+2n)}xF((\alpha+n-1)+1,(\beta+n-1)+2;(\gamma+2n-2)+3;x)\\
&&\equiv \delta_{2n}xF(\alpha+n,\beta+n+1;\gamma+2n+1;x)\\
&&= \delta_{2n}xF_{2n+1}
\end{eqnarray*}
$$

换句话说，奇数项减去它前面的偶数项为
$$
F_{2n+1}-F_{2n}=\delta_{2n+1}xF_{2n+2}
$$
偶数项减去它前面的奇数项为
$$
F_{2n}-F_{2n-1}=\delta_{2n}xF_{2n+1}
$$
则
$$
\begin{eqnarray*}
&
\frac{F_{2n+1}-F_{2n}}{F_{2n}}=\frac{F_{2n+1}}{F_{2n}}-1=
\frac{\delta_{2n+1}xF_{2n+2}}{F_{2n}}=\delta_{2n+1}x\frac{F_{2n+2}}{F_{2n+1}}\frac{F_{2n+1}}{F_{2n}}\\
&
\frac{F_{2n}-F_{2n-1}}{F_{2n-1}}=\frac{F_{2n}}{F_{2n-1}}-1=
\frac{\delta_{2n}xF_{2n+1}}{F_{2n-1}}=\delta_{2n}x\frac{F_{2n+1}}{F_{2n}}\frac{F_{2n}}{F_{2n-1}}
\end{eqnarray*}
$$
记
$$
G_{2n}=\frac{F_{2n+1}}{F_{2n}}    \quad;\quad    G_{2n-1}=\frac{F_{2n}}{F_{2n-1}}
$$
有
$$
\begin{eqnarray*}
&G_{2n}-1=\delta_{2n+1}xG_{2n+1}G_{2n}\\
&G_{2n-1}-1=\delta_{2n}xG_{2n}G_{2n-1}
\end{eqnarray*}
$$
或者
$$
\begin{eqnarray*}
&G_{2n}=\frac{1}{1-\delta_{2n+1}xG_{2n+1}}\\
&G_{2n-1}=\frac{1}{1-\delta_{2n}xG_{2n}}
\end{eqnarray*}
$$
因此
$$
G_{0}=\frac{F_1}{F_0}
=\frac{F(\alpha,\beta+1;\gamma+1;x)}{F(\alpha,\beta;\gamma;x)}
=\cfrac{1}{1-
 \cfrac{\delta_1x}{1-
 \cfrac{\delta_2x}{1-
 \cfrac{\delta_3x}{1-\ddots} } } }
$$
对于超几何函数，令 $\beta=0$，则
$$
F(\alpha,0;\gamma;x)=1+\frac{0\alpha}{\gamma}\frac{x}{1!}+\frac{\alpha(\alpha+1)0(0+1)}{\gamma(\gamma+1)}\frac{x^2}{2!}+\cdots=1+0+0+\cdots=1
$$
且 $\beta=0$ 时，$\delta_{2n+1}$ 和 $\delta_{2n}$ 退化为
$$
\begin{eqnarray*}
&\delta_{2n+1}=\frac{(\alpha+n)(\gamma+n)}{(\gamma+2n)(\gamma+2n+1)}\\
&\delta_{2n}=\frac{n(\gamma-\alpha+n)}{(\gamma+2n-1)(\gamma+2n)}
\end{eqnarray*}
$$
最终
$$
F(\alpha,1;\gamma+1;x)=
 \cfrac{1}{1-
 \cfrac{\delta_1x}{1-
 \cfrac{\delta_2x}{1-
 \cfrac{\delta_3x}{1-\ddots} } } }
$$
换元，用 $\gamma$ 替换 $\gamma+1$，得到高斯连分式展开定理
$$
F(\alpha,1;\gamma;x)=
 \cfrac{1}{1-
 \cfrac{\beta_1x}{1-
 \cfrac{\beta_2x}{1-
 \cfrac{\beta_3x}{1-\ddots} } } }
$$
其中，$\beta_{2n+1}$ 和 $\beta_{2n}$ 的表达式上文已经给出过。

# $\arctan x$ 的连分式展开（习题 1-10）

Taylor 展开：
$$
\arctan x=x-\frac{x^3}{3}+\frac{x^5}{5}-\frac{x^7}{7}+\cdots
$$
$x\neq0$ 时，两边同时除以 $x$，得
$$
\frac{1}{x}\arctan x=1-\frac{x^2}{3}+\frac{x^4}{5}-\frac{x^6}{7}+\cdots=F(\frac{1}{2},1;\frac{3}{2},-x^2)
$$
当 $\alpha=\frac{1}{2}$，$\gamma=\frac{3}{2}$ 时
$$
\begin{eqnarray*}
&\beta_{2n+1}=\frac{(1+2n)^2}{(1+4n)(3+4n)}\\
&\beta_{2n}=\frac{(2n)^2}{(4n-1)(4n+1)}
\end{eqnarray*}
$$
此时，做恒等变形
$$
\begin{eqnarray*}
&&
\frac{1}{x}\arctan x\\
&&
=\cfrac{1}{1+
 \cfrac{\beta_1x^2}{1+
 \cfrac{\beta_2x^2}{1+
 \cfrac{\beta_3x^2}{1+\ddots} } } }=
 \cfrac{1\times1}{1\times1+
 \cfrac{1\times3\beta_1x^2}{3\times1+
 \cfrac{3\times5\beta_2x^2}{5\times1+
 \cfrac{5\times7\beta_3x^2}{7\times1+\ddots} } } }
\end{eqnarray*}
$$
继续展开下去，对于奇数项
$$
\frac{(4n+1)(4n+3)\beta_{2n+1}x^2}{(4n+3)\times1+\ddots}=\frac{(1+2n)^2x^2}{(4n+3)+\ddots}
$$
对于偶数项
$$
\frac{(4n-1)(4n+1)\beta_{2n}x^2}{(4n+1)\times1+\ddots}=\frac{(2n)^2x^2}{(4n+1)+\ddots}
$$
即
$$
\frac{1}{x}\arctan x=
 \cfrac{1}{1+
 \cfrac{1^2x^2}{3+
 \cfrac{2^2x^2}{5+
 \cfrac{3^2x^2}{7+
 \cfrac{4^2x^2}{9+
 \cfrac{5^2x^2}{11+
 \cfrac{6^2x^2}{13+\ddots} } } } } } }
$$
因此，$\arctan x$ 的连分式展开为
$$
\arctan x=
 \cfrac{x}{1+
 \cfrac{1^2x^2}{3+
 \cfrac{2^2x^2}{5+
 \cfrac{3^2x^2}{7+
 \cfrac{4^2x^2}{9+
 \cfrac{5^2x^2}{11+
 \cfrac{6^2x^2}{13+\ddots} } } } } } }
$$

前面 $\ln(1+x)$ 的连分式的奇偶项不好合并，但是 $\arctan x$ 的连分式奇偶项可以合并成
$$
\frac{n^2x^2}{(2n+1)+\ddots}
$$
引入一个记号（本文结尾部分会用到）
$$
\arctan x=\frac{x}{1+K_{n=1}^{\infty}\frac{n^2x^2}{2n+1}}
$$

# $\tanh^{-1}x$ 的连分式展开（习题 1-10）

Taylor 展开：
$$
\tanh^{-1}x=x+\frac{x^3}{3}+\frac{x^5}{5}+\frac{x^7}{7}+\cdots=F(\frac{1}{2},1;\frac{3}{2},x^2)
$$
把 $F(\frac{1}{2},1;\frac{3}{2},-x^2)$ 的 $-x^2$ 替换为 $x^2$，整理后得到
$$
\tanh^{-1}x=
 \cfrac{x}{1-
 \cfrac{1^2x^2}{3-
 \cfrac{2^2x^2}{5-
 \cfrac{3^2x^2}{7-
 \cfrac{4^2x^2}{9-
 \cfrac{5^2x^2}{11-
 \cfrac{6^2x^2}{13-\ddots} } } } } } }
$$

# $\tan(k\phi)$ 的连分式展开（习题 1-11）

引理
$$
\frac{\tan(k\phi)}{k\tan\phi}=\frac{F(\frac{1-k}{2},\frac{2-k}{2};\frac{3}{2};-\tan^2\phi)}{F(\frac{1-k}{2},\frac{-k}{2};\frac{1}{2};-\tan^2\phi)}
$$
引理的证明（习题 1-1）

> 几何级数
> $$
> (1-x)^{-1}=1+x+x^2+...+x^n+\cdots=F(1,\beta;\beta;x)
> $$
> 两边取 $\alpha$ 次幂，并二项式展开
> $$
> \begin{eqnarray*}
> &&(1-x)^{-\alpha}\\
> &&=1+\binom{\alpha}{1}x+\binom{\alpha}{2}x^2+\cdots+\binom{\alpha}{n}x^n+\cdots\\
> &&=1+\alpha x+\alpha(\alpha+1)\frac{x^2}{2!}+\cdots+\alpha(\alpha+1)\cdots(\alpha+n-1)\frac{x^n}{n!}+\cdots\\
> &&=F(\alpha,\beta;\beta;x)
> \end{eqnarray*}
> $$
> 换元，用 $x$ 替换 $-x$
> $$
> \begin{eqnarray*}
> &&(1+x)^{-\alpha}\\
> &&=1-\alpha x+\alpha(\alpha+1)\frac{x^2}{2!}+\cdots+(-1)^n\alpha(\alpha+1)\cdots(\alpha+n-1)\frac{x^n}{n!}+\cdots\\
> &&=F(\alpha,\beta;\beta;-x)
> \end{eqnarray*}
> $$
> 以上二式相加、相减得到
> $$
> \begin{eqnarray*}
> &&\frac{1}{2}[(1-x)^{-\alpha}+(1+x)^{-\alpha}]\\
> &&=1+\alpha(\alpha+1)\frac{x^2}{2!}+\cdots+\alpha(\alpha+1)\cdots(\alpha+2n-1)\frac{x^{2n}}{(2n)!}+\cdots\\
> &&=F(\frac{\alpha}{2},\frac{\alpha+1}{2};\frac{1}{2};x^2)\\
> &&=F(\frac{\alpha+1}{2},\frac{\alpha}{2};\frac{1}{2};x^2)
> \end{eqnarray*}
> $$
>
> 和
> $$
> \begin{eqnarray*}
> &&\frac{1}{2\alpha x}[(1-x)^{-\alpha}-(1+x)^{-\alpha}]\\
> &&=1+(\alpha+1)(\alpha+2)\frac{x^3}{3!}+\cdots+(\alpha+1)\cdots(\alpha+2n)\frac{x^{2n+1}}{(2n+1)!}+\cdots\\
> &&=F(\frac{\alpha+1}{2},\frac{\alpha+2}{2};\frac{3}{2};x^2)
> \end{eqnarray*}
> $$
>
> 令
> $$
> x=\frac{e^{i\phi}-e^{-i\phi}}{e^{i\phi}+e^{-i\phi}}=i\frac{ \frac{ e^{i\phi}-e^{-i\phi} }{2i} }{ \frac{ e^{i\phi}+e^{-i\phi} }{2} }=i\tan\phi
> $$
> 则
> $$
> \frac{1-x}{1+x}=e^{-2i\phi}
> $$
> 令 $\alpha=-k$，得
> $$
> \begin{eqnarray*}
> &\frac{1}{2}(e^{2ki\phi}+1)=(1+x)^{-k}F(\frac{1-k}{2},\frac{-k}{2};\frac{1}{2};-\tan^2\phi)\\
> &\frac{1}{-2ki\tan\phi}(e^{2ki\phi}-1)=(1+x)^{-k}F(\frac{1-k}{2},\frac{2-k}{2};\frac{3}{2};-\tan^2\phi)
> \end{eqnarray*}
> $$
> 两式相比
> $$
> \begin{eqnarray*}
> &&\frac{1}{k\tan\phi} \frac{ \frac{ e^{ki\phi}-e^{-ki\phi} }{2i} }{ \frac{ e^{ki\phi}+e^{-ki\phi} }{2} }\\
> &&=\frac{1}{k\tan\phi} \frac{ \sin(k\phi) }{ \cos(k\phi) }\\
> &&=\frac{\tan(k\phi)}{k\tan\phi}=\frac{F(\frac{1-k}{2},\frac{2-k}{2};\frac{3}{2};-\tan^2\phi)}{F(\frac{1-k}{2},\frac{-k}{2};\frac{1}{2};-\tan^2\phi)}
> \end{eqnarray*}
> $$
> 得证

当 $\alpha=\frac{1-k}{2}$，$\beta=-\frac{k}{2}$，$\gamma=\frac{1}{2}$ 时
$$
\begin{eqnarray*}
&\delta_{2n+1}=\frac{(2n+1)^2-k^2}{(1+4n)(3+4n)}\\
&\delta_{2n}=\frac{(2n)^2-k^2}{(4n-1)(4n+1)}
\end{eqnarray*}
$$
故
$$
\begin{eqnarray*}
&&\frac{F(\frac{1-k}{2},\frac{2-k}{2};\frac{3}{2};-\tan^2\phi)}{F(\frac{1-k}{2},\frac{-k}{2};\frac{1}{2};-\tan^2\phi)}\\
&&
=\cfrac{1}{1-
 \cfrac{\delta_1x}{1-
 \cfrac{\delta_2x}{1-
 \cfrac{\delta_3x}{1-\ddots} } } }
=\cfrac{1\times1}{1\times1-
 \cfrac{1\times3\delta_1x}{3\times1-
 \cfrac{3\times5\delta_2x}{5\times1-
 \cfrac{5\times7\delta_3x}{7\times1+\ddots} } } }
\end{eqnarray*}
$$
继续展开下去，对于奇数项
$$
\frac{(4n+1)(4n+3)\delta_{2n+1}x}{(4n+3)\times1-\ddots}=\frac{((2n+1)^2-k^2)x}{(4n+3)-\ddots}
$$
对于偶数项
$$
\frac{(4n-1)(4n+1)\beta_{2n}x}{(4n+1)\times1-\ddots}=\frac{((2n)^2-k^2)x}{(4n+1)-\ddots}
$$
即
$$
\frac{\tan(k\phi)}{k\tan\phi}=
 \cfrac{1}{1-
 \cfrac{(k^2-1)\tan^2\phi}{3-
 \cfrac{(k^2-4)\tan^2\phi}{5-
 \cfrac{(k^2-9)\tan^2\phi}{7-
 \cfrac{(k^2-16)\tan^2\phi}{9-
 \cfrac{(k^2-25)\tan^2\phi}{11-
 \cfrac{(k^2-36)\tan^2\phi}{13-\ddots} } } } } } }
$$
故
$$
\tan(k\phi)=
 \cfrac{k\tan\phi}{1-
 \cfrac{(k^2-1)\tan^2\phi}{3-
 \cfrac{(k^2-4)\tan^2\phi}{5-
 \cfrac{(k^2-9)\tan^2\phi}{7-
 \cfrac{(k^2-16)\tan^2\phi}{9-
 \cfrac{(k^2-25)\tan^2\phi}{11-
 \cfrac{(k^2-36)\tan^2\phi}{13-\ddots} } } } } } }
$$

即
$$
\tan(k\phi)=\frac{k\tan\phi}{1-K_{n=1}^{\infty}\frac{(k^2-n^2)\tan^2\phi}{2n+1}}
$$

# 汇合型超几何函数的连分式表达式（习题 1-12）

称
$$
M(\beta,\gamma,x)=\lim_{\alpha\to\infty}F(\alpha,\beta;\gamma;x/\alpha)=1+\frac{\beta}{\gamma}\frac{x}{1!}+\frac{\beta(\beta+1)}{\gamma(\gamma+1)}\frac{x^2}{2!}+\cdots
$$
为汇合型超几何函数。则
$$
\begin{eqnarray*}
\frac{M(\beta+1,\gamma+1,x)}{M(\beta,\gamma,x)}
&&=\lim_{\alpha\to\infty}\frac{F(\alpha,\beta+1;\gamma+1;x)}{F(\alpha,\beta;\gamma;x)}\\
&&
=\lim_{\alpha\to\infty}
 \cfrac{1}{1-
 \cfrac{\delta_1\frac{x}{\alpha}}{1-
 \cfrac{\delta_2\frac{x}{\alpha}}{1-
 \cfrac{\delta_3\frac{x}{\alpha}}{1-\ddots} } } }
\equiv
 \cfrac{1}{1-
 \cfrac{\gamma_1x}{1-
 \cfrac{\gamma_2x}{1-
 \cfrac{\gamma_3x}{1-\ddots} } } }
\end{eqnarray*}
$$
其中
$$
\begin{eqnarray*}
&\gamma_{2n+1}=\frac{\gamma+n-\beta}{(\gamma+2n)(\gamma+2n+1)}\\
&\gamma_{2n}=\frac{-(\beta+n)}{(\gamma+2n-1)(\gamma+2n)}
\end{eqnarray*}
$$
书上的 $\gamma_{2n}$ 漏掉了负号，给我造成了很大的困惑，如何证明加了负号是对的：

> $$
> \gamma_{2n}=\lim_{\alpha\to\infty}\frac{(\beta+n)(\gamma-\alpha+n)}{(\gamma+2n-1)(\gamma+2n)}\frac{1}{\alpha}=\frac{-(\beta+n)}{(\gamma+2n-1)(\gamma+2n)}
> $$

令上式 $\beta=0$，并做变量替换，用 $\gamma-1$ 替换 $\gamma$，有
$$
M(1,\gamma,x)=
 \cfrac{1}{1-
 \cfrac{\gamma_1x}{1-
 \cfrac{\gamma_2x}{1-
 \cfrac{\gamma_3x}{1-\ddots} } } }
$$
其中
$$
\begin{eqnarray*}
&\gamma_{2n+1}=\frac{\gamma+n-1}{(\gamma+2n-1)(\gamma+2n)}\\
&\gamma_{2n}=\frac{-n}{(\gamma+2n-2)(\gamma+2n-1)}
\end{eqnarray*}
$$
进一步，做恒等变形
$$
\begin{eqnarray*}
&&
M(1,\gamma,x)\\
&&
=\cfrac{1}{1-
 \cfrac{\gamma_1x}{1-
 \cfrac{\gamma_2x}{1-
 \cfrac{\gamma_3x}{1-\ddots} } } }=
 \cfrac{1}{1-
 \cfrac{\gamma\gamma_1x}{\gamma\times1-
 \cfrac{\gamma(\gamma+1)\gamma_2x}{(\gamma+1)\times1-
 \cfrac{(\gamma+1)(\gamma+2)\gamma_3x}{(\gamma+2)\times1-\ddots} } } }
\end{eqnarray*}
$$
继续展开下去，对于奇数项
$$
\frac{(\gamma+2n-1)(\gamma+2n)\gamma_{2n+1}x}{(\gamma+2n)\times1-\ddots}=\frac{(\gamma+n-1)x}{(\gamma+2n)-\ddots}
$$
对于偶数项
$$
\frac{(\gamma+2n-2)(\gamma+2n-1)\gamma_{2n}x}{(\gamma+2n-1)\times1-\ddots}=\frac{-nx}{(\gamma+2n-1)-\ddots}
$$
即
$$
M(1,\gamma,x)=
 \cfrac{1}{1-
 \cfrac{1x}{\gamma+
 \cfrac{1x}{\gamma+1-
 \cfrac{\gamma x}{\gamma+2+
 \cfrac{2x}{\gamma+3-
 \cfrac{(\gamma+1)x}{\gamma+4+
 \cfrac{3x}{\gamma+5-\ddots} } } } } } }
$$

# $e^{x}$ 的连分式展开（习题 1-13）

有
$$
M(1,\gamma,x)=1+\frac{1}{\gamma}\frac{x}{1!}+\frac{1(1+1)}{\gamma(\gamma+1)}\frac{x^2}{2!}+\cdots=1+\frac{x}{\gamma}+\frac{x^2}{\gamma(\gamma+1)}+\cdots
$$
故
$$
e^{x}=M(1,1,x)
$$
奇数项
$$
\frac{nx}{(1+2n)+\ddots}
$$
偶数项
$$
\frac{nx}{2n-\ddots}
$$
在偶数项分子分母同除以 $n$，还可以进一步简化

化简后的奇数项
$$
\frac{x}{(1+2n)+\ddots}
$$
化简后的偶数项
$$
\frac{x}{2-\ddots}
$$
即
$$
e^{x}=
 \cfrac{1}{1-
 \cfrac{x}{1+
 \cfrac{x}{2-
 \cfrac{x}{3+
 \cfrac{x}{2-
 \cfrac{x}{5+
 \cfrac{x}{2-\ddots} } } } } } }
$$

# $\frac{N(\gamma+1,x)}{N(\gamma,x)}$ 的连分式展开（习题 1-14）

定义
$$
N(\gamma,x)=\lim_{\beta\to\infty}M(\beta,\gamma,x/\beta)=1+\frac{1}{\gamma}\frac{x}{1!}+\frac{1}{\gamma(\gamma+1)}\frac{x^2}{2!}+\cdots
$$
则
$$
\begin{eqnarray*}
\frac{N(\gamma+1,x)}{N(\gamma,x)}
&&=
\lim_{\beta\to\infty} \frac{M(\beta,\gamma+1,x/\beta)}{M(\beta,\gamma,x/\beta)}=
\lim_{\beta\to\infty} \frac{M(\beta+1,\gamma+1,x/\beta)}{M(\beta,\gamma,x/\beta)}\\
&&=
 \lim_{\beta\to\infty} 
 \cfrac{1}{1-
 \cfrac{\gamma_1\frac{x}{\beta}}{1-
 \cfrac{\gamma_2\frac{x}{\beta}}{1-
 \cfrac{\gamma_3\frac{x}{\beta}}{1-\ddots} } } }
\equiv
 \cfrac{1}{1-
 \cfrac{\theta_1x}{1-
 \cfrac{\theta_2x}{1-
 \cfrac{\theta_3x}{1-\ddots} } } }
 \end{eqnarray*}
$$

其中
$$
\begin{eqnarray*}
&\theta_{2n+1}=\frac{-1}{(\gamma+2n)(\gamma+2n+1)}\\
&\theta_{2n}=\frac{-1}{(\gamma+2n-1)(\gamma+2n)}
\end{eqnarray*}
$$
做恒等变形
$$
\begin{eqnarray*}
&&
\frac{N(\gamma+1,x)}{N(\gamma,x)}\\
&&
=\cfrac{1}{1-
 \cfrac{\theta_1x}{1-
 \cfrac{\theta_2x}{1-
 \cfrac{\theta_3x}{1-\ddots} } } }
=\cfrac{\gamma\times1}{\gamma\times1-
 \cfrac{\gamma(\gamma+1)\theta_1x}{(\gamma+1)\times1-
 \cfrac{(\gamma+1)(\gamma+2)\theta_2x}{(\gamma+2)\times1-
 \cfrac{(\gamma+2)(\gamma+3)\theta_3x}{(\gamma+3)\times1-\ddots} } } }\\
&&=
 \cfrac{\gamma}{\gamma+
 \cfrac{x}{\gamma+1+
 \cfrac{x}{\gamma+2+
 \cfrac{x}{\gamma+3+
 \cfrac{x}{\gamma+4+
 \cfrac{x}{\gamma+5+
 \cfrac{x}{\gamma+6+\ddots} } } } } } }
 \end{eqnarray*}
$$


# $\tan x$ 的连分式展开（习题 1-15）

已知
$$
\begin{eqnarray*}
&\cos x=N(\frac{1}{2},-\frac{1}{4}x^2)\\
&\frac{\sin x}{x}=N(\frac{3}{2},-\frac{1}{4}x^2)
\end{eqnarray*}
$$
则
$$
\begin{eqnarray*}
\tan x
&&
=x\frac{N(\frac{1}{2}+1,-\frac{1}{4}x^2)}{N(\frac{1}{2},-\frac{1}{4}x^2)}\\
&&
=\cfrac{\frac{1}{2}x}{\frac{1}{2}+
 \cfrac{-\frac{1}{4}x^2}{\frac{1}{2}+1+
 \cfrac{-\frac{1}{4}x^2}{\frac{1}{2}+2+
 \cfrac{-\frac{1}{4}x^2}{\frac{1}{2}+3+
 \cfrac{-\frac{1}{4}x^2}{\frac{1}{2}+4+
 \cfrac{-\frac{1}{4}x^2}{\frac{1}{2}+5+
 \cfrac{-\frac{1}{4}x^2}{\frac{1}{2}+6+\ddots} } } } } } }\\
&&
=\cfrac{x}{1-
 \cfrac{x^2}{3-
 \cfrac{x^2}{5-
 \cfrac{x^2}{7-
 \cfrac{x^2}{9-
 \cfrac{x^2}{13-
 \cfrac{x^2}{15-\ddots} } } } } } }
=\frac{x}{1-K_{n=1}^{\infty}\frac{x^2}{2n+1}}
\end{eqnarray*}
$$

# $\tanh x$ 的连分式展开（习题 1-15）

已知
$$
\begin{eqnarray*}
&\cosh x=N(\frac{1}{2},\frac{1}{4}x^2)\\
&\frac{\sinh x}{x}=N(\frac{3}{2},\frac{1}{4}x^2)
\end{eqnarray*}
$$
则
$$
\tanh x=\frac{x}{1+K_{n=1}^{\infty}\frac{x^2}{2n+1}}
$$

# 结尾

最后，研究一下连分式展开和 Taylor 展开的精度对比。前面已经给出了 $\arctan x$ 的连分式展开和 Taylor 展开，注意到
$$
\arctan 1=\frac{\pi}{4}
$$
因此，$\pi$ 的连分式形式和 Taylor 级数形式分别为
$$
\pi=\frac{4}{1+K_{k=1}^{\infty}\frac{k^2}{2k+1}}=4\sum_{k=1}^{\infty}\frac{(-1)^{k+1}}{2k-1}
$$
借助数学软件`Mathematica`。分别对二者从 1 阶展开到 40 阶，数值运算的精度设为 80 位精度，比较 $\pi$ 的近似值与精确值的误差，并对误差取常用对数（以 10 为底），代码如下

<div style="overflow-x:auto;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post1/pi%20code.png" style="max-width:none;"/></div>

结果如下图

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post1/pi%20plot.png" width="500"/></div>

可以看出，随着展开阶数的增加，连分式的误差呈指数衰减，而 Taylor 级数的误差只是线性衰减。事实上，想要得到 $\pi$ 的近似值 $3.1419526535$，连分式只需展开到 15 阶，而 Taylor 级数需要展开到第 50000 阶，所以难怪作者 Battin 吐槽说：

> 连分式展开在大学课程中也没有获得应有的地位，尽管事实上连分式表达式在计算经典函数时远比人们更熟悉的无穷幂级数有效率：与级数相比，连分式通常收敛更快，收敛域更广。更具有讽刺意味的是，人们在发明幂级数前其实已经使用了上百年连分式。

但是，前面毕竟只是个例，下面在 $x\in[0,1]$ 区间上对 $\arctan x$ 的连分式展开和 Taylor 展开进行对比，连分式展开到 10 阶，Taylor 展开 18 阶。由于`Mathematica`对 $\arctan x$ 的计算精度有限，所以不再指定数值运算的精度。代码如下

<div style="overflow-x:auto;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post1/arctan%20code.png" style="max-width:none;"/></div>

结果如下图

<div style="text-align:center;"><img src="https://cdn.jsdelivr.net/gh/qingyayaya/cdn/pics/post1/arctan%20plot.png" width="500"/></div>

整体来说，连分式展开比 Taylor 展开精度更高，而且避免了大量的幂运算（由于数值计算的精度有限，$[0,0.4]$ 区间的误差结果并没有参考价值）

