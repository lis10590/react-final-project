import { Card,Title, Columns,Column } from "react-bulma-companion";

const Products = () =>{

    return (
        <Columns>
        <Column size="is-half">
        <Card>
            <Card.HeaderTitle centered>
                <Title size="3" >Purchased Products</Title> 
                 </Card.HeaderTitle>
           
        </Card>
        </Column>
        <Column size="is-half">
        </Column>
        </Columns>
  
    )
  


}


export default Products;