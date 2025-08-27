import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

export function initializeSentry() {
    if (import.meta.env.PROD) { // Only run Sentry in production
        Sentry.init({
            dsn: import.meta.env.VITE_SENTRY_DSN,
            integrations: [new BrowserTracing()],

            // We recommend adjusting this value in production, or using tracesSampler
            // for finer control
            tracesSampleRate: 1.0,
        });
    }
}
