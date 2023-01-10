import { createUniqueFieldSchema, useTsController } from '@ts-react/form';
import { ControlledInput, ControlledInputProps } from 'components/Form/components/ControlledInput';
import { z } from 'zod';

export type EmailFieldId = 'email';

const EmailField = (props: Omit<ControlledInputProps, 'type'>) => {
  return <ControlledInput type="email" {...props} />;
};

export const EmailFieldSchema = createUniqueFieldSchema(
  z.string().describe('Email // example@mail.com').email({ message: 'Enter a valid email' }),
  'email'
);

export const EmailFieldFormMapping = [EmailFieldSchema, EmailField] as const;
