import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN;

const analytics = {
  init: () => {
    if (MIXPANEL_TOKEN && import.meta.env.PROD) {
      mixpanel.init(MIXPANEL_TOKEN, {
        debug: import.meta.env.DEV,
        track_pageview: true,
        persistence: 'localStorage',
      });
    }
  },
  track: (name: string, props?: object) => {
    if (MIXPANEL_TOKEN && import.meta.env.PROD) {
      mixpanel.track(name, props);
    } else {
      console.log(`[Analytics Tracked]: ${name}`, props);
    }
  },
  identify: (id: string) => {
    if (MIXPANEL_TOKEN && import.meta.env.PROD) {
      mixpanel.identify(id);
    }
  },
};

export default analytics;
