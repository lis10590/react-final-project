import { Dropdown, Icon, Button } from "react-bulma-companion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const DropdownComp = (props) => {
  return (
    <Dropdown active={props.active}>
      <Dropdown.Trigger>
        <Button
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={props.onClickDrop}
        >
          <span>{props.dropTitle}</span>
          <Icon size="small">
            <FontAwesomeIcon icon={faAngleDown} />
          </Icon>
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Menu id="dropdown-menu" role="menu">
        <Dropdown.Content>
          {props.children}
          <Dropdown.Divider />
          <Dropdown.Item component="a" onClick={props.onClickDivider}>
            {props.dividerName}
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownComp;
