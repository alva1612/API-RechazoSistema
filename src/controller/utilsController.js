import { connection } from "../db/conexion.js";

async function buscarEmpleador(idEmpleador) {

    const table = 'tb_empleador';
    try {
        const [empleador, fields] = await connection.promise().query(`SELECT * FROM ${table} WHERE id = ${idEmpleador}`);
/*         console.log(empleador[0])
 */        return empleador[0];
    } catch (error) {
        console.error(error);
    }
}

export { buscarEmpleador };