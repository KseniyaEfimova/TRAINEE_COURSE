// Домашнее задание(Порешать типовые задачи - написать порядок и вывод в консоли):
// 1)
// console.log('1'); // sync1
// setTimeout(() => console.log('2'), 1); // macro2
// let promiseNew = new Promise((resolve) => {
//     console.log('3'); // sync2
//     resolve(); // *
// });
// promiseNew.then(() => console.log('4')); // *micro1
// setTimeout(() => console.log('5')); // macro1
// console.log('6'); // sync3
// Вывод в консоль браузера: 1, 3, 6, 4, 5, 2
//////////////////////////////
// 2)
// let promiseTree = new Promise((resolve, reject) => {
//     resolve("a");
//     console.log("1"); // sync1
//     setTimeout(() => {
//         console.log("2"); // sync3 in macro1
//     }, 0); // *macro1
//     console.log("3"); // sync2
// });
// Вывод в консоль браузера: 1, 3, 2
/////////////////////////
// 3)
// let promiseTwo = new Promise((resolve, reject) => {
//     resolve("a"); // промис разрешён
// });
// promiseTwo
//     .then((res) => {
//         return res + "b"; // исполняется (ab)
//     })
//     .then((res) => {
//         return res + "с"; // исполняется (abc)
//     })
//     .finally((res) => {
//         return res + "!!!!!!!"; // игнорируется
//     })
//     .catch((res) => {
//         return res + "d";
//     })
//     .then((res) => {
//         console.log(res);
//     });
// Вывод в консоль браузера: abc
// finally игнорируется т.к. не может обрабатывать результаты
/////////////////////////////
// 4)
// function doSmth() {
//     return Promise.resolve("123");
// }
// doSmth() // промис разрешён
//     .then(function (a) {
//         console.log("1", a); // "1" "123"
//         return a;
//     })
//     .then(function (b) {
//         console.log("2", b); // "2" "123"
//         return Promise.reject("321"); // промис отклонён
//     })
//     .catch(function (err) {
//         console.log("3", err); // "3" "321"
//     })
//     .then(function (c) {
//         console.log("4", c); // "4" undefined
//         return c;
//     });
// Вывод в консоль браузера: "1" "123"; "2" "123" ; "3" "321"; "4" undefined
// undefined т.к. catch не возвращает никакого результата
///////////////////////////
// 5)
// console.log("1"); // sync1
// setTimeout(function () {
//     console.log("2"); // sync4 in *macro1
// }, 0); // macro1
// Promise.resolve().then(() => console.log("3")); // sync3 in *micro1
// console.log("4"); // sync2
// Вывод в консоль браузера: 1, 4, 3, 2
////////////////////////////
//7)
// async function a() {
//   console.log("a"); // sync3
// }

// console.log("1"); // sync1

// (async function () {
//   console.log("f1"); // sync2
//   await a();
//   console.log("f2"); // sync5 - 'блокируется' await
// })();
// console.log("2"); // async4
// Вывод в консоль браузера: 1, "f1", "a", "2", "f2"
////////////////////////////////
//8)
// console.log(1); // sync1

// setTimeout(() => console.log(2)); // macro1

// async function func() {
//   console.log(3); // sync2

//   await new Promise((resolve) => {
//     console.log(4); // sync3
//     resolve();
//     console.log(5); // sync4
//   })
//     .then(() => console.log(6)) // micro1
//     .then(() => console.log(7)); // micro2

//   console.log(8); // micro3
// }

// setTimeout(() => console.log(9)); // macro2

// func();

// console.log(10); // sync5
// Вывод в консоль браузера: 1, 3, 4, 5, 10, 6, 7, 8, 2, 9
///////////////////////////////////
// 9)*
// function foo(callback) {
//     setTimeout(() => {
//         callback('A');
//     }, Math.random() * 100);
// }
// function bar(callback) {
//     setTimeout(() => {
//         callback('B');
//     }, Math.random() * 100);
// }
// function baz(callback) {
//     setTimeout(() => {
//         callback('C');
//     }, Math.random() * 100);
// }
//
// foo(console.log)
// bar(console.log)
// baz(console.log)

// Написать функцию, чтобы починить последовательность выполнения A,B,C без использования колбэк хэлла
// в функциях foo, bar,baz запрещено что-либо менять
// подсказка: нужны промисы =))
// Исправленная функция:
// function fooPromise() {
//    return new Promise((resolve, reject) => {
//      foo((result) => {
//        console.log(result);
//        resolve();
//      });
//    });
//  }
//  fooPromise()
//    .then(() => {
//      return new Promise((resolve, reject) => {
//        bar((result) => {
//          console.log(result);
//          resolve();
//        });
//      });
//    })
//    .then(() => {
//      return new Promise((resolve, reject) => {
//        baz((result) => {
//          console.log(result);
//          resolve();
//        });
//      });
//    });

///////////////
// todo Объяснить код, рассказать какие консоли и в какой последовательности будут, а затем переписать его на промисы
// function resolveAfter2Seconds(x) {
//     console.log(`Какой Х пришёл -> ${x}`) // sync2; // sync4
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(x); //
//         }, 5000);
//     });
// }
// async function add1(x) {
//     console.log('add1 Hello') // sync1
//     const a = await resolveAfter2Seconds(20); // sync3
//     const b = await resolveAfter2Seconds(30); // sync5
//     console.log('add1 Bye') // sync6
//     return x + a + b; // sync7
// }
// add1(10).then(console.log); // micro1

// Вывод в консоль браузера: add1 Hello, Какой Х пришёл -> 20, Какой Х пришёл -> 30, add1 Bye, 60

/* 

1) Вызывается функция add1(10)
2) Внутри add1(10) первым исполняется синхронный код - console.log("add1 Hello");
- затем вторым исполняется const a = await resolveAfter2Seconds(20):
- приостанавливается выполнение add1(10) и переходим к исполнению функции resolveAfter2Seconds(20) 
4) Внутри функции resolveAfter2Seconds(20) первым исполняется синхронный код - console.log(`Какой Х пришёл -> ${x}`) со значением х = 20
- затем через 5 секунд промис, возвращаеиый функцией resolveAfter2Seconds(20) разрешается со значением 20
5) Возвращаемся в функцию add1(10), где переменной const a присвваивается значение зарезолвленного промиса из функции resolveAfter2Seconds(20) - 20
6) Далее в функции add1(10) по той же схеме переменной const b присваивается значение зарезолвленного промиса из функции resolveAfter2Seconds(30) - 30
7) После последней приостановки исполнения кода функции add1(10) из-за await, продолжается синхронное исполнение кода по порядку :
- вызывается console.log("add1 Bye")
- и функция add1(10) возвращает значение суммы аргументов x + a + b = 10 + 20 + 30 = 60
8) После завершения выполнения фкнкции add1(10) вызывается метод then, который выводит в консоль возвращённое функцией add1(10) значение 60.

*/

// на промисах:

function resolveAfter2Seconds(x) {
  console.log(`Какой Х пришёл -> ${x}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 5000);
  });
}

function add1(num1) {
  console.log("add1 Hello");
  const promises = [resolveAfter2Seconds(20), resolveAfter2Seconds(30)];

  Promise.all(promises)
    .then((results) => {
      const [num2, num3] = results;
      console.log("add1 Bye");
      return num2 + num3;
    })
    .then((result) => {
      console.log(result + num1);
      return result + num1;
    });
}

add1(10);
