/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/unbound-method */
import { Input, InputComponentProps } from 'components/Input';
import { QueryValueSelector } from 'components/QueryBuilder/components/QueryValueSelector';
import type { ValueEditorProps, ValueEditorType } from 'react-querybuilder';

type ValueEditorComponentType = Extract<ValueEditorType, string>;

type ValueEditorComponentMapType = Record<
  ValueEditorComponentType,
  (props: ValueEditorProps) => JSX.Element
>;

const valueEditorComponentMap: ValueEditorComponentMapType = {
  select: SelectValueEditorField,
  multiselect: MultiSelectValueEditorField,
  switch: CheckboxValueEditorField,
  radio: CheckboxValueEditorField,
  textarea: TextAreaValueEditorField,
  text: TextValueEditorField,
  checkbox: CheckboxValueEditorField,
};

export const QueryValueEditor = (props: ValueEditorProps) => {
  const Component = props.type ? valueEditorComponentMap[props.type] : valueEditorComponentMap.text;

  return <Component {...props} />;
};

function SelectValueEditorField({ values, ...props }: ValueEditorProps) {
  return <QueryValueSelector {...props} options={[]} />;
}

function MultiSelectValueEditorField({ values, ...props }: ValueEditorProps) {
  return <QueryValueSelector {...props} options={[]} />;
}

function CheckboxValueEditorField(props: ValueEditorProps) {
  return <Input.CheckboxField value={props.value} {...getInputComponentProps(props)} />;
}

function TextValueEditorField(props: ValueEditorProps) {
  return <Input.TextField {...getInputComponentProps(props)} />;
}

function TextAreaValueEditorField(props: ValueEditorProps) {
  return <Input.TextAreaField {...getInputComponentProps(props)} />;
}

function getInputComponentProps(props: ValueEditorProps) {
  return {
    placeholder: props.title,
    // isDisabled: props.disabled,
    onChange: props.handleOnChange,
  } satisfies InputComponentProps & { onChange: (v: any) => void };
}
