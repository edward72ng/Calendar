const boom = require("@hapi/boom")
//middleware artificial

//                 objeto//objeto req.body.query.params
function validator(schema, propiedad){


    return (req,res, next)=>{
        //obtener datos dinamicos del request
        const data = req[propiedad]
        //validar el schema
        const {error} = schema.validate(data)
        if(error){
            //proceder a midd errors
            next(boom.badRequest(error))
        }
        //proceder con el sgte midd o ruta o servicio
        next()
    }
}
    
    module.exports = validator;