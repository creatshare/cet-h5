// 入口判断四六级状态
function judgeLevel () {
    // search = '?level=4' || '?level=6'
    var search = window.location.search
    var level = parseInt(search.charAt(search.length - 1))
    // 除了 4、6 数字，均默认为英语 4 级
    if (level !== 4 &&  level !== 6) { level = 4 }
    switch (level) {
        case 4:
            document.getElementById('cet4').style.display = 'block'
            saveInfo(4, null, null)
            break
        case 6:
            document.getElementById('cet6').style.display = 'block'
            saveInfo(6, null, null)
            break
        default:
            // 不可能发生
            break
    }
}

judgeLevel()

function saveInfo (level, name, teacher) {

}

// 首页提交表单
function postInfo () {
    var name
    var teacher
    saveInfo(null, name, teacher)
    window.location.href = './result.html'
}

// 加载文案数据
function loadData () {

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