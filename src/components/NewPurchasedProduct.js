import { Modal, Dropdown, Button, Icon } from "react-bulma-companion";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const NewPurchasedProduct = (props) => {
  const [dropOpen, setDropOpen] = useState(false);

  const toggleDropdown = () => {
    setDropOpen(!dropOpen);
  };
  return (
    <Modal active={props.modalOpen}>
      <Modal.Background>
        <Modal.Card className="mt-6">
          <Modal.CardHead>
            <Modal.CardTitle className="is-flex is-justify-content-center">
              New Product
            </Modal.CardTitle>
          </Modal.CardHead>
          <Modal.Close onClick={props.modalClose} />
          <Modal.CardBody style={{ height: "440px" }}>
            <Dropdown
              className="is-flex is-justify-content-center"
              active={dropOpen}
              onClick={toggleDropdown}
            >
              <Dropdown.Trigger>
                <Button aria-haspopup="true" aria-controls="dropdown-menu">
                  <span>Products</span>
                  <Icon size="small">
                    <FontAwesomeIcon icon={faAngleDown} />
                  </Icon>
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Menu
                id="dropdown-menu"
                role="menu"
                style={{ left: "200px" }}
              >
                <Dropdown.Content>
                  {props.products.map((product) => {
                    return <Dropdown.Item>{product.name}</Dropdown.Item>;
                  })}
                </Dropdown.Content>
              </Dropdown.Menu>
            </Dropdown>
          </Modal.CardBody>
        </Modal.Card>
      </Modal.Background>
    </Modal>
  );
};

export default NewPurchasedProduct;
