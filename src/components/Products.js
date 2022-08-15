import { Panel, Columns, Column, Button } from "react-bulma-companion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTShirt } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modalReducer";
import { getAllProducts, selectAllProducts } from "../store/productsReducer";
import { getAllPurchases, selectAllPurchases } from "../store/purchasesReducer";
import { getAllCustomers, selectAllCustomers } from "../store/customersReducer";
import AddProductToCustomer from "./AddProductToCustomer";
import { Link } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.modalState);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllPurchases());
    dispatch(getAllCustomers());
  }, [dispatch]);

  const products = useSelector(selectAllProducts);
  const purchases = useSelector(selectAllPurchases);
  const customers = useSelector(selectAllCustomers);
  console.log(products);

  const openModal = (customer) => {
    dispatch(modalActions.ModalOpen());
    console.log(customer);
    setSelectedCustomer(customer);
  };
  const CloseModal = () => {
    dispatch(modalActions.ModalClose());
  };

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
                {product.name} <br></br>
                Price: {product.price}
                <br></br>
                Quantity: {product.quantity} <br></br>
                <Panel.Heading>Customers</Panel.Heading>
                {purchases.map((purchase) => {
                  if (purchase.productId === product.id) {
                    for (const customer of customers) {
                      if (customer.id === purchase.customerId) {
                        return (
                          <div>
                            <Panel.Block component={Link} to="/editcustomer">
                              {customer.firstName + " " + customer.lastName}
                            </Panel.Block>
                            <Button
                              color="primary"
                              onClick={() => {
                                openModal(purchase.customerId);
                              }}
                            >
                              Add
                            </Button>
                          </div>
                        );
                      }
                    }
                  }
                })}
              </Panel.Block>
            );
          })}
        </Panel>

        <AddProductToCustomer
          isOpen={modal}
          onClose={CloseModal}
          customer={selectedCustomer}
          btnName="Save"
        />
      </Column>
    </Columns>
  );
};

export default Products;
