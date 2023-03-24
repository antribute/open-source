import { Provider as ReactWrapBalancerProvider } from 'react-wrap-balancer';

type AntributeUiProviderProps = {
  children?: React.ReactNode;
};
export const AntributeUiProvider = ({ children }: AntributeUiProviderProps) => {
  return <ReactWrapBalancerProvider>{children}</ReactWrapBalancerProvider>;
};
