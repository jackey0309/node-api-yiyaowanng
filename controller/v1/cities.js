'use strict';

import Cities from '../../models/v1/cities'

class CityHandle {  //ES6新特性5：类(Class)和继承(Extends)
	constructor(){
		this.getCity = this.getCity.bind(this);
	}
	async getCity(req, res, next){
		const type = req.query.type;
		let cityInfo;
		try{  //首先要清楚，如果没有try的话，出现异常会导致程序崩溃。而try则可以保证程序的正常运行下去
			switch (type){
				case 'guess': 
					const city = await this.getCityName(req); //async用于声明一个函数是异步的。而await从字面意思上是“等待”的意思，就是用于等待异步完成。并且await只能在async函数中使用
					cityInfo = await Cities.cityGuess(city);
					break;
				case 'hot': 
					cityInfo = await Cities.cityHot();
					break;
				case 'group': 
					cityInfo = await Cities.cityGroup();
					break;
				default: 
					res.json({
						name: 'ERROR_QUERY_TYPE',
						message: '参数错误',
					})
					return
			}
			res.send(cityInfo);
		}catch(err){  //catch异常处理
			res.send({
				name: 'ERROR_DATA',
				message: '获取数据失败',
			});
		}
	}
}
export default new CityHandle()