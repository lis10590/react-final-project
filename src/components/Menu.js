import { Navbar } from "react-bulma-companion";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <Navbar>
      <Navbar.Brand>
        <Navbar.Item component={Link} to="/products">
          Products
        </Navbar.Item>
        <Navbar.Item component={Link} to="/customers">
          Customers
        </Navbar.Item>
        <Navbar.Item component={Link} to="/purchases">
          Purchases
        </Navbar.Item>
      </Navbar.Brand>
    </Navbar>
  );
};

export default Menu;
