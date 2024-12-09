import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    type: { type: String, enum: ['Multiple Choice', 'True/False', 'Fill in the Blank'], required: true },
    questionText: { type: String, required: true },
    points: { type: Number, required: true },
    choices: [{ text: String, correct: Boolean }], 
    correctAnswer: String,
  }, 
  { collection: "questions" },
  { timestamps: true }
 
);
export default schema;