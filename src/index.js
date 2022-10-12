import express from "express"
import * as dotenv from 'dotenv'
import { routes } from "./routes/router.js"

dotenv.config()

const app = express()
const host = process.env.HOST
const port = process.env.PORT

const options = {
    host,
    port
}

app.use(routes)



app.listen(options, () => {
    console.log(`Aplicación en el puerto ${port}`)
})

