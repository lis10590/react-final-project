import { Columns,Column,Panel,Title,Control,Icon,Input } from "react-bulma-companion";
import { products,customers,purchases } from "./database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";



const Purchases = () =>{

return (
    <div>
        <Title className="is-flex is-justify-content-center">Purchased Products</Title>
        <Control className="mb-6" iconsLeft>
      <Input placeholder="Search" />
      <Icon align="left">
        <FontAwesomeIcon icon={faSearch} />
      </Icon>
    </Control>
        <Columns>
        <Column size="half">
            <Panel>
                <Panel.Heading>Customers</Panel.Heading>
                {
                    customers.map(customer=>{
                        return <Panel.Block>{customer.firstName+ " " + customer.lastName}</Panel.Block>
                    })
                }
                
            </Panel>
        </Column>
        <Column size="half">
            <Panel>
                <Panel.Heading>Products</Panel.Heading>
                {
                    products.map(product=>{
                        return <Panel.Block>{product.name}</Panel.Block>
                    })
                }
            </Panel>
        </Column>
        </Columns>
    </div>
)

    
    
}


export default Purchases;