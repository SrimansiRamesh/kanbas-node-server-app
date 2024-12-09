import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
    title: { type: String, required: true },
    description: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    type: { type: String, enum: ['Graded Quiz', 'Practice Quiz', 'Graded Survey', 'Ungraded Survey'], default: 'Graded Quiz' },
    points: { type: Number, default: 0 },
    assignmentGroup: { type: String, enum: ['Quizzes', 'Exams', 'Assignments', 'Project'], default: 'Quizzes' },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 }, // Minutes
    multipleAttempts: { type: Boolean, default: false },
    maxAttempts: { type: Number, default: 1 },
    showCorrectAnswers: { type: String }, // Example: 'After Due Date'
    accessCode: { type: String },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: Date,
    availableDate: Date,
    untilDate: Date,
    published: { type: Boolean, default: false }, // Quiz status
  }, 
  { collection: "quizzes" },
  { timestamps: true }
);
  export default schema;