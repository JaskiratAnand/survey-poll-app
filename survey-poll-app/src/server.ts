import express from "express";
import { PORT } from './config'
import surveyRoutes from './routes/surveyRoutes';

const app = express();
app.use(express.json());

app.use('/surveys', surveyRoutes);

app.listen(PORT || 3000, () => {
    console.log(`Server is running at port: ${PORT}`)
})