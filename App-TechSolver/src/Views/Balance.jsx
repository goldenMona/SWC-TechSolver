import React from "react";
import { Layout, Table} from 'antd'

const dataSource = [
    { key: '1', fecha: '12/11/2024', cuenta: 'Caja',debe:'$1500' ,haber:'$0'},
    { key: '2',  fecha: '15/11/2024', cuenta: 'Caja',debe:'$200' ,haber:'$0'},
  ];
  
  const {Content}=Layout;
  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
    },
    {
      title: 'Cuenta',
      dataIndex: 'cuenta',
      key: 'cuenta',
    },
    {
        title: 'Debe',
        dataIndex: 'debe',
        key: 'debe',
    },
    {
        title: 'Haber',
        dataIndex: 'haber',
        key: 'haber',
    },

  ];
const Balance=()=>{
    return(
        <Layout>
        <Content>
          <h1 style={{ textAlign: 'center' }}>Balance General</h1>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </Content>
      </Layout>
    );
}

export default Balance;