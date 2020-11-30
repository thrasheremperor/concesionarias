const express=require('express');
const router=express.Router();
const autoControl=require('../controller/autosController');

router.get('/autos',autoControl.home);
router.get('/autos/:marca',autoControl.detail);
router.get('/autos/:marca/:dato',autoControl.dato);

module.exports=router;

