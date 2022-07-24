import { Card, Title, Columns, Column } from "react-bulma-companion";

const Products = () => {
  return (
    <Columns>
      <Column size="half">
        <Card>
          <Card.HeaderTitle centered>
            <Title size="3">Purchased Products</Title>
          </Card.HeaderTitle>
        </Card>
      </Column>
      <Column size="half">hh</Column>
    </Columns>
  );
};

export default Products;
