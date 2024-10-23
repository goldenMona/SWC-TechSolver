import React from "react";
import CuentaT from "../Components/CuentaT";
import Layout from "antd/es/layout/layout";

const { Content } = Layout;

const Transacciones = () => {
  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px' }}>
        {/* Tres cuentas T alineadas a la par */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'space-evenly' }}>
          <CuentaT />
          <CuentaT />
          <CuentaT />
        </div>
      </Content>
    </Layout>
  );
};

export default Transacciones;


