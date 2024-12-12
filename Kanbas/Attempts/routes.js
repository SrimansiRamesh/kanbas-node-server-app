import * as attemptsDao from "./dao.js";
import * as questionsDao from "../Questions/dao.js"
import * as quizzesDao from "../Quizzes/dao.js"
export default function AttemptRoutes(app) {
    //creating a attempt
    app.post("/api/quizzes/:quizId/attempt", async (req, res) => {
      const { quizId } = req.params;
      const { student } = req.body;
      console.log('student',student);
      try {
        const quiz = await quizzesDao.findQuizById(quizId);
        if (!quiz) {
          return res.status(404).json({ error: "Quiz not found" });
        }
       
  
        // Fetch existing attempts for the user for this quiz
        
        const existingAttempts = await attemptsDao.findAttemptsforUser(student,quizId);
        const quizAttempts = existingAttempts.filter(
          (attempt) => attempt.quiz.toString() === quizId
        );
        console.log(quizAttempts);
        console.log('no of  attempts',quizAttempts.length);
        console.log('max attempts',quiz[0].maxAttempts);
        if (quizAttempts.length >= quiz[0].maxAttempts) {
          return res.status(400).json(
            console.log("You have reached the maximum number of attempts for this quiz.") ,
          );
        }
  
        // Calculate the new attempt number
        const nextAttemptNumber = quizAttempts.length + 1;
  
        // Create a new attempt
        const attempt = {
          ...req.body,
          quiz: quizId,
          attemptNumber: nextAttemptNumber, // Increment attempt number
        };
  
        const newAttempt = await attemptsDao.createAttempt(attempt);
        res.status(201).json(newAttempt);
      } catch (error) {
        console.error("Error creating an attempt:", error);
        res.status(500).json({ error: "Failed to create attempt" });
      }
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

app.get("/api/quizzes/:quizId/user/:userId/attempts/last", async (req, res) => {
  const { quizId, userId } = req.params; // Extract quizId and userId from URL params

  try {
    // Fetch all attempts for the specified user and quiz
    const lastAttempt = await attemptsDao
      .findAttemptsforUser(userId, quizId)
      .sort({ attemptNumber: -1 }) // Sort by attemptNumber in descending order
      .limit(1) // Get only the latest attempt
      .exec();

    if (!lastAttempt || lastAttempt.length === 0) {
      return res.status(404).json({ error: "No attempts found for this user and quiz." });
    }
    console.log('last Attempt',lastAttempt);
    res.status(200).json(lastAttempt[0]); // Send only the first attempt
  } catch (error) {
    console.error("Error fetching last attempt for a user:", error);
    res.status(500).json({ error: "Failed to fetch last attempt" });
  }
});

app.get("/api/quizzes/:quizId/question/:questionId", async (req, res) => {
  const { quizId, questionId } = req.params; // Extract quizId and questionId from URL params

  try {
      // Assuming you have a model where questions are stored
      const question = await questionsDao.getQuestionByID(questionId,quizId);

      if (!question) {
          return res.status(404).json({ message: "Question not found" });
      }

      res.status(200).json(question);
  } catch (error) {
      console.error("Error fetching question:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});
}
