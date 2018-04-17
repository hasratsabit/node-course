
const addUser = (id, callback) => {
    const user = {
        id: id,
        name: 'John'
    }

    callback(user);
}

addUser(23, (obj) => {
    console.log(obj);
})