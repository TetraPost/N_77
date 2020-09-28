import axios from 'axios';

import {
    GET_TODO_LIST,
    CHANGE_TODO_LIST,
    DELIT_TODO_LIST,
    ADD_TODO_LIST,
} from 'actions/types';

export const getTodoList = async (uid) => {
    const data = { user_id:uid };
    console.log('getTodoList', data);
    const result = await axios.post('getToDoList', data);
    return { type:GET_TODO_LIST,   result };
}

export const changeTodoListItem = async (dataUpdate) => {
    const data = { item_id:dataUpdate.id , text:dataUpdate.text, status:'test status'};
    //console.log('is data-', data);
    const result = await axios.post('changeToDoItem', data);
    return { type:CHANGE_TODO_LIST,   result };
}
export const changeTodoListItemDelite = async (data) => {
    console.log('is data-', data);
    const dataDelit = { item_id:data };
    const result = await axios.post('changeToDoItemDelit', dataDelit);
    return { type:DELIT_TODO_LIST,   result };
}

export const addTodoListItem = async (dataInsert) => {
    const data = { userId:dataInsert.userId , text:dataInsert.text};
    const result = await axios.post('addToDoItem',data);
    return { type:ADD_TODO_LIST,   result };
}
