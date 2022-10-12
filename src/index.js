import express from "express"
import { routes } from "./routes/router.js"
const app = express()
const host = "0.0.0.0"
const port = 3002

const options = {
    host,
    port
}

app.use(routes)



app.listen(options, () => {
    console.log(`Aplicación en el puerto ${port}`)
})

