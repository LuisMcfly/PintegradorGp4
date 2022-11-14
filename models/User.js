const fs = require('fs');
const { builtinModules } = require('module');
const filename = './DB/users.json';

const userWrite = (userInfo) => {
    let userList = requestUserList();
    let newUser = { id: idGenerator(), ...userInfo};

    if(!userSearch('email', userInfo.email)) {
        userList.push(newUser);
        dataBaseWrite(userList);
    }
}

const userSearch = (field, value) => {
    let userList = requestUserList()
    return userList.find(user => user[field] === value)
}

const userErase = (userId) => {
    let userList = requestUserList().filter(producto => producto.id != userId);
    dataBaseWrite(userList);
}

const requestUserList = () => {
    return JSON.parse(fs.readFileSync(filename, 'utf-8'));
}

const dataBaseWrite = (info) => {
    fs.writeFileSync('DB/users.json', JSON.stringify(info, null, ' '));
}

const idGenerator = () => {
    let userList = requestUserList();
    let lastUser = userList.pop();

    return lastUser ? lastUser.id + 1 : 1; // está vacía la tabla?
}

module.exports = {
    requestUserList,
    userSearch,
    userWrite,
    userErase
}