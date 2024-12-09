import model from "./model.js";

export function createQuestion(question) {
    delete question._id
    return model.create(question); 
}

export function findQuestionsForQuiz(quizId){
    return model.find({ quiz: quizId });
}

export function updateQuestions(questionId,updates){
    return model.updateOne({ _id: questionId }, updates);

}

export function deleteQuizzes(questionId){
    return model.deleteOne({ _id: questionId });
}