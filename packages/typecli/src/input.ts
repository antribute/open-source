import type { TSchema } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';
import prompts from 'prompts';
import type { PromptType } from 'prompts';

// The prompts package doesn't have the best TypeScript typings, especially for prompt names and
// prompt output types. In order to properly map this, we need to create a mapping of PromptTypes
// to actual typescript types and then hook that all together using a generic tied to the type
// parameter. It's pretty cool when you think about it, and maybe we should contribute this to the
// official @types/prompts package? We also threw in TypeBox validation instead of the builtin
// Prompts validation to standardize how we validate data across the Antribute stack
export interface AskQuestionOptions<InputType extends PromptType> {
  type: InputType;
  validate?: TSchema;
}

export interface OutputType extends Record<PromptType, unknown> {
  text: string;
  password: string;
  invisible: string;
  number: number;
  confirm: boolean;
  list: string[];
  toggle: boolean;
  select: string;
  multiselect: string[];
  autocomplete: string;
  date: Date;
  autocompleteMultiselect: string[];
}
export const askQuestion = async <InputType extends PromptType>(
  question: string,
  { validate, ...options }: AskQuestionOptions<InputType>
) => {
  const { value } = (await prompts([
    {
      ...options,
      message: question,
      name: 'value',
      validate: validate ? (valueToValidate) => Value.Check(validate, valueToValidate) : undefined,
    },
  ])) as { value: OutputType[InputType] };
  return value;
};
