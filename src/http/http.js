import axios from 'axios'
//import Cookies from 'js-cookie'
//import router from '../router'
import { Message } from 'element-ui'
const showStatus = (status) => {
    let message = ''
    switch (status) {
        case 400:
            message = '请求错误(400)'
            break
        case 401:
            message = '未授权，请重新登录(401)'
            break
        case 403:
            message = '拒绝访问(403)'
            break
        case 404:
            message = '请求出错(404)'
            break
        case 408:
            message = '请求超时(408)'
            break
        case 500:
            message = '服务器错误(500)'
            break
        case 501:
            message = '服务未实现(501)'
            break
        case 502:
            message = '网络错误(502)'
            break
        case 503:
            message = '服务不可用(503)'
            break
        case 504:
            message = '网络超时(504)'
            break
        case 505:
            message = 'HTTP版本不受支持(505)'
            break
        default:
            message = `连接出错(${status})!`
    }
    return `${message}，请检查网络或联系管理员！`
}

const service = axios.create({
    // 联调
    baseURL: process.env.VUE_APP_API_MODE === 'proxy' ? `${process.env.VUE_APP_SERVER}:${process.env.VUE_APP_SERVER_PORT}` : `${process.env.VUE_APP_API}`,
    headers: {
        get: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        post: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    },
    timeout: 30000
})
//是否使用默认统一全局弹窗，默认使用
let isShowToast = true

// 请求拦截器
service.interceptors.request.use((config) => {
    let { data } = config
    if (data) { isShowToast = data.isShowToast }
    delete data.isShowToast
    console.log(config)
    
    //可以开启全局loading
    //const token = Cookies.get('token')
    //判断token
    // if(token){
    //     config.headers.token=token
    // }else{
    //     router.push('/login')
    // }
    return config
}, (error) => {
    // 错误抛到业务代码

    error.data = {}
    error.data.msg = '服务器异常，请联系管理员！'
    return Promise.resolve(error)
})

// 响应拦截器
service.interceptors.response.use((response) => {
    const status = response.status
    let msg = ''
    if (status < 200 || status >= 300) {
        // 处理http错误，抛到业务代码
        msg = showStatus(status)
        if (isShowToast) {
            Message({
                message: msg,
                type: 'warning'
            })
        }

        if (typeof response.data === 'string') {
            response.data = { msg }
        } else {
            response.data.msg = msg
        }
    }

    const data = response.data
    if (data.errorCode != '0000' && isShowToast) {

        Message({
            message: data.msg,
            type: 'warning'
        })
    }
    return response.data
}, (error) => {
    // 错误抛到业务代码
    console.log(error)
    let errorMsg = {}
    errorMsg.errorCode = -1
    errorMsg.data = null
    errorMsg.msg = error
    Message({
        message: '服务器异常，请联系管理员！',
        type: 'warning'
    })
    return Promise.resolve(errorMsg)
})
const $http = (options) => {
    return service(options)
}
export default $http