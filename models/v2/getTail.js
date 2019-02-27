'use strict';

import mongoose from 'mongoose'
import tailData from '../../InitData/getTailData'

const Schema = mongoose.Schema;

const tailSchema = new Schema({
	data: {
		goodTopic: [
		{
		crtTime: Date,
		delFlag: Number,
		goodProducts: [
		{
		crtTime: Date,
		gpId: Number,
		id: Number,
		itemid: String,
		productImg: String,
		productName: String,
		productNo: String,
		promotionWord: String,
		sellPrice: Number,
		updTime: String
		},
		],
		href: String,
		id: Number,
		picUrl: String,
		remark: String,
		sort: Number,
		state: Number,
		title: String,
		updTime: String
		},
		],
		bottombar: {
		imgUrl: String,
		title: String,
		cmsUrl: String
		},
		bigMatch: [
		{
		endtime: Date,
		href: String,
		id: Number,
		name: String,
		picurl: String,
		starttime: Date,
		status: Number,
		submittime: Date
		}
		],
		grabTogether: {
		bottomCmsImgUrl: String,
		bottomCmsUrl: String,
		brandActiveIntroduction: String,
		brandActiveName: String,
		brandActiveUrl: String,
		brandProducts: String,
		createTime: String,
		currentDate:String,
		endDate: String,
		endDateMils: String,
		h5Url: String,
		h5UrlShowText: String,
		id: Number,
		mobileFlashSaleNewItems: [
		{
		curIncrementNum: String,
		curNoticeNum: String,
		flashSaleId: String,
		flashSaleProductName: String,
		id: Number,
		isPrescribed: String,
		itemId: Number,
		mainimg3: String,
		markingBackground: String,
		markingText: String,
		no: Number,
		productCode: String,
		productStock: String,
		promotionId: String,
		promotionPrice: Number,
		promotionalCopy: String,
		saleType: String
		},
		],
		saleDate: Date,
		saleDateMils: String,
		updateTime: String
		}
		},
				rtn_code: String,
				rtn_ext: String,
				rtn_ftype: String,
				rtn_msg: String,
				rtn_tip: String
});

const Tai= mongoose.model('Tai', tailSchema)

Tai.findOne((err, data) => {
	if (!data) {
		if (!data) {
			Tai.create(tailData);
		}
	}
})

export default Tai