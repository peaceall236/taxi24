import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from '../routes';



// express app configuration
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// defines routes
app.use('/riders', routes.riders);
app.use('/trips', routes.trips);
app.use('/drivers', routes.drivers);



// start server
app.listen(process.env.PORT, () => {
    console.log(`API Running on port ${process.env.PORT}`);
});