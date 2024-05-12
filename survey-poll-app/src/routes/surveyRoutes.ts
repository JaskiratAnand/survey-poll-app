import express from "express";
import SurveyController from "../controllers/surveyController"

const router = express.Router();
const surveyController = new SurveyController();

router.get('/', surveyController.getAllSurveys);
router.post('/', surveyController.createSurvey);
router.get('/:id', surveyController.getSurveyById);
router.put('/append/:id', surveyController.appendSurveyQuestions);
router.delete('/delete/:id', surveyController.deleteSurvey);
router.delete('/delete/question/:id', surveyController.deleteQuestion);

export default router