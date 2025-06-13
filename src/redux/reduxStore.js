import { configureStore } from "@reduxjs/toolkit";
import { Todo } from "./todoApi";


const reduxStore = configureStore({
    reducer: {
        [Todo.reducerPath]: Todo.reducer,
    },
    middleware: mid=>[...mid(),Todo.middleware]
})

export default reduxStore