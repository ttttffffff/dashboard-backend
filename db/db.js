module.exports = function (success,error) {
    const mongoose = require('mongoose');

    //设置 strictQuery 为 true
    mongoose.set('strictQuery', true);

    //3. 连接 mongodb 服务                        数据库的名称
    mongoose.connect('mongodb://127.0.0.1:27017/dashboard');

    //4. 设置回调
    // 设置连接成功的回调  once 一次   事件回调函数只执行一次
    mongoose.connection.once('open', () => {
        success()

    });

    // 设置连接错误的回调
    mongoose.connection.on('error', () => {
        error()
    });

    //设置连接关闭的回调
    mongoose.connection.on('close', () => {
        console.log('连接关闭');
    });
}
