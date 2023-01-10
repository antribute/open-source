import { Paper } from 'components/Paper/Paper';

export const Default = () => {
  return (
    <div className="w-full grid grid-cols-12 gap-16">
      {new Array(3).fill(0).map(() => (
        <Paper className="col-span-4 w-full " color="default">
          Default
        </Paper>
      ))}
      {new Array(3).fill(0).map(() => (
        <Paper className="col-span-4 w-full " hoverHighlight>
          Hover Highlight
        </Paper>
      ))}

      {new Array(3).fill(0).map(() => (
        <Paper className="col-span-4 w-full " color="secondary">
          Secondary Color
        </Paper>
      ))}
      {new Array(3).fill(0).map(() => (
        <Paper className="col-span-4 w-full " color="tertiary">
          Tertiary Color
        </Paper>
      ))}
      {new Array(3).fill(0).map(() => (
        <Paper className="col-span-4 w-full " color="tertiary" loading>
          Loading
        </Paper>
      ))}
    </div>
  );
};
