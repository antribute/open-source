import { CardContainerProps } from 'components/Card/Card';
import { twMerge } from 'tailwind-merge';
import { capitalCase } from 'change-case';
import { Button } from 'components/Button';
import { Card } from '.';

const CardGrid = ({
  className,
  count = 6,
  color,
  childCard,
  ...props
}: CardContainerProps & { count?: number; childCard?: React.ReactNode }) => {
  const cards = new Array(count).fill(0);

  return (
    <>
      {cards.map((key) => (
        <Card.Container
          color={color}
          key={key}
          border
          className={twMerge('col-span-2 shadow-lg', className)}
          {...(props as any)}
        >
          <Card.Title>{capitalCase(color ?? 'Surface')}</Card.Title>
          <Card.Body>
            <Card.Description>
              Lorem labore magna eiusmod id eiusmod cillum ex dolore amet ullamco ex. Anim ullamco
              ex sit elit ut.
            </Card.Description>
            <div className="pt-12" />
            {childCard}
          </Card.Body>
          <Card.Footer>
            <div className="flex grow gap-8">
              <Button color="surface-tertiary" variant="soft" size="xs" className="">
                Back
              </Button>
              <Button color="surface-secondary" variant="soft" size="xs" className="">
                Next
              </Button>
            </div>

            <Button color="surface-primary" variant="soft" size="xs">
              Note
            </Button>
            <Button color="surface-primary" size="xs">
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
      <CardGrid color="surface" />
      <CardGrid color="surface-light" />
      <CardGrid color="surface-dark" />
      <CardGrid color="surface-neutral" />
      <CardGrid color="surface-neutral-light" />
      <CardGrid color="surface-neutral-dark" />
      {/* ---- Nested ----  */}
      <CardGrid
        color="surface"
        childCard={
          <Card.Container color="surface-light">
            <Card.Body className="text-md" color="">
              Lorem labore magna eiusmod id eiusmod cillum.
            </Card.Body>
          </Card.Container>
        }
      />
      <CardGrid
        color="surface-light"
        childCard={
          <Card.Container color="surface">
            <Card.Body color="">Lorem labore magna eiusmod id eiusmod cillum.</Card.Body>
          </Card.Container>
        }
      />
      <CardGrid
        color="surface-dark"
        childCard={
          <Card.Container color="surface-light">
            <Card.Body color="">Lorem labore magna eiusmod id eiusmod cillum.</Card.Body>
          </Card.Container>
        }
      />
      <CardGrid
        color="surface-neutral"
        childCard={
          <Card.Container color="surface-neutral-dark">
            <Card.Body color="">Lorem labore magna eiusmod id eiusmod cillum.</Card.Body>
          </Card.Container>
        }
      />
      <CardGrid
        color="surface-neutral-light"
        childCard={
          <Card.Container color="surface-neutral">
            <Card.Body color="">Lorem labore magna eiusmod id eiusmod cillum.</Card.Body>
          </Card.Container>
        }
      />
      <CardGrid
        color="surface-neutral-dark"
        childCard={
          <Card.Container color="surface-neutral">
            <Card.Body color="">Lorem labore magna eiusmod id eiusmod cillum.</Card.Body>
          </Card.Container>
        }
      />
    </div>
  );
};
