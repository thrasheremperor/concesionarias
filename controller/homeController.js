const fs=require('fs');
const dataBase=JSON.parse(fs.readFileSync('./data/concesionarias.json','utf-8'));

module.exports={
    home:(req,res)=>{
        let message='**********************************************<br/><br/>';
        message+='BIENVENIDOS A NUESTRO SITIO DE CONCESIONARIAS!<br/><br/>';
        message+='***********************************************<br/><br/>';
        message+='\tNuestras sucursales<br/>';
        message+='\t_____________________<br/><br/>';
        dataBase.forEach((concesionaria)=>{
            message+=(`\t* ${concesionaria.sucursal.toUpperCase()} <br/><br/>`)
        });
        let totalCount = dataBase.reduce((prev,curr) => {
            return prev + curr.autos.length;
        },0);
        message+='-------------------------------------------------------<br/>';
        message+=`Tenemos un total de ${totalCount} autos en nuestras sucursales!<br/>`;
        message+='-------------------------------------------------------';
        res.send(message);
    }
}


