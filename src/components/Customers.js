import { Button, Table, Title } from "react-bulma-companion";
import { getAllCustomers, selectAllCustomers } from "../store/customersReducer";
import { getAllPurchases, selectAllPurchases } from "../store/purchasesReducer";
import { getAllProducts, selectAllProducts } from "../store/productsReducer";
import { modalActions } from "../store/modalReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import styles from "../styles/styles.scss";
import AddProductToCustomer from "./AddProductToCustomer";

const Customers = () => {
  const modal = useSelector((state) => state.modal.modalState);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCustomers());
    dispatch(getAllPurchases());
    dispatch(getAllProducts());
  }, [dispatch]);

  const customers = useSelector(selectAllCustomers);
  const purchases = useSelector(selectAllPurchases);
  const products = useSelector(selectAllProducts);

  const openModal = (customer) => {
    dispatch(modalActions.ModalOpen());
    console.log(customer);
    setSelectedCustomer(customer);
  };
  const CloseModal = () => {
    dispatch(modalActions.ModalClose());
  };

  return (
    <div>
      <Title className="is-flex is-justify-content-center mb-6 mt-6">
        Customers
      </Title>
      <div className="customers-table">
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>
                Purchased Products <br></br> and Date of Purchase{" "}
              </Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {customers[0]
              ? customers.map((customer) => {
                  return (
                    <div>
                      <Table.Row key={customer.id}>
                        <Table.DataCell>
                          {customer.firstName + " " + customer.lastName}
                        </Table.DataCell>
                        {purchases[0]
                          ? purchases.map((purchase) => {
                              if (purchase.customerId === customer.id) {
                                for (const product of products) {
                                  if (product.id === purchase.productId) {
                                    return (
                                      <div>
                                        <Table.DataCell>
                                          {product.name}
                                        </Table.DataCell>
                                        <Table.DataCell>
                                          {purchase.date}
                                        </Table.DataCell>
                                      </div>
                                    );
                                  }
                                }
                              }
                            })
                          : null}
                        <Button
                          className="ml-6"
                          color="primary"
                          onClick={() => {
                            openModal(customer.id);
                          }}
                        >
                          Buy
                        </Button>
                      </Table.Row>
                    </div>
                  );
                })
              : null}
          </Table.Body>
        </Table>
      </div>
      <AddProductToCustomer
        isOpen={modal}
        onClose={CloseModal}
        customer={selectedCustomer}
        btnName="Buy Product"
      />
    </div>
  );
};

export default Customers;
