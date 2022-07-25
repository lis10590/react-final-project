import { Panel } from "react-bulma-companion";

const PanelComp = (props) => {
  return (
    <Panel>
      <Panel.Heading className="is-flex is-justify-content-center">
        {props.panelHeading}
      </Panel.Heading>

      {props.children}
    </Panel>
  );
};

export default PanelComp;
