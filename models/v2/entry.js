'use strict';

import mongoose from 'mongoose'
import entryData from '../../InitData/entry'

const Schema = mongoose.Schema;

const entrySchema = new Schema({
	data: {
	templatedata: [
		{
		adate:Date,
		bgimage: String,
		contentList: [
		{
		adPic: String,
		adTitle: String,
		cmsUrl: String,
		contentPosition: Number,
		fontColor: String,
		id: Number,
		pitCode:String,
		subTitle: String,
		templateId:Number,
		triggerType: String
		}
		],
		endTime: Date,
		position: Number,
		startTime: Date,
		status: Number,
		templateId: Number,
		templateName: String,
		templateType: Number,
		weight: Number
		}
		],
		notice: [
			{
			content: String,
			moreType: String,
			noticeType: String,
			picture: String,
			title: String,
			triggerType: Number
			},
			],
			banner: [
			{
			adType: Number,
			areaId: Number,
			buttonId: String,
			content: String,
			endTime: Number,
			id: Number,
			interval:Number,
			linkTitle: String,
			ongoingPicture:String,
			pic: String,
			platId: Number,
			spaceCode: String,
			startTime:Number,
			title: String,
			triggerType: Number,
			xpic: String
			},
			]
		},
		rtn_code: String,
		rtn_ext: String,
		rtn_ftype: String,
		rtn_msg: String,
		rtn_tip: String
});

const Entry = mongoose.model('Entry', entrySchema)

Entry.findOne((err, data) => {
	if (!data) {
		for (let i = 0; i < entryData.length; i++) {
			Entry.create(entryData[i]);
		}
	}
})

export default Entry