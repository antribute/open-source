import { CardContainerProps } from 'components/Card/Card';
import { twMerge } from 'tailwind-merge';
import { capitalCase } from 'change-case';
import { Button } from 'components/Button';
import { IconButton } from 'components/IconButton/IconButton';
import { HeartIcon } from '@heroicons/react/24/solid';
import { Input } from 'components/Input';
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

            <div className="flex gap-8">
              <Button color="secondary" size="xs" variant="glass" className="group">
                <span className="i-heroicons-chat-bubble-bottom-center-solid" />
              </Button>
              <IconButton
                color="secondary"
                size="xs"
                variant="glass"
                hoverBackgroundColor="heart"
                className="group"
              >
                <span className="i-heroicons-heart-solid " />
              </IconButton>
            </div>
          </Card.Title>
          <Card.Body>
            <Card.Description>
              Lorem labore magna eiusmod id eiusmod cillum ex dolore amet ullamco ex. Anim ullamco
              ex sit elit ut.
            </Card.Description>

            <div className="pt-12" />
            <Input
              label="Name"
              placeholder="Enter name"
              width="full"
              message="
              Lorem labore magna eiusmod id eiusmod cillum ex dolore amet ullamco ex.
            "
            />
            {childCard}
          </Card.Body>
          <Card.Footer className="flex-wrap">
            <div className="flex grow gap-8">
              <Button
                color="secondary"
                hoverBackgroundColor="danger"
                variant="glass"
                size="xs"
                className=""
              >
                Clear
              </Button>
              <Button variant="filled" size="xs" className="">
                Skip
              </Button>
            </div>
            <Button color="primary" variant="outlined" size="xs" className="">
              Prev
            </Button>
            <Button color="inverse" variant="outlined" size="xs" className="">
              Next
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
      <CardGrid colorScheme="inverse" />
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
      <CardGrid
        colorScheme="inverse"
        childCard={
          <Card.Container colorScheme="neutral">
            <Card.Body>Lorem labore magna eiusmod id eiusmod cillum.</Card.Body>
          </Card.Container>
        }
      />
    </div>
  );
};
