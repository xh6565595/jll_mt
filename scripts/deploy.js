const { execSync, spawn } = require('child_process')
const ci = require('miniprogram-ci')

function getVersion () {
    const obj = new Date()
    const first = obj.getFullYear().toString().substr(2, 2)
    const second = obj.getMonth() + 1
    const thrid = obj.getDate()
    const hour = obj.getHours()
    const min = obj.getMinutes()
    return `${first}.${second}${thrid}.${hour < 10 ? `0${hour}` : hour}${min < 10 ? `0${min}` : min}`
}

function isMasterBranch () {
    const branchs = execSync('git branch', { encoding: 'utf-8' })
    return branchs.split('\n').find(branch => branch === '* master')
}

async function deploy () {
    console.log('⏫　开始上传')
    const project = new ci.Project({
        appid: 'wx7e72fb9523b9fe27',
        type: 'miniProgram',
        projectPath: './',
        privateKeyPath: '/home/gitlab-runner/private.wx7e72fb9523b9fe27.key',
        ignores: ['node_modules/**/*']
    })
    await ci.upload({
        project,
        version: getVersion(),
        setting: {
            es6: true,
            minify: true
        },
        onProgressUpdate: console.log
    })
}

function build () {
    // console.log(execSync('git pull origin master', { encoding: 'utf-8' }))
    console.log('🔨　开始构建')
    const e = spawn('npm', ['run', 'build:weapp'])
    e.stdout.setEncoding('utf-8')
    e.stdout.on('data', (data) => {
        console.log(data)
    })
    e.on('close', () => {
        console.log('📦　打包完成')
        deploy()
    })
}

// if (isMasterBranch()) {
//     build()
// } else {
//     console.log('❌️　当前不位于master分支，请切换到master分支再试')
// }

build()

