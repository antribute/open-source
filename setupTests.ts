import { GlobalRegistrator } from '@happy-dom/global-registrator';

// Due to a known issue with happy dom and Bun, we have to make a copy of the console and then
// globally re-assign it. See https://github.com/oven-sh/bun/issues/6044
const oldConsole = console;
GlobalRegistrator.register();
window.console = oldConsole;
