'use strict';

import AddressComponent from '../../prototype/addressComponent'
import formidable from 'formidable'
import UserInfoModel from '../../models/v2/userInfo'
import UserModel from '../../models/v2/user'
import crypto from 'crypto' //crypto模块的目的是为了提供通用的加密和哈希算法。用纯JavaScript代码实现这些功能不是不可能，但速度会非常慢。Nodejs用C/C++实现这些算法后，通过cypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快。
import dtime from 'time-formater'  //时间格式化 根据上传的时间戳对应的字符串,跟当前时间做对比, 24小时内显示 

class QUser extends AddressComponent {
	constructor(){
		super()
		this.quickLogin = this.quickLogin.bind(this);
		this.encryption = this.encryption.bind(this);
	}
	async quickLogin(req, res, next){
		const cap = req.cookies.cap;
		if (!cap) {
			console.log('验证码失效')
			res.send({
				status: 0,
				type: 'ERROR_CAPTCHA',
				message: '验证码失效',
			})
			return
		}
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			const {username, password, captcha_code} = fields;
			try{
				if (!username) {
					throw new Error('用户名参数错误');
				}else if(!password){
					throw new Error('密码参数错误');
				}else if(!captcha_code){
					throw new Error('验证码参数错误');
				}
			}catch(err){
				console.log('登陆参数错误', err);
				res.send({
					status: 0,
					type: 'ERROR_QUERY',
					message: err.message,
				})
				return
			}
			if (cap.toString() !== captcha_code.toString()) {
				res.send({
					status: 0,
					type: 'ERROR_CAPTCHA',
					message: '验证码不正确',
				})
				return
			}
			const newpassword = this.encryption(password); //加密
			try{
				const user = await UserModel.findOne({username});
				//创建一个新的用户
				if (!user) {
					const user_id = await this.getId('user_id');
					const cityInfo = await this.guessPosition(req);
					const registe_time = dtime().format('YYYY-MM-DD HH:mm');
					const newUser = {username, password: newpassword, user_id};
					const newUserInfo = {username, user_id, id: user_id, city: cityInfo.city, registe_time, };
					UserModel.create(newUser);
					const createUser = new UserInfoModel(newUserInfo);
					const userinfo = await createUser.save();
					req.session.user_id = user_id;
					res.send(userinfo);
				}else if (user.password.toString() !== newpassword.toString()) {
					console.log('用户登录密码错误')
					res.send({
						status: 0,
						type: 'ERROR_PASSWORD',
						message: '密码错误',
					})
					return 
				}else{
					req.session.user_id = user.user_id;
					const userinfo = await UserInfoModel.findOne({user_id: user.user_id}, '-_id');
					res.send(userinfo) 
				}
			}catch(err){
				console.log('用户登陆失败', err);
				res.send({
					status: 0,
					type: 'SAVE_USER_FAILED',
					message: '登陆失败',
				})
			}
		})
	}
	encryption(password){
		const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
		return newpassword
	}
	Md5(password){
		const md5 = crypto.createHash('md5');
		return md5.update(password).digest('base64');
	}
	
} 

export default new QUser()