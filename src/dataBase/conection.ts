import mongoose from "mongoose";

export const dbConection = async () =>{
    try {
        const dbUrl = process.env.DBCONECTION;

        if(!dbUrl){
            throw new Error ("Error en la conexion a la base de datos,no existe")
        }
        await mongoose.connect(dbUrl)
        console.log("Db Online");
        
    } catch (error) {
        console.log(Error);
        console.log("Error en la conexion a la base de datos");
    }
}