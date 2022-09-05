import { connection } from "../db/conexion.js";
import { Warning } from "../Models/Warning.js";
import { buscarEmpleador } from "./utilsController.js";

const empleosController = {};

const table = 'tb_empleo';

empleosController.listar = async (req, res) => {
    const listar_empleos = `SELECT * FROM ${table}`;
    try {
        const [resultado, fields] = await connection.promise().query(listar_empleos);
        res.send(resultado);
    } catch (error) {
        console.error(error);
    }
}

empleosController.agregar = async (req, res) => {
    const {titulo, descripcion, empleador} = req.body;

    const existsEmpleador = await buscarEmpleador(empleador);
    if(!existsEmpleador) {
        const warning = new Warning('err_001', 'Empleador not found');
        res.send(warning);    
        return;
    }

    const agregarEmpleo = `INSERT INTO ${table} (titulo, descripcion, empleador) VALUES (?, ?, ?)`;
    try {
        await connection.promise().query(agregarEmpleo, [titulo,descripcion,empleador]);
        res.send('ok');
    } catch (error) {
        console.error(error);
        res.send('oops')
    }
}


export {empleosController};