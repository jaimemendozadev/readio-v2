require('dotenv').config();

import app from './server';

const PORT = process.env.PORT || 3000;

console.log("the PORT is ", PORT)

app.listen(PORT, () => console.log(`Listening on Port 3000`));