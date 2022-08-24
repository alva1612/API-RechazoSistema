import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'sistema_empleo',
    password: 'root'
});





export {connection};
