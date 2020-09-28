const userModel = require('models/user');
//const todolistModel = require('models/todolist');

const auth = async ( name, email ) => {
    const query = {
        name,
        email,
    }
   const findUser = await userModel.findOne(query);
   if(!findUser) {
       return {status: false, payload: 'no user found' };
   }
    const payload = {
        uid: findUser.id,
        name: findUser.name,
    };

    return {status: 'ok', payload };

}

module.exports = {
    auth,
}

/* insert todo */

/*const run = async () => {
    const findUser = await userModel.findOne({name: 'test003'});
    console.log(findUser.id);
    todolistModel.create({
        userId:findUser.id,
        text:'test3-1 todo text',
        status: 'active',
      });
}
run();*/