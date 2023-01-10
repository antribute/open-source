import { createTsForm } from '@ts-react/form';
import { formMapping } from 'components/Form/components/fields';

type FormComponentMapping = Parameters<typeof createTsForm>[0];

export const createForm = <TMapping extends FormComponentMapping>(mapping?: TMapping) =>
  createTsForm(mapping ? [...formMapping, ...mapping] : formMapping);
