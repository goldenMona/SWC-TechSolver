const Cuenta = require('../models/cuenta');

const obtenerCuentas = async (req, res) => {
    try {
      const cuentas = await Cuenta.find().populate('cuentaT');
      const cuentasConSaldo = cuentas.map(cuenta => ({
        ...cuenta._doc,
        saldo: cuenta.cuentaT.reduce((acc, trans) => acc + trans.debe - trans.haber, 0),
      }));
      res.json(cuentasConSaldo);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las cuentas.' });
    }
  };

  const agregarTransaccion = async (req, res) => {
    try {
      const { codigo } = req.params;
      const { debe, haber } = req.body;
     
       console.log('ass')
      if (debe === undefined && haber === undefined) {
        return res.status(400).json({ message: 'Datos incompletos.' });
      }
  
     
      const nuevaTransaccion = { debe, haber };
      console.log(nuevaTransaccion)
   
      const cuentaActualizada = await Cuenta.findOneAndUpdate(
        { codigo },
        { $push: { cuentaT: nuevaTransaccion } },
        { new: true }
      );
  
      if (!cuentaActualizada) {
        return res.status(404).json({ message: 'Cuenta no encontrada.' });
      }
  
      res.status(201).json({
        message: 'Transacción agregada exitosamente.',
        cuenta: cuentaActualizada
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al agregar la transacción.' });
    }
  };

  module.exports = { obtenerCuentas,agregarTransaccion};