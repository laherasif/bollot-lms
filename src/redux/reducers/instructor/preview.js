import {
    ADD_LECTURE_PREVIEW,
    ADD_MORE_LECTURE_PREVIEW,
    ADD_CRICULUM_THUMNAIL_PREVIEW,
    DEL_CRICULUM_THUMNAIL_PREVIEW,
    DEL_CRICULUM_LECTURE_PREVIEW,
    DELE_CRICULUM_LECTURE_PREVIEW,
    ADD_CRICULUM_LECTURE_PREVIEW,
    NETWORK_FAIL_PREVIEW,
    CLEAR_STATE,
} from "../../types/types";


const initialState = {
    loader: false,
    Previews: [],


};

const PreviewReducer = (state = initialState, action) => {
    console.log("state ,", state)
    switch (action.type) {

        case ADD_MORE_LECTURE_PREVIEW:
           
            return {
                ...state,
                Previews: [...state.Previews, action.payload]
            }

        case ADD_CRICULUM_LECTURE_PREVIEW:
           
            return {
                ...state,
                Previews: [...state.Previews, action.payload]

            }
            case DELE_CRICULUM_LECTURE_PREVIEW:

                let find = state.Previews.filter((f) => f.course_section_lecture_id !== action.payload.course_section_lecture_id)
                return{
                    ...state,
                    lectures:find
                }



        case ADD_LECTURE_PREVIEW:
           
            return {
                ...state,
                ...state.Previews[action.payload.index][action.payload.name] = action.payload.value
            }



        case ADD_CRICULUM_THUMNAIL_PREVIEW:
            return {
                ...state,
                ...state.Previews.map((item, ind) => {
                    if (ind === action.payload.index) {
                        item.thumbnail = action.payload.data.thumbnail
                        item.progressbar = action.payload.data.prog
                        item.file_type = action.payload.data.video
                        item.object_key = action.payload.data.file.name
                        item.file_size = action.payload.data.file.size

                    }
                    return item

                })
            }

        case DEL_CRICULUM_LECTURE_PREVIEW:
           
            let findIndex = state.Previews.filter((item, ind) => ind !== action.payload)
            return {
                ...state,
                Previews: findIndex
            }



        case DEL_CRICULUM_THUMNAIL_PREVIEW:
           
            return {
                ...state,
                ...state.Previews.map((item, ind) => {
                    if (ind === action.payload) {
                        item.thumbnail = ""
                        item.object_key = ""
                        item.file_size = null
                        item.progressbar = null 


                    }
                    return item

                })
            }

        case NETWORK_FAIL_PREVIEW:
            return {
                ...state,
                ...state.Previews.map((item, ind) => {
                    return (
                        item.progressbar = null,
                        item.object_key = null
                    )

                })

            }

            case CLEAR_STATE:

                return {
                    ...state,
                    Previews: [] ,
                   
                    

                    
                }



        default: {
            return state;
        }
    }
};

export default PreviewReducer;
