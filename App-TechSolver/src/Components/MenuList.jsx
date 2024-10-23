import { Menu } from "antd";
import { Link } from "react-router-dom";
import MenuItem from "antd/es/menu/MenuItem";
import {DollarOutlined ,CalculatorOutlined,CreditCardOutlined,BookOutlined} from "@ant-design/icons";

const MenuList = () =>{
    return(
        <Menu theme="dark" className="menu-bar">
            <MenuItem key="balance" icon={<BookOutlined />}>
                <Link to="/balance">Balance General</Link>
            </MenuItem>
            <MenuItem key="transacciones" icon={<CalculatorOutlined />}>
                <Link to="/transacciones">Gestionar Transacciones</Link>
            </MenuItem>
            <MenuItem key="catalogo" icon={<CreditCardOutlined />}>
                <Link to="/catalogo">Catalogo de Cuentas</Link>
            </MenuItem>
            <MenuItem key="Costeo" icon={<DollarOutlined />}>
                <Link to="/costeo">Costeo</Link>
            </MenuItem>
        </Menu>
    );
} ;

export default MenuList;