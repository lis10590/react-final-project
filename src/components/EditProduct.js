import {
  Columns,
  Column,
  Panel,
  Title,
  Dropdown,
  Button,
  Icon,
  Field,
  Control,
  Input,
} from "react-bulma-companion";
import { products, purchases, customers } from "./database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const EditProduct = () => {
  const [dropOpen, setDropOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [title, setTitle] = useState("Products");

  const toggleDropdown = () => {
    setDropOpen(!dropOpen);
  };

  const selectProduct = (e) => {
    setTitle(e.target.innerHTML);
    setSelectedProduct(e.target.innerHTML);
    setDropOpen(false);
    const data = products.filter(
      (product) => product.name === e.target.innerHTML
    );
    console.log(data);
    console.log(data[0].id);

    setSelectedProductId(data[0].id);
    console.log(selectedProductId);
    const purchasedProduct = purchases.filter(
      (purchase) => purchase.productId === selectedProductId
    );
    console.log(purchasedProduct);
    const selectedCustomersArr = [];
    customers.map((customer) => {
      purchasedProduct.map((product) => {
        if (customer.id === product.customerId) {
          selectedCustomersArr.push(customer);
        }
      });
    });

    setSelectedCustomers(selectedCustomersArr);
  };

  console.log(selectedCustomers);
  const currentProduct = products.filter(
    (product) => selectedProduct === product.name
  );

  return (
    <div>
      <Title className="is-flex is-justify-content-center mt-6 mb-6">
        Edit Product
      </Title>
      <Columns>
        <Column size="half">
          <Panel>
            <Panel.Heading className="is-flex is-justify-content-center">
              Select Product
            </Panel.Heading>
            <Panel.Block className="is-flex is-flex-direction-column">
              <Dropdown active={dropOpen}>
                <Dropdown.Trigger>
                  <Button
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                    onClick={toggleDropdown}
                  >
                    <span>{title}</span>
                    <Icon size="small">
                      <FontAwesomeIcon icon={faAngleDown} />
                    </Icon>
                  </Button>
                </Dropdown.Trigger>
                <Dropdown.Menu id="dropdown-menu" role="menu">
                  <Dropdown.Content>
                    {products.map((product) => {
                      return (
                        <Dropdown.Item
                          key={product.id}
                          onClick={selectProduct}
                          component="a"
                        >
                          {product.name}
                        </Dropdown.Item>
                      );
                    })}
                    <Dropdown.Divider />
                    <Dropdown.Item component="a" onClick={selectProduct}>
                      Products
                    </Dropdown.Item>
                  </Dropdown.Content>
                </Dropdown.Menu>
              </Dropdown>
              <Button className="mt-4" color="primary">
                Delete Product
              </Button>
              {selectedProduct && selectedProduct !== "Products" && (
                <Columns>
                  <Column size="half">
                    <Panel.Block>Current Product Data</Panel.Block>
                    <Panel.Block>
                      Name :{" "}
                      {currentProduct.length > 0
                        ? currentProduct[0].name
                        : null}{" "}
                      <br></br>
                      Price:{" "}
                      {currentProduct.length > 0
                        ? currentProduct[0].price
                        : null}{" "}
                      <br></br>
                      Quantity:{" "}
                      {currentProduct.length > 0
                        ? currentProduct[0].quantity
                        : null}{" "}
                      <br></br>
                    </Panel.Block>
                  </Column>
                  <Column size="half">
                    <Panel.Block className="is-flex is-flex-direction-column">
                      <Field>
                        <Control>
                          Name:{" "}
                          <Input type="text" placeholder="enter name"></Input>
                        </Control>
                      </Field>
                    </Panel.Block>
                    <Panel.Block className="is-flex is-flex-direction-column">
                      <Field>
                        <Control>
                          Price:{" "}
                          <Input type="tel" placeholder="enter price"></Input>
                        </Control>
                      </Field>
                    </Panel.Block>
                    <Panel.Block className="is-flex is-flex-direction-column">
                      <Field>
                        <Control>
                          Quantity:{" "}
                          <Input
                            type="tel"
                            placeholder="enter quantity"
                          ></Input>
                        </Control>
                      </Field>
                    </Panel.Block>
                    <Panel.Block>
                      <Button color="primary">Update</Button>
                    </Panel.Block>
                  </Column>
                </Columns>
              )}
            </Panel.Block>
          </Panel>
        </Column>
        <Column size="half">
          <Panel>
            <Panel.Heading className="is-flex is-justify-content-center">
              Customers
            </Panel.Heading>
            {selectedCustomers.length > 0
              ? selectedCustomers.map((customer) => {
                  return (
                    <Panel.Block>
                      {customer.firstName + " " + customer.lastName}
                    </Panel.Block>
                  );
                })
              : null}
          </Panel>
        </Column>
      </Columns>
    </div>
  );
};

export default EditProduct;
