import React, { useEffect, useState , useRef} from "react";
import { Layout, Table, Input, Form, Select, List, message, Button, InputNumber } from 'antd';
import api from '../services/cuenta';

const { Sider, Content } = Layout;
const { Option } = Select;



const Costeo = () => {

  const [data, setData] = useState([]); // Estado para los datos de la tabla
  const [selectedRow, setSelectedRow] = useState({ nombre: '', costo: 0 ,cod:''}); // Fila seleccionada
  const [number, setNumber] = useState({ value: 0, });
  const [projectEmployees, setProjectEmployees] = useState([]);
  const [porcentaje, setPorcentaje]=useState({value:0});
  const [costeoFinal,setCosteoFinal] = useState(0);
  const inputRef = useRef(null); 


  //Funcion para asignar el valor a numero cada vez que se lanza el evento
  const onNumberChange = (value) => {
    setNumber({ value: value });
    console.log(value)
  };
  const onPorcentajeChange = (value) => {
 
    setPorcentaje({ value: value });
    console.log(porcentaje)
  };

  useEffect(() => {
    const obtenerData = async () => {
      try {
        const response = await api.get('/empleados'); // Petición al backend

        setData(response.data);

      } catch (error) {
        message.error('Error al cargar los datos');
      }
    }

    obtenerData();

  }, []);


  const onRowClick = (record) => {
    setSelectedRow({ nombre: record.nombre, costo: record.costo, cod:record._id});
    console.log(record._id)
    inputRef.current.focus();
  };

  const eliminarEmpleado=()=>{

    const isEmployeeExist = projectEmployees.some(
      (employee) => employee.cod === selectedRow.cod);

    if(isEmployeeExist){
      const newProjectEmployees=projectEmployees.filter(empleado=>empleado.cod !=selectedRow.cod);
      setProjectEmployees(newProjectEmployees);
      message.success('Empleado eliminado')
      setSelectedRow({ nombre: '', costo: 0 , cod:''});
    }
    else{
      message.error('El empleado no esta en el proyecto')
    }

  }

  const agregarEmpleado = () => {
    if (selectedRow && selectedRow.nombre && selectedRow.costo && selectedRow.cod) {
      const isEmployeeExist = projectEmployees.some(
        (employee) => employee.cod === selectedRow.cod
       
      );
      
      if (isEmployeeExist) {
        message.warning('Este empleado ya está agregado al proyecto.');
        return;
      }
  
      const newEmployee = {
        nombre: selectedRow.nombre,
        costo: selectedRow.costo,
        cod:selectedRow.cod,
      };
  
      setProjectEmployees([...projectEmployees, newEmployee]);
  
      message.success('¡Se agregó un empleado al proyecto!');
      setSelectedRow({ nombre: '', costo: 0 , cod:''});
    }
  };

  const costear=()=>{

    if(projectEmployees.length>=1 && number.value!=0 && porcentaje.value!=0){
      const totalMDO=projectEmployees.reduce((total,empleado)=>total+Number(empleado.costo),0)
      const totalSW= totalMDO*(number.value);
      console.log(totalMDO)
      console.log(totalSW)
      const cif=5630*(porcentaje.value/100);
      const NewcosteoFinal=totalSW+cif;
  
      setCosteoFinal(NewcosteoFinal);
      message.success('El costeo a sido realizado')
    }
    else
    message.warning('Debe ingresar datos')


  }
  // Columnas de la tabla
  const columns = [
    { title: 'Codigo', dataIndex: '_id', key: 'codigo' },
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Cargo', dataIndex: 'cargo', key: 'cargo' },
    { title: 'Salario/h', dataIndex: 'salario', key: 'salario' },
    { title: 'Costo real', dataIndex: 'costo', key: 'costo' },
  ];

  return (
    <Layout style={{ height: '100rem', overflow: 'hidden' }}>
      <Content style={{ margin: '10px', overflow: 'hidden' }}>
        <h1 style={{ textAlign: 'center' }}>Lista de empleados</h1>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          size='small'
          onRow={(record) => ({

            onClick: () => onRowClick(record), // Detectar clic en fila
          })}
        />
      </Content>

      <Sider width={500} style={{ padding: '20px' }} >
        <div className="sider-header">
          <span>Costeo de Software</span>
          
        </div>

        <Form layout="vertical" >
        <div className='pasos-label'> 1.Selecione el empleado desde la lista</div>
          <Form.Item label={<label className='form-label'>Nombre</label>}>
            <Input value={selectedRow.nombre} readOnly ref={inputRef} />
          </Form.Item>

          <Form.Item label={<label className='form-label'>Costo real</label>}>
            <Input value={selectedRow.costo} readOnly  />
          </Form.Item>


          <Button type="primary" onClick={agregarEmpleado} style={{ marginTop: '8px' }}>
            Agregar al proyecto
          </Button>
          <Button type="primary"  onClick={eliminarEmpleado} style={{ marginTop: '8px' ,margin:'10px' }} danger>
            Eliminar del proyecto
          </Button>


          <List
            header={<div className='headerList'>Empleados en el proyecto</div>}
            bordered
            key={0}
            dataSource={projectEmployees}
            renderItem={(item) => (
              <List.Item>
                {item.nombre} - Tarifa: ${item.costo}
              </List.Item>
            )}
            style={{ marginTop: '10px', background:'#fff' }}
          />
              <div className='pasos-label'> 2.Ingrese la duracion del proyecto</div>
          <Form.Item label={<label className='form-label'>Horas invertidas en el desarrollo:</label>}>
            <InputNumber
              value={number.value}
              onChange={onNumberChange}
              max={1000}
              min={0}
              style={{width:'12rem'}}
            />
          </Form.Item>
          <div className='pasos-label'> 3.Agregue el porcentaje de recursos utilizados</div>
          <Form.Item label={<label className='form-label'>Tasa de CIF:</label>}>
            <InputNumber
              value={porcentaje.value}
              onChange={onPorcentajeChange}
              max={100}
              min={0}
              style={{width:'12rem'}}
            />
          </Form.Item>
          <div className='pasos-label'> 4.Realizar costeo</div>
          <Button type="primary" onClick={costear} style={{ marginTop: '8px' ,width:'14rem' }}>
            Costear software 
          </Button>
          <div className='pasos-label'>Costo del software: ${costeoFinal.toFixed(2)}</div>
        </Form>
      </Sider>
    </Layout>
  );
};

export default Costeo;