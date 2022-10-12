import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: 'containers-us-west-100.railway.app:7701',
    user: 'root',
    database: 'railway',
    password: '5lvCuG4HnfofmcYra9g7'
});





export {connection};
