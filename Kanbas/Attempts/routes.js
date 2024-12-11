import * as attemptsDao from "./dao.js";
export default function AttemptRoutes(app) {
    //creating a attempt
  app.post("/api/quizzes/:quizId/attempt",async (req, res) => {
    console.log('creating an attempt');
    const { quizId } = req.params;
    
    const attempt = {
      ...req.body,
      quiz: quizId,
    };
    const newAttempt =await attemptsDao.createAttempt(attempt);
    res.send(newAttempt);
  });

//   //updating attempt
//   app.put("/api/attempts/:attemptId", async (req, res) => {
//     const { attemptId } = req.params;
//     console.log(attemptId);
//     const updates = req.body;
//     try {
//       const updatedAttempt = await questionsDao.updateQuestions(
//         questionId,
//         updates
//       );
//       if (!updatedQuestion) {
//         return res.status(404).json({ error: "Question not found" });
//       }
//       console.log('updated question-',updatedQuestion);
//       res.json(updatedQuestion);
//     } catch (error) {
//       console.error("Error updating question:", error);
//       res.status(500).json({ error: "Failed to update question" });
//     }
//   });

  //get attempts for a user
  app.get("/api/attempts/:userId/attempts", async (req, res) => {
    const { userId } = req.params;
    try {
      const attempts = await questionsDao.findQuestionsForQuiz(userId);
      res.json(attempts);
    } catch (error) {
      console.error("Error fetching attempts for a user:", error);
      res.status(500).json({ error: "Failed to fetch attempts" });
    }});

//   //delete questions
//   app.delete("/api/questions/:questionId",async (req, res) => {
//     const { questionId } = req.params;
//     try {
//       const status = await questionsDao.deleteQuestions(questionId);
//       if (!status) {
//         return res.status(404).json({ error: "Question not found" });
//       }
//       res.sendStatus(204); // No Content
//     } catch (error) {
//       console.error("Error deleting question:", error);
//       res.status(500).json({ error: "Failed to delete questions" });
//     }
//   });
}
