import { Panel, Columns, Column, Button } from "react-bulma-companion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTShirt } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import NewPurchasedProduct from "./NewPurchasedProduct";
import { products, customers, purchases } from "./database";
import {
  findProductById,
  findCustomerById,
  ProductsArray,
  newCollection,
} from "./utils";

const Products = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newDb, setNewDb] = useState([]);
  const mergeDbs = () => {
    const purchasesArr = [];
    const purchasesArrFinal = [];
    for (const purchase of purchases) {
      for (const customer of customers) {
        if (purchase.customerId === customer.id) {
          const data = {
            id: purchasesArr.length + 1,
            customerName: customer.firstName + " " + customer.lastName,
            product: purchase.productId,
            date: purchase.date,
          };
          purchasesArr.push(data);
        }
      }
    }

    for (const purchase of purchasesArr) {
      for (const product of products) {
        if (product.id === purchase.product) {
          const data = {
            id: purchasesArrFinal.length + 1,
            customerName: purchase.customerName,
            productName: product.name,
            date: purchasesArr.date,
          };
          purchasesArrFinal.push(data);
        }
      }
    }
    setNewDb(purchasesArrFinal);
    console.log(purchasesArrFinal);
  };

  useEffect(() => {
    mergeDbs();
  }, []);

  const addNewProduct = () => {
    setIsOpen(true);
  };
  const CloseModal = () => {
    setIsOpen(false);
  };

  ProductsArray();
  newCollection();

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
          {purchases.map((purchase) => {
            const product = findProductById(purchase.productId);
            const customer = findCustomerById(purchase.customerId);

            return (
              <Panel.Block
                key={purchase.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                }}
              >
                <Panel.Icon>
                  <FontAwesomeIcon icon={faTShirt} />
                </Panel.Icon>
                {product.productName} <br></br>
                Price: {product.productPrice}
                <br></br>
                Quantity: {product.productQuantity} <br></br>
              </Panel.Block>
            );
          })}
          {/* {newDb.map((data) => {
            return (
              <Panel.Block
                key={data.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                }}
              >
                <Panel.Icon>
                  <FontAwesomeIcon icon={faTShirt} />
                </Panel.Icon>
                {data.productName}
                <br></br>
                Price:
                <br></br>
                Quantity: <br></br>
                <Panel>
                  <Panel.Heading>Customers</Panel.Heading>

                  <Panel.Block
                    key={data.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "stretch",
                    }}
                  >
                    {data.customerName}
                    <br></br>
                    Purchased On {" " + data.date} <br></br>
                    <Button
                      size="small"
                      className="mt-6"
                      color="primary"
                      onClick={addNewProduct}
                    >
                      Add
                    </Button>
                  </Panel.Block>
                </Panel>
              </Panel.Block>
            );
          })} */}
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
