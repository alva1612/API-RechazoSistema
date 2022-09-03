import { connection } from "../db/conexion.js";

const empleadorController = {};

const table = 'tb_empleador';

empleadorController.listar = async (req, res) => {
    const listar_empleador = `SELECT * FROM ${table}`;
    try {
        const [resultado, fields] = await connection.promise().query(listar_empleador);
        res.send(resultado[0]);
    } catch (error) {
        console.error(error);
    }
}

empleadorController.agregar = async (req, res) => {
    const nombre = req.body.nombre;
    const agregar_empleador = `INSERT INTO ${table} (nombre, n_empleo_solicitado) VALUES (?,0)`;

    try {
        await connection.promise().query(agregar_empleador, [nombre]);
        res.send('ok');
    } catch (error) {
        console.error(error);
    }
}

export {empleadorController};