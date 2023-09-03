import cors from 'cors';
import createDebug from 'debug';
import express, { type Request, type Response } from 'express';
import morgan from 'morgan';

const debug = createDebug('W7CHWKND');
export const app = express();

debug('Started');

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
  debug('Hola mundo de Express');
  res.write('<h1>Hola Mundo de Express</h1>');
  res.end();
});
