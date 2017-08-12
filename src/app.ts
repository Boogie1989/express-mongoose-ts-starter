import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as config from 'config';
import { initRoutes } from './controllers';
import { checckTokenMiddleware } from './middlewares/auth';
import { initErrorMiddlewares } from './middlewares/errors';
import { initDb } from './models';

const app = express();

initDb(config.get('db.path'));

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(checckTokenMiddleware());

initRoutes(app);
initErrorMiddlewares(app);

app.listen(3333, () => {
    console.log('Server start on port 3333');
});

export { app };
