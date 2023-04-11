---
title: link
text: Link
index: 3
code: false
---

<style type="text/css">
    .item span {
        vertical-align: middle;
    }
    .item img {
        vertical-align: middle;
    }
    .site span {
        color: darkgray;
        padding-left: 5px;
    }
</style>


<p class="title">Link</p>
<div id="main"></div>

<script type="text/javascript">
(function() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", 'https://gcore.jsdelivr.net/gh/qingyayaya/cdn/json/links.json');
    xhr.send(null);
    xhr.onload = () => {
        if (xhr.status == 200) {
            var content = '';
            JSON.parse(xhr.responseText).forEach(e => {
                content += `<div class="item">
                    <img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/icon/${e.icon}.svg" height="20" width="20" alt="${e.name}" loading="lazy">
                    <span>${e.name}</span>
                </div>
                <ul>`;
            
                e.site.forEach(s => {
                    content += `<li class="site">
                        <a href="${s.url}" target="_blank" rel="noreferrer">${s.name}</a>
                        <span class="desc">${s.desc}</span>
                    </li>`;
                });

                content += '</ul>';
            });
            document.getElementById('main').innerHTML = content;
        }
    };
})();
</script>