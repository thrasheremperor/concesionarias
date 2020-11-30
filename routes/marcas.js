const express=require('express');
const router=express.Router();
const marcasControl=require('../controller/marcasController');

router.get('/marcas',marcasControl.home);
router.get('/marcas/:marca',marcasControl.porMarca);

module.exports=router;