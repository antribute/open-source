import { useContext } from 'react';
import { QueryBuilderContext } from 'react-querybuilder';

export function useQueryBuilderContext() {
  return useContext(QueryBuilderContext);
}
