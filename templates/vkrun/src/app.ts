import v from 'vkrun';

/**
 * Creates and configures the VkrunJS application.
 */
export function createApp(): ReturnType<typeof v.App> {
  const app = v.App();

  app.get('/', (req: v.Request, res: v.Response) => {
    res.status(200).send('Hello World!');
  });

  app.get('/health', (req: v.Request, res: v.Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify({ status: 'ok' }));
  });

  return app;
}
