const fs = require('fs');
const dataBase = JSON.parse(fs.readFileSync('./data/concesionarias.json', 'utf-8'));

module.exports = {
    home: function (req, res) {
        let message="*************************************\n\n";
        message+="  \tNUESTRAS MARCAS\n\n";
        message+="*************************************\n\n";
        let marcasArr = []
        dataBase.forEach((concesionaria) => {
            concesionaria.autos.forEach(concesionaria => {
                marcasArr.push(concesionaria.marca)
            })
        })
        marcasFiltradas = marcasArr.filter((a, b) => marcasArr.indexOf(a) === b);
        message+=`Marcas disponibles: ${marcasFiltradas.length} \n`;
        message+="_____________________";
        marcasFiltradas.forEach(marcas => {
            message+=`\n\n Marca: ${marcas}`
        })
        res.send(message);
    },
    porMarca: (req, res) => {
        let id = req.params.marca;
        let marcas = [];
        let cantAutos = 0;
        dataBase.forEach((concesionaria) => {
            concesionaria.autos.forEach(auto => {
                marcas.push(auto)
            })
        })
        let message=`\n********************************************************\n\n`;
        message+=`\t\t${id.toUpperCase()} MODELOS DISPONIBLES\n\n`;
        message+=`\n********************************************************\n\n`;
        marcas.forEach(auto => {
            if (auto.marca == id) {
                message+=`MODELO: ${auto.modelo} \n`;
                message+=`YEAR: ${auto.anio} \n`;
                message+=`COLOR: ${auto.color} \n`;
                message+=`------------------------------------------------------\n`;
                cantAutos++;
            }
        });
        if (cantAutos > 0) {
            message+='\n---------------------\n';
            message+=`TOTAL DE VEHICULOS: ${cantAutos}`;
            message+='\n----------------------\n';
        } else {
            message+=`Perdon, no se encontro la marca ${req.params.marca}`;
        };
        res.send(message);
    }
}