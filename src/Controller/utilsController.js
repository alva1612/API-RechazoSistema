import { connection } from "../db/conexion.js";

async function buscarEmpleador(idEmpleador) {

    const table = 'tb_empleador';
    try {
        const [empleador, fields] = await connection.promise().query(`SELECT * FROM ${table} WHERE id = ${idEmpleador}`);
        return empleador[0];
    } catch (error) {
        console.warn('Error al buscar empleador:');
        console.error(error);
    }
}

async function buscarEmpleo(idEmpleo) {
    const table = 'tb_empleo';
    const consulta = `SELECT * FROM ${table} WHERE id = ?`;
    try {
        const [empleo, fields] = await connection.promise().query(consulta, [idEmpleo]);
        return empleo[0];
    } catch (error) {
        console.warn('Error al buscar empleo:');
        console.error(error);
    }
}

export { buscarEmpleador, buscarEmpleo };