import { Dropdown, Button, Modal } from "react-bulma-companion";
import DropdownComp from "./DropdownComp";
import { useState, useEffect } from "react";
import { getAllProducts, selectAllProducts } from "../store/productsReducer";
import { getAllCustomers, selectAllCustomers } from "../store/customersReducer";
import { purchaseAddition } from "../store/purchasesReducer";
import { useSelector, useDispatch } from "react-redux";

const AddProductToCustomer = (props) => {
  const [dropOpen, setDropOpen] = useState(false);
  const [title, setTitle] = useState("Products");
  const [selectedProduct, setSelectedProduct] = useState("");

  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const customers = useSelector(selectAllCustomers);
  console.log(props.customer);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCustomers());
  }, [dispatch]);

  const toggleDropdown = () => {
    setDropOpen(!dropOpen);
  };

  const selectProduct = (e) => {
    setTitle(e.target.innerHTML);
    setSelectedProduct(e.target.innerHTML);
    setDropOpen(false);
  };

  const onSaveProductHandler = () => {
    let arr = [];
    let obj = {};
    let customerId;
    let productId;
    for (const customerItem of customers) {
      obj = {
        fullName: customerItem.firstName + " " + customerItem.lastName,
        id: customerItem.id,
      };

      arr.push(obj);
    }

    for (const item of arr) {
      if (item.fullName === props.customer) {
        customerId = item.id;
      }
    }

    for (const item of products) {
      if (item.name === selectedProduct) {
        productId = item.id;
      }
    }
    const purchase = {
      customerId,
      productId,
      date: new Date().toLocaleString().split(",")[0],
    };
    dispatch(purchaseAddition(purchase));
  };

  return (
    <Modal active={props.isOpen}>
      <Modal.Background>
        <Modal.Card>
          <Modal.CardHead>
            <Modal.CardTitle className="is-flex is-justify-content-center">
              Add Product
            </Modal.CardTitle>
          </Modal.CardHead>
          <Modal.Close onClick={props.onClose} />
          <Modal.CardBody style={{ height: "440px" }}>
            <div className="is-flex is-justify-content-center">
              <DropdownComp
                active={dropOpen}
                dropTitle={title}
                onClickDrop={toggleDropdown}
                dividerName="Products"
                onClickDivider={selectProduct}
              >
                {products.map((product) => {
                  return (
                    <Dropdown.Item key={product.id} onClick={selectProduct}>
                      {product.name}
                    </Dropdown.Item>
                  );
                })}
              </DropdownComp>
            </div>
            <div className="is-flex is-justify-content-center mt-6">
              <Button onClick={onSaveProductHandler} color="primary">
                Save
              </Button>
            </div>
          </Modal.CardBody>
        </Modal.Card>
      </Modal.Background>
    </Modal>
  );
};

export default AddProductToCustomer;
