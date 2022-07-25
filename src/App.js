import Menu from "./components/Menu";
import Products from "./components/Products";
import Purchases from "./components/Purchases";
import Customers from "./components/Customers";
import EditProduct from "./components/EditProduct";
import EditCustomer from "./components/EditCustomer";
import "bulma/css/bulma.min.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/products" element={<Products />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/editproduct" element={<EditProduct />} />
        <Route path="/editcustomer" element={<EditCustomer />} />
      </Routes>
    </div>
  );
}

export default App;
