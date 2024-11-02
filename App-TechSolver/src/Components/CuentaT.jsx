/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Layout, Button, Space, Typography, Divider, Form, InputNumber, Select ,message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import cuentaService from '../services/cuenta';



const { Content } = Layout;
const { Title } = Typography;

const CuentaT = ({ cuenta , actualizar}) => {

  const [form] = Form.useForm();
  const [saldo, setSaldo] = useState(0);
  const [naturaleza, setNaturaleza] = useState('Deudor');
  const [monto,setMonto]=useState(null);
  const [tipo,setTipo]=useState(null);
  const [totalDebe,setTotalDebe]=useState(0);
  


 
  useEffect(() => {
    const calcularSaldo = () => {

      let nuevoSaldo = cuenta.cuentaT.reduce(
        (acumulado, transaccion) => acumulado + transaccion.debe - transaccion.haber,
        0
      );
      if (nuevoSaldo < 0) {
        setNaturaleza('Acreedor')
        nuevoSaldo *= -1;
      }
      setSaldo(nuevoSaldo);

    };

   
  

    calcularSaldo();
  }, [cuenta]);

 //console.log(cuenta)
  const transaccionesDebe = cuenta.cuentaT.flatMap(trasaccion => trasaccion.debe) 
  const transaccionesHaber = cuenta.cuentaT.flatMap(trasaccion => trasaccion.haber)
 


  
  const renderColumn = (data) => (
    <div>
      {data.map((transaccion, index) => (
        <p key={index} style={{ margin: 0 }}>{`$${transaccion}`}</p>
      ))}

    </div>
  );
 // FUncion de envio de transaccion
 const AgregarTransaccion = async (value) => {
  
  const values = await form.validateFields();
  try{
    const nuevaTransaccion ={
      debe: tipo === 'debe' ? monto : 0,
      haber: tipo === 'haber' ? monto : 0,
    }
    console.log('Enviando al backend:', nuevaTransaccion);
  
    
      await cuentaService.post(
        `/cuentas/${cuenta.codigo}/transaccion`,
        nuevaTransaccion).then(async()=>{
         actualizar();
        })
  
      console.log('Transacción enviada correctamente');
      message.success('Transacción agregada correctamente');
      form.resetFields(); // Limpiar formulario
  
  } catch (error) {
    console.error('Error al agregar transacción:', error.response || error);
    
    message.error('Error al agregar la transacción');
  }
  
  
 
};

const changeMonto = (value) => {
  console.log(value)

  setMonto(value)
  console.log(monto)
}
const changeTipo = (value) => {
  console.log(value)
 
  setTipo(value)
  console.log(monto)
}


  return (
    <Layout style={{ padding: '16px', margin: '0px', background: '#fff', marginBottom: '5px', minWidth: '275px' }}>
      <Content>
        <Form size='small'  form={form} onSubmitCapture={AgregarTransaccion} layout='vertical'>
          <Form.Item label="Monto" name='monto' rules={[
            { required: true, message: 'Por favor ingrese un monto' },
            { type: 'number', min: 0, message: 'El monto debe ser mayor o igual a 0' }
          ]}
          >
            <InputNumber style={{width:'9.5rem'}}value={monto} placeholder="Monto" min={0} onChange={changeMonto}  />
          </Form.Item>
          <Form.Item label="Naturaleza" name='tipo' rules={[
              {
                required: true, message:'Debe de seleccionar una naturaleza'
              },
            ]} >
            <Select value={tipo} onChange={changeTipo}>
              <Select.Option value="debe"  >Debe</Select.Option>
              <Select.Option value="haber">Haber</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button variant="solid" color="default" shape="round" htmlType="submit" size='medium' icon={<PlusOutlined />}>Agregar</Button>
          </Form.Item>
        </Form>
        <Divider />
        <Title level={4} style={{ textAlign: 'center', marginBottom: '8px' }}>
          {cuenta.nombre}
        </Title>
        <Divider style={{ borderWidth: 2, borderColor: 'black', margin: 0 }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'stretch' }}>
          {/* Columna Debe */}
          <div style={{ flex: 1, textAlign: 'center', padding: '0 8px' }}>
            <Title level={5}>Debe</Title>
            {renderColumn(transaccionesDebe)}
          </div>

          {/* Divider vertical */}
          <Divider type='vertical' style={{ borderWidth: 2, borderColor: 'black', height: 'auto' }} />

          {/* Columna Haber */}
          <div style={{ flex: 1, textAlign: 'center', padding: '0 8px' }}>
            <Title level={5}>Haber</Title>
            {renderColumn(transaccionesHaber)}
          </div>
        </div>

        <Divider />
        <div style={{ textAlign: 'center' }}>
          <p className='saldo'><b>Saldo <b>{naturaleza}</b>
            :</b> ${saldo.toFixed(4)} </p>
        </div>
      </Content>
    </Layout>
  );
};

export default CuentaT;

