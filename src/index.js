import express from "express";
import { routes } from "./routes/router.js";
const app = express();
const port = 3002;

app.use(routes);

app.listen(port, () => {
    console.log(`Aplicación en el puerto ${port}`)
})

