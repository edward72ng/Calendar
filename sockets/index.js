const {io} = require('../index')

io.on('connection',(socket)=>{
    console.log(socket.id)
    socket.on('moveToSection',(mesagge)=>{
      console.log('SE A MOVIDO UN BLOQUE!!!!! a la seccion:' , mesagge)
      io.emit('refresh', mesagge, { except: mesagge.user })
    })
  })

