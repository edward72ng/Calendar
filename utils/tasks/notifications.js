const cron = require('cron')
const sequelize = require('../../db/connec');
const {models} = require('../../db/connec')
const webpush = require('../webpush')
const {createTaskNotification} = require('../helpers/notifications.helper')

function convertToCron(dateString, timeString) {
  const date = new Date(dateString);
  const time = timeString;
  
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate() ;//dev +1 true, production False
  
  const [hour, minute, second] = time.split(':');

  const cronExpression = `${minute} ${hour} ${day} ${month} *`;
  return cronExpression
}

const pushSubscription= {
  endpoint: 'https://wns2-bn3p.notify.windows.com/w/?token=BQYAAABbz0AXnU0Kur3KSztLZhUGRKE8BrfopYpglKTLHf9qD5Q35B511G92GIHA%2bVCu7s7FZe6whlSRfIep2P2Ws1kXIzutfvdg4L%2fPsVkK2naVlciTpRZ4G9fTWrHFcMnF4EEMBlk8Ec%2fRWBJoS5HnnnL4yYXcUjJR5uutGZE3OVaEsDRER78d%2bhDlxHJbXVFqwy14yip6Q24%2f2gAThFYhZA8utce4oltbPgQ0w6JlCdFquV0gtb7Oed1SG3YnlpisZ%2btR%2b6AosIpahhcoOuPQQf4kCLhuy0exOZo9TZcgmziUh87hNNvvQWchLkQgfU%2fJJVs%3d',
  expirationTime: null,
  keys: {
    p256dh: 'BI3Db3HC6x48lervcdzUkz9VVl4F3pnKGGCa3gTsp8ZXRfGOKboVSQOB36sKYpD5D9ZYIstqZ2eLmNvFKXCB7nc',
    auth: 'YBb4N-RTj6_SQuPapEs7PA'
  }
}


const today = new Date().toISOString().slice(0, 10); 
var hoy = new Date();

// Restar un día a la fecha actual
var ayer = new Date(hoy.getTime() - 24 * 60 * 60 * 1000);

// Formatear la fecha en el formato de año-mes-día
var ayer_str = ayer.toISOString().slice(0, 10);
  // Tarea principal (main)
  const mainTask = new cron.CronJob('29 12 21 1 *', async () => {
    console.log('MainTask Execute');
    
    const dateArray = await models.notifications.findAll({
      where: sequelize.literal(`DATE(date) = '${today}'`),
      include:[
        {
          model: models.todo,
          as:'todo',
          include: [
            {
              model: models.usuarios,
              as: 'user',
              include: [
                {
                  model: models.subscriptions,
                  as: 'subscriptions',
                  include: ['keys']
                }
              ]
            }
          ],
        }
      ]
    });
    
    const values = dateArray.map((row) => row.toJSON())
    console.log(values)


    // Crear subtareas a partir de las expresiones cron
    values.forEach((elem, i) => {
      const cronExpression = convertToCron(elem.date, elem.time)
      console.log(cronExpression)
      const subTask = new cron.CronJob(cronExpression, async () => {
        console.log(`Ejecutando subtarea ${i + 1} a las ${cronExpression}`);


        const payload = JSON.stringify(
          {
              title: 'Tienes una nueva alarma',
              message: elem.todo.content
              
          }
      )
       try {
          await Promise.all(
            elem.todo.user.subscriptions.map(async (val)=>{
            await webpush.sendNotification(val, payload)
        })
          );
          
        
          
       } catch (error) {
          console.log('ERROR IN SUBSCRIBED', error)
       }


      }, null, true, 'America/La_Paz');
  
      // Iniciar la subtarea
      subTask.start();
    });
  }, null, true, 'America/La_Paz');
  
  // Iniciar la tarea principal

  const fechaHoraActual = new Date();
console.log(fechaHoraActual);

module.exports = mainTask