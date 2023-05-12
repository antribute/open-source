import { Paper } from 'components/Paper';
import { Text } from 'components/Text';
import { Flex } from 'components/Flex';
import { Button } from 'components/Button';

export const MockPageHeader = () => (
  <Paper
    rounded={false}
    padding={false}
    className="w-screen px-104 pt-48 bg-surface bg-gradient-to-t from-surface-dark/80 via-surface-light/40 to-surface-light/30 noisy-surface-texture shadow-inner shadow-surface-dark"
  >
    <Flex gap justify="between" align="end" className="pb-2">
      <Text size="md" font="body" fontWeight="medium" color="moderate">
        Overview
      </Text>
      <Button
        color="primary"
        size="sm"
        rounded
        // className="shadow-lg shadow-success/20 "
        startIconClassName="i-heroicons-plus-20-solid"
      >
        New invoice
      </Button>
    </Flex>

    <div className=" grid gap-16 grid-cols-4 py-20 w-full">
      {[
        { label: 'Total revenue', value: '$205,091' },
        { label: 'Outstanding invoices', value: '$240,090' },
        { label: 'Overdue invoices', value: '$30,091' },
        { label: 'Drafted invoices', value: '$765,002' },
      ].map(({ label, value }) => {
        return (
          <Paper className="space-y-6 shadow-surface-dark/80 shadow-2xl border-highlight-weak border">
            <Text block font="body" size="sm">
              {label}
            </Text>
            <Text block color="intense" fontWeight="bold" size="h4">
              {value}
            </Text>
          </Paper>
        );
      })}
    </div>
  </Paper>
);
