import { generatePropPickerFn } from 'utils';
import type { DragHandleProps as RQBDragHandleProps } from 'react-querybuilder';
import { useQueryBuilderContext } from 'components/QueryBuilder/QueryBuilder.context';
import { IconButtonProps } from 'components/IconButton';
import { forwardRef } from 'react';
import { Input } from 'components/Input';
import { cx } from 'helpers';

type QueryDragHandleProps = RQBDragHandleProps & IconButtonProps;

const pickRQBDragHandleProps = generatePropPickerFn<RQBDragHandleProps>({
  label: '_pick_',
  className: '_pick_',
  path: '_pick_',
  level: '_pick_',
  title: '_pick_',
  disabled: '_pick_',
  context: '_pick_',
  validation: '_pick_',
  testID: '_pick_',
  schema: '_pick_',
});

export const QueryDragHandle = forwardRef<HTMLSpanElement, QueryDragHandleProps>(
  (props, forwardedRef) => {
    const rqbDragHandleProps = pickRQBDragHandleProps(props);

    const iconButtonProps = pickRQBDragHandleProps.omit(props);

    const { title } = rqbDragHandleProps;

    const { enableDragAndDrop } = useQueryBuilderContext();

    return enableDragAndDrop ? (
      <Input.Container>
        <span ref={forwardedRef} className={cx('w-16 h-16 block')} title={title}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 48 48"
            className="fill-current opacity-10"
            // className="fill-storm-200"
          >
            <path d="M17.5 40q-1.45 0-2.475-1.025Q14 37.95 14 36.5q0-1.45 1.025-2.475Q16.05 33 17.5 33q1.45 0 2.475 1.025Q21 35.05 21 36.5q0 1.45-1.025 2.475Q18.95 40 17.5 40Zm13 0q-1.45 0-2.475-1.025Q27 37.95 27 36.5q0-1.45 1.025-2.475Q29.05 33 30.5 33q1.45 0 2.475 1.025Q34 35.05 34 36.5q0 1.45-1.025 2.475Q31.95 40 30.5 40Zm-13-12.5q-1.45 0-2.475-1.025Q14 25.45 14 24q0-1.45 1.025-2.475Q16.05 20.5 17.5 20.5q1.45 0 2.475 1.025Q21 22.55 21 24q0 1.45-1.025 2.475Q18.95 27.5 17.5 27.5Zm13 0q-1.45 0-2.475-1.025Q27 25.45 27 24q0-1.45 1.025-2.475Q29.05 20.5 30.5 20.5q1.45 0 2.475 1.025Q34 22.55 34 24q0 1.45-1.025 2.475Q31.95 27.5 30.5 27.5ZM17.5 15q-1.45 0-2.475-1.025Q14 12.95 14 11.5q0-1.45 1.025-2.475Q16.05 8 17.5 8q1.45 0 2.475 1.025Q21 10.05 21 11.5q0 1.45-1.025 2.475Q18.95 15 17.5 15Zm13 0q-1.45 0-2.475-1.025Q27 12.95 27 11.5q0-1.45 1.025-2.475Q29.05 8 30.5 8q1.45 0 2.475 1.025Q34 10.05 34 11.5q0 1.45-1.025 2.475Q31.95 15 30.5 15Z" />
          </svg>
        </span>
      </Input.Container>
    ) : null;
  }
);

QueryDragHandle.displayName = 'QueryDragHandle';