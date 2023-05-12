import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
} from '@heroicons/react/24/outline';
import { ButtonProps } from 'components/Button';
import { DeploymentMockData, generateMockDeploymentList } from 'mock/mock-data';

const navigation = [
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Deployments', href: '#', icon: ServerIcon, current: true },
  { name: 'Activity', href: '#', icon: SignalIcon, current: false },
  { name: 'Domains', href: '#', icon: GlobeAltIcon, current: false },
  { name: 'Usages', href: '#', icon: ChartBarSquareIcon, current: false },
  { name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false },
];
const teams = [
  { id: 1, name: 'Method', href: '#', initial: 'P', current: false },
  { id: 2, name: 'Playbook', href: '#', initial: 'P', current: false },
  { id: 3, name: 'Growth Gang', href: '#', initial: 'T', current: false },
];

const statuses = {
  offline: { color: 'surface' },
  online: { color: 'success' },
  error: { color: 'danger' },
} satisfies Record<DeploymentMockData['status'], { color: ButtonProps['color'] }>;

const environments = {
  Preview: 'text-gray-400 bg-gray-400/10 ring-gray-400/20',
  Production: 'text-indigo-400 bg-indigo-400/10 ring-indigo-400/30',
};

const deployments = generateMockDeploymentList({ size: 10 });

const activityItems = [
  {
    user: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    projectName: 'ios-app',
    commit: '2d89f0c8',
    branch: 'main',
    date: '1h',
    dateTime: '2023-01-23T11:00',
  },
  // More items...
];

export const appShellMockData = {
  navigation,
  teams,
  statuses,
  environments,
  deployments,
  activityItems,
};
