import { useEffect } from 'react';
import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN;

if (MIXPANEL_TOKEN) {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: import.meta.env.DEV,
    track_pageview: true,
  });
}

type EventProperties = Record<string, any>;

export const useAnalytics = () => {
  const trackEvent = (eventName: string, properties?: EventProperties) => {
    if (MIXPANEL_TOKEN) {
      mixpanel.track(eventName, properties);
    } else {
      console.log(`Analytics (dev): ${eventName}`, properties || '');
    }
  };

  const identifyUser = (userId: string, properties?: EventProperties) => {
    if (MIXPANEL_TOKEN) {
      mixpanel.identify(userId);
      if (properties) {
        mixpanel.people.set(properties);
      }
    } else {
      console.log(`Analytics (dev): Identify ${userId}`, properties || '');
    }
  };

  return { trackEvent, identifyUser };
};

// Hook to track page views
export const usePageTracking = (pathname: string) => {
    useEffect(() => {
        if (MIXPANEL_TOKEN) {
            mixpanel.track('Page View', { path: pathname });
        }
    }, [pathname]);
};
