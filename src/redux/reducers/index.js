
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";
// websites 
import userReducer from "../reducers/auth";
import cartReducer from "../reducers/cartcheckout/cart";
import courseReducer from "../reducers/courses/courses";
// instructor 
import CriculumReducer from "../reducers/instructor/criculum";
import ClassesReducer from "../reducers/instructor/liveclasses";
import QuizReducer from "../reducers/instructor/quiz";
import PreviewReducer from "../reducers/instructor/preview";
// student 
import AddCourseReducer from "../reducers/instructor/addcourse";
import CourseReducer from '../reducers/student/courses';
// admin course add reducers 
import AdminReducer from "../reducers/admin/";
// import AdminCriculumReducer from "../reducers/admin/criculum";
// import AdminClassesReducer from "../reducers/admin/liveclasses";
// import AdminQuizReducer from "../reducers/admin/quiz";
// import AdminPreviewReducer from "../reducers/admin/preview";
// import AdminAddCourseReducer from "../reducers/admin/addcourse";


const rootPersistConfig = {
  key: 'root',
  storage: storage,
}

const authPersistConfig = {
  key: 'user_reducer',
  storage: storage,
}

const rootReducer = combineReducers({
  userReducer: persistReducer(authPersistConfig, userReducer),
  cartReducer: cartReducer,
  course: courseReducer,
  admin: AdminReducer,
  addCourse: AddCourseReducer,
  criculum: CriculumReducer,
  live: ClassesReducer,
  quiz: QuizReducer,
  preview: PreviewReducer,
  studentCourse: CourseReducer,
  // admin course add reducers 
  // AdminAddCourse: AdminAddCourseReducer,
  // Admincriculum: AdminCriculumReducer,
  // adminlive: AdminClassesReducer,
  // adminquiz: AdminQuizReducer,
  // adminpreview: AdminPreviewReducer,

})

export default persistReducer(rootPersistConfig, rootReducer)