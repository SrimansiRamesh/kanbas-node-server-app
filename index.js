import express from 'express';
import Lab5 from "./Lab5/index.js";
import Hello from "./Hello.js"
import cors from "cors";
import UserRoutes from "./Kanbas/Users/routes.js";
import session from "express-session";
import CourseRoutes from './Kanbas/Courses/routes.js';
import "dotenv/config";
import ModuleRoutes from './Kanbas/Modules/routes.js';
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import EnrollmentRoutes from './Kanbas/Enrollments/routes.js';
import QuizRoutes from './Kanbas/Quizzes/routes.js';
import mongoose from "mongoose";
import QuestionsRoutes from './Kanbas/Questions/routes.js';
import AttemptRoutes from './Kanbas/Attempts/routes.js';

const CONNECTION_STRING = "mongodb+srv://srimansiramesh:Mongo%401537@kanbas.ua1vs.mongodb.net/Kanbas"
mongoose.connect(CONNECTION_STRING);
const app = express()
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
})); 
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}

app.use(
  session(sessionOptions)
);

app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
QuizRoutes(app);
QuestionsRoutes(app);
AttemptRoutes(app);
Hello(app)
Lab5(app);
app.listen(process.env.PORT || 4000)
