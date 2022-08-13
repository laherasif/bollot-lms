import {
    ADD_LIVECLASS_INPUT,
    ADD_LIVECLASS_MORE,
    CLEAR_STATE,
    DEL_LIVECLASS,
    EDIT_LIVE_CLASSES,
} from "../../types/types";
import moment from 'moment'


const initialState = {
    loader: false,
    Classes: [{
        date: '', from_time: '', to_time: ''
    }]


};

const ClassesReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_LIVECLASS_MORE:

            return {
                ...state,
                Classes: [...state.Classes, action.payload]
            }

        case ADD_LIVECLASS_INPUT:

            if (action.payload.name === "date") {
                return {
                    ...state,
                    ...state.Classes[action.payload.i][action.payload.name] = moment(action.payload.date).format('YYYY-MM-DD')

                }
            }
            else if (action.payload.name === "from_time") {
                return {
                    ...state,
                    ...state.Classes[action.payload.i][action.payload.name] = moment(action.payload.date).format('HH:mm:ss')

                }
            }
            return {
                ...state,
                ...state.Classes[action.payload.i][action.payload.name] = moment(action.payload.date).format('HH:mm:ss')

            }




        case DEL_LIVECLASS:

            let findIndex = state.Classes.filter((item, ind) => ind !== action.payload)
            return {
                ...state,
                Classes: findIndex
            }

        case EDIT_LIVE_CLASSES:
            
            return {
                ...state,
                Classes: action.payload
            }


        case CLEAR_STATE:

            return {
                ...state,
                Classes: [{
                    date: '', from_time: '', to_time: ''
                }]



            }





        default: {
            return state;
        }
    }
};

export default ClassesReducer;
