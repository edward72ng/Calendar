const express = require('express')
const app = express()
const port = 3000
const routerApi = require('./routes/index')
const path = require('path')
const bodyParser = require ('body-parser')
const SocketIO = require('socket.io')
const midd = require('./middlewares/middleware.handler')
const http = require('http')
const cors = require('cors');
const server =  http.createServer(app)
const {models} = require ('./db/connec')
const IP = '192.168.0.104'

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions ));
require('./utils/auth/index')
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'src/public')));
routerApi(app)
app.use(midd.logErrors)
app.use(midd.boomErrorHandler)
app.use(midd.errorHandler)


const io = SocketIO(server)


io.on('connection',(socket)=>{
  console.log('Conectado', socket.id)
  socket.on('moveToSection',(mesagge)=>{
    console.log('SE A MOVIDO UN BLOQUE!!!!! a la seccion:' , mesagge)
    io.emit('refresh', mesagge, { except: mesagge.user })
  })

  socket.on('refrescar', async(data)=>{
    const {origen, destino, todo, exclude} = data
    const tod = await models.todo.findByPk(todo)
    const resp = await tod.update({sectionid: destino})
    console.log('refrescar')
    console.log(exclude)
    socket.broadcast.emit('refrescar', data)
  })
})

server.listen(port,()=>{
  console.log("http://"+ IP +":" + port + "/");
})


module.exports = {io}