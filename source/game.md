---
title: game
text: Game
index: 2
code: false
---

<style type="text/css">
/* game */
article {
    padding: 10px;
}
.game {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 20px;
}
.game-item {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: white;
    transition: 0.1s ease-in 30ms;
    border-radius: 6px;
    overflow: hidden;
    width: 210px;
    margin: 20px 0px;
    box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 4px 8px;
}
.game-item:hover {
    box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 0px, rgb(15 15 15 / 20%) 0px 6px 12px;
}
.game-item .cover {
    overflow: hidden;
}
.game-item .cover img {
    display: block;
    width: 100%;
    height: 90px;
    transition: transform 1s;
}
.game-item .cover img:hover {
    transform: scale(1.1);
}
.game-item .info {
    max-width: 200px;
    padding: 10px;
}
.game-item .name {
    padding-bottom: 8px;
}
.game-item .box {
    width: auto;
    display: inline-block;
    height: 14px;
    border-radius: 3px;
    padding: 2px 6px;
    margin-right: 6px;
    font-size: 12px;
    line-height: 120%;
}
.game-item .star {
    background: rgb(245, 224, 233);
}
.game-item .clear {
    background: rgb(224, 244, 245);
}
.game-item .PC {
    background: rgb(253, 236, 200);
}
.game-item .Android {
    background: rgb(219, 237, 219);
}
.game-item .iPad {
    background: rgb(211, 229, 239);
}
.game-item .iOS {
    background: rgb(232, 222, 238);
}
.game-item .Xbox {
    background: rgb(255, 226, 221);
}
.game-item .PS {
    background: rgb(245, 224, 233);
}
.game-item .Switch {
    background: rgb(236, 245, 224);
}
</style>

<p class="title">Game</p>
<div class="game-main">
	<div class="game"></div>
</div>

<script type="text/javascript">
(function() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "https://gcore.jsdelivr.net/gh/qingyayaya/cdn/json/games.json");
    xhr.send(null);
    xhr.onload = () => {
        if (xhr.status == 200) {
            document.querySelector('.game').innerHTML = JSON.parse(xhr.responseText).map(e => {
                var star = e.star > 0 ? '⭐'.repeat(e.star) : '⭐';
                var clear = e.clear ? '💾Clear' : '🎮Playing';
                var device = Array.isArray(e.device) ? e.device.map(d => {
                    return `<div class="box ${d}">${d}</div>`;
                }).join('') : `<div class="box ${e.device}">${e.device}</div>`;
                return `
<div class="game-item">
    <div class="cover">
        <img src="https://gcore.jsdelivr.net/gh/qingyayaya/cdn/pics/game/${e.name}.jpg"/>
    </div>
    <div class="info">
        <div class="name">${e.name}</div>
        <div><div class="box star">${star}</div></div>
        <div><div class="box clear">${clear}</div>${device}</div>
    </div>
</div>`;
            }).join('');
        }
    }
})();
</script>
