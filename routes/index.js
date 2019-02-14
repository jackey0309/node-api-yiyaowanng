'use strict';

import v1 from './v1'

export default app => {
	// app.get('/', (req, res, next) => {
	// 	res.redirect('/');
	// });
	app.use('/v1', v1);
}