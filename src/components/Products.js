import { Panel, Columns, Column, Button } from "react-bulma-companion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTShirt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import NewPurchasedProduct from "./NewPurchasedProduct";
import { products, customers, purchases } from "./database";
import { PurchasedProducts } from "./utils";

const Products = () => {
  const [isOpen, setIsOpen] = useState(false);

  const addNewProduct = () => {
    setIsOpen(true);
  };
  const CloseModal = () => {
    setIsOpen(false);
  };

  const productsList = PurchasedProducts();

  return (
    <Columns>
      <Column size="half">
        <Panel>
          <Panel.Heading className="is-flex is-justify-content-center">
            Purchased Products
          </Panel.Heading>
          <Panel.Block>Amount : {purchases.length}</Panel.Block>
        </Panel>
      </Column>
      <Column size="half">
        <Panel>
          <Panel.Heading className="is-flex is-justify-content-center">
            Products
          </Panel.Heading>
          {productsList.map((product) => {
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
                {product.name} <br></br>
                Price: {product.price}
                <br></br>
                Quantity: {product.quantity} <br></br>
                <Panel.Heading style={{ fontSize: "0.75em" }}>
                  Customers
                </Panel.Heading>
                {Array.isArray(product.customers) ? (
                  product.customers.map((customer) => {
                    return (
                      <Panel.Block component="a">
                        {customer.name} on{" "}
                        {customer.date.toLocaleDateString("en-UK")}
                        <Button className="mt-4" color="primary">
                          Add
                        </Button>
                      </Panel.Block>
                    );
                  })
                ) : (
                  <Panel.Block component="a">
                    {product.customers} on{" "}
                    {product.dates.toLocaleDateString("en-UK")}
                    <Button className="mt-4" color="primary">
                      Add
                    </Button>
                  </Panel.Block>
                )}
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
