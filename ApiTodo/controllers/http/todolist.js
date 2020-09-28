const todolistModel = require('models/todolist');

/*get list use user id*/
const getToDoList = async ( user_id ) => {
   const findList = await todolistModel.find({userId: user_id}).populate('userId');
   console.log(findList);
   if(!findList) {
       return {status: 'list is empty' };
   }
    return {status: 'ok', findList };

}

/*add item in list use user id*/
const addToDoItem = async ( userId, text ) => {
    console.log('todolistContrl', userId, text);
    const query = {
        userId,
        text,
        status: 'active',
    }
    
    const addItem = await new todolistModel(query);
    const ret = await addItem.save();

    const _id = ret._id;
    if(!ret) {
        return {status: 'error' };
    }
     return {status: 'ok', _id };
 
 }

/*change item in list use item_id*/
const changeToDoItem = async ( item_id, text, status ) => {
    const changeList = await todolistModel.findOneAndUpdate(
        { _id: item_id },
        {$set:{
                'text': text,
                'status': status
                }
        },
        {
            new: true
        }
    );
    if(!changeList) {
        return {status: 'error' };
    }
     return {status: 'ok', changeList };
 
}

/*deite item in list use item_id*/
const changeToDoItemDelit = async ( item_id ) => {
    const changeList = await todolistModel.findOneAndRemove(item_id);
    console.log('item_id is - ', item_id);
    if(!changeList) {
        return {status: 'error' };
    }
     return {status: 'ok', changeList };
 
}
module.exports = {
    getToDoList,
    addToDoItem,
    changeToDoItem,
    changeToDoItemDelit,
}

/* insert todo */

/*const run = async () => {
    const findUser = await userModel.findOne({name: 'test003'});
    console.log(findUser.id);
    todolistModel.create({
        userId:findUser.id,
        text:'test3 todo text',
        status: 'active',
      });
}
run();*/