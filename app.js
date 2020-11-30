const express=require('express');
const app=express();
const homeRoute=require('./routes/home');
const sucursalRoute=require('./routes/sucursales');
const autoRoute=require('./routes/autos');
const marcasRoute=require('./routes/marcas');

app.listen(3000,()=>console.log('Server running in port 3000'));

app.use(homeRoute);
app.use(sucursalRoute);
app.use(autoRoute);
app.use(marcasRoute);

