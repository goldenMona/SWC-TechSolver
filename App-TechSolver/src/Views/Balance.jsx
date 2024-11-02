import React, { useEffect, useState } from 'react';
import { Layout, Table, Spin, message, Row, Col } from 'antd';
import cuentaService from '../services/cuenta'; // Axios configurado con baseURL

const { Content } = Layout;

const Balance = () => {
  const [data, setData] = useState([]);  
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await cuentaService.get('/cuentas'); // Petición al backend
        setData(response.data);       
      } catch (error) {
        message.error('Error al cargar los datos');
      } finally {
        setLoading(false); 
      }
    };

    fetchData(); 
  }, []);

  const activos = data.filter(cuenta => cuenta.tipo === 'Activo');
  const participaciones = data.filter(cuenta => cuenta.tipo !='Activo'  );
  console.log(activos.length)
  console.log(participaciones.length)
 
   const calcularTotal = (cuentas) => 
    cuentas.reduce((acc, cuenta) => acc + cuenta.saldo, 0);

  const totalActivos = calcularTotal(activos);
  const totalParticipaciones = calcularTotal(participaciones);
  const color = totalActivos === totalParticipaciones ? 'black' : 'red';


  

  // Columnas de las tablas
  const columns = [
    { title: 'Cuenta', dataIndex: 'nombre', key: 'nombre' },
    { 
      title: 'Saldo', 
      dataIndex: 'saldo', 
      key: 'saldo', 
      align: 'right',
      render: (saldo) => `$${saldo.toFixed(2)}` // Formato moneda
    },
  ];

  return (
    <Layout >
      <Content style={{ padding: '30px' }}>
        <h2 style={{ textAlign: 'center' }}>TechSolver S.A de C.V</h2>
        <h1 style={{ textAlign: 'center' }}>Balance General</h1>
        <h3 style={{ textAlign: 'center' }}>Del 01 de Octubre al 01 de Noviembre</h3>
        {loading ? (
          <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />
        ) : (
          <Row gutter={16}>
            <Col span={12}>
              <h2 style={{ textAlign: 'center' }}>Activos</h2>
              <Table 
                dataSource={activos} 
                columns={columns} 
                pagination={false} 
                bordered 
                
                summary={() => (
                  <Table.Summary.Row style={{color}}>
                    <Table.Summary.Cell index={0}><strong>Total Activos</strong></Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align="right">
                      <strong>{`$${totalActivos.toFixed(2)}`}</strong>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                )}
              />
            </Col>
            <Col span={12}>
              <h2 style={{ textAlign: 'center' }}>Participaciones</h2>
              <Table 
                dataSource={participaciones} 
                columns={columns} 
                pagination={false} 
                bordered 
                summary={() => (
                  <Table.Summary.Row style={{color}}>
                    <Table.Summary.Cell index={0}><strong>Total Participaciones</strong></Table.Summary.Cell>
                    <Table.Summary.Cell index={1} align="right">
                      <strong>{`$${totalParticipaciones.toFixed(2)}`}</strong>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                )}
              />
            </Col>
          </Row>
        )}
      </Content>
    </Layout>
  );
};

export default Balance;


