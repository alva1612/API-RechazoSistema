import { Router } from "express";
import pkg from "body-parser";

import { mainController } from "../controller/mainController.js";
import { empleosController } from "../controller/empleoController.js";
import { empleadorController } from "../controller/empleadorController.js";


const routes = Router();
const { urlencoded } = pkg;
const urlEncoder = urlencoded({extended: true}); 


routes.get("/", mainController.index)

routes.get("/listar-empleador",empleadorController.listar);
routes.post("/agregar-empleador",urlEncoder, empleadorController.agregar);

routes.get("/listar-empleo", empleosController.listar);
routes.post("/agregar-empleo", urlEncoder, empleosController.agregar);

export {routes};