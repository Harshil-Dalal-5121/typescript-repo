// function cal(numbers: number[]) {
//   const reduce = numbers.reduce((value, index) => {
//     return value + index;
//   });
//   return reduce;
// }

// console.log(cal([4, 5, 6, 7, 8, 9, 10, 11]));

// type User = {
//   name: string;
//   id: number | string;
// };

// const userLog = (userInfo: User) => {
//   return userInfo;
// };

// const user = {
//   name: "Harshil",
//   id: 21,
// };

// console.log(userLog(user));

// interface Book {
//   name: string;
//   id: number;
// }

// interface EBook extends Book {
//   size: number;
// }

// interface AudioBook extends EBook {
//   duration: number;
// }

// const bookLog = (data: AudioBook) => {
//   return `Book Found :
//   Name:${data.name}
//   id:${data.id}
//   size:${data.size} mb
//   duration:${data.duration} hrs`;
// };

// console.log(
//   bookLog({ name: "Harry Potter", id: 304, size: 5.5, duration: 5.5 })
// );

// type ID = number;
// type UserName = string;
// type Amount = number;
// type Active = boolean;

// interface Account {
//   name: UserName;
//   accountId: ID;
//   balance: Amount;
//   active?: Active; // ? stands for not compulsary
// }

// const bankAccount = (data: Account) => {
//   return `User Details
// Name : ${data.name}
// Customer Id: ${data.accountId}
// Balance: ${data.balance}`;
// };

// console.log(bankAccount({ name: "Harshil", accountId: 5, balance: 50000 }));

// type ID_Num = number | string;

// const getId = (id: ID_Num) => {
//   return typeof id === "string" ? id.toUpperCase() : id;
// };

// console.log(getId(4));

// function getThree(x: string | number[] | string[]) {
//   return x.slice(0, 3);
// }

// console.log(getThree([1, 2, 3, 4, 5, 6, 7, 8, 9]));

// function getThree(x: string | string[]) {
//   return x.slice(0, 3);
// }

// document.write(getThree("Harshil"));

//~ Generics
// const logAnything = <T>(arg: T) => {
//   return arg;
// };

// function logAnything<T>(arg: T): T {
//   console.log(arg);
//   return arg;
// }

// logAnything(["Harshil"]);

// interface HasAge {
//   age: number;
// }

// interface Player {
//   name: string;
//   age: number;
// }

// function getOldest(people: HasAge[]) {
//   return people.sort((a, b) => b.age - a.age)[0];
// }

// const oldest = getOldest([{ age: 30 }, { age: 44 }, { age: 20 }]);

// const players = [
//   { name: "Harshil", age: 21 },
//   { name: "Jigar", age: 28 },
//   { name: "Shubh", age: 16 },
// ];

// * Assertion ==> not good approach
// const person = getOldest(players) as Player;
// console.log(person.name);

//* Using generics
// interface HasAge {
//   age: number;
// }

// interface Player {
//   name: string;
//   age: number;
// }

// function getOldest<T extends HasAge>(people: T[]) {
//   return people.sort((a, b) => b.age - a.age)[0];
// }

// const oldest = [{ age: 30 }, { age: 44 }, { age: 20 }];

// const players = [
//   { name: "Harshil", age: 21 },
//   { name: "Jigar", age: 28 },
//   { name: "Shubh", age: 16 },
//   { name: "Pratik", age: 29 },
// ];

// const playerNames = [
//   { name: "Harshil" },
//   { name: "Jigar" },
//   { name: "Shubh" },
//   { name: "Pratik" },
// ];

// console.log(getOldest(oldest));

interface IPost {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface IUser {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// const fetchPostData = async (path: string): Promise<IPost[]> => {
//   return await fetch(`https://jsonplaceholder.typicode.com${path}`).then(
//     (response) => response.json()
//   );
// };

// const fetchUserData = async (path: string): Promise<IUser[]> => {
//   return await fetch(`https://jsonplaceholder.typicode.com${path}`).then(
//     (response) => response.json()
//   );
// };

//* Generic function without repeatation

// const fetchData = async <T>(path: string): Promise<T[]> => {
//   return await fetch(`https://jsonplaceholder.typicode.com${path}`).then(
//     (response) => response.json()
//   );
// };

// ? IIFE (Immediately Invoked Function Expression)
// (async () => {
//   // console.log(posts.slice(0, 10)); //? It gives 200 objects
//   // const posts = await fetchPostData(`/todos`);
//   // console.log(posts[0]);
//   // const user = await fetchUserData("/todos");
//   // console.log(user[0].title);

//   const post = await fetchData<IPost>("/todos");
//   const user = await fetchData<IUser>("/todos");

//   console.log(user[0].id);
//   console.log(post[0].title);
// })();

// & Structural typing or duck typing
// interface Icredentials {
//   username: string;
//   password: string;
//   isAdmin?: boolean;
// }

// const login = (credentials: Icredentials): boolean => {
//   console.log(credentials);
//   return true;
// };

// const user = {
//   username: "Harshil",
//   password: "Error404!!",
//   isAdmin: true,
// };

// login(user);

interface IAuth {
  username: string;
  password: string;
  login(username: string, pasword: string): boolean;
}

const auth: IAuth = {
  username: "Harshil Dalal",
  password: "Harshil123",
  login(username: string, password: string) {
    if (username && password) {
      return true;
    } else {
      return false;
    }
  },
};

console.log(auth);
