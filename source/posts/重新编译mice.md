---
title: 重新编译 mice
date: 2021-11-01 20:00:00
cover: https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/cover/cover13.png
---

在我的不懈努力之下，公众号终于从**周更**变成了**月更**，说不定将来还会变成**季更**。

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post13/dog.jpg" width="150"/></div>

某师兄早就嚷嚷着催更了，其实我想说，有的博客曾经断更长达五年：

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post13/matrix67.png" width="350" style="border:1px solid black"/></div>

和这一比较，断更 1 个月而已，都是小场面。其实博客有悄咪咪地更新过两篇文章，只不过是那种交互式的，不适合发在公众号。（可算是把[以前的坑](https://qingyayaya.github.io/post/%E9%9D%92%E5%B4%96%E5%90%8C%E5%AD%A6%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2%E4%B8%8A%E7%BA%BF%E5%95%A6/)给填上了）

------

今天聊聊 MATLAB。~~咦，MATLAB 一直不都是调侃的对象吗，怎么成主角了？~~No No No，所谓“圣人无常师”，只有小学生才会争论语言的高低贵贱，成年人都是驾驭自如为我所用的。

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post13/pupil.jpg" width="150"/></div>

!> 本教程只针对 Microsoft Windows 10 操作系统！

# 什么是mice

mice 是 MATLAB 版本的 SPICE Toolkit。SPICE Toolkit 享有盛名，这里不再赘述，想要了解更多，请移步其[官方网站](https://naif.jpl.nasa.gov/naif/index.html)。

# 为什么要重新编译 mice

我曾经写过一个软件，其中一些核心功能依赖于 mice，但是目前 mice（N0066 版本，released April 10, 2017）尚未完全把 SPICE Toolkit 的所有功能适配到 MATLAB。比如没有提供`cspice_spkw09`函数，但是这个函数却非常有用。

显然不能坐等官方团队在下一个版本进行适配，应该主动对 mice 进行定制，按照自己的需求增加功能，最后重新编译 mice。只有这样，以后才能更好地、可持续地利用 mice。

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post13/xiaowanzi.jpg" width="240"/></div>

# 下载 mice

在官网下载[`mice.zip`](https://naif.jpl.nasa.gov/pub/naif/toolkit//MATLAB/PC_Windows_VisualC_MATLAB8.x_64bit/packages/mice.zip)（需要科学上网），解压。文件结构为：

```
(installation directory)
         |
         mice(下文中记作<mice>)
            |
            data
            ...
            include
            lib
            src
               |
               brief_c
               ...
               spacit_c
               cspice
               csupport
               mice
               micecook
```

# 实现`cspice_spkw09`函数

以`cspice_spkw09`函数为例，介绍如何实现自己的需求。把以下代码写入`<mice>\src\mice\mice.c`的适当位置：

```c
/*
   void spkw09_c ( SpiceInt             handle,
                   SpiceInt             body,
                   SpiceInt             center, 
                   ConstSpiceChar     * frame,
                   SpiceDouble          first,
                   SpiceDouble          last,
                   ConstSpiceChar     * segid,
                   SpiceInt             degree,
                   SpiceInt             n,
                   ConstSpiceDouble     states[][6],
                   ConstSpiceDouble     epochs[]     )
*/
void cspice_spkw09(int nlhs, mxArray *plhs[], int nrhs, const mxArray *prhs[])
{

   SpiceInt             handle;
   SpiceInt             body;
   SpiceInt             center;
   SpiceChar            frame   [DEFAULT_STR_LENGTH+1];
   SpiceDouble          first;
   SpiceDouble          last;
   SpiceChar            segid   [DEFAULT_STR_LENGTH+1];
   SpiceInt             degree;
   SpiceInt             n;
   ConstSpiceDouble   * states;
   ConstSpiceDouble   * epochs;

   struct extra_dims  * extra;
   struct argcheck ArgCheck[] =
      {
      { "handle",  MiceInt,    0, { 0 },    0},
      { "body",    MiceInt,    0, { 0 },    0},
      { "center",  MiceInt,    0, { 0 },    0},
      { "frame",   MiceChar,   0, { 0 },    0},
      { "first",   MiceDouble, 0, { 0 },    0},
      { "last",    MiceDouble, 0, { 0 },    0},
      { "segid",   MiceChar,   0, { 0 },    0},
      { "degree",  MiceInt,    0, { 0 },    0},
      { "states",  MiceDouble, 2, { 6, 0 }, 0},
      { "epochs",  MiceDouble, 2, { 1, 0 }, 0},
      };

   check_arg_num( nrhs, nlhs, 10, 0);

   extra = mice_checkargs(nlhs,plhs,nrhs,prhs,ArgCheck);

   /*
   Number of state sets = number of elements in array divided by six;
   we expect a 6xN array.
   */
   n = mxGetNumberOfElements( prhs[9]) / 6;

   handle  = S_INT_ARGV(1);
   body    = S_INT_ARGV(2);
   center  = S_INT_ARGV(3);

   mxGetString(prhs[4], frame, DEFAULT_STR_LENGTH);

   first   = S_DBL_ARGV(5);
   last    = S_DBL_ARGV(6);

   mxGetString(prhs[7], segid, DEFAULT_STR_LENGTH);

   degree  = S_INT_ARGV(8);

   states  = (ConstSpiceDouble*)mxGetData(prhs[9]);
   epochs  = (ConstSpiceDouble*)mxGetData(prhs[10]);

   spkw09_c ( handle,
              body,
              center,
              frame,
              first,
              last,
              segid,
              degree,
              n,
              (Nx6d)states,
              (ConstSpiceDouble(*)[1]) epochs );

   CHECK_CALL_FAILURE( SCALAR );

}
```

# 编译`mice.mexw64`的步骤

正式编译之前，请注意：

!> cspice源代码没有使用`mwSize`，而是使用`int`，因此鲁棒性很差，编译时必须采用`-compatibleArrayDims`模式

!> SPICE Toolkit version is **N0066**。测试环境为 MATLAB **2020b** 和 Microsoft Visual Studio **14.0**

------

1. 在`<mice>\src\mice\mice.c`靠近头部的位置，添加以下代码：


```c
#if _MSC_VER>=1900  
_ACRTIMP_ALT FILE* __cdecl __acrt_iob_func(unsigned);
#ifdef __cplusplus   
extern "C"
#endif   
FILE* __cdecl __iob_func(unsigned i) {
    return __acrt_iob_func(i);
}
#endif
```

为什么要加这行代码？解释：

> 因为不同版本的 VS 对`stdin`, `stdout`, `stderr`的定义不同（参见`C:\Program Files (x86)\Windows Kits\10\Include\10.0.10150.0\ucrt\corecrt_wstdio.h`文件）

?> 在此之后，有**两种方案**可供选择

------

第一种方案，使用官方提供的`cspice.lib`库文件，位于`<mice>\lib\`路径下（<u>省时，推荐</u>）

2. 在MATLAB，把以下代码保存成`MakeProductWithCSPICELIB.m`脚本，并运行

```matlab
function MakeProductWithCSPICELIB()

% mice文件夹的路径（根据具体情况更改）
MICE_PATH = fileparts( mfilename('fullpath') );

% 64位libcmt.lib库的路径（根据具体情况更改）
LIBCMT_PATH = 'C:\Program Files (x86)\Microsoft Visual Studio 14.0\VC\lib\amd64\';

% 跳转到
cd( MICE_PATH );

% 正式编译
mex('-compatibleArrayDims',...
    '-output' , '..\..\lib\mice',...   % 定义输出的路径和文件名
    '-I..\..\include',...              % 头文件的路径中
    'mice.c',...
    'zzmice.c',...
    'zzmice_CreateIntScalar.c',...
    '..\..\lib\cspice.lib',...         % lib
    [LIBCMT_PATH,'libcmt.lib'] );      % lib

end
```

**注意事项如下，请务必认真阅读：**

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post13/document.jpg" width="200"/></div>

> 1. 测试环境为 MATLAB **2020b** 和 Microsoft Visual Studio **14.0**
> 2. 脚本应放置在`<mice>\src\mice\`路径中，即与`mice.c`同一路径
> 3. 编译时引用了`<mice>\include\`路径中的头文件，请勿随意修改该文件夹下的文件
> 4. 编译时需要`cspice.lib`库，请确保该文件存在于`<mice>\lib\`路径中
> 5. 编译时需要`libcmt.lib`库，该库文件由 VS 提供，请确认该库文件的具体路径，并对脚本中的 LIBCMT_PATH 变量及时做出修正
> 6. 编译后生成的文件为`mice.mexw64`，位于`<mice>\lib\`路径中，如果编译前该路径中已经存在`mice.mexw64`文件，会不提醒地将其覆盖，所以最好备份

------

第二种方案，不使用官方提供的`cspice.lib`，自己编译源代码（<u>不省时，易出错，不推荐</u>）

2. 编译`vcf2c.lib`，具体步骤请参阅后文。编译后，把库文件放置在`<mice>\lib\`路径中。因为 cspice 源代码广泛使用 f2c 工具，因此依赖该库
3. `<mice>\include\`缺少`unistd.h`头文件，请补充，其源代码如下：


```c
/* This file is part of the Mingw32 package.
    unistd.h maps (roughly) to io.h
*/

#ifndef _UNISTD_H
#define _UNISTD_H

#include <io.h>

#endif
```


4. 下载`list.txt`文件，链接`https://gitee.com/openmdt/mice-compile/raw/master/list.txt`，放到`<mice>\src\mice\`路径下。该文件列举了编译所需的`.c`源文件（是我一个一个试出来的，**缺一不可**）
5. 在 MATLAB，把以下代码保存成`MakeProductWithoutCSPICELIB.m`脚本，并运行

```matlab
function MakeProductWithoutCSPICELIB()

% mice文件夹的路径（根据具体情况更改）
MICE_PATH = fileparts( mfilename('fullpath') );

% 跳转到
cd( MICE_PATH );

% 打开list.txt
fid = fopen('list.txt','r');

% 找到编译所需的.c源文件
p = '..\cspice\';
k = 1;
while ~feof(fid)
    temp = fgetl(fid);
    list{k} = [p , temp];
    k = k + 1;
end
fclose(fid);

% 正式编译
mex('-compatibleArrayDims',...
    '-output' , '..\..\lib\mice',...   % 定义输出的路径和文件名
    '-I..\..\include',...              % 头文件的路径中
    '..\..\lib\vcf2c.lib',...
    'C:\Program Files (x86)\Microsoft Visual Studio 14.0\VC\lib\amd64\libcmt.lib',...
    'mice.c',...
    'zzmice.c',...
    'zzmice_CreateIntScalar.c',...
    list{:} );

end
```

**注意事项如下，请务必认真阅读：**

> 1. 测试环境为 MATLAB **2020b** 和 Microsoft Visual Studio **14.0**
> 2. 脚本应放置在`<mice>\src\mice\`路径中，即与`mice.c`同一路径
> 3. 编译时引用了`<mice>\include\`路径中的头文件，请勿随意修改该文件夹下的文件
> 4. 编译时需要`libcmt.lib`库，该库文件由 VS 提供，请确认该库文件的具体路径，并对脚本中的 LIBCMT_PATH 变量及时做出修正
> 5. 编译时需要`vcf2c.lib`库，请确保已经按照相关步骤编译出该文件
> 6. 编译后生成的文件为`mice.mexw64`，位于`<mice>\lib\`路径中，如果编译前该路径中已经存在`mice.mexw64`文件，会不提醒地将其覆盖，所以最好备份

------

!> 最后，即使按照以上步骤做了，也不一定能成功，比较依赖编译环境。但是，在 MATLAB **2020b** 和 Microsoft Visual Studio **14.0** 环境下，经测试，没有问题。**如果没成功，请不要迁怒于任何一个工具**，它们都是相当优秀的。

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post13/girl.jpg" width="150"/></div>

# 编译`vcf2c.lib`的步骤

备注：

> 测试环境为 Microsoft Visual Studio **14.0**。下文中的路径根据 VS 的具体安装位置灵活调整

具体步骤：

1. 在 [www.netlib.org/f2c/](www.netlib.org/f2c/) 下载`libf2c.zip`压缩包，并解压到`<path>\libf2c\`路径
2. 在“此电脑”右击，选择“属性”，选择“高级系统设置”，点击“环境变量”
3. 在“系统变量”面板上，点击“新建”，“变量名”填写`INCLUDE`，“变量值”填写`C:\Program Files (x86)\Windows Kits\10\Include\10.0.10150.0\ucrt;C:\Program Files (x86)\Microsoft Visual Studio 14.0\VC\include`
4. 在“系统变量”面板上，点击“新建”，“变量名”填写`LIB`，“变量值”填写`C:\Program Files (x86)\Microsoft Visual Studio 14.0\VC\lib\amd64;C:\Program Files (x86)\Microsoft SDKs\Windows\v7.1A\Lib\x64;C:\Program Files (x86)\Windows Kits\10\Lib\10.0.10150.0\ucrt\x64`
5. 在“系统变量”面板上，点击“新建”，“变量名”填写`Path`，“变量值”填写`C:\Program Files (x86)\Microsoft Visual Studio 14.0\VC\bin\amd64`
6. 可以在`C:\Program Files (x86)\Microsoft Visual Studio 14.0\VC\bin\amd64`路径下找到 64 位`nmake.exe`
7. 运行 cmd.exe，输入要到达的盘，比如`D:`，再输入`CD <path>\libf2c\`
8. 接着输入`nmake -f makefile.vc`
9. 完成
10. 如果计算机装有 Mathematica，不妨去`<Mathematica安装路径>\SystemFiles\Components\WSMCore\lib\win64\VS2013`路径下，看看能否找到`f2c.lib`，这就是我们想要的库文件，Mathematica 已经帮我们编译好了，亲测可用

<div style="text-align:center;"><img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/post13/bed.gif" width="340"/></div>