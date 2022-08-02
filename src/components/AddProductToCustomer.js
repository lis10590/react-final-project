import { Dropdown, Button, Modal } from "react-bulma-companion";
import DropdownComp from "./DropdownComp";
import { useState } from "react";
import { products } from "./database";

const AddProductToCustomer = () => {
  const [dropOpen, setDropOpen] = useState(false);
  const [title, setTitle] = useState("Products");
  const [selectedProduct, setSelectedProduct] = useState("");

  const toggleDropdown = () => {
    setDropOpen(!dropOpen);
  };

  const selectProduct = (e) => {
    setTitle(e.target.innerHTML);
    setSelectedProduct(e.target.innerHTML);
    setDropOpen(false);
  };

  return (
    <Modal>
      <Modal.Background>
        <Modal.Card>
          <Modal.CardHead>
            <Modal.CardTitle className="is-flex is-justify-content-center">
              Add Product
            </Modal.CardTitle>
          </Modal.CardHead>
          <Modal.Close onClick={props.modalClose} />
          <Modal.CardBody style={{ height: "440px" }}>
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
            <Button color="primary">Save</Button>
          </Modal.CardBody>
        </Modal.Card>
      </Modal.Background>
    </Modal>
  );
};

export default AddProductToCustomer;
