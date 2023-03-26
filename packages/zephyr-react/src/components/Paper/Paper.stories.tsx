import { Paper, PaperProps } from 'components/Paper/Paper';
import { SimpleList } from 'components/SimpleList';
import { twMerge } from 'tailwind-merge';

const PaperRow = ({ className, colorScheme, ...props }: PaperProps) => {
  const paperRowProps: PaperProps[] = [
    { hoverHighlight: true, colorScheme },
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
            colorScheme={colorScheme}
            className={twMerge('col-span-3 w-full ', className)}
          >
            <SimpleList.Root variant="bullets">
              {Object.entries(e).map(([k, v]) => (
                <SimpleList.Item className="font-mono">
                  {k}:
                  <>
                    <span className="leading-md float-right align-middle text-xs">
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
      <div className="grid w-full grid-cols-12 gap-16">
        <PaperRow colorScheme="surface" />
        <PaperRow colorScheme="surface-light" />
        <PaperRow colorScheme="surface-dark" />
        <PaperRow colorScheme="neutral" />
        <PaperRow colorScheme="neutral-light" />
        <PaperRow colorScheme="neutral-dark" />
      </div>
    </div>
  );
};
