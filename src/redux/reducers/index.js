
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";
import userReducer from "../reducers/auth";
import cartReducer from "../reducers/cartcheckout/cart";
import courseReducer from "../reducers/courses/courses";
import AdminReducer from "../reducers/admin/";
import CriculumReducer from "../reducers/instructor/criculum";
import ClassesReducer from "../reducers/instructor/liveclasses";
import QuizReducer from "../reducers/instructor/quiz";
import PreviewReducer from "../reducers/instructor/preview";
import AddCourseReducer from "../reducers/instructor/addcourse";
import CourseReducer from '../reducers/student/courses';


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
  admin : AdminReducer,
  addCourse : AddCourseReducer,
  criculum : CriculumReducer,
  live : ClassesReducer,
  quiz : QuizReducer,
  preview : PreviewReducer,
studentCourse : CourseReducer,
})

export default persistReducer(rootPersistConfig, rootReducer)