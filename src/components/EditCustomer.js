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
import { useState } from "react";
import { customers } from "./database";
import InputEditComp from "./InputEditComp";

const EditCustomer = () => {
  const [dropOpen, setDropOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [title, setTitle] = useState("Customers");

  const toggleDropdown = () => {
    setDropOpen(!dropOpen);
  };

  const selectCustomer = (e) => {
    setTitle(e.target.innerHTML);
    setSelectedCustomer(e.target.innerHTML);
    setDropOpen(false);
  };

  const currentCustomer = customers.filter(
    (cutomer) => selectedCustomer === cutomer.firstName + " " + cutomer.lastName
  );
  return (
    <div>
      <Title>Edit Customer</Title>
      <Columns>
        <Column size="half">
          <PanelComp panelHeading="Select Customer">
            <Panel.Block>
              <DropdownComp
                active={dropOpen}
                dropTitle={title}
                onClickDrop={toggleDropdown}
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
              <Button className="mt-4" color="primary">
                Delete Customer
              </Button>
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
                    <InputEditComp type="text" placeholder="Enter first name" />
                    Last Name:{" "}
                    <InputEditComp type="text" placeholder="Enter last name" />
                    City: <InputEditComp type="text" placeholder="Enter city" />
                  </Panel.Block>
                  <Panel.Block>
                    <Button color="primary">Update</Button>
                  </Panel.Block>
                </Column>
              </Columns>
            </Panel.Block>
          </PanelComp>
        </Column>
        <Column size="half">
          <PanelComp panelHeading="Purchases">
            <Panel.Block></Panel.Block>
          </PanelComp>
        </Column>
      </Columns>
    </div>
  );
};

export default EditCustomer;
