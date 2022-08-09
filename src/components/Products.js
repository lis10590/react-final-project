import { Panel, Columns, Column, Button } from "react-bulma-companion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTShirt } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { PurchasedProducts } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modalReducer";
import { getAllProducts, selectAllProducts } from "../store/productsReducer";
import { getAllPurchases, selectAllPurchases } from "../store/purchasesReducer";
import { getAllCustomers, selectAllCustomers } from "../store/customersReducer";
import AddProductToCustomer from "./AddProductToCustomer";

const Products = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.modalState);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  const products = useSelector(selectAllProducts);
  const purchases = useSelector(selectAllPurchases);
  const customers = useSelector(selectAllCustomers);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllPurchases());
    dispatch(getAllCustomers());
  }, [dispatch]);

  const openModal = (customer) => {
    dispatch(modalActions.ModalOpen());
    setSelectedCustomer(customer);
  };
  const CloseModal = () => {
    dispatch(modalActions.ModalClose());
  };

  const productsList = PurchasedProducts(customers, purchases, products);
  console.log(productsList);

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
                        {customer.name} on {customer.date}
                        <Button
                          className="mt-4"
                          color="primary"
                          onClick={() => openModal(customer.name)}
                        >
                          Add
                        </Button>
                      </Panel.Block>
                    );
                  })
                ) : (
                  <Panel.Block>
                    {product.customers} on {product.dates}
                    <Button
                      className="mt-4"
                      color="primary"
                      onClick={() => openModal(product.customers)}
                    >
                      Add
                    </Button>
                  </Panel.Block>
                )}
              </Panel.Block>
            );
          })}
        </Panel>

        <AddProductToCustomer
          isOpen={modal}
          onClose={CloseModal}
          customer={selectedCustomer}
        />
      </Column>
    </Columns>
  );
};

export default Products;
