import * as questionsDao from "./dao.js";
export default function QuestionsRoutes(app) {
    //creating a question
  app.post("/api/quizzes/:quizId/question",async (req, res) => {
    const { quizId } = req.params;
    
    const question = {
      ...req.body,
      quiz: quizId,
    };
    const newQuestion =await questionsDao.createQuestion(question);
    res.send(newQuestion);
  });

  //updating question
  app.put("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    console.log(questionId);
    const updates = req.body;
    try {
      const updatedQuestion = await questionsDao.updateQuestions(
        questionId,
        updates
      );
      if (!updatedQuestion) {
        return res.status(404).json({ error: "Question not found" });
      }
      console.log('updated question-',updatedQuestion);
      res.json(updatedQuestion);
    } catch (error) {
      console.error("Error updating question:", error);
      res.status(500).json({ error: "Failed to update question" });
    }
  });

  //get questions for a quiz
  app.get("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    try {
      const questions = await questionsDao.findQuestionsForQuiz(quizId);
      res.json(questions);
    } catch (error) {
      console.error("Error fetching questions for quiz:", error);
      res.status(500).json({ error: "Failed to fetch questions" });
    }});

  //delete questions
  app.delete("/api/questions/:questionId",async (req, res) => {
    const { questionId } = req.params;
    try {
      const status = await questionsDao.deleteQuestions(questionId);
      if (!status) {
        return res.status(404).json({ error: "Question not found" });
      }
      res.sendStatus(204); // No Content
    } catch (error) {
      console.error("Error deleting question:", error);
      res.status(500).json({ error: "Failed to delete questions" });
    }
  });
}
