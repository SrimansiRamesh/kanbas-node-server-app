import model from "./model.js";

export function createQuizzes(quiz) {
    delete quiz._id
    return model.create(quiz); 
}

export function findQuizzesforCourses(courseId){
    return model.find({ course: courseId });
}

export function updateQuizzes(quizId,updates){
    return model.updateOne({ _id: quizId }, updates);

}

export function findQuizById(quizId){
    return model.find({_id:quizId});
}
export function deleteQuizzes(quizId){
    return model.deleteOne({ _id: quizId });
}