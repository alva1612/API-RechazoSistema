import { Router } from "express";
import pkg from "body-parser";

import { mainController } from "../Controller/mainController.js";
import { empleosController } from "../Controller/empleoController.js";
import { empleadorController } from "../Controller/empleadorController.js";
import { buscarEmpleador } from "../Controller/utilsController.js";
import { postulacionController } from "../Controller/postulacionController.js";

const routes = Router();
const { urlencoded } = pkg;
const urlEncoder = urlencoded({extended: true}); 


routes.get("/", mainController.index)

//METODOS RELACIONADOS AL EMPLEADOR
routes.get("/empleador",empleadorController.listar);

routes.get("/buscar-empleador", (req, res) => buscarEmpleador(req.query.id));
routes.post("/empleador", urlEncoder, empleadorController.agregar);

//METODOS RELACIONADOS AL EMPLEO
routes.get("/empleo", empleosController.listar);
routes.post("/empleo", urlEncoder, empleosController.agregar);

//METODOS RELACIONADOS A LA POSTULACION
routes.get("/postulaciones", postulacionController.listar );
routes.post('/postular', urlEncoder, postulacionController.postular);

export {routes};