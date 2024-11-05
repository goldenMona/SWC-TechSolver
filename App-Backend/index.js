const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dontenv = require('dotenv');
const {obtenerCuentas,agregarTransaccion,obtenerTotalGlobal}= require('./controllers/cuentaCotroller');
const {obtenerEmpleados}=require('./controllers/empleadoController')

dontenv.config({path:'./config.env'})

mongoose.connect(process.env.DB_CONECCTION).then(conexion => {
  console.log('Conexion correcta!!')
}).catch(console.log)

app.use(express.json());
app.use(cors()); 

app.get('/api/cuentas', obtenerCuentas);
app.get('/api/cuentas/total',obtenerTotalGlobal);
app.post('/api/cuentas/:codigo/transaccion', agregarTransaccion);
app.get('/api/empleados',obtenerEmpleados);


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


