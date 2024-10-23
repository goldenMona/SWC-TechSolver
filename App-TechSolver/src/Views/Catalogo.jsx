import { Layout, Table, Button, Input, Form, Space } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, DollarOutlined } from '@ant-design/icons';
import React from 'react';
import '../App.css';


const { Sider, Content } = Layout;

const dataSource = [
  { key: '1', codigo: '1001', cuenta: 'Caja' },
  { key: '2', codigo: '1002', cuenta: 'Banco' },
];

const columns = [
  {
    title: 'Código',
    dataIndex: 'codigo',
    key: 'codigo',
  },
  {
    title: 'Cuenta',
    dataIndex: 'cuenta',
    key: 'cuenta',
  },
];

const Catalogo = () => {
  return (
    <Layout style={{ height: '100vh' }}>
        {/* Contenido principal */}
      <Layout>
        <Content className="content">
          <h1 style={{ textAlign: 'center' }}>Catálogo de Cuentas</h1>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
          <div className="add-account">
            <Button type="primary" shape="round" icon={<PlusOutlined />} size="large">
              Agregar Cuenta
            </Button>
          </div>
        </Content>
      </Layout>
       {/* Panel lateral */}
       <Sider width={300} style={{padding:'20px'}} className="admin-cuentas">
        <div className="sider-header">
          <span>Administración de Cuentas</span>
        </div>
        <Form layout="vertical" className="sider-form">
          <Form.Item label={<label className='form-label'>Nombre</label>}>
            <Input placeholder="Buscar por nombre" prefix={<SearchOutlined />} />
          </Form.Item>
          <Form.Item label={<label className='form-label'>Codigo</label>}>
            <Input placeholder="Buscar por código" prefix={<SearchOutlined />} />
          </Form.Item>
          <Space style={{ marginTop: '10px' }}>
            <Button icon={<EditOutlined />} />
            <Button icon={<DeleteOutlined />} danger />
          </Space>
        </Form>
      </Sider>
    </Layout>
    
  );
};

export default Catalogo;
