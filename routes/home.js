const express=require('express');
const router=express.Router();
const homeControl=require('../controller/homeController');

router.get('/',homeControl.home);

module.exports=router;