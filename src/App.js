import Menu from "./components/Menu"
import Products from "./components/Products";
import Purchases from "./components/Purchases";
import Customers from "./components/Customers";
import "bulma/css/bulma.min.css";
import { Routes,Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Menu/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/purchases" element={<Purchases/>} />
        <Route path="/customers" element={<Customers/>} />
      </Routes>
     

    </div>
  );
}

export default App;
