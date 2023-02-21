import { capitalCase } from 'change-case';
import { Paper, PaperProps } from 'components/Paper/Paper';
import { twMerge } from 'tailwind-merge';

const PaperRow = ({ className, color, ...props }: PaperProps) => {
  const colorLabel = capitalCase(color ?? '');

  const paperRowProps: PaperProps[] = [
    // { children: colorLabel },
    { children: `${colorLabel} - Hover Highlight`, hoverHighlight: true },
    { children: `${colorLabel} - Bordered - Hover Highlight`, border: true, hoverHighlight: true },
    { children: `${colorLabel} - Loading`, loading: true },
  ];

  return (
    <>
      {paperRowProps.map((e) => {
        return (
          <Paper
            {...props}
            {...e}
            color={color}
            className={twMerge('col-span-4 w-full ', className)}
          />
        );
      })}
    </>
  );
};

export const Default = () => {
  return (
    <div className="w-full">
      <Paper className="mb-38 flex h-200 w-200 flex-col gap-8">
        <div> Title</div>
        <Paper color="surface-soft" className="h-full grow">
          Data item
        </Paper>
      </Paper>
      <Paper color="neutral" className="mb-38 flex h-200 w-200 flex-col gap-8">
        <div> Title</div>
        <Paper color="neutral-light" className="h-full grow">
          Data item
        </Paper>
      </Paper>
      <div className="grid w-full grid-cols-12 gap-16">
        <PaperRow color="surface" />
        <PaperRow color="surface-soft" />
        <PaperRow color="surface-light" />

        <PaperRow color="surface-dark" />
        <PaperRow color="neutral" />
        <PaperRow color="neutral-light" />
      </div>
    </div>
  );
};
