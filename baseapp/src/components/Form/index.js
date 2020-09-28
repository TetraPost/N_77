import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import * as loginAction from 'actions/auth';
import * as todoList from 'actions/todolist';
import update from 'immutability-helper';
/*ws*/
import socketIOClient from "socket.io-client";


import FormState from 'components/Form/formstate';


function Form(){

    const ENDPOINT = "http://localhost:8000/";

    const [response, setResponse] = useState("");
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
          setResponse(data);
        });
        return () => socket.disconnect();
      }, []);

    /****************************************************/
    const {status: statusAuth, profile: getName} = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const color = '222';

    const users = [];

    const [status, setStatus] = useState('');
    const [userinfo, setUserInfo] = useState(users);
    const [userUid, setUserUid] = useState(users);
    const [todoListUser, setList] = useState([]);



    const listUp = () => {
        const pushList = update(todoListUser);
        setList(pushList);
    }
    /* Отправка Добавить toDoList Item */
    const handlerSubmitItemAdd = (event) => {
        if (event){
        event.preventDefault();
        const data = new FormData(event.target);
        const addData = data.getAll('itemToDoAdd')
        handlerChangeItemAdd(addData);
        }
        return null;  
    }
    /* Обработка добавления item в toDoList Item */
    const handlerChangeItemAdd = async (data) => {
        const addData = {userId: data[0], text: data[1]};
        const changeListItemAdd = await todoList.addTodoListItem(addData);
        dispatch(changeListItemAdd);
        if (changeListItemAdd.result.data.status === 'ok'){
            const userList = await todoList.getTodoList(data[0]);
            dispatch(userList);
            const one = userList.result.data.findList;
            //setList(userList);
            //console.log('ONE---', one);
            // Добавить вывод

        }
    }
    
    /* Отправка Удаления toDoList Item */
    const handlerSubmitItemDelit = (event) => {
        if (event){
        event.preventDefault();
        const data = new FormData(event.target);
        const delitData = data.getAll('itemToDoDelit')
        handlerChangeItemDelit(delitData);
        }
        return null;
    }
    
    /* Обработка удаления item в toDoList Item */
    const handlerChangeItemDelit = async (data) => {

        const changeListItemDelite = await todoList.changeTodoListItemDelite(data[0]);
        dispatch(changeListItemDelite);

        if (changeListItemDelite.result.data.status === 'ok'){
            const uid = { userId: data[1] };
            const userList = await todoList.getTodoList(uid);
            dispatch(userList);
            //const one = userList.result.data.findList;
            //setList(one);

        }
    }

    /* Отправка изменений toDoList Item */
    const handlerSubmitItem = (event) => {
        if (event){
        event.preventDefault();
        const data = new FormData(event.target);
        const changeData = data.getAll('itemToDo')
        handlerChangeItem(changeData);
        }
        return null;
    }
    
    /* Перехватываем изменения toDoList Item */
    function handleChange(e) {
        return e.target.value;
    }
    
    /* Обработка изменений toDoList Item */
     const handlerChangeItem = async (data) => {
        const changeData = {id: data[0], text: data[1]};
        //console.log(changeData);
        const changeListItem = await todoList.changeTodoListItem(changeData);
        dispatch(changeListItem);
        if (changeListItem.result.data.status === 'ok'){
            const uid = changeListItem.result.data.changeList.userId;
            const userList = await todoList.getTodoList(uid);
            dispatch(userList);
            const one = userList.result.data.findList;
            console.log('TWO---', one);
            setList(one);
        }
    }

    
    /* Авторизация */
    const handleSubmitAuth = (event) => {
        if (event){
        event.preventDefault();
        const data = new FormData(event.target);
        const collectData = data.getAll('name')
        tryAutUser(collectData);
        }
        return null;
    }
    
    /* Показываем данные */
    const tryAutUser = async (data) => {
        try{
            const userData = {login: data[0], email: data[1]};
            const result = await axios.post('auth', userData);
            if(result.data.status === false){
                setStatus(false);
                setUserInfo(result.data.payload);
            } else {
                /*get list*/
                const uid = result.data.payload.uid;
                const userList = await todoList.getTodoList(uid);
                dispatch(userList);
                    /*show todolist*/
                    if(userList.result.data.status === 'ok'){
                        console.log('list data is-',userList.result.data.findList);
                        const one = userList.result.data.findList;
                        setList(one);
                    }
                setStatus(true);
                setUserInfo(result.data.payload.name);
                setUserUid(result.data.payload.uid);
            }
            /*action Login*/
            const action = await loginAction.login(result.data.payload.name);
            dispatch(action);
            

        } catch (error){
            setStatus(false);
            console.log(error);
            setUserInfo('something went wromg');
            if(error.response){
                setUserInfo(error.response.status);
        }
    }   

    }

    useEffect(()=>{
        handleSubmitAuth();
    }, [])

    return (

        <div>
            <form onSubmit={handleSubmitAuth} enctype="multipart/form-data">
                <div class="form-group">
                    <label for="inputUserId">User ID</label>
                    <input type="text" name="name"  class="form-control" id="inputUserId" aria-describedby="userIdInputHelper" placeholder="Enter user ID" />
                    <input type="text" name="name"  class="form-control" id="inputUserId" aria-describedby="userIdInputHelper" placeholder="Enter user ID" />
                    <small id="userIdInputHelper" class="form-text text-muted">id</small>
                </div>
                <button class="btn btn-primary">Send data</button>
                <p>statusAuth - {statusAuth}</p>
                <p>getName - {getName}</p>
                
                
            </form>
            <hr/>
            <p>{response}</p>
            <hr/>
            <p>{status ? `OK` : 'wait input'}</p>
            <p>User name is: <b>{userinfo}</b></p>
            <p>User ID is: <b>{userUid}</b></p>
            <hr/>
            <form onSubmit={handlerSubmitItemAdd} enctype="multipart/form-data">
                    <input type="hidden" name="itemToDoAdd" value={userUid}  class="form-control"/>
                    <input type="text" name="itemToDoAdd"  class="form-control"/>
                    <button class="btn btn-success">Add</button>
            </form>

            List of user
            <br/>

            <ul >{todoListUser.map((val, key) => (<li class={key} value={val._id}>
                
                USER _id is - {val.userId._id}<br/>    
                item _id is - {val._id}<br/>
                text is - {val.text}<br/>
                status is - {val.status}<br/>
                <form onSubmit={handlerSubmitItem} enctype="multipart/form-data">
                    <input type="hidden" name="itemToDo" value={val._id}  class="form-control"/>
                    <input type="hidden" name="" value={val.text}  class="form-control"/>
                    <input type="text" name="itemToDo" valueDefault={val.text}  class="form-control" onChange={handleChange} />
                    <button class="btn btn-primary">Update</button>
                </form>
                <form onSubmit={handlerSubmitItemDelit} enctype="multipart/form-data">
                    <input type="hidden" name="itemToDoDelit" value={val._id}  class="form-control"/>
                    <input type="hidden" name="itemToDoDelit" value={val.userId._id}  class="form-control"/>
                    <button class="btn btn-warning">Delit</button>
                </form>
                
                
                <FormState color={ color }>
                { color }
                </FormState>

                createdAt is - {val.createdAt}<br/>
                updatedAt is - {val.updatedAt}<br/>
                </li>))}<hr/></ul>
            <hr/>
        </div>

    )
};
//<button type="button" onClick={() => handlerChangeItemDelit(val._id, `Новое значение. ${new Date().getFullYear()} - ${new Date().getMilliseconds()}`)}>Edit</button><br/>
//<button type="button" onClick={() => handlerChangeItemDelit(val._id, val.userId._id)}>Delete</button><br/>
export default Form;