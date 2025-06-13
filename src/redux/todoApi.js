import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const Todo = createApi({
    reducerPath: "TodoData",
    baseQuery: fetchBaseQuery({ baseUrl: "https://todo-project-back-9kz3.onrender.com/user/",credentials:"include" }),
    tagTypes: ["todo"],
    endpoints: (builder) => {
        return {
            getUsers: builder.query({
                query: () => {
                    return {
                        url: "getTodo",
                        method: "GET"
                    }
                },
                providesTags: ["todo"],
                transformResponse:data=>data.todo
            }),
            addUser: builder.mutation({
                query: userData => {
                    return {
                        url: "addTodo",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["todo"]
            }),
            userDelete:builder.mutation({
                query:id=>{
                    console.log(id);
                    
                    return{
                        url:`deleteTodo/${id}`,
                        method:"DELETE",
                    }
                },
                invalidatesTags:["todo"]
            }),
            useUpdate:builder.mutation({
                query:userData=>{
                    // console.log(id);
                    return{
                        url:`updateTodo/${userData._id}`,
                        method:"put",
                        body:userData
                    }
                },
                invalidatesTags:["todo"]
            })
        
        }
    }
})

export const { useGetUsersQuery,useAddUserMutation,useUserDeleteMutation,useUseUpdateMutation} = Todo
