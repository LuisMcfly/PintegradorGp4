const fs = require('fs');
const { builtinModules } = require('module');
const filename = './DB/users.json';

const userWrite = (userInfo) => {
    let userList = requestUserList();
    let newUser = { id: idGenerator(),...userInfo, token: null, authenticated: false };

    userList.push(newUser);
    fs.writeFileSync(filename, JSON.stringify(userList, null, '  '));
}

const requestUserList = () => {
    return JSON.parse(fs.readFileSync(filename, 'utf-8'));
}

const idGenerator = () => {
    let userList = requestUserList();
    let lastUser = userList.pop();

    return lastUser ? lastUser.id + 1 : 1; // está vacía la tabla?
}

module.exports = {
    userWrite,
    requestUserList,
    idGenerator
}