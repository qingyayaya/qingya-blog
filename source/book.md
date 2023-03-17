---
title: book
text: Book
index: 1
code: false
---

<style type="text/css">
/* book */
.book-content {
    display: flex;
    align-items: stretch;
    justify-content: center;
    flex-wrap: wrap;
}
.book-item {
    min-width: 190px;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin: 30px 0;
}
.book {
    width: 150px;
    height: 210px;
    overflow: hidden;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.05)
    transition: transform .2s, box-shadow .2s;
}
.book-image {
    width: 150px;
    min-height: 210px; /* 确保超出部分不显示，且高度不足时填满 */
}
.book-hover {
    position: absolute;
    width: 150px;
    height: 210px;
    top: -210px;
    display: table;
    backdrop-filter: blur(0px);
    background-color: rgba(0,0,0,0.4);
    transition: top .2s;
    transition-delay: .2s;
    z-index: 3; /* 增加z-index，确保在图片之上 */
}
.book-hover p {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    font-size: 15px;
    color: #fff;
}
.book:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.15) !important
}
.book:hover .book-hover {
        top: 0px;
        backdrop-filter: blur(3px);
    }
.book-loadmore {
    display: block;
    padding: 0.3em;
    background: rgba(0,0,0,0.7);
    color: white;
    transition: 0.2s;
    margin: 20px auto!important;
    width: 6em;
    text-align: center;
    cursor: pointer;
}
.book-loadmore:hover {
    background: gray;
}

/* record */
.record {
    margin: 0;
    padding: 0;
    position: relative;
}
.record:before {
    content: '';
    position: absolute;
    left: 13px;
    width: 1px;
    height: 100%;
    background-color: #E4E4E4;
}
.record-item {
    list-style: none;
    padding-left: 30px;
    position: relative;
    line-height: 45px;
    font-size: 14px;
    color: #141414;
}
.record-content {
    background-color: whitesmoke;
    border-left: 3px solid #6190e8;
    padding: 0.8em 1.0em;
    font-weight: bold;
    line-height: 25px;
}
.record-item:before {
    content: '';
    position: absolute;
    left: 8.5px;
    top: 20px;
    right: 0;
    bottom: 0;
    width: 8px;
    height: 8px;
    background-color: #ccc;
    border: 1px solid #ccc;
    border-radius: 100%;
}
.record-item:first-child:before {
    background-color: #48BEB2;
    border-color: #48BEB2;
}
.record-info {
    background-color: whitesmoke;
    border-left: 3px solid #e89b44;
    padding: 0em 1.0em;
    font-style: italic;
    line-height: 30px;
    margin-bottom: 30px;
}
</style>

<!-- book -->

<p class="title">看过的书</p>
<div class="book-content">加载中，请稍等...</div>
<div class="book-loadmore">加载更多</div>
<br/><hr><br/>

<script type="text/javascript">
(function() {
    const step = 12; // 每次加载多少本书
    var book = [];
    var head = 0;

    // 获取json
    var xhr = new XMLHttpRequest();
    xhr.open("get", "https://gcore.jsdelivr.net/gh/qingyayaya/cdn/json/books.json");
    xhr.send(null);
    xhr.onload = () => {
        if (xhr.status == 200) {
            book = JSON.parse(xhr.responseText);
            document.querySelector('.book-content').innerHTML = ''; // 清空内容
            parseBookData(); // 加载一次
        }
    };

    // “加载更多”按钮
    document.querySelector('.book-loadmore').onclick = parseBookData;

    // 加载一次
    function parseBookData() {
        if (head < book.length) {
            document.querySelector('.book-content').innerHTML += book.slice(head, head+step).map(e => {
                 return `
<div class="book-item">
    <a class="book" target="_blank" href="https://book.douban.com/subject/${e.doubanUrl}/">
        <div style="position: relative;">
            <div class="book-hover">
                <p>${e.name}<br /><br />${e.author}</p>
            </div>
        </div>
        <img class="book-image" src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/book/${e.photoUrl}">
    </a>
</div>`;
            }).join('');
            head += step;
        }
        if (head >= book.length) {
            document.querySelector('.book-loadmore').innerHTML = '没有了';
            document.querySelector('.book-loadmore').onclick = null;
        }
    }
})();
</script>

<!-- record -->

<div class="record-main">
	<ul class="record"></ul>
</div>

<script type="text/javascript">
(function() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "https://gcore.jsdelivr.net/gh/qingyayaya/cdn/json/records.json");
    xhr.send(null);
    xhr.onload = () => {
        if (xhr.status == 200) {
            document.querySelector('.record').innerHTML = JSON.parse(xhr.responseText).map(e => {
                return `
<li class="record-item">
    <div class="record-content">${e.content}</div>
    <p class="record-info">${e.author}《${e.reference}》</p>
</li>`;
            }).join('');
        }
    }
})();
</script>
