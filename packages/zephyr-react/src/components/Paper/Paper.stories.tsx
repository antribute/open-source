import { capitalCase } from 'change-case';
import { Paper, PaperProps } from 'components/Paper/Paper';
import { SimpleList } from 'components/SimpleList';
import { map } from 'lodash-es';
import { twMerge } from 'tailwind-merge';

const PaperRow = ({ className, color, ...props }: PaperProps) => {
  const colorLabel = capitalCase(color ?? '');

  const paperRowProps: PaperProps[] = [
    // { children: colorLabel },
    { hoverHighlight: true, color },
    {
      border: true,
      hoverHighlight: true,
      onClick: () => {},
    },
    { loading: true },
    {
      loading: true,
      hideChildrenWhileLoading: true,
    },
  ];

  return (
    <>
      {paperRowProps.map((e) => {
        return (
          <Paper
            {...props}
            {...e}
            color={color}
            className={twMerge('col-span-3 w-full ', className)}
          >
            <SimpleList.Root variant="bullets">
              {Object.entries(e).map(([k, v]) => (
                <SimpleList.Item className="font-mono">
                  {k}:
                  <>
                    <span className="float-right align-middle text-xs leading-md">
                      {v?.toString()}
                    </span>
                  </>
                </SimpleList.Item>
              ))}
            </SimpleList.Root>
          </Paper>
        );
      })}
    </>
  );
};

export const Default = () => {
  return (
    <div className="w-full">
      <Paper color="surface" className="mb-38 flex h-200 w-200 flex-col gap-8">
        <div>Surface</div>
        <Paper color="surface-light" className="h-full grow">
          Surface Light
        </Paper>
      </Paper>
      <Paper color="surface-neutral" className="mb-38 flex h-200 w-200 flex-col gap-8">
        <div> Neutral</div>
        <Paper color="surface-neutral-light" className="h-full grow">
          Neutral Light
        </Paper>
      </Paper>
      <div className="grid w-full grid-cols-12 gap-16">
        <PaperRow color="surface" />
        <PaperRow color="surface-light" />
        <PaperRow color="surface-dark" />
        <PaperRow color="surface-neutral" />
        <PaperRow color="surface-neutral-light" />
        <PaperRow color="surface-neutral-dark" />
      </div>
    </div>
  );
};
