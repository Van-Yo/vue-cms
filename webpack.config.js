const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: path.join(__dirname,'./src/main.js'),
    output:{
        path: path.join(__dirname,'./dist'),
        filename: 'bundle.js'
    },
    plugins:[
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'),
            filename:'index.html'
        }),
        new VueLoaderPlugin()
    ],
    module:{
        //这个节点用于配制所有第三方模块加载器
        rules:[
            //所有第三方模块的匹配规则
            { test:/\.css$/,use:['style-loader','css-loader'] },//配置处理.css文件的第三方loader规则
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },//配置处理.less文件的第三方loader规则
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },//配置处理.sass文件的第三方loader规则
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=39766&name=[hash:8]-[name].[ext]' },//配置处理图片路径的第三方loader规则
            { test: /\.vue$/, use: 'vue-loader' },//配置处理.vue文件的第三方loader规则
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
        ]
    },
    resolve:{
        alias:{
            // "vue$":"vue/dist/vue.js"
        }
    }
}