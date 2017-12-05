// 从全局对象中读取文案数据
var uLoserData = window.uLoserData
var tLoserData = window.tLoserData
var uPassData = window.uPassData
var tPassData = window.tPassData

// 从 localStorage 中读取用户信息
var level = localStorage.getItem('level')
var name = localStorage.getItem('name')
var teacher = localStorage.getItem('teacher')

window.onload = function () {
    assertLS()
    saveRandom ()
    renderInfo()
    // drawPage()
}

// 首页加载时查看 localStorage 中是否有内容
function assertLS () {
    if (!level || !name || !teacher) {
        window.location.href = './index.html'
    }
}

// 随机获取文案内容，包括用户文案和教师文案，保存到 localStorage 中
function saveRandom () {
    // 生成 0 或 1 的随机数，0 代表没通过，1 代表通过
    var status = Math.ceil(Math.random() * 2) - 1
    localStorage.setItem('status', status)
    // userText 里渲染用户文案
    var userText = document.getElementById('userText')
    // teacherText 里渲染教师文案
    var teacherText = document.getElementById('resLeft')
    if (status == 0) {
        // 没通过时的渲染
        var uLD_MAX = uLoserData.length
        var uRandom = Math.floor(Math.random() * uLD_MAX)
        // 输出至每一行
        uLoserData[uRandom].forEach(function (v) {
            userText.innerHTML += v
        })
        if (!tLoserData.hasOwnProperty(teacher)) {
            // 没有这个老师的相应文案时，使用第一条通用文案库，在其中随机文案
            var tLD_MAX = tLoserData['XXX'].length
            var tRandom = Math.floor(Math.random() * tLD_MAX)
            var tText = tLoserData['XXX'][tRandom].replace('XXX', teacher)
            teacherText.innerHTML = tText
        } else {
            // 有这个老师的文案时
            var tLD_MAX = tLoserData[teacher].length
            var tRandom = Math.floor(Math.random() * tLD_MAX)
            var tText = tLoserData[teacher][tRandom]
            teacherText.innerHTML = tText
        }
        return
    } else {
        // 通过时的渲染
        var uPD_MAX = uPassData.length
        var tPD_MAX = tPassData.length
        var uRandom = Math.floor(Math.random() * uPD_MAX)
        var tRandom = Math.floor(Math.random() * tPD_MAX)
        // 用户文案输出至每一行
        uPassData[uRandom].forEach(function (v) {
            userText.innerHTML += v
        })
        // 教师文案输出至每一行
        tPassData[tRandom].forEach(function (v) {
            teacherText.innerHTML += v
        })
    }
}

// 根据用户信息渲染 DOM
function renderInfo () {
    // 渲染卡片背景颜色
    var resBody = document.getElementById('resBody')
    var status = localStorage.getItem('status')
    if (status == 0) {
        // 未通过，黄色
        resBody.style.backgroundColor = '#fefa5c'
    } else {
        // 通过，蓝色
        resBody.style.backgroundColor = '#00ffea'
    }
    // 渲染名字
    var nameText = document.getElementById('nameText')
    nameText.innerHTML = name
    // 渲染 CET 等级
    var levelText = document.getElementById('levelText')
    levelText.innerHTML = 'CET' + level
    // 渲染印章
    var status = localStorage.getItem('status')
    var loser = document.getElementById('loser')
    var pass = document.getElementById('pass')
    // 未通过，渲染 loser 印章
    if (status == 0) loser.style.display = 'block'
    // 通过，渲染 pass 印章
    if (status == 1) pass.style.display = 'block'
    // 渲染用户文案
    // 渲染教师文案
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