const fs = require('fs');
const dataBase = JSON.parse(fs.readFileSync('./data/concesionarias.json', 'utf-8'));

module.exports = {
    home: function (req, res) {
        res.write("\n********************************************************\n\t\tNUESTRAS MARCAS\n********************************************************\n\n");
        let marcasArr = []
        dataBase.forEach((concesionaria) => {
            concesionaria.autos.forEach(concesionaria => {
                marcasArr.push(concesionaria.marca)
            })
        })
        marcasFiltradas = marcasArr.filter((a, b) => marcasArr.indexOf(a) === b);
        res.write(`Marcas disponibles: ${marcasFiltradas.length} \n`);
        res.write("----------------------");
        marcasFiltradas.forEach(marcas => {
            res.write("\n\n Marca: " + marcas)
        })
        res.end()
    },
    porMarca: (req, res) => {
        let id = req.params.marca;
        let marcas = [];
        let cantAutos=0;
        dataBase.forEach((concesionaria) => {
            concesionaria.autos.forEach(auto => {
                marcas.push(auto)
            })
        })
        res.write(`\n********************************************************\n\t\t${id} MODELOS DISPONIBLES\n********************************************************\n\n`);
        marcas.forEach(make => {
            if (make.marca == id) {
                res.write(`MODELO: ${make.modelo} \n`);
                res.write(`YEAR: ${make.anio} \n`);
                res.write(`COLOR: ${make.color} \n`);
                res.write("------------------------------------------------------" + "\n");
                cantAutos++;
            }
        });
        if (cantAutos > 0) {
            res.write('\n---------------------------\n');
            res.write(`TOTAL: ${cantAutos}`);
            res.write('\n---------------------------\n');
        } else {
            res.write(`Perdon, no se encontro la marca ${req.params.marca}`);
        };
        res.end()
    }
}