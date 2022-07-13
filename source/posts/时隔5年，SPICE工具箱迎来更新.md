---
title: 时隔 5 年，SPICE 工具箱迎来更新
date: 2022-03-29 16:00:00
cover: https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/cover/cover21.png
code: false
---

其实这并不算是一个新闻，因为早在今年 1 月 3 日，[naif 官网](https://naif.jpl.nasa.gov/pub/naif/)就已经悄咪咪地发布了版本号 N0067 的全新版本，距上一次版本更新已经过去了 5 年。

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post21/N0067.jpg" width="400"/></div>

寒假期间我大概看了看[新增的功能](https://naif.jpl.nasa.gov/pub/naif/toolkit_docs/MATLAB/info/whatsnew.html#Version%2067%20---%20January%202022)，比较吸引我的是`cspice_spkw09`函数、azimuth/elevation、一个叫做 Switch Frames 的新坐标系统，以及新增 95 个 MATLAB API，让人不禁跃跃欲试。然而假期生活实在是太安逸了。直到开学后我才把新版下载下来。

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post21/dog.gif" width="180"/></div>

我曾经在[重新编译 mice](https://qingyayaya.github.io/post/%E9%87%8D%E6%96%B0%E7%BC%96%E8%AF%91%20mice)提到过，因为 N0066 版本的 mice 没有提供`cspice_spkw09`函数，又始终没有更新的动静，所以我尝试自己写了这个函数，又重新编译了 mice。这次更新，官方终于给出了`cspice_spkw09`函数，我也和那些 bug 说再见了。

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post21/mycode.jpg" width="240"/></div>

值得关注的更新点：

- 增加了对苹果 M1 处理器的支持
- 增加 Switch Frames 坐标系统
- Dynamic Frame 增加了 Product Frames 子坐标系统
- PCK 支持 3 次以上的多项式了
- 支持 ISO 格式的 UTC 时间了，比如`2022-01-01T12:00:00.000Z`
- SPK body ID 从最多 200 个增加到最多 10000 个
- 支持计算观察者到目标物体表面的切点，即 tangent point，对应`cspice_tagnpt`函数
- 支持计算两物体与第三者形成的夹角，对应`cspice_trgsep`函数
- 支持通过两行轨道根数 TLE 预测航天器的轨迹，对应`cspice_evsgp4`函数
- 支持用 azimuth/elevation 坐标系表示目标相对观察者的关系，对应`cspice_azlcop`函数
- 增加了大量的内建 Spacecraft、DSN Stations、Asteroids
- 增加了大量的内建 Body-Fixed Frames
- 增加了 95 个 MATLAB API，如下：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post21/newAPI.png" width="400"/></div>