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
    />
  );
};

export const Required = () => {
  return <Input name="username" label="Username" placeholder="Enter username" required />;
};
