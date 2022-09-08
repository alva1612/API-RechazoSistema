import { connection } from "../db/conexion.js";
import { buscarEmpleo, buscarUltimaPostulacion } from "./utilsController.js";
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
    console.log('inicado')
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
        let day = today.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        let month = today.getMonth();
        if (month < 10) {
            month = '0' + month
        }
        let year = today.getFullYear();
          
        const date = `${year}-${month}-${day}`;

        //LOCK AL EMPLEO A SOLICITAR
        await connection.promise().execute('SELECT id, postulado FROM tb_empleo WHERE id = ? FOR UPDATE', [empleo, date])
                                  .catch(err => {
                                    const warning = new Warning('err_05', 'Failed to lock rows');
                                    console.error(warning);
                                    console.error(err);
                                    throw new Error(err);
                                  });

        //SE BUSCA POSTULACIONES PARA ASIGNAR UN ID
        const check = await buscarUltimaPostulacion();
        var newId = '';
        if (!check) {
          newId = 'PS00001';
        } else {
          const numberPart = check.id.substr(2);
          const numberId = parseInt(numberPart) + 1;
          const stringId = numberId+'';

          newId = 'PS' + stringId.padStart(5,'0');
        }

        //SE REALIZA LA INSERCION DE LA DATA
        const queryPostular = `INSERT INTO tb_postulacion (id, empleo, f_postulacion) VALUES ('${newId}', ${empleo},'${date}')`;
        console.log(queryPostular, newId, date)
        connection.query(queryPostular, (err) => {
          if (err) {
            console.error(err);
            const warning = new Warning('err_06', 'Failed to insert postulacion');
            throw new Error(warning);
          }
        });
        
        connection.execute(`UPDATE tb_empleo SET postulado = 1 WHERE id = ?`, [empleo], (err) => {
          if (err) {
            console.error(err);
            const warning = new Warning('err_07', 'Failed to update empleo to postulado');
            throw new Error(warning);
          }
        });
        await connection.promise().commit()
                        .catch(err => {
                          const warning = new Warning('err_08', 'Failed to commit');
                          console.error(warning);
                          console.error(err);
                          throw new Error(err);
                        });
        console.log('yay')
        const queryRes = 'SELECT * FROM tb_postulacion p ' +
                          `INNER JOIN tb_empleo e on p.empleo = e.id where p.id = '${newId}'`
        const [result, fields] = await connection.promise().query(queryRes)
                                        .catch(err => {
                                          const warning = new Warning('err_09', 'Failed to search result');
                                          console.error(warning);
                                          console.error(err);
                                          throw new Error(err);
                                        });
        res.send(result);
    } catch (error) {
        connection.rollback();
        const warning = new Warning('err_004', `Transaction aborted for job: ${empleo}`);
        res.send(warning);
        return;
    }

    //Si se registro exitosamente, aumentar la cantidad de postulaciones con el empleador y cambiar empleo a postulado
    
}

export { postulacionController };