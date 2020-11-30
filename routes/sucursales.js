const express=require('express');
const router=express.Router();
const sucursalControl=require('../controller/sucursalesController');

router.get('/sucursales',sucursalControl.sucursal);
router.get('/sucursales/:sucursal',sucursalControl.detail);

module.exports=router;