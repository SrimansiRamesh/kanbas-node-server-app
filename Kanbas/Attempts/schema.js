import mongoose, { Collection } from "mongoose";
const AttemptSchema = new mongoose.Schema({
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    attemptNumber: { type: Number, required: true },
    answers: [{
      question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
      selectedAnswer: String, // For MCQ and True/False
      correct: { type: Boolean, required: true }, // Calculated based on correct answer
    }],
    score: { type: Number, required: true },
    completedAt: { type: Date, required: true },
  }, 
  { timestamps: true },
  {collection:"attempts"}
);
export default AttemptSchema;