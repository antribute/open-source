# Antribute Tracking

An Antribute abstraction over Mixpanel

## Installation

```bash
pnpm i @antribute/tracking
```

## Usage

### Client-Side

In the root of your app, add the following:

```tsx
import { TrackingProvider } from '@antribute/tracking';

function MyApp() {
  return (
    <TrackingProvider value={{ token: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN }}>
      {/* The rest of your app goes here! */}
    </TrackingProvider>
  );
}

export default MyApp;
```

To track events in individual components, do the following

```tsx
import { useTracking } from '@antribute/tracking';

function MyComponent() {
  const track = useTracking();

  const handleClick = () => {
    track('button-click');
  };

  return (
    <button onClick={handleClick} type="button">
      Click Me!
    </button>
  );
}

export default MyComponent;
```

### Server-Side

To track events in server-side code, do the following

```tsx
import { track } from '@antribute/tracking/server';

function MyBackendFunction() {
  track({ event: 'some-backend-event', token: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN });
  // Finish your function
}
```
