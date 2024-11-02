import React from "react";
import CuentaT from "../Components/CuentaT";
import {Layout,Spin,message} from "antd";
import cuentaService from '../services/cuenta'; // Axios configurado con baseURL
import { useEffect, useState } from 'react';

const { Content } = Layout;


const Transacciones = () => {

  const [cuentas, setCuentas] = useState([]); 
  const [loading, setLoading] = useState(true); 

  const obtenerData = async () => {
    try {
      const response = await cuentaService.get('/cuentas'); // Petición al backend
      setCuentas(response.data); // Guardar los datos en el estado
    } catch (error) {
      message.error('Error al cargar los datos');
    } finally {
      setLoading(false); // Finalizar la carga
    }
  };


  useEffect(() => {
    
    console.log(cuentas.saldo)
    obtenerData(); // Llamar a la función al montar el componente
  }, []);
  
  return (
    <Layout style={{ background: '#f0f2f5' }}>
      <Content style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px' }}>
      <h1 style={{ textAlign: 'center' }}>Transacciones</h1>
         {/* Esta funcion se encarga de evaluar si fue posible la obtencion de datos mostrato asi diferentes pantallas */}
        {loading ? (
          <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />
        ) :(<div  style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 0.5fr))',
          gap: '16px',
          justifyItems: 'center',
        }}>
         {cuentas.map(cuentas=>(
          <CuentaT key={cuentas.codigo} cuenta={cuentas} actualizar={obtenerData} ></CuentaT>
         ))}
          </div>)}
        
      </Content>
    </Layout>
  );
};

export default Transacciones;


