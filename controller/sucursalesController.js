const fs = require('fs');
const dataBase = JSON.parse(fs.readFileSync('./data/concesionarias.json', 'utf-8'));

module.exports = {
    sucursal: function (req, res) {
        let cantSu = 0;
        let message = '*************************************\n\n';
        message += '  \tNUESTRAS SUCURSALES\n\n';
        message += '*************************************\n\n';
        dataBase.forEach(function (sucursal) {
            message += `\t ${sucursal.sucursal} \n`;
            message += '\t-----------------------------------------------------------------------------------------\n';
            message += `\tDIRECCION: ${sucursal.direccion} \n`;
            message += `\tTELEFONO: ${sucursal.telefono} \n`;
            message += '\t-----------------------------------------------------------------------------------------\n\n';
            cantSu++;
        });
        message += '\n---------------------------\n';
        message += `Total de sucursales: ${cantSu}`;
        message += '\n---------------------------\n';
        res.send(message);
    },
    detail: function (req, res) {
        res.write('****************************\n\n');
        res.write('  \tSUCURSAL\n\n');
        res.write('****************************\n\n');
        dataBase.forEach(function (sucursal) {
            if (sucursal.sucursal == req.params.sucursal) {
                res.write(`\t ${sucursal.sucursal} \n`);
                res.write('\t-----------------------------------------------------------------------------------------\n');
                res.write(`\tDIRECCION: ${sucursal.direccion} \n`);
                res.write(`\tTELEFONO: ${sucursal.telefono} \n`);
                res.write('\t-----------------------------------------------------------------------------------------\n\n\n');
                res.write('****************************\n\n');
                res.write('  \tVEHICULOS\n\n');
                res.write('****************************\n\n');
                sucursal.autos.forEach(function (auto) {
                    res.write(`MARCA: ${auto.marca} \n`);
                    res.write(`MODELO: ${auto.modelo} \n`);
                    res.write(`YEAR: ${auto.anio} \n`);
                    res.write('_________________________\n\n');
                });
                res.write('\n---------------------------\n');
                res.write(`TOTAL: ${sucursal.autos.length}`);
                res.write('\n---------------------------\n');
            } 
        });
        //`Lo siento, por el momento no disponemos de sucursales en ${req.params.sucursal}`
        res.end();
    }
}