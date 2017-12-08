// 从全局对象中读取文案数据
var uLoserData = window.uLoserData
var tPassData = window.tPassData
var uPassData = window.uPassData
var tLoserData = window.tLoserData

// 从 localStorage 中读取用户信息
var level = localStorage.getItem('level')
var name = localStorage.getItem('name')
var teacher = localStorage.getItem('teacher')

window.onload = function () {
    assertLS()
    saveRandom ()
    renderInfo()
    drawPage()
}

// 首页加载时查看 localStorage 中是否有内容
function assertLS () {
    if (!level || !name || !teacher) {
        alert('请先填写你的信息')
        window.location.href = './index.html'
    }
}

// 随机获取文案内容，包括用户文案和教师文案，保存到 localStorage 中
function saveRandom () {
    // 生成 0 或 1 的随机数，0 代表没通过，1 代表通过
    var status = Math.ceil(Math.random() * 2) - 1
    localStorage.setItem('status', status)
    // userText、teacherText 分别存储用户、教师文案到 localStorage
    if (status == 0) {
        // 没通过时的渲染用户、教师文案
        var userText = getUserRandom(uLoserData)
        var teacherText = getTeacherRandom(tLoserData)
        localStorage.setItem('userText', userText)
        localStorage.setItem('teacherText', teacherText)
        return
    } else {
        // 通过时的渲染用户、教师文案
        var userText = getUserRandom(uPassData)
        var teacherText = getTeacherRandom(tPassData)
        localStorage.setItem('userText', userText)
        localStorage.setItem('teacherText', teacherText)
        return
    }
}

// 返回随机用户文案，参数可为 uLoserData、uPassData，是数组
function getUserRandom (uData) {
    var userText = ''
    var uD_MAX = uData.length
    var uRandom = Math.floor(Math.random() * uD_MAX)
    // 读取某用户文案的每一行
    uData[uRandom].forEach(function (v) {
        userText += '<span>' + v + '</span>'
    })
    return userText
}

// 根据具体教师返回随机文案，参数可为 tLoserData、tPassData，是对象
function getTeacherRandom (tData) {
    var teacherText = ''
    if (!tData.hasOwnProperty(teacher)) {
        // 没有这个老师的相应文案时，使用第一条通用文案库，在其中随机文案
        var tD_MAX = tData['XXX'].length
        var tRandom = Math.floor(Math.random() * tD_MAX)
        var tTextArr = tData['XXX'][tRandom]
        tTextArr.forEach(function (v) {
            v = v.replace('XXX', teacher)
            teacherText += '<span>' + v + '</span>'
        })
    } else {
        // 有这个老师的文案时
        var tD_MAX = tData[teacher].length
        var tRandom = Math.floor(Math.random() * tD_MAX)
        var tTextArr = tData[teacher][tRandom]
        tTextArr.forEach(function (v) {
            teacherText += '<span>' + v + '</span>'
        })
    }
    return teacherText
}

// 根据用户信息渲染 DOM
function renderInfo () {
    // 渲染卡片背景颜色
    var resBody = document.getElementById('resBody')
    var status = localStorage.getItem('status')
    // 未通过，黄色；通过，蓝色
    resBody.style.backgroundColor = (status == 0) ? '#fefa5c' : '#00ffea'
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
    var userText = document.getElementById('userText')
    var uText = localStorage.getItem('userText')
    userText.innerHTML = uText
    // 渲染教师文案
    var teacherText = document.getElementById('resLeft')
    var tText = localStorage.getItem('teacherText')
    teacherText.innerHTML = tText
}

// 将整个页面输出成图片
function drawPage () {
    var rScreen = document.getElementById('rScreen')

    var canvas = document.createElement('canvas')
    var height = rScreen.offsetHeight
    var width = rScreen.offsetWidth
    var scale = 2
    canvas.height = height * scale
    canvas.width = width * scale
    canvas.getContext("2d").scale(scale, scale)
    
    html2canvas(rScreen, {
        scale: scale, 
        canvas: canvas, 
        logging: true,
        height: height,
        width: width, 
        allowTaint: true
    }).then(function(canvas) {
        var h5Img = document.createElement('img')
        var base64Url = canvas.toDataURL("image/png")
        h5Img.setAttribute('crossorigin', 'anonymous')
        h5Img.style.height = canvas.height / 2 + "px"
        h5Img.style.weight = canvas.weight / 2 + "px"
        h5Img.src = base64Url
        // 用图片替换 DOM 结点
        rScreen.parentNode.replaceChild(h5Img, rScreen)
    })
}