import React from 'react';
import { Layout, Table, Button, Space, Typography, Divider } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title } = Typography;

const dataSource = [
  { key: '1', monto: 200, tipo: 'debe' },
  { key: '2', monto: 500, tipo: 'debe' },
  { key: '3', monto: 500, tipo: 'haber' },
];

const CuentaT = () => {
  // Filtrar datos según tipo (Debe o Haber)
  const debe = dataSource.filter(item => item.tipo === 'debe');
  const haber = dataSource.filter(item => item.tipo === 'haber');

  // Renderización de columnas personalizadas para los montos
  const renderColumn = (data) => (
    <div>
      {data.map(({ key, monto }) => (
        <Space key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <span>{`$${monto}`}</span>
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" icon={<DeleteOutlined />} />
        </Space>
      ))}
      <Button type="dashed" icon={<PlusOutlined />}>Agregar</Button>
    </div>
  );

  return (
    <Layout style={{ padding: '24px', background: '#fff',width:'300px' }}>
      <Content style={[]}>
        <Title level={4} style={{ textAlign: 'center' }}>Caja</Title>
        <Divider style={{ borderWidth: 2, borderColor: 'black'}} />
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ width: '40%' }}>
            <Title level={5}>Debe</Title>
            {renderColumn(debe)}
          </div>
           {/* Divider vertical entre Debe y Haber */}
          <Divider type="vertical" style={{  borderWidth: 2,height: '100%', borderColor: 'black', margin: '0 16px' }} />
          <div style={{ width: '40%' }}>
            <Title level={5}>Haber</Title>
            {renderColumn(haber)}
          </div>
        </div>
        <Divider />
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button type="text">Saldo</Button>
        </div>
      </Content>
    </Layout>
  );
};

export default CuentaT;
