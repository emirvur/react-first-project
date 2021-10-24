import { Route,Redirect } from "react-router-dom";
import { Layout } from "antd";
import Carikart from "./components/Carikart";

import AppHeader from "./components/AppHeader";
import Carihareket from "./components/carihareket";
import PrivateRoute from "./components/PrivateRoute";
import Cikis from "./components/Cikis";
import Login from "./components/Login";

const { Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <AppHeader />
      <Content
        className="site-layout"
        style={{ padding: "50px", marginTop: 64 }}
      >
      <PrivateRoute path="/carikarts"  component={Carikart} >
      </PrivateRoute>

        <Route path="/giris" component={Login} />
        <PrivateRoute path="/cariharekets/:carininId" component={Carihareket}>

        </PrivateRoute>
        <PrivateRoute path="/cikis" component={Cikis}>

</PrivateRoute>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Emirhan Vural ilk proje 
      </Footer>
    </Layout>
  );
}


export default App;

//https://codesandbox.io/s/naughty-keller-epmcs?from-embed=&file=/src/pages/UserDetail/index.js

//https://codesandbox.io/s/react-router-product-detail-pages-dynamic-links-tmcjc?file=/src/ProductDetail.js
//react tutorial seaxrh zip dosyasına bak route larda props aktarma ornegı var
// w3 schoools react tutrial izle