var _timer;
// 定义存放生成随机数的数组
var array = new Array();
var pictureNum = 112;
$(document).ready(function () {

    appendContent(    setTimeout(
        function () {
            init();
        }, 2000
    ));


});

function init() {
    _timer = setInterval("_scroll(document.getElementById('scrollobj'))", 20);
    setTimeout('_start()', 6000);
}

function _scroll(obj) {

    /*往左*/
    var tmp = (obj.scrollLeft)++;
    //当滚动条到达右边顶端时
    if (obj.scrollLeft == tmp) {
        obj.innerHTML += obj.innerHTML;
    }
    //当滚动条滚动了初始内容的宽度时滚动条回到最左端
    if (obj.scrollLeft >= obj.firstChild.offsetWidth) {
        obj.scrollLeft = 0;
    }


    /*往上*/
    //var tmp = (obj.scrollTop)++;
    //if (obj.scrollTop == tmp) {
    //    obj.innerHTML += obj.innerHTML;
    //}
    //if (obj.scrollTop >= obj.offsetHeifht) {
    //    obj.scrollTop = 0;
    //}
}

function _stop() {
    if (_timer != null) {
        clearInterval(_timer);
    }
}
function _start() {
    _timer = setInterval("_scroll(document.getElementById('scrollobj'))", 20);
}


// 生成随机数的方法
function generateRandom(count) {
    var rand = parseInt(Math.random() * count);
    for (var i = 0; i < array.length; i++) {
        if (array[i] == rand) {
            return false;
        }
    }
    array.push(rand);
}

function appendContent(callback) {
    // 循环N次生成随机数
    for (var i = 0; ; i++) {
        // 只生成10个随机数
        if (array.length < pictureNum) {
            generateRandom(pictureNum);
        } else {
            break;
        }
    }
// 循环遍历随机数数组
    for (var i = 0; i < array.length; i++) {
        $("#scrollobj").append('<img src="/images/student/' + array[i] + '.jpg">');
    }

    callback;
}