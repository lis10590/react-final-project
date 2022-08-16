import {
  Columns,
  Column,
  Panel,
  Title,
  Control,
  Icon,
  Input,
} from "react-bulma-companion";

import { getAllCustomers, selectAllCustomers } from "../store/customersReducer";
import { getAllProducts, selectAllProducts } from "../store/productsReducer";
import { getAllPurchases, selectAllPurchases } from "../store/purchasesReducer";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Purchases = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  useEffect(() => {
    dispatch(getAllCustomers());
    dispatch(getAllProducts());
    dispatch(getAllPurchases());
  }, [dispatch]);

  const products = useSelector(selectAllProducts);
  const customers = useSelector(selectAllCustomers);
  const purchases = useSelector(selectAllPurchases);
  console.log(products);
  console.log(customers);

  const onChangeDateHandler = (e) => {
    setDate(e.target.value);
    console.log(date);
  };

  return (
    <div>
      <Title className="is-flex is-justify-content-center">
        Purchased Products
      </Title>
      <Control className="mb-6" iconsLeft>
        <Input
          placeholder="Search"
          onChange={onChangeDateHandler}
          value={date}
        />
        <Icon align="left">
          <FontAwesomeIcon icon={faSearch} />
        </Icon>
      </Control>
      <Columns>
        <Column size="half">
          <Panel>
            <Panel.Heading>Customers</Panel.Heading>
            {customers.map((customer) => {
              for (const purchase of purchases) {
                if (
                  purchase.customerId === customer.id &&
                  purchase.date.includes(date)
                ) {
                  return (
                    <Panel.Block>
                      {customer.firstName + " " + customer.lastName}
                    </Panel.Block>
                  );
                }
              }
            })}
          </Panel>
        </Column>

        <Column size="half">
          <Panel>
            <Panel.Heading>Products</Panel.Heading>
            {products.map((product) => {
              for (const purchase of purchases) {
                if (
                  purchase.productId === product.id &&
                  purchase.date.includes(date)
                ) {
                  return <Panel.Block>{product.name}</Panel.Block>;
                }
              }
            })}
          </Panel>
        </Column>
      </Columns>
    </div>
  );
};

export default Purchases;
