import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://1067a41b6ecbb6175e2bc1e7cd500465@o4510521910689792.ingest.us.sentry.io/4510521920061440",
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration(),
  ],
//   tracesSampleRate: 1.0,
});
