module.exports = {
    // devServer: {
    //     port: process.env.VUE_APP_PORT,     // 端口号
    // },
    devServer: {
        proxy: {
            '/api': {
                target: process.env.VUE_APP_API, // 后端服务器地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' // 重写请求路径，将 "/api" 去掉
                }
            }
        },
        port: process.env.VUE_APP_PORT,
    },
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json']
        }
    }

};
