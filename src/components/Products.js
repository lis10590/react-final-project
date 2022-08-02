import { Panel, Columns, Column, Button } from "react-bulma-companion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTShirt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { products, customers, purchases } from "./database";
import { PurchasedProducts } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modalReducer";
import AddProductToCustomer from "./AddProductToCustomer";

const Products = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.modalState);
  const [isOpen, setIsOpen] = useState(false);

  const addNewProduct = () => {
    setIsOpen(true);
  };

  const openModal = () => {
    dispatch(modalActions.ModalOpen());
  };
  const CloseModal = () => {
    dispatch(modalActions.ModalClose());
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
                      <Panel.Block>
                        {customer.name} on{" "}
                        {customer.date.toLocaleDateString("en-UK")}
                        <Button
                          className="mt-4"
                          color="primary"
                          onClick={openModal}
                        >
                          Add
                        </Button>
                      </Panel.Block>
                    );
                  })
                ) : (
                  <Panel.Block>
                    {product.customers} on{" "}
                    {product.dates.toLocaleDateString("en-UK")}
                    <Button
                      className="mt-4"
                      color="primary"
                      onClick={openModal}
                    >
                      Add
                    </Button>
                  </Panel.Block>
                )}
              </Panel.Block>
            );
          })}
        </Panel>

        <AddProductToCustomer isOpen={modal} onClose={CloseModal} />
      </Column>
    </Columns>
  );
};

export default Products;
