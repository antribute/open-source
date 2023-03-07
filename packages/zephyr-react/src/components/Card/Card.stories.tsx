import { CardContainerProps } from 'components/Card/Card';
import { twMerge } from 'tailwind-merge';
import { capitalCase } from 'change-case';
import { Button } from 'components/Button';
import { Card } from '.';

const CardGrid = ({
  className,
  count = 6,
  colorScheme,
  childCard,
  ...props
}: CardContainerProps & { count?: number; childCard?: React.ReactNode }) => {
  const cards = new Array(count).fill(0);

  return (
    <>
      {cards.map((key) => (
        <Card.Container
          colorScheme={colorScheme}
          key={key}
          border
          className={twMerge('col-span-2 shadow-lg', className)}
          {...props}
        >
          <Card.Title>
            <Card.TitleHeading>{capitalCase(colorScheme ?? 'Surface')}</Card.TitleHeading>
          </Card.Title>
          <Card.Body>
            <Card.Description>
              Lorem labore magna eiusmod id eiusmod cillum ex dolore amet ullamco ex. Anim ullamco
              ex sit elit ut.
            </Card.Description>
            <div className="pt-12" />
            {childCard}
          </Card.Body>
          <Card.Footer className="flex-wrap">
            <div className="flex grow gap-8">
              <Button color="secondary" variant="glass" size="xs" className="">
                Back
              </Button>
              <Button color="secondary" variant="glass" size="xs" className="">
                Next
              </Button>
            </div>

            <Button color="secondary" variant="glass" size="xs">
              Note
            </Button>
            <Button color="primary" size="xs">
              Read
            </Button>
          </Card.Footer>
        </Card.Container>
      ))}
    </>
  );
};

export const Default = () => {
  return (
    <div className="grid grid-cols-12 gap-16">
      <CardGrid colorScheme="surface" />
      <CardGrid colorScheme="surface-light" />
      <CardGrid colorScheme="surface-dark" />
      <CardGrid colorScheme="neutral" />
      <CardGrid colorScheme="neutral-light" />
      <CardGrid colorScheme="neutral-dark" />
      {/* ---- Nested ----  */}
      <CardGrid
        colorScheme="surface"
        childCard={
          <Card.Container colorScheme="surface-light">
            <Card.Body className="text-md">Lorem labore magna eiusmod id eiusmod cillum.</Card.Body>
          </Card.Container>
        }
      />
      <CardGrid
        colorScheme="surface-light"
        childCard={
          <Card.Container colorScheme="surface">
            <Card.Body>Lorem labore magna eiusmod id eiusmod cillum.</Card.Body>
          </Card.Container>
        }
      />
      <CardGrid
        colorScheme="surface-dark"
        childCard={
          <Card.Container colorScheme="surface-light">
            <Card.Body>Lorem labore magna eiusmod id eiusmod cillum.</Card.Body>
          </Card.Container>
        }
      />
      <CardGrid
        colorScheme="neutral"
        childCard={
          <Card.Container colorScheme="neutral-dark">
            <Card.Body>Lorem labore magna eiusmod id eiusmod cillum.</Card.Body>
          </Card.Container>
        }
      />
      <CardGrid
        colorScheme="neutral-light"
        childCard={
          <Card.Container colorScheme="neutral">
            <Card.Body>Lorem labore magna eiusmod id eiusmod cillum.</Card.Body>
          </Card.Container>
        }
      />
      <CardGrid
        colorScheme="neutral-dark"
        childCard={
          <Card.Container colorScheme="neutral">
            <Card.Body>Lorem labore magna eiusmod id eiusmod cillum.</Card.Body>
          </Card.Container>
        }
      />
    </div>
  );
};
