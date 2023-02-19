import { MyButtonProps } from 'types';

interface MyButtonComponentProps extends React.HTMLProps<HTMLButtonElement>, MyButtonProps {}

const MyButton = ({ type, ...props }: MyButtonComponentProps) => {
  return (
    <button {...props} type="button">
      hello
    </button>
  );
};

const A = () => {
  return <MyButton />;
};
