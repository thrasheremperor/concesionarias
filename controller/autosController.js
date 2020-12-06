const fs = require("fs");
const dataBase = JSON.parse(fs.readFileSync("./data/concesionarias.json", "utf-8"));

module.exports = {
    home: function (req, res) {
        let message='*************************************\n\n';
        message+='  \tNUESTROS VEHICULOS\n\n';
        message+='*************************************\n\n';
        let totalCount = dataBase.reduce((prev, curr) => {
            return prev + curr.autos.length;
        }, 0);
        message+=`TOTAL DE VEHICULOS: ${totalCount}`;
        message+='\n____________________________\n\n';
        dataBase.forEach((concesionarias) => {
            concesionarias.autos.forEach((auto) => {
                message+=`MARCA: ${auto.marca} \n`;
                message+=`MODELO: ${auto.modelo} \n`;
                message+=`YEAR: ${auto.anio} \n`;
                message+=`COLOR: ${auto.color} \n`;
                message+='---------------------------\n\n';
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
        let message='*************************************\n\n';
        message+=`\tMODELOS DE ${id.toUpperCase()}\n\n`;
        message+='*************************************\n\n';
        autos.forEach(auto => {
            if (auto.marca == id) {
                message+=`MODELO: ${auto.modelo} \n`;
                message+=`YEAR: " ${auto.anio} \n`;
                message+=`COLOR: " ${auto.color} \n`;
                message+=`_____________________\n\n`;
                cantAutos++;
            };
        });
        if (cantAutos > 0) {
            message+='\n---------------------------\n';
            message+=`TOTAL: ${cantAutos}`;
            message+='\n---------------------------\n';
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
        let message='*************************************\n\n';
        message+='  \tVEHICULOS FILTRADOS\n\n';
        message+='*************************************\n\n';
        dataBase.forEach(function (sucursal) {
            sucursal.autos.forEach(function (auto) {
                if ((auto.color == req.params.dato || auto.anio == req.params.dato) && auto.marca == req.params.marca) {
                    message+=`MARCA: ${auto.marca} \n`;
                    message+=`MODELO: ${auto.modelo} \n`;
                    message+=`YEAR: ${auto.anio} \n`;
                    message+=`COLOR: ${auto.color} \n`;
                    message+=`SUCURSAL: ${sucursal.sucursal} \n`;
                    message+='---------------------------\n\n';
                    cantAutos++;
                }
            });
        });
        if (cantAutos > 0) {
            message+='\n---------------------------\n';
            message+=`TOTAL: ${cantAutos}`;
            message+='\n---------------------------\n';
        } else {
            message+=`Perdon, no se encontro el ${req.params.marca} ${req.params.dato}`;
        };
        res.send(message);
    }
}