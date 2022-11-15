const express = require('express')
const app = express()
const port = 3000
const routerApi = require('./routes/index')
const passport = require('passport')
const path = require('path')

const midd = require('./middlewares/middleware.handler')
const {authHeader} = require('./middlewares/auth.middleware')

const cors = require('cors');

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions ));

require('./utils/auth/index')


app.use(express.json())
app.use(express.static(path.join(__dirname, 'src/public')));

/*app.get('/',
//authHeader,
(req,res) =>{
    res.send('Hola Admin')
})*/

app.get('/admin',
passport.authenticate('jwt',{session: false}),
(req,res)=>{
  res.send('HELLO ADMIN!')
})
routerApi(app)

//app.use(middValid)
app.use(midd.logErrors)
app.use(midd.boomErrorHandler)
app.use(midd.errorHandler)

app.listen(port,()=>{
    console.log('corriendo en puerto 3000')
})