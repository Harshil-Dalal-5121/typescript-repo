// infering : giving suggestion to the usera

// implicit : not showing the type of the variable , const , func etc
let myName = "Harshil";

// explicit : showing the type of the var, const or func that is used
let myLastName: string;
let id: number;
let isMember: boolean;
let message: string | number;
let re: RegExp = /\w+/g;

//*RegExp is a type in ts

myLastName = "Harshil";
myLastName = "Dalal";
id = 4;
isMember = true;
message = "Hello";

const sum = (a: number, b: string) => {
  return a + b;
};
