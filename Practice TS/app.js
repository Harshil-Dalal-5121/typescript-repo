"use strict";
// function cal(numbers: number[]) {
//   const reduce = numbers.reduce((value, index) => {
//     return value + index;
//   });
//   return reduce;
// }
const auth = {
    username: "Harshil Dalal",
    password: "Harshil123",
    login(username, password) {
        if (username && password) {
            return true;
        }
        else {
            return false;
        }
    },
};
console.log(auth);
