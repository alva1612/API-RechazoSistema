import { connection } from "../db/conexion.js";

const mainController = {};

mainController.index = (req, res) => {
    const info = {
        titulo: 'Api de chambas',
        version: '0.0.1'
    }
    res.send(info);
};

export {mainController};