
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {Button, Layout} from 'antd';
import { useState, useEffect } from 'react';
import Logo from './Components/Logo';
import MenuList from './Components/MenuList';
import {MenuUnfoldOutlined,MenuFoldOutlined} from "@ant-design/icons";
import Balance from './Views/Balance';
import Transacciones from './Views/Transacciones';
import Costeo from './Views/Costeo';
import Catalogo from './Views/Catalogo';





const {Header,Sider,Content}= Layout;
function App() {
  
 
   const[collapse,setCollapse]= useState(false);
  
   
  return (
    <div className="app-container">
      <Router>
        <Layout className='layoutBg'>
          {/* Menu lateral */}
          <Sider className='sidebar'
            width={300}
            collapsed={collapse}
            collapsible
            trigger={null}>
            <Logo />
            <MenuList />
          </Sider>
          <Layout>
            <Header className='header'>
              <Button className="btnCollapse"
                type="text" onClick={() => setCollapse(!collapse)}
                icon={collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />
            </Header>
            {/* Contenido de la pagina */}
            <Content style={{ padding: '0px', background: '#fff', margin:0}}>
            <Routes>
              <Route path="/" element={<Navigate to="/balance" replace />} />
              <Route path="/balance" element={<Balance />} />
              <Route path="/transacciones" element={<Transacciones />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/costeo" element={<Costeo />} />
            </Routes>
          </Content>
          </Layout>

        </Layout>
      </Router>
    </div>
  )
}

export default App
