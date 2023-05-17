export function create8PtGrid(max = 512) {
  const finalGrid: Record<string, string> = {
    auto: 'auto',
    0: '0px',
    1: '1px',
  };

  let currentGridStep = 2;

  while (currentGridStep <= max) {
    finalGrid[currentGridStep.toString()] = `${currentGridStep}px`;

    if (currentGridStep < 40) {
      currentGridStep += 2;
    } else {
      currentGridStep += 8;
    }
  }

  return finalGrid;
}
