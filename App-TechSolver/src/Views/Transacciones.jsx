import React from "react";
import CuentaT from "../Components/CuentaT";
import {Layout,Spin,message,Alert} from "antd";
import cuentaService from '../services/cuenta'; // Axios configurado con baseURL
import { useEffect, useState } from 'react';

const { Content } = Layout;


const Transacciones = () => {

  const [cuentas, setCuentas] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const   [total,setTotal] = useState();
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState('');

  const obtenerData = async () => {
    try {
      const response = await cuentaService.get('/cuentas'); // Petición al backend
      const newTotal = await cuentaService.get('/cuentas/total'); 
      verificarDualidadEconomica(newTotal.data);
      setCuentas(response.data); // Guardar los datos en el estado
      setTotal(newTotal.data);
    } catch (error) {
      message.error('Error al cargar los datos');
    } finally {
      setLoading(false); // Finalizar la carga
    }
  };

  
  useEffect(() => {
    
    
    obtenerData(); // Llamar a la función al montar el componente

  }, []);


console.log(total)

const verificarDualidadEconomica = (totales) => {
  //console.log(totales)
  if (totales.totalDebe > totales.totalHaber) {
    const diferencia = totales.totalDebe - totales.totalHaber;
    setMensajeAlerta(`No se cumple la dualidad económica, el haber total tiene una diferencia de ${diferencia} con respecto al debe total`);
    setMostrarAlerta(true);
    message.warning(' ¡ATENCION! No cumple dualidad economica')
  } else if (totales.totalDebe < totales.totalHaber) {
    const diferencia = totales.totalHaber - totales.totalDebe;
    
    setMensajeAlerta(`No se cumple la dualidad económica, el debe total tiene una diferencia de ${diferencia} con respecto al haber total`);
    setMostrarAlerta(true);
    message.warning(' ¡ATENCION! No cumple dualidad economica',5)
  } else {
    setMostrarAlerta(false); 
  }
};

  return (
    <Layout style={{ background: '#f0f2f5' }}>
      <Content style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px' }}>
      <h1 style={{ textAlign: 'center' }}>Transacciones</h1>
      {mostrarAlerta && (
          <Alert message={mensajeAlerta} type="warning" showIcon />
        )}
        {loading ? (
          <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />
        ) :(<div  style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 0.5fr))',
          gap: '16px',
          justifyItems: 'center',
        }}>
         {cuentas.map(cuentas=>(
          <CuentaT key={cuentas.codigo} cuenta={cuentas} actualizar={obtenerData} total={total} ></CuentaT>
         ))}
          </div>)}
        
      </Content>
    </Layout>
  );
};

export default Transacciones;


