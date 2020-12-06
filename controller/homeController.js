const fs=require('fs');
const dataBase=JSON.parse(fs.readFileSync('./data/concesionarias.json','utf-8'));

module.exports={
    home:(req,res)=>{
        let message='**********************************************\n\n';
        message+='BIENVENIDOS A NUESTRO SITIO DE CONCESIONARIAS!\n\n';
        message+='***********************************************\n\n';
        message+='\tNuestras sucursales\n';
        message+='\t_____________________\n\n';
        dataBase.forEach((concesionaria)=>{
            message+=(`\t* ${concesionaria.sucursal} \n\n`)
        });
        let totalCount = dataBase.reduce((prev,curr) => {
            return prev + curr.autos.length;
        },0);
        message+='-------------------------------------------------------\n';
        message+=`Tenemos un total de ${totalCount} autos en nuestras sucursales!\n`;
        message+='-------------------------------------------------------';
        res.send(message);
    }
}


