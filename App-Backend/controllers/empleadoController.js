const Empleado= require('../models/empleado')

const obtenerEmpleados = async (req,res) => {

    const calcularCosto=(emp)=>{
        const septimo=emp.salario*7;
        const aguinaldo = emp.salario*21/52;
        const vacaciones=((emp.salario*15)+(emp.salario*15)*0.3)/52;
        const iss= (vacaciones+septimo)*0.0750;
        const afp=(vacaciones+septimo)*0.0875;
       //console.log(emp.nombre,septimo,aguinaldo,vacaciones,iss,afp)
        return((septimo+aguinaldo+vacaciones+iss+afp)/5).toFixed(2);
    }
    try {
      const empleados = await Empleado.find(); 
     const empleadosCostoReal = empleados.map(emp=>({     

       ...emp._doc,
          costo:calcularCosto(emp),
    }));
      res.json(empleadosCostoReal);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
      throw error; 
    }
  };

  module.exports={obtenerEmpleados}