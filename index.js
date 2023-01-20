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

server.listen(port,()=>{
    console.log('corriendo en puerto 3000')
})

const io = SocketIO(server)

io.on('connection',(socket)=>{
  console.log("SOCKET CONECTADO¡¡¡",socket.id)
  socket.on('moveToSection',(mesagge)=>{
    console.log('SE A MOVIDO UN BLOQUE!!!!! a la seccion:' + mesagge.toSection)
  })
  socket.on('conectado',(data)=>{
    console.log(data.message)
    console.log('LLEGO??????')
    io.sockets.emit('responseFromServer', data.message)
  })
})