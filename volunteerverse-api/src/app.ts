import express from 'express';
const app = express();
import {PORT} from "../config";
import { database } from '../db';

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
})



