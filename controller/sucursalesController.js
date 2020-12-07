const fs = require('fs');
const dataBase = JSON.parse(fs.readFileSync('./data/concesionarias.json', 'utf-8'));

module.exports = {
    sucursal: function (req, res) {
        let cantSu = 0;
        let message = '*************************************<br/><br/>';
        message += '  \tNUESTRAS SUCURSALES<br/><br/>';
        message += '*************************************<br/><br/>';
        dataBase.forEach(function (sucursal) {
            message += `\t ${sucursal.sucursal} <br/>`;
            message += '\t-----------------------------------------------------------------------------------------<br/>';
            message += `\tDIRECCION: ${sucursal.direccion} <br/>`;
            message += `\tTELEFONO: ${sucursal.telefono} <br/>`;
            message += '\t-----------------------------------------------------------------------------------------<br/><br/>';
            cantSu++;
        });
        message += '<br/>---------------------------<br/>';
        message += `Total de sucursales: ${cantSu}`;
        message += '<br/>---------------------------<br/>';
        res.send(message);
    },
    detail: function (req, res) {
        let message = '****************************<br/><br/>';
        message += '  \tSUCURSAL<br/><br/>';
        message += '****************************<br/><br/>';
        let can = 0;
        dataBase.forEach(function (sucursal) {
            if (sucursal.sucursal.toLowerCase() == req.params.sucursal) {
                message += `\t ${sucursal.sucursal.toUpperCase()} <br/>`;
                message += '\t-----------------------------------------------------------------------------------------<br/>';
                message += `\tDIRECCION: ${sucursal.direccion} <br/>`;
                message += `\tTELEFONO: ${sucursal.telefono} <br/>`;
                message += '\t-----------------------------------------------------------------------------------------<br/><br/><br/>';
                message += '****************************<br/><br/>';
                message += '  \tVEHICULOS<br/><br/>';
                message += '****************************<br/><br/>';
                sucursal.autos.forEach(function (auto) {
                    message += `MARCA: ${auto.marca} <br/>`;
                    message += `MODELO: ${auto.modelo} <br/>`;
                    message += `YEAR: ${auto.anio} <br/>`;
                    message += '_________________________<br/><br/>';
                    can++;
                });
                message += '<br/>---------------------------<br/>';
                message += `TOTAL: ${sucursal.autos.length}`;
                message += '<br/>---------------------------<br/>';
            }
        });
        if (can > 0) {
            message += ' '
        } else {
            message += `Lo siento, por el momento no disponemos de sucursales en ${req.params.sucursal}`
        }
        res.send(message);
    }
}