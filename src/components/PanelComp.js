import { Panel } from "react-bulma-companion";

const PanelComp = (props) => {
  return (
    <Panel>
      <Panel.Heading>{props.panelHeading}</Panel.Heading>

      {props.children}
    </Panel>
  );
};

export default PanelComp;
