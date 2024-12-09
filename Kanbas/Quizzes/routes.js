import * as quizzesDao from "./dao.js";
export default function QuizRoutes(app) {


//updating quiz
app.put("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const updates = req.body;
    try {
      const updatedQuiz = await quizzesDao.updateQuizzes(
        quizId,
        updates
      );
      if (!updatedQuiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      res.json(updatedQuiz);
    } catch (error) {
      console.error("Error updating quiz:", error);
      res.status(500).json({ error: "Failed to update quiz" });
    }
  });

  //delete quiz
  app.delete("/api/quizzes/:quizId",async (req, res) => {
    const { quizId } = req.params;
    try {
      const status = await quizzesDao.deleteQuizzes(quizId);
      if (!status) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      res.sendStatus(204); // No Content
    } catch (error) {
      console.error("Error deleting quiz:", error);
      res.status(500).json({ error: "Failed to delete quiz" });
    }
  });

  //get quizzes for a course
  app.get("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
    try {
      const quizzes = await quizzesDao.findQuizzesforCourses(courseId);
      res.json(quizzes);
    } catch (error) {
      console.error("Error fetching quizzes for course:", error);
      res.status(500).json({ error: "Failed to fetch quizzes" });
    }});

}