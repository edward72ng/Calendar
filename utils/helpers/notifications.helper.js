const cron = require('cron')
const webpush = require('../webpush')

function convertToCron(dateString, timeString) {
    const date = new Date(dateString);
    const time = timeString;
    
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();//dev +1 true, production False
    //
    
    const [hour, minute, second] = time.split(':');
  
    const cronExpression = `${minute} ${hour} ${day} ${month} *`;
    return cronExpression
  }

async function createTaskNotification (date, time, values) {
    const {endpoint, payload} = values
    const payloadString = JSON.stringify(payload)
    const cronExpression = convertToCron(date, time)
    console.log(cronExpression)
    const task = new cron.CronJob(cronExpression, async() => {
        await webpush.sendNotification(endpoint, payloadString)
    }, null, true, 'America/La_Paz')
    task.start()
    console.log(task)
    console.log('Tarea del helper creada correctamente')
}

module.exports = {createTaskNotification}