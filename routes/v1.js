'use strict';

import express from 'express'
import CityHandle from '../controller/v1/cities'
import BaseComponent from '../prototype/baseComponent'
import SearchPlace from '../controller/v1/search'
import Captchas from '../controller/v1/captchas'

const baseHandle = new BaseComponent();
const router = express.Router();

router.get('/cities', CityHandle.getCity);
router.get('/cities/:id', CityHandle.getCityById);
router.get('/exactaddress', CityHandle.getExactAddress);
router.get('/pois', SearchPlace.search);
router.post('/captchas', Captchas.getCaptchas);

export default router