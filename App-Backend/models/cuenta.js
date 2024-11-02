const mongoose = require('mongoose');

const CuentaSchema = new mongoose.Schema({
  codigo: { type: String, required: true, maxlength: 5 },
  nombre: { type: String, required: true },
  tipo: { type: String, enum: ['Activo', 'Pasivo', 'Patrimonio'], required: true },
    cuentaT: [
        {
            debe: { type: Number, required: true, default: 0 },
            haber: { type: Number, required: true, default: 0 },
        }
    ]
});

module.exports = mongoose.model('Cuenta', CuentaSchema);
