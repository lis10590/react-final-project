import { Panel, Columns, Column, Button } from "react-bulma-companion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTShirt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import NewPurchasedProduct from "./NewPurchasedProduct";

const Products = () => {
  const [isOpen, setIsOpen] = useState(false);

  const addNewProduct = () => {
    setIsOpen(true);
  };
  const CloseModal = () => {
    setIsOpen(false);
  };
  const products = [
    {
      id: 1,
      name: "Bikini",
      price: 150,
      quantity: 3,
      customers: ["Leanne Graham", "Ervin Howell"],
    },
    {
      id: 2,
      name: "Skirt",
      price: 100,
      quantity: 7,
      customers: ["Clementine Bauch", "Patricia Lebsack"],
    },
    {
      id: 3,
      name: "Skinny Jeans",
      price: 170,
      quantity: 10,
      customers: ["Clementine Bauch", "Patricia Lebsack", "Chelsey Dietrich"],
    },
    {
      id: 4,
      name: "Denim Shorts",
      price: 80,
      quantity: 6,
      customers: [
        "Mrs. Dennis Schulist",
        "Kurtis Weissnat",
        "Nicholas Runolfsdottir V",
      ],
    },
    {
      id: 5,
      name: "T-Shirt",
      price: 70,
      quantity: 23,
      customers: ["Clementina DuBuque", "Liat Cohen", "Tal Baum", "Gal Tal"],
    },
  ];
  return (
    <Columns>
      <Column size="half">
        <Panel>
          <Panel.Heading>Purchased Products</Panel.Heading>
        </Panel>
      </Column>
      <Column size="half">
        <Panel>
          <Panel.Heading className="is-flex is-justify-content-center">
            Products
          </Panel.Heading>
          {products.map((product) => {
            return (
              <Panel.Block
                key={product.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                }}
              >
                <Panel.Icon>
                  <FontAwesomeIcon icon={faTShirt} />
                </Panel.Icon>
                {product.name}
                <br></br>
                Price: {product.price}
                <br></br>
                Quantity: {product.quantity} <br></br>
                <Panel>
                  <Panel.Heading>Customers</Panel.Heading>
                  {product.customers.map((customer) => {
                    return (
                      <Panel.Block
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "stretch",
                        }}
                      >
                        {customer}
                        <br></br>
                        Purchased On <br></br>
                        <Button
                          size="small"
                          className="mt-6"
                          color="primary"
                          onClick={addNewProduct}
                        >
                          Add
                        </Button>
                      </Panel.Block>
                    );
                  })}
                </Panel>
              </Panel.Block>
            );
          })}
        </Panel>
        <NewPurchasedProduct
          products={products}
          modalOpen={isOpen}
          modalClose={CloseModal}
        />
      </Column>
    </Columns>
  );
};

export default Products;
