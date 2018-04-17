
/*
const somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('Work is successfully done.');
        reject('Work cannot be done.');
    }, 2000);
})

somePromise.then((message) => {
    console.log(`Success: ${message}`);
}).catch((message) => {
    console.log(`Error: ${message}`);
})

*/

const asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        if(typeof a === 'number' && typeof b === 'number'){
            resolve(a + b);
        }else {
            reject('The arguments must be number.');
        }
    })
}

asyncAdd(10, 3)
    .then((data) => {
        console.log(`Success: ${data}`);
        return asyncAdd(data, 54)
    }).then((secondRes) => {
        console.log(`Success: ${secondRes}`);
    }).catch((err) => {
        console.log(`Error: ${err}`);
    })
