import { Layout, Table,Input, Form,message } from 'antd';
import React ,{useEffect,useState}from 'react';
import '../App.css';
import api from '../services/cuenta'; // Axios configurado con baseURL



const { Sider, Content } = Layout;

const Catalogo = () => {
  const [cuentas, setCuentas] = useState([]); 
  const [loading, setLoading] = useState(true); // Estado de carga

  // Función para obtener datos del backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/cuentas'); // Petición al backend
        console.log(cuentas)
        setCuentas(response.data);       
        
      } catch (error) {
        message.error('Error al cargar los datos');
      } finally {
        setLoading(false); 
      }
    };
    
    fetchData(); // Llamar a la función al montar el componente
  }, []);

  const columns = [
    {
      title: 'Código',
      dataIndex: 'codigo',
      key: 'codigo',
    },
    {
      title: 'Cuenta',
      dataIndex: 'nombre',
      key: 'nombre',
    },
  ];

  return (
    <Layout style={{ height: '100vh' }}>
        
        {/* Contenido principal */}
        <Content >
          <h1 style={{ textAlign: 'center' }}>Catálogo de Cuentas</h1>
          <Table dataSource={cuentas} columns={columns} pagination={false} />
        </Content>    
      
    </Layout>
    
  );
};

export default Catalogo;
