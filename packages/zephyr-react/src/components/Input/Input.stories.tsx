import { Input } from './Input';

export const Default = () => {
  return <Input name="User name" label="Username" placeholder="Enter username" />;
};

export const Required = () => {
  return <Input name="username" label="Username" placeholder="Enter username" required />;
};

export const LabelDescription = () => {
  return (
    <Input
      name="Name"
      label="Name"
      labelDescription="This will be your display name"
      placeholder="Enter username"
    />
  );
};

export const OptionalInputIndicator = () => {
  return <Input name="User name" label="Username" placeholder="Enter username" optionalLabel />;
};

export const OptionalInputIndicatorLabelDescription = () => {
  return (
    <div>
      <Input
        name="Name"
        label="Name"
        labelDescription="This will be your display name"
        placeholder="Enter username"
        optionalLabel
      />
    </div>
  );
};

export const ErrorMessage = () => {
  return (
    <Input
      name="User name"
      label="Username"
      placeholder="Enter username"
      errorMessage="This username isn't available"
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

export const FieldTypes = () => {
  return (
    <div className="space-y-4">
      <Input type="email" name="email" label="Email" placeholder="Enter email" />
      <Input type="password" name="password" label="Password" placeholder="Enter password" />
      <Input type="currency" name="currency" label="Currency" placeholder="Enter amount" />
      <Input type="tel" name="phone" label="Phone" placeholder="Enter phone number" />
      <Input type="percent" name="percent" label="Percent" placeholder="Enter percent" />
      <Input type="number" name="number" label="Number" placeholder="Enter number" />
      <Input type="month" name="month" label="Month" placeholder="Enter month" />
      <Input type="color" name="color" label="Color" placeholder="Enter color" />
      <Input type="url" name="url" label="Url" placeholder="Enter url" />
      <Input type="date" name="date" label="Date" placeholder="Enter date" />
      <Input type="time" name="time" label="Date/Time" placeholder="Enter date/time" />
      <Input type="datetime-local" name="dt" label="Date/Time" placeholder="Enter date/time" />
    </div>
  );
};
