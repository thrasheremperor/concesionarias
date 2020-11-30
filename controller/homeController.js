const fs=require('fs');
const dataBase=JSON.parse(fs.readFileSync('./data/concesionarias.json','utf-8'));

module.exports={
    home:(req,res)=>{
        res.write("**********************************************\n\n");
        res.write("BIENVENIDOS A NUESTRO SITIO DE CONCESIONARIAS!\n\n");
        res.write("***********************************************\n\n");
        res.write("\tNuestras sucursales\n");
        res.write("\t--------------------\n\n");
        dataBase.forEach((concesionaria)=>{
            res.write("\t* " + concesionaria.sucursal + "\n\n")
        });
        let totalCount = dataBase.reduce((prev,curr) => {
            return prev + curr.autos.length;
        },0)
        res.write('-------------------------------------------------------\n');
        res.write(`Tenemos un total de ${totalCount} autos en nuestras sucursales!\n`);
        res.write('-------------------------------------------------------');
        res.end();
    }
}


