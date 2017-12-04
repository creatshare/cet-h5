function postInfo () {
    window.location.href = './result.html'
}

window.onload = function () {
    var rScreen = document.getElementById('rScreen')
    html2canvas(rScreen, {
        allowTaint: true,
        height: 1000
    }).then(function(canvas) {
        // 用图片替换 DOM 结点
        rScreen.parentNode.replaceChild(canvas, rScreen)
    });
}