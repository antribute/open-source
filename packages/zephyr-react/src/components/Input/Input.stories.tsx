import { Input } from './Input';

export const Default = () => {
  return <Input name="User name" label="Username" placeholder="Enter username" />;
};

export const ErrorMessage = () => {
  return (
    <Input
      name="User name"
      label="Username"
      placeholder="Enter username"
      errorMessage="This field is required"
      defaultValue="daishi"
    />
  );
};

export const SuccessMessage = () => {
  return (
    <Input
      name="User name"
      label="Username"
      placeholder="Enter username"
      successMessage="This username is available!"
      defaultValue="daishi"
    />
  );
};

export const Required = () => {
  return <Input name="username" label="Username" placeholder="Enter username" required />;
};
