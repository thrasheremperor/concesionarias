const fs = require('fs');
const dataBase = JSON.parse(fs.readFileSync('./data/concesionarias.json', 'utf-8'));

module.exports = {
    sucursal: function (req, res) {
        let cantSu = 0;
        res.write('*************************************\n');
        res.write('  \tNUESTRAS SUCURSALES\n');
        res.write('*************************************\n\n');
        dataBase.forEach(function (sucursal) {
            res.write(`\t ${sucursal.sucursal} \n`);
            res.write('\t-----------------------------------------------------------------------------------------\n');
            res.write(`\tDireccion: ${sucursal.direccion} \n`);
            res.write(`\tTelefono: ${sucursal.telefono} \n`);
            res.write('\t-----------------------------------------------------------------------------------------\n\n');
            cantSu++;
        });
        res.write('\n---------------------------\n');
        res.write(`Total de sucursales: ${cantSu}`);
        res.write('\n---------------------------\n');
        res.end();
    },
    detail: function (req, res) {
        res.write('****************************\n');
        res.write('  \tSUCURSAL\n');
        res.write('****************************\n\n');
        dataBase.forEach(function (sucursal) {
            if (sucursal.sucursal == req.params.sucursal) {
                res.write(`\t ${sucursal.sucursal} \n`);
                res.write('\t-----------------------------------------------------------------------------------------\n');
                res.write(`\tDireccion: ${sucursal.direccion} \n`);
                res.write(`\tTelefono: ${sucursal.telefono} \n`);
                res.write('\t-----------------------------------------------------------------------------------------\n\n');
                res.write('****************************\n');
                res.write('  \tVEHICULOS\n');
                res.write('****************************\n\n');
                sucursal.autos.forEach(function (auto) {
                    res.write(`MARCA: ${auto.marca} \n`);
                    res.write(`MODELO: ${auto.modelo} \n`);
                    res.write(`YEAR: ${auto.anio} \n`);
                    res.write('---------------------------\n\n');
                });
                res.write('\n---------------------------\n');
                res.write(`TOTAL: ${sucursal.autos.length}`);
                res.write('\n---------------------------\n');
                res.end();
            }
        });
        res.end(`Lo siento, por el momento no disponemos de sucursales en ${req.params.sucursal}`);
    }
}