import DB from './DB';
import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('*', (req, res) => {
  res.status(200).send('hit the api');
});



export default app;