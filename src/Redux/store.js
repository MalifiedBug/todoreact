import { configureStore } from "@reduxjs/toolkit";
import  taskSlice  from "./Reducers/tasks.reducer.js";

export default configureStore({
    reducer:{
        tasksReducer: taskSlice,
    }
})