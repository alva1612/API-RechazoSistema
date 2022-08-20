import { connection } from "../db/conexion.js";

const empleosController = {};

const table = 'tb_empleo';

empleosController.listar = async (req, res) => {
    const listar_empleos = `SELECT * FROM ${table}`;
    const [resultado, fields] = await connection.promise().query(listar_empleos);
    res.send(resultado[0]);
}

empleosController.agregar = async (req, res) => {
    const {titulo, descripcion, empleador} = req.body;
    const agregarEmpleo = `INSERT INTO ${table} (titulo, descripcion, empleador) VALUES (?, ?, ?)`;
    try {
        await connection.promise().query(agregarEmpleo, [titulo,descripcion,empleador]);    
    } catch (error) {
        console.error(error);
        res.send('oops')
    } finally {
        res.send('ok');
    }
}


export {empleosController};