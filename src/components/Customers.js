import { Button, Table, Title } from "react-bulma-companion";
import { getAllCustomers, selectAllCustomers } from "../store/customersReducer";
import { getAllPurchases, selectAllPurchases } from "../store/purchasesReducer";
import { getAllProducts, selectAllProducts } from "../store/productsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styles from "../styles/styles.scss";

const Customers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCustomers());
    dispatch(getAllPurchases());
    dispatch(getAllProducts());
  }, [dispatch]);

  const customers = useSelector(selectAllCustomers);
  const purchases = useSelector(selectAllPurchases);
  const products = useSelector(selectAllProducts);

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
              <Table.HeadCell>Purchased Products</Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {customers.map((customer) => {
              return (
                <Table.Row key={customer.id}>
                  <Table.DataCell>
                    {customer.firstName + " " + customer.lastName}
                  </Table.DataCell>
                  {purchases.map((purchase) => {
                    if (purchase.customerId === customer.id) {
                      for (const product of products) {
                        if (product.id === purchase.productId) {
                          return (
                            <Table.DataCell>{product.name}</Table.DataCell>
                          );
                        }
                      }
                    }
                  })}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
      <div className="customers-add-btn">
        <Button color="primary">Add</Button>
      </div>
    </div>
  );
};

export default Customers;
