`qingya` is a minimalist static blog generator. Example website https://qingyayaya.github.io/.

# How to use

## Install

Clone from github:

``` bash
git clone https://github.com/qingyayaya/qingya-blog.git
```

or install from npm:

``` bash
npm i qingya
```

## New blog

Initialize a new blog:

``` bash
mkdir blog
cd blog
qingya -i
```

It will create a config file `_config.yml`, you can configure by modifying this file.

------

Write a new post `Hello World`:

``` bash
mkdir posts/post01/
echo "---
title: Hello World
date: 2023-05-05 12:00:00
cover: static/pics/cover/cover1.png
code: false
---

Hello World" > posts/post01/helloworld.md
```

Compile blog:

```bash
qingya -g
```

The output web resources are in `public/` folder.