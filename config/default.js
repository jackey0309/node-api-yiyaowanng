'use strict';

module.exports = {      //默认配置
	port: parseInt(process.env.PORT, 10) || 8091,
	url: 'mongodb://localhost:27017/yyw',
	session: {
		name: 'SID',
		secret: 'SID',
		cookie: {
			httpOnly: true,
	    secure:   false,
	    maxAge:   365 * 24 * 60 * 60 * 1000,
		}
	}
}