const fs = require("fs");
const dataBase = JSON.parse(fs.readFileSync("./data/concesionarias.json", "utf-8"));

module.exports = {
    home: function (req, res) {
        res.write("*************************************\n")
        res.write("  \tNUESTROS VEHICULOS\n")
        res.write("*************************************\n\n")
        let totalCount = dataBase.reduce((prev, curr) => {
            return prev + curr.autos.length;
        }, 0);
        res.write(`TOTAL DE VEHICULOS: ${totalCount}`);
        res.write('\n____________________________\n\n');
        dataBase.forEach((concesionarias) => {
            concesionarias.autos.forEach((auto) => {

                res.write(`MARCA: ${auto.marca} \n`);
                res.write(`MODELO: ${auto.modelo} \n`);
                res.write(`YEAR: ${auto.anio} \n`);
                res.write(`COLOR: ${auto.color} \n`);
                res.write('---------------------------\n\n');
            })
        });
        res.end()
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
        res.write('_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _\n\n');
        res.write(`Estas son los modelos de la marca ${id}\n`);
        res.write('_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _\n\n');
        autos.forEach(auto => {
            if (auto.marca == id) {
                res.write(`Modelo: ${auto.modelo} \n`)
                res.write(`Year: " ${auto.anio} \n`)
                res.write(`Color: " ${auto.color} \n`)
                res.write(`----------------------\n`)
                cantAutos++;
            };
        });
        if (cantAutos > 0) {
            res.write('\n---------------------------\n');
            res.write(`TOTAL: ${cantAutos}`);
            res.write('\n---------------------------\n');
        } else {
            res.write(`Perdon, no se encontro la marca ${req.params.marca}`);
        }
        res.end();
    },
    dato: function (req, res) {
        let autos = [];
        dataBase.forEach(function (sucursal) {
            sucursal.autos.forEach(function (auto) {
                autos.push(auto);
            });
        });
        let cantAutos = 0;
        res.write("\n****************************************************\n\t   VEHICULOS FILTRADOS\n****************************************************\n\n");
        dataBase.forEach(function (sucursal) {
            sucursal.autos.forEach(function (auto) {
                if ((auto.color == req.params.dato || auto.anio == req.params.dato) && auto.marca == req.params.marca) {

                    res.write(`MARCA: ${auto.marca} \n`);
                    res.write(`MODELO: ${auto.modelo} \n`);
                    res.write(`YEAR: ${auto.anio} \n`);
                    res.write(`COLOR: ${auto.color} \n`);
                    res.write(`SUCURSAL: ${sucursal.sucursal} \n`);
                    res.write('---------------------------\n\n');
                    cantAutos++;
                }
            });
        });
        if (cantAutos > 0) {
            res.write('\n---------------------------\n');
            res.write(`TOTAL: ${cantAutos}`);
            res.write('\n---------------------------\n');
        } else {
            res.write(`Perdon, no se encontro el ${req.params.marca} ${req.params.dato}`);
        };
        res.end();
    }
}