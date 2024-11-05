import React, { useEffect, useState } from 'react';
import { Layout, Table, Spin, message, Row, Col,Alert ,Button} from 'antd';
import cuentaService from '../services/cuenta'; // Axios configurado con baseURL

const { Content } = Layout;

const Balance = () => {
  const [data, setData] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [mostrarError, setMostrarError] = useState(false);
  const [mensajeError, setMensajeError] = useState('');
  const [visible,setVisible] = useState(false);



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

      }
      
       

    const validacionBalance=()=>{

      if(totalActivos === totalParticipaciones ){
        setVisible(false);
        setMostrarError(false)
      }
      else{
        setMensajeError('ERROR \n Se recomienda ver la gestion de transacciones pues no estan cuadrando')
        setMostrarError(true)
        setVisible(true);
      }
    }

    validacionBalance();

    fetchData(); 
  }, []);

  const activos = data.filter(cuenta => cuenta.tipo === 'Activo');
  const participaciones = data.filter(cuenta => cuenta.tipo !='Activo'  );
  console.log(activos.length)
  console.log(participaciones.length)
 
   const calcularTotal = (cuentas) => 
    cuentas.reduce((acc, cuenta) => acc + cuenta.saldo, 0);

  const totalActivos = calcularTotal(activos)>0 ? calcularTotal(activos) : (calcularTotal(activos)*-1);
  const totalParticipaciones = calcularTotal(participaciones)>0 ? calcularTotal(participaciones) : (calcularTotal(participaciones)*-1);
  const color = totalActivos === totalParticipaciones ? 'black' : 'red';

 
  

  // Columnas de las tablas
  const columns = [
    { title: 'Cuenta', dataIndex: 'nombre', key: 'nombre' },
    { 
      title: 'Saldo', 
      dataIndex: 'saldo', 
      key: 'saldo', 
      align: 'right',
      render: (saldo) => saldo>0 ? `$${saldo.toFixed(2)}` :`$${(saldo.toFixed(2))*-1}`// Formato moneda
    },
  ];

  const imprimir =()=>{

    const originalTitle = document.title;
    document.title = 'Balance General - TechSolver';
    window.print();

    document.title = originalTitle;
  }

  return (
    <Layout >
      <Content style={{ padding: '30px' ,backgroundColor:{color}}}>
        <h2 style={{ textAlign: 'center' }}>TechSolver S.A de C.V</h2>
        <h1 style={{ textAlign: 'center' }}>Balance General</h1>
        <h3 style={{ textAlign: 'center' }}>Del 01 de Octubre al 01 de Noviembre</h3>
        {mostrarError && (
          <Alert message={mensajeError} type="error" showIcon />
        )}
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
        <Button type='primary'disabled={visible} onClick={imprimir}> Imprimir  </Button>
      </Content>
    </Layout>
  );
};

export default Balance;


