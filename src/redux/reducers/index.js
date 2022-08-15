
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
import PreQuizReducer from "../reducers/instructor/prequiz";
import PreviewReducer from "../reducers/instructor/preview";
// student 
import AddCourseReducer from "../reducers/instructor/addcourse";
import CourseReducer from '../reducers/student/courses';
// admin course add reducers 
import AdminReducer from "../reducers/admin/";

// webiste 
import BlogReducer from "../reducers/blogNews/blogs";
import InsDashboardReducer from "../reducers/instructor/";



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
  preQuiz: PreQuizReducer,
  preview: PreviewReducer,
  studentCourse: CourseReducer,
  blogs: BlogReducer,
  InsDash: InsDashboardReducer,
  // admin course add reducers 
  // Admincriculum: AdminCriculumReducer,
  // adminlive: AdminClassesReducer,
  // adminquiz: AdminQuizReducer,
  // adminpreview: AdminPreviewReducer,

})

export default persistReducer(rootPersistConfig, rootReducer)