import {
    ADD_CRICULUM,
    NETWORK_FAIL,
    ADD_MORE_CRICULUM,
    ADD_MORE_LECTURE,
    ADD_CRICULUM_LECTURE,
    ADD_CRICULUM_THUMNAILS,
    DEL_CRICULUM_THUMNAIL,
    DEL_CRICULUM,
    DEL_CRICULUM_LECTURE,
    CLEAR_STATE,
    EDIT_CRICCULUM,
} from "../../types/types";


const initialState = {
    loader: false,
    Criculums: [{
        title: "",
        lectures: [
          {
            title: "",
            file_type: "",
            object_key: "",
            thumbnail: "",
            progressbar: "",
          },
        ],
      }]


};

const CriculumReducer = (state = initialState, action) => {
    console.log("state ,", state)
    switch (action.type) {

        case ADD_MORE_CRICULUM:
            
            return {
                ...state,
                Criculums: [...state.Criculums, action.payload]
            }

        case ADD_MORE_LECTURE:
            
            return {
                ...state,
                ...state.Criculums.map((item, ind) => {
                    if (ind === action.payload.index) {
                        item.lectures.push(action.payload.data)
                    }
                    return item
                })

            }

        case ADD_CRICULUM:
            
            return {
                ...state,
                ...state.Criculums[action.payload.index][action.payload.name] = action.payload.value
            }

        case ADD_CRICULUM_LECTURE:
            
            return {
                ...state,
                ...state.Criculums.map((item, ind) => (
                    ind === action.payload.index ?
                        item.lectures[action.payload.i][action.payload.name] = action.payload.value
                        : item
                ))
            }


        case ADD_CRICULUM_THUMNAILS:
            debugger
            return {
                ...state,
                ...state.Criculums.map((item, ind) => {
                    if (ind === action.payload.index) {
                        item.lectures[action.payload.i].thumbnail = action.payload.data.thumbnail
                        item.lectures[action.payload.i].progressbar = action.payload.data.prog
                        item.lectures[action.payload.i].file_type = action.payload.data.video
                        item.lectures[action.payload.i].object_key = action.payload.data.file
                        item.lectures[action.payload.i].file_size = action.payload.data.file_size
                    }
                    return item

                })
            }

        case DEL_CRICULUM_LECTURE:
            
            return {
                ...state,
                ...state.Criculums.map((item, ind) => {
                    if (ind === action.payload.index) {
                        let find = item.lectures;
                        find.splice(action.payload.i, 1);
                    }
                    return item
                })
            }

        case DEL_CRICULUM:
            
            let findIndex = state.Criculums.filter((item, ind) => ind !== action.payload)
            return {
                ...state,
                Criculums: findIndex
            }

        case DEL_CRICULUM_THUMNAIL:
            return {
                ...state,
                ...state.Criculums.map((item, ind) => {
                    if (ind === action.payload.index) {
                        item.lectures[action.payload.i].thumbnail = ""
                        item.lectures[action.payload.i].object_key = ""
                        item.lectures[action.payload.i].file_size = null 
                        item.lectures[action.payload.i].progressbar = null 

                       
                    }
                    return item

                })
            }

            case NETWORK_FAIL : 
            return {
                ...state , 
                ...state.Criculums.map((item, ind) => {
                    return (
                        item.lectures[ind].progressbar = null ,
                        item.lectures[ind].thumbnail = "" 
                    )
                       
                    })

            }

            case EDIT_CRICCULUM:
                return{
                    ...state,
                    Criculums :action.payload
                }

            case CLEAR_STATE:

                return {
                    ...state,
                    Criculums: [{
                        title: "",
                        lectures: [
                          {
                            title: "",
                            file_type: "",
                            object_key: "",
                            thumbnail: "",
                            progressbar: "",
                          },
                        ],
                      }]
                    

                    
                }



        default: {
            return state;
        }
    }
};

export default CriculumReducer;
