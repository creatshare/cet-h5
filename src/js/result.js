// 加载文案数据
function loadData () {
    console.log(uLoserData)
}

// 将整个页面输出成图片
function drawPage () {
    var rScreen = document.getElementById('rScreen')
    html2canvas(rScreen, {
        // 允许读取 DOM 中的图片
        allowTaint: true,
        height: 1000
    }).then(function(canvas) {
        // 用图片替换 DOM 结点
        rScreen.parentNode.replaceChild(canvas, rScreen)
    });
}