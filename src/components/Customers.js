import { Button, Table, Title } from "react-bulma-companion";
import styles from "../styles/styles.scss";

const Customers = () => {
  const customers = [
    {
      id: 1,
      name: "Leanne Graham",
      products: ["Bikini", "Sunglasses"],
    },
    {
      id: 2,
      name: "Clementine Bauch",
      products: ["Skirt"],
    },
    {
      id: 3,
      name: "Mrs. Dennis Schulist",
      products: ["Denim Shorts", "Skinny Jeans"],
    },
  ];
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
                  <Table.DataCell>{customer.name}</Table.DataCell>
                  <Table.DataCell>{customer.products}</Table.DataCell>
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
