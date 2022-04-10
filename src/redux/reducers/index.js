
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";
import userReducer from "../reducers/auth";
import cartReducer from "../reducers/cartcheckout/cart";
import courseReducer from "../reducers/courses/courses";
import AdminReducer from "../reducers/admin/";


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
})

export default persistReducer(rootPersistConfig, rootReducer)