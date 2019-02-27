'use strict';

import TailModel from '../../models/v2/getTail'

class Tail {
	constructor(){

	}
	async getTail(req, res, next){
		try{
			const tails = await TailModel.find({}, '-_id');
			res.send(tails);
		}catch(err){
			console.log('获取数据失败');
			res.send({
				status: 0,
				type: 'ERROR_DATA',
				message: '获取数据失败'
			})
			return
		}
	}
}

export default new Tail()