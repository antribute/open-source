'use client';

import { useTracking } from '@antribute/tracking';
import { useEffect } from 'react';
import { ButtonProps, ThemeSwitcher, useDarkMode, Button, Flex, Text } from '@antribute/ui';
import { AntributeLogo } from 'components/AntributeLogo';

function RootPage() {
  const track = useTracking();
  useEffect(() => {
    track('index-view');
  }, [track]);

  useDarkMode();

  return (
    <>
      <div className="fixed top-8 flex justify-center w-full">
        <div className="absolute right-8 top-0 z-10">
          <ThemeSwitcher />
        </div>
      </div>
      <div className="container mx-auto  flex h-full min-h-screen flex-col items-center justify-center px-24  before-absolute-content">
        <Flex justify="center" align="center" gap className="mb-16">
          <AntributeLogo className="h-56 w-56 sm:h-80 sm:w-80" />
          <Text.H2 className="sm:text-h1 !font-display">Antribute</Text.H2>
        </Flex>
        <Grid />

        <Text as="p" fullWidth size="lg" align="center" spaceY="lg" className="mb-16 relative">
          <Text
            block
            color="moderate"
            fontWeight="regular"
            className="bg-gradient-to-r from-caution to-heart via-info bg-clip-text !text-content-moderate dark:!text-content-strong mb-16 sm:mb-6 "
          >
            A team of
            <Text className="bg-gradient-to-r from-caution to-info bg-clip-text !text-content-subtle">
              {' '}
              world-class
            </Text>{' '}
            engineers with one goal
            <Text.Dash />
          </Text>
          <EmphasizeText>
            {/* create <Text fontWeight="medium">the best tech</Text> to support the{' '} */}
            create the best tech to support the <Text fontWeight="medium">even better ideas</Text>.
          </EmphasizeText>
        </Text>

        <Flex gap="xs">
          <LinkButton
            startIconClassName="i-fa6-brands-twitter text-[#00acee]"
            href="https://twitter.com/antribute"
            onClick={() => track('index-twitter-click')}
          >
            Twitter
          </LinkButton>
          <LinkButton
            endIconClassName="bg-palette-white rounded-sm"
            endIcon={<span className="i-fa6-brands-linkedin h-full w-full text-[#0072b1]" />}
            href="https://linkedin.com/company/antribute"
            onClick={() => track('index-linkedin-click')}
          >
            LinkedIn
          </LinkButton>
        </Flex>
      </div>
    </>
  );
}

const Grid = () => (
  <div className="h-1/2 absolute w-full bottom-0 pointer-events-none bg-[url(https://play.tailwindcss.com/img/grid.svg)] gradient-mask-t-10 bg-center dark:invert animate-fade-in" />
);

const EmphasizeText = ({ children }: { children: React.ReactNode }) => (
  <Text
    className="before-absolute-content before:!w-auto before:block before:p-4 before:from-caution/10  before:via-info/20  before:to-heart/10 before:bg-gradient-to-r  before:scale-105 before:rounded-sm relative mx-4 gradient-mask-b-95 before:gradient-mask-t-10 rounded-[14px] px-6 pb-2"
    color="intense"
    align="center"
  >
    <Text className="w-full shrink-0  relative bg-gradient-to-r from-caution to-heart via-info bg-clip-text !text-content-ghost dark:!text-content-subtle">
      {children}
    </Text>
  </Text>
);

const LinkButton = ({
  children,
  ...props
}: { href: string } & Pick<
  ButtonProps,
  'onClick' | 'startIconClassName' | 'endIconClassName' | 'startIcon' | 'endIcon' | 'children'
>) => {
  return (
    <Button
      as="a"
      variant="ghost"
      size="sm"
      color="primary"
      rounded
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    >
      {children}
    </Button>
  );
};

export default RootPage;
