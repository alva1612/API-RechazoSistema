import { Router } from "express";
import pkg from "body-parser";

import { mainController } from "../Controller/mainController.js";
import { empleosController } from "../Controller/empleoController.js";
import { empleadorController } from "../Controller/empleadorController.js";
/* import { buscarEmpleador } from "../controller/utilsController.js"; */
import { postulacionController } from "../Controller/postulacionController.js";

const routes = Router();
const { urlencoded } = pkg;
const urlEncoder = urlencoded({extended: true}); 


routes.get("/", mainController.index)

//METODOS RELACIONADOS AL EMPLEADOR
routes.get("/empleadores",empleadorController.listar);
/* routes.get("/buscar-empleador", (req, res) => buscarEmpleador(req.query.id)); */
routes.post("/new-empleador", urlEncoder, empleadorController.agregar);

//METODOS RELACIONADOS AL EMPLEO
routes.get("/empleos", empleosController.listar);
routes.post("/new-empleo", urlEncoder, empleosController.agregar);

//METODOS RELACIONADOS A LA POSTULACION
routes.get("/postulaciones", postulacionController.listar );
routes.post('/postular', urlEncoder, postulacionController.postular);

export {routes};