import { Input, Field, Control } from "react-bulma-companion";

const InputEditComp = (props) => {
  return (
    <div>
      <Field>
        <Control>
          {props.inputName}
          <Input
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            type={props.type}
            placeholder={props.placeholder}
          />
        </Control>
      </Field>
    </div>
  );
};

export default InputEditComp;
