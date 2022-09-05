import { connection } from "../db/conexion.js";
import { buscarEmpleo } from "./utilsController.js";
import { Warning } from "../Models/Warning.js";

const postulacionController = {};

const table = 'tb_postulacion';

postulacionController.listar = async (req, res) => {
    const listarPostulaciones = `SELECT * FROM ${table}`;
    try {
        const [resultado, fields] = await connection.promise().query(listarPostulaciones);
        res.send(resultado);
    } catch (error) {
        console.log(error);
    }
}

postulacionController.postular = async (req, res) => {
    const { empleo } = req.body;

    //Realizar el registro al puesto
    await connection.promise().beginTransaction();
    try {
        //Verificar si existe el empleo al que se postula
        const existsEmpleo = await buscarEmpleo(empleo);
        if (!existsEmpleo) {
            const warn = new Warning('err_002','Empleo not found');
            connection.rollback();
            res.send(warn);
            return;
        }
        
        //Verificar si ya se ha postulado anteriormente
        const already = existsEmpleo.postulado;
        if (already) {
            const warn = new Warning('err_003','Already applied for this job');
            res.send(warn);
            connection.rollback();
            return;
        }

        //Obtiene la fecha de hoy
        const today = new Date();
        const day = today.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        const month = today.getMonth();
        if (month < 10) {
            month = '0' + month
        }
        const year = today.getFullYear();
            
        const date = `${year}-${month}-${day}`;
        console.log(date);

        //LOCK AL EMPLEO A SOLICITAR
        await connection.promise().execute('SELECT id, postulado FROM tb_empleo WHERE id = ? FOR UPDATE', [empleo, date]);
        console.log('🫠')
        const queryPostular = `INSERT INTO tb_postulacion (empleo, f_postulacion) VALUES (${empleo},'${today.toLocaleDateString('en-US')}')`;
        console.log(queryPostular, empleo, date)
        await connection.promise().query(queryPostular);
        console.log('😭')
        await connection.promise().execute(`UPDATE empleo SET postulado = 1 WHERE id = ?`, [empleo]);
        await connection.promise().commit();
        console.log('yay')
        const result = await connection.promise().query(`SELECT * FROM tb_postulacion
                                                            INNER JOIN tb_empleo on tb_postulacion.empleo = tb_empleo.id
                                                            WHERE id = ?`, [empleo]);
        res.send(result);
    } catch (error) {
        connection.rollback();
        const warning = new Warning('err_004', `Transaction aborted for job: ${empleo}`);
        res.send(warning);
        return;
    }
    
    async function createOrder() {
        await connection.beginTransaction();
        try {
          await connection.execute('SELECT id, name FROM product WHERE sku IN (?, ?) FOR UPDATE', items);
          console.log(`Locked rows for skus ${items.join()}`);
          const [itemsToOrder,] = await connection.execute('SELECT name, quantity, price from product WHERE sku IN (?, ?) ORDER BY id', items);
          console.log('Selected quantities for items');
          let orderTotal = 0;
          let orderItems = [];
          for (itemToOrder of itemsToOrder) {
            if (itemToOrder.quantity < 1) {
              throw new Error(`One of the items is out of stock ${itemToOrder.name}`);
            }
            console.log(`Quantity for ${itemToOrder.name} is ${itemToOrder.quantity}`);
            orderTotal += itemToOrder.price;
            orderItems.push(itemToOrder.name);
          }
          await connection.execute(
            'INSERT INTO sales_order (items, total) VALUES (?, ?)', 
            [orderItems.join(), orderTotal]
          )
          console.log(`Order created`);
          await connection.execute(
            `UPDATE product SET quantity=quantity - 1 WHERE sku IN (?, ?)`,
            items
          );
          console.log(`Deducted quantities by 1 for ${items.join()}`);
          await connection.commit();
          const [rows,] = await connection.execute('SELECT LAST_INSERT_ID() as order_id');
          return `order created with id ${rows[0].order_id}`;
        } catch (err) {
          console.error(`Error occurred while creating order: ${err.message}`, err);
          connection.rollback();
          console.info('Rollback successful');
          return 'error creating order';
        }
      }
    //Si se registro exitosamente, aumentar la cantidad de postulaciones con el empleador y cambiar empleo a postulado
    
}

export { postulacionController };