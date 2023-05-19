import { Provider as ReactWrapBalancerProvider } from 'react-wrap-balancer';
import { TooltipProvider } from '@radix-ui/react-tooltip';

interface AntributeUiProviderProps {
  children?: React.ReactNode;
}
export const AntributeUiProvider = ({ children }: AntributeUiProviderProps) => {
  return (
    <ReactWrapBalancerProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </ReactWrapBalancerProvider>
  );
};
