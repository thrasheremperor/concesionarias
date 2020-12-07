const fs = require('fs');
const dataBase = JSON.parse(fs.readFileSync('./data/concesionarias.json', 'utf-8'));

module.exports = {
    home: function (req, res) {
        let message="*************************************<br/><br/>";
        message+="  \tNUESTRAS MARCAS<br/><br/>";
        message+="*************************************<br/><br/>";
        let marcasArr = []
        dataBase.forEach((concesionaria) => {
            concesionaria.autos.forEach(concesionaria => {
                marcasArr.push(concesionaria.marca)
            })
        })
        marcasFiltradas = marcasArr.filter((a, b) => marcasArr.indexOf(a) === b);
        message+=`Marcas disponibles: ${marcasFiltradas.length} <br/>`;
        message+="_____________________";
        marcasFiltradas.forEach(marcas => {
            message+=`<br/><br/>${marcas.toUpperCase()}`
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
        let message=`********************************************************<br/><br/>`;
        message+=`\t\t${id.toUpperCase()} MODELOS DISPONIBLES<br/><br/>`;
        message+=`********************************************************<br/><br/>`;
        marcas.forEach(auto => {
            if (auto.marca == id) {
                message+=`MODELO: ${auto.modelo} <br/>`;
                message+=`YEAR: ${auto.anio} <br/>`;
                message+=`COLOR: ${auto.color} <br/>`;
                message+=`------------------------------------------------------<br/>`;
                cantAutos++;
            }
        });
        if (cantAutos > 0) {
            message+='<br/>---------------------<br/>';
            message+=`TOTAL DE VEHICULOS: ${cantAutos}`;
            message+='<br/>----------------------<br/>';
        } else {
            message+=`Perdon, no se encontro la marca ${req.params.marca}`;
        };
        res.send(message);
    }
}