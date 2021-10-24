import { Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { AppState } from "../store";
//import { isLoggedIn } from "../store/actions/userActions";

function AppHeader() {
  //const { data, loading, error } = useSelector((state: AppState) => state.user);

  //const dispatch = useDispatch();

  /*useEffect(() => {
    dispatch(isLoggedIn());
  }, []);*/

  const { pathname } = useLocation();

  return (
    <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
          <React.Fragment>
                   <Menu.Item key="/giris">
              <Link to="/giris">Giris</Link>
            </Menu.Item>
            <Menu.Item key="/carikarts">
              <Link to="/carikarts">Carikartlar</Link>
            </Menu.Item>
     
            <Menu.Item key="/cikis">
              <Link to="/cikis">Cikis</Link>
            </Menu.Item>
      
          </React.Fragment>
  
      </Menu>
    </Header>
  );
}

export default AppHeader;