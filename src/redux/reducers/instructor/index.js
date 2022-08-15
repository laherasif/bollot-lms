import {
    DASHBOAD_STATICS,
    TRANSACTION_STATICS,
    GET_TRANSACTIONS,
    REG_AL_COURSES
} from '../../types/types'



const initialState = {
    Statistic: {},
    Transaction: {},
    Transactions: [],
    Courses:[],

};

const InsDashboardReducer = (state = initialState, action) => {
    switch (action.type) {

        case DASHBOAD_STATICS:

            return {
                ...state,
                Statistic: action.payload
            }

        case REG_AL_COURSES:
            return {
                ...state,
                Courses : action.payload
            }

        case TRANSACTION_STATICS:
            return {
                ...state,
                Transaction: action.payload
            }

            case GET_TRANSACTIONS:
                return{
                    ...state,
                    Transactions: action.payload

                }



        default: {
            return state;
        }
    }
};

export default InsDashboardReducer;
