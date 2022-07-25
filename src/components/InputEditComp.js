import { Input, Field, Control } from "react-bulma-companion";

const InputEditComp = (props) => {
  return (
    <div>
      <Field>
        <Control>
          {props.inputName}
          <Input type={props.type} placeholder={props.placeholder} />
        </Control>
      </Field>
    </div>
  );
};

export default InputEditComp;
