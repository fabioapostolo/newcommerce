const app = require('./app');
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');

// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Desligando devido a exceção não detectada');
    process.exit(1)
});

// config arquivo envio
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

dotenv.config({ path: 'backend/config/config.env' })

//conectando ao Banco de Dados
connectDatabase();

// config. cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLODINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
    

});

const server = app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na PORTA: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

// Unhandled Promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Desligando o servidor devido à rejeição de promisse não tratada');
    server.close(() => {
        process.exit(1)
    })
})