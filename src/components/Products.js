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
  const [isOpen, setIsOpen] = useState(false);

  const products = useSelector(selectAllProducts);
  const purchases = useSelector(selectAllPurchases);
  const customers = useSelector(selectAllCustomers);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllPurchases());
    dispatch(getAllCustomers());
  }, [dispatch]);

  const PurchasedProductsList = () => {
    let productIdArr = [];
    for (const purchase in purchases) {
      productIdArr.push(purchase.productId);
    }
    const dup = new Set(productIdArr).size !== productIdArr.length;
    let isDuplicate;
    if (dup) {
      isDuplicate = productIdArr.filter((item, index) => {
        return productIdArr.indexOf(item) !== index;
      });
    }

    let duplicatePurchases = [];
    for (const purchase of purchases) {
      for (const item of isDuplicate) {
        if (purchase.productId === item) {
          duplicatePurchases.push(purchase);
        }
      }
    }
    let customersIdArr = [];
    if (duplicatePurchases.length > 1) {
      for (const item of duplicatePurchases) {
        customersIdArr.push(item.customerId);
      }
    }

    let customersArr = [];
    for (const item of customersIdArr) {
      for (const customer of customers) {
        if (item === customer.id) {
          customersArr.push(customer.firstName + " " + customer.lastName);
        }
      }
    }

    let dateArr = [];
    for (const purchase of purchases) {
      for (const item of isDuplicate) {
        if (purchase.productId === item) {
          dateArr.push(purchase.date);
        }
      }
    }
  };

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
