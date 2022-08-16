import {
  Columns,
  Column,
  Title,
  Panel,
  Dropdown,
  Button,
} from "react-bulma-companion";
import PanelComp from "./PanelComp";
import DropdownComp from "./DropdownComp";
import { useState, useEffect } from "react";
import InputEditComp from "./InputEditComp";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, selectAllProducts } from "../store/productsReducer";
import {
  getAllPurchases,
  selectAllPurchases,
  deleteOnePurchase,
} from "../store/purchasesReducer";
import {
  getAllCustomers,
  selectAllCustomers,
  updateOneCustomer,
  deleteOneCustomer,
} from "../store/customersReducer";
import { Link } from "react-router-dom";

const EditCustomer = () => {
  const [dropOpen, setDropOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [title, setTitle] = useState("Customers");
  const [input, setInput] = useState({ firstName: "", lastName: "", city: "" });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllPurchases());
    dispatch(getAllCustomers());
  }, [dispatch]);

  const products = useSelector(selectAllProducts);
  const purchases = useSelector(selectAllPurchases);
  const customers = useSelector(selectAllCustomers);

  const onChangeInputHandler = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateCustomer = () => {
    const id = currentCustomer[0].id;
    const data = {
      id: id,
      city: input.city,
      firstName: input.firstName,
      lastName: input.lastName,
    };

    dispatch(updateOneCustomer(data));
  };

  const deleteCustomer = () => {
    const id = currentCustomer[0].id;
    for (const purchase of purchases) {
      if (purchase.customerId === id) {
        dispatch(deleteOnePurchase(purchase.id));
      }
    }
    dispatch(deleteOneCustomer(id));
  };

  const toggleDropdown = () => {
    setDropOpen(!dropOpen);
  };

  const selectCustomer = (e) => {
    setTitle(e.target.innerHTML);
    setSelectedCustomer(e.target.innerHTML);
    setDropOpen(false);
    const data = customers.filter(
      (customer) =>
        customer.firstName + " " + customer.lastName === e.target.innerHTML
    );
    setSelectedCustomerId(data[0].id);
    const purchasedProducts = purchases.filter(
      (purchase) => purchase.customerId === selectedCustomerId
    );

    const productsArr = [];
    products.map((product) => {
      purchasedProducts.map((purchased) => {
        if (product.id === purchased.productId) {
          productsArr.push(product);
        }
      });
    });

    setSelectedProducts(productsArr);
  };

  const currentCustomer = customers.filter(
    (cutomer) => selectedCustomer === cutomer.firstName + " " + cutomer.lastName
  );

  return (
    <div>
      <Title className="is-flex is-justify-content-center mt-6 mb-6">
        Edit Customer
      </Title>
      <Columns>
        <Column size="half">
          <PanelComp panelHeading="Select Customer">
            <Panel.Block>
              <DropdownComp
                active={dropOpen}
                dropTitle={title}
                onClickDrop={toggleDropdown}
                dividerName="Customers"
                onClickDivider={selectCustomer}
              >
                {customers.map((customer) => {
                  return (
                    <Dropdown.Item
                      key={customer.id}
                      onClick={selectCustomer}
                      component="a"
                    >
                      {customer.firstName + " " + customer.lastName}
                    </Dropdown.Item>
                  );
                })}
              </DropdownComp>
              <Button onClick={deleteCustomer} className="mt-4" color="primary">
                Delete Customer
              </Button>
              {selectedCustomer && selectedCustomer !== "Customers" && (
                <Columns>
                  <Column size="half">
                    <Panel.Block>Current Customer Data</Panel.Block>
                    <Panel.Block>
                      First Name:{" "}
                      {currentCustomer.length > 0
                        ? currentCustomer[0].firstName
                        : null}{" "}
                      <br></br>
                      Last Name:{" "}
                      {currentCustomer.length > 0
                        ? currentCustomer[0].lastName
                        : null}{" "}
                      <br></br>
                      City:{" "}
                      {currentCustomer.length > 0
                        ? currentCustomer[0].city
                        : null}{" "}
                      <br></br>
                    </Panel.Block>
                  </Column>
                  <Column size="half">
                    <Panel.Block>
                      First Name:{" "}
                      <InputEditComp
                        name="firstName"
                        value={input.firstName}
                        type="text"
                        placeholder="Enter first name"
                        onChange={onChangeInputHandler}
                      />
                      Last Name:{" "}
                      <InputEditComp
                        name="lastName"
                        value={input.lastName}
                        type="text"
                        placeholder="Enter last name"
                        onChange={onChangeInputHandler}
                      />
                      City:{" "}
                      <InputEditComp
                        name="city"
                        value={input.city}
                        type="text"
                        placeholder="Enter city"
                        onChange={onChangeInputHandler}
                      />
                    </Panel.Block>
                    <Panel.Block>
                      <Button color="primary" onClick={updateCustomer}>
                        Update
                      </Button>
                    </Panel.Block>
                  </Column>
                </Columns>
              )}
            </Panel.Block>
          </PanelComp>
        </Column>
        <Column size="half">
          <PanelComp panelHeading="Purchases">
            {purchases.map((purchase) => {
              if (selectedCustomerId === purchase.customerId) {
                for (const product of products) {
                  if (product.id === purchase.productId) {
                    return (
                      <Panel.Block component={Link} to="/editproduct">
                        {product.name}
                      </Panel.Block>
                    );
                  }
                }
              }
            })}
          </PanelComp>
        </Column>
      </Columns>
    </div>
  );
};

export default EditCustomer;
