import React, { useEffect } from 'react';
import type { SelectState } from 'ariakit';
import { StatusBadge } from 'components/StatusBadge';
import { classed } from 'utils/classed';
import { motion, useWillChange } from 'framer-motion';
import { useImmer } from 'use-immer';
import { isMultiSelectValueString } from './Combobox.helpers';
import type { MultiSelectVariant } from './Combobox.types';

const SelectValueContainerElement = classed(
  'div',
  'font-body relative z-0 min-w-0 shrink whitespace-nowrap font-medium grow text-left',
  'select-none'
);

const PlaceholderElement = classed('div', 'font-body text-content-subtle focus:text-content-weak');

interface SingleSelectValueProps extends ComboboxSelectValueProps {
  value: string;
}

const SingleSelectValue = ({ value, placeholder }: SingleSelectValueProps) => {
  return (
    <div className="font-regular truncate">
      {value || <PlaceholderElement>{placeholder}</PlaceholderElement>}
    </div>
  );
};

interface MultiSelectValueProps extends ComboboxSelectValueProps {
  value: string[];
}

const MultiSelectValue = ({ value, placeholder }: MultiSelectValueProps) => {
  if (!(value.length > 0)) {
    return <PlaceholderElement>{placeholder}</PlaceholderElement>;
  }

  return <div className="overflow-y-visible truncate">{value.length} Selected</div>;
};

interface MultiSelectValueTagsProps extends ComboboxSelectValueProps {
  value: string[];
}

const MultiSelectValueTags = React.forwardRef<HTMLDivElement, MultiSelectValueTagsProps>(
  ({ value, placeholder, selectState }, ref) => {
    const willChange = useWillChange();

    const [orderedValues, updateOrderedValues] = useImmer<Set<string>>(new Set<string>());

    useEffect(() => {
      updateOrderedValues((draft) => {
        draft.forEach((v) => {
          if (!value.includes(v)) {
            draft.delete(v);
          }
        });
        value.forEach((v) => {
          draft.add(v);
        });
      });
    }, [updateOrderedValues, value]);

    if (!(value.length > 0)) {
      return (
        <SelectValueContainerElement
          as={motion.div}
          layout="position"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
        >
          <PlaceholderElement>{placeholder}</PlaceholderElement>
        </SelectValueContainerElement>
      );
    }

    return (
      <motion.div ref={ref} className="grow min-w-0 z-0 relative flex gap-6 flex-wrap">
        {/* <AnimatePresence> */}
        {[...orderedValues].map((e, i, arr) => (
          <motion.div
            key={e}
            className="relative"
            layout="position"
            style={{ zIndex: arr.length - i || 0, willChange }}
          >
            <StatusBadge
              rounded
              className="flex truncate max-h-24 !h-24"
              size="sm"
              onDiscard={() => {
                if (selectState.value) {
                  selectState.setValue(value.filter((v) => v !== e));
                }
              }}
            >
              {e}
            </StatusBadge>
          </motion.div>
        ))}
        {/* </AnimatePresence> */}
      </motion.div>
    );
  }
);

export interface ComboboxSelectValueProps {
  multiSelectVariant?: MultiSelectVariant;
  placeholder?: string;
  value: string | string[];
  selectState: SelectState;
}

export const ComboboxSelectValue = ({
  multiSelectVariant = 'count',
  value,
  ...props
}: ComboboxSelectValueProps) => {
  if (isMultiSelectValueString(value) && multiSelectVariant === 'tags') {
    return <MultiSelectValueTags {...props} value={value} />;
  }

  if (isMultiSelectValueString(value)) {
    return (
      <SelectValueContainerElement>
        <MultiSelectValue {...props} value={value} />
      </SelectValueContainerElement>
    );
  }

  return (
    <SelectValueContainerElement>
      <SingleSelectValue {...props} value={value} />
    </SelectValueContainerElement>
  );
};
