//基础配置 
import express from 'express';
import db from './mongodb/db.js';
import config from 'config-lite'; //config-lite 是一个轻量的读取配置文件的模块。
import router from './routes/index.js';
import cookieParser from 'cookie-parser' //cookie-parser是Express的中间件，用来实现cookie的解析，是官方脚手架内置的中间件之一。
import session from 'express-session';
import connectMongo from 'connect-mongo'; //session 是另一种记录客户状态的机制，不同的是 Cookie 保存在客户端浏览器中，而 session 保存在服务器上。
import winston from 'winston'; //我们使用 winston 和 express-winston 记录日志
import expressWinston from 'express-winston';
import path from 'path';
import history from 'connect-history-api-fallback'; //官网解释当你使用history模式是，URL就像正常的url，然而你再服务端并没有卵用。因为通过vue打包最终生成一个index.html和一堆乱起八遭的js，然后你输入你在本地能跑通的路径名(http://127.0.0.1/user/id  这里我是起得本地node服务)，然后会给你包一个File not found!
import chalk from 'chalk';  //chalk是一个颜色的插件。可以通过chalk.blue(‘hello world’)来改变颜色

const app = express();

app.all('*', (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers;
  const allowOrigin = origin || Origin || referer || Referer || '*';
	res.header("Access-Control-Allow-Origin", allowOrigin); //Access-Control-Allow-Origin是HTML5中定义的一种解决资源跨域的策略
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", 'Express'); //服务器响应头隐藏X-power-by 这个值的意义用于告知网站是用何种语言或框架编写的
	if (req.method == 'OPTIONS') {
  	res.sendStatus(200);
	} else {
    next();
	}
});

const MongoStore = connectMongo(session); 
app.use(cookieParser());
app.use(session({
  name: config.session.name,
	secret: config.session.secret,
	resave: true,
	saveUninitialized: false,
	cookie: config.session.cookie,
	store: new MongoStore({
  	url: config.url
	})
}))

router(app);


app.use(history());
app.use(express.static('./public'))     ////将静态文件目录设置为：项目根目录+/public express 会在静态资源目录下查找文件，所以不需要把静态目录public作为url的一部分
app.listen(config.port, () => {
	console.log(
		chalk.green(`成功监听端口：${config.port}`)
	)
});