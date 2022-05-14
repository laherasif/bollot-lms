import {
    ADD_LIVECLASS_INPUT,
    ADD_LIVECLASS_MORE,
    CLEAR_STATE,
    DEL_LIVECLASS,
} from "../../types/types";


const initialState = {
    loader: false,
    Classes: [{
        date: '', from_time: '', to_time: ''
    }]


};

const ClassesReducer = (state = initialState, action) => {
    console.log("state ,", state)
    switch (action.type) {

        case ADD_LIVECLASS_MORE:
           
            return {
                ...state,
                Classes: [...state.Classes, action.payload]
            }

        case ADD_LIVECLASS_INPUT:
           
            return {
                ...state,
                ...state.Classes[action.payload.i][action.payload.name] =  action.payload.date  

            }


        case DEL_LIVECLASS:
           
            let findIndex = state.Classes.filter((item, ind) => ind !== action.payload)
            return {
                ...state,
                Classes: findIndex
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
