import model from "./model.js";

export function createAssignment(assignment) {
    delete assignment._id
    //console.log('assignment name',model.collection.name);
    return model.create(assignment); 
}

export function findAssignmentforCourse(courseId){
    return model.find({ course: courseId });
}

export function updateAssignment(assignmentId,updates){
    return model.updateOne({ _id: assignmentId }, updates);

}

export function deleteAssignment(assignmentId){
    return model.deleteOne({ _id: assignmentId });
}