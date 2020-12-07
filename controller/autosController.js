const fs = require("fs");
const dataBase = JSON.parse(fs.readFileSync("./data/concesionarias.json", "utf-8"));

module.exports = {
    home: function (req, res) {
        let message='*************************************<br/><br/>';
        message+='  \tNUESTROS VEHICULOS<br/><br/>';
        message+='*************************************<br/><br/>';
        let totalCount = dataBase.reduce((prev, curr) => {
            return prev + curr.autos.length;
        }, 0);
        message+=`TOTAL DE VEHICULOS: ${totalCount}`;
        message+='<br/>____________________________<br/><br/>';
        dataBase.forEach((concesionarias) => {
            concesionarias.autos.forEach((auto) => {
                message+=`MARCA: ${auto.marca} <br/>`;
                message+=`MODELO: ${auto.modelo} <br/>`;
                message+=`YEAR: ${auto.anio} <br/>`;
                message+=`COLOR: ${auto.color} <br/>`;
                message+='---------------------------<br/><br/>';
            })
        });
        res.send(message);
    },
    detail: (req, res) => {
        let id = req.params.marca;
        let autos = [];
        let cantAutos = 0;
        dataBase.forEach((concesionaria) => {
            concesionaria.autos.forEach(auto => {
                autos.push(auto)
            })
        });
        let message='*************************************<br/><br/>';
        message+=`\tMODELOS DE ${id.toUpperCase()}<br/><br/>`;
        message+='*************************************<br/><br/>';
        autos.forEach(auto => {
            if (auto.marca == id) {
                message+=`MODELO: ${auto.modelo} <br/>`;
                message+=`YEAR: " ${auto.anio} <br/>`;
                message+=`COLOR: " ${auto.color} <br/>`;
                message+=`_____________________<br/><br/>`;
                cantAutos++;
            };
        });
        if (cantAutos > 0) {
            message+='<br/>---------------------------<br/>';
            message+=`TOTAL: ${cantAutos}`;
            message+='<br/>---------------------------<br/>';
        } else {
            message+=`Perdon, no se encontro la marca ${req.params.marca}`;
        }
        res.send(message);
    },
    dato: function (req, res) {
        let autos = [];
        dataBase.forEach(function (sucursal) {
            sucursal.autos.forEach(function (auto) {
                autos.push(auto);
            });
        });
        let cantAutos = 0;
        let message='*************************************<br/><br/>';
        message+='  \tVEHICULOS FILTRADOS<br/><br/>';
        message+='*************************************<br/><br/>';
        dataBase.forEach(function (sucursal) {
            sucursal.autos.forEach(function (auto) {
                if ((auto.color == req.params.dato || auto.anio == req.params.dato) && auto.marca == req.params.marca) {
                    message+=`MARCA: ${auto.marca} <br/>`;
                    message+=`MODELO: ${auto.modelo} <br/>`;
                    message+=`YEAR: ${auto.anio} <br/>`;
                    message+=`COLOR: ${auto.color} <br/>`;
                    message+=`SUCURSAL: ${sucursal.sucursal} <br/>`;
                    message+='---------------------------<br/><br/>';
                    cantAutos++;
                }
            });
        });
        if (cantAutos > 0) {
            message+='<br/>---------------------------<br/>';
            message+=`TOTAL: ${cantAutos}`;
            message+='<br/>---------------------------<br/>';
        } else {
            message+=`Perdon, no se encontro el ${req.params.marca} ${req.params.dato}`;
        };
        res.send(message);
    }
}