window.onload = function () { judgeLevel() }

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

// 保存相关信息到 localStorage 中
function saveInfo (level, name, teacher) {
    if (level) localStorage.setItem('level', level)
    if (name) localStorage.setItem('name', name)
    if (teacher) localStorage.setItem('teacher', teacher)
}

// 首页提交表单
function postInfo () {
    var name = document.getElementById('inputName').value.trim()
    var teacher = document.getElementById('inputTeacher').value.trim()
    if (!name) {
        alert('请输入你的名字哈！')
        return 
    } else if (!teacher) {
        alert('请输入守护老师的名字哈！')
        return
    }
    saveInfo(null, name, teacher)
    window.location.href = './result.html'
}
