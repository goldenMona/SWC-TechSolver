import React, { useEffect, useState } from "react";
import { Layout, Table, Input, Form, Select, List, message,Button, InputNumber } from 'antd';

const { Sider,Content } = Layout;
const { Option } = Select;



const Costeo = () => {
    const [data, setData] = useState([]); // Estado para los datos de la tabla
    const [selectedRow, setSelectedRow] = useState({ nombre: '', costo: 0 }); // Fila seleccionada
    const [number, setNumber] = useState({value: 0,});

    //Funcion para asignar el valor a numero cada vez que se lanza el evento
    const onNumberChange = (value) => {
        setNumber({value: value});
    };
  
    useEffect(() => {
      // Simulación de datos de ejemplo
      const datosEjemplo = [
        { codigo: '001', nombre: 'Juan Pérez', puesto: 'Operador', salario: 300, costo: 9000 },
        { codigo: '002', nombre: 'María Gómez', puesto: 'Supervisor', salario: 500, costo: 15000 },
        { codigo: '003', nombre: 'Carlos López', puesto: 'Operador', salario: 300, costo: 9000 },
      ];
      setData(datosEjemplo);
    }, []);
  
    // Manejador de clic en una fila de la tabla
    const onRowClick = (record) => {
      setSelectedRow({ nombre: record.nombre, costo: record.costo });
    };
     
    // Columnas de la tabla
    const columns = [
      { title: 'Código', dataIndex: 'codigo', key: 'codigo' },
      { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
      { title: 'Puesto', dataIndex: 'puesto', key: 'puesto' },
      { title: 'Salario diario', dataIndex: 'salario', key: 'salario' },
      { title: 'Costo real', dataIndex: 'costo', key: 'costo' },
    ];
  
    return (
      <Layout style={{ height: '100vh' }}>
        <Content style={{ margin: '20px' }}>
          <h1 style={{ textAlign: 'center' }}>Mano de Obra Directa</h1>
          <Table 
            columns={columns} 
            dataSource={data} 
            pagination={false} 
            bordered 
            onRow={(record) => ({
              onClick: () => onRowClick(record), // Detectar clic en fila
            })}
          />
        </Content>
  
        <Sider width={300} style={{ padding: '20px'}} >
          <div className="sider-header">
            <span>Costeo de Software</span>
          </div>
  
          <Form layout="vertical" >
            <Form.Item label={<label className='form-label'>Nombre</label>}>
              <Input value={selectedRow.nombre} readOnly />
            </Form.Item>
  
            <Form.Item label={<label className='form-label'>Costo real</label>}>
              <Input value={selectedRow.costo} readOnly />
            </Form.Item>
  
            <Form.Item label={<label className='form-label'>Horas trabajadas</label>}>
              <InputNumber 
                value={number.value} 
                onChange={onNumberChange}                    
                max={8} 
                min={0}
              />
              {/* <Button type="primary" onClick={agregarHora} style={{ marginTop: '8px' }}>
                Agregar
              </Button> */}
  
              <List
                header={<div>Horas Registradas</div>}
                bordered
                key={3}
                renderItem={(item) => <List.Item>{item}</List.Item>}
                style={{ marginTop: '10px' }}
              />
            </Form.Item>
          </Form>
        </Sider>
      </Layout>
    );
  };
  
  export default Costeo;