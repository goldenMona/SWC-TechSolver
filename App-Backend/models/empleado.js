const mongoose = require('mongoose')

const EmpleadoSchema = new mongoose.Schema({
   nombre: { type: String, required: true },
   cargo: { type: String, required: true },
   salario:{ type: Number, required: true, default: 0 }
});

module.exports=mongoose.model('Empleado',EmpleadoSchema);