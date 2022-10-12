import mysql from 'mysql2'

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: 'root',
    database: 'railway',
    password: process.env.DB_PASSWORD
});

connection.on('connection', () => {
    console.log('Conexión establecida')
})



export {connection};
