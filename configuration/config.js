require('dotenv').config();

 const config = {  
    env:process.env.NODE_ENV||'dev',
    port:process.env.PORT||3000,
    //dbUser:process.env.DB_USER,
    //dbPassword:process.env.DB_PASSWORD,
    //dbHost:process.env.DB_HOST,
    //dbName:process.env.DB_NAME,
    //dbPort:process.env.DB_PORT,
    apiKey:process.env.API_KEY,
    secret:process.env.SECRET,
    uriLink:process.env.URI,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    openaiKey: process.env.OPENAI_KEY
}

 module.exports= config