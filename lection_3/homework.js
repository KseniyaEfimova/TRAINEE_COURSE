//1
const user = {
  name: "Bob",
  funcFunc() {
    return function () {
      console.log(this);
    };
  },
  funcArrow() {
    return () => {
      console.log(this);
    };
  },
  arrowFunc: () => {
    return function () {
      console.log(this);
    };
  },
  arrowArrow: () => {
    return () => {
      console.log(this);
    };
  },
};

user.funcFunc()(); // undefined т.к. при таком вызове теряется контекст
user.funcArrow()(); // {user}, поскольку стрелочная функция запомнила контекст от родительской функции
user.arrowFunc()(); // undefined т.к. при таком вызове теряется контекст
user.arrowArrow()(); // undefined т.к. стрелочная функция запомнила контекст из окружения в момент создания (window)

2;
var poke1 = { name: "Pikachu" };
var poke2 = { name: "Chermander" };
var poke3 = { name: "Bulbasaur" };

var sayName = function () {
  console.log(this.name);
};

sayName.bind(poke1).bind(poke2).call(poke3); // 'Pikachu' т.к. второй вызов bind(poke2) игнорируется,
// а call(poke3) вызывает bind(poke1), но не меняет контекст, потому что this уже привязан к poke1

3;
const obj = {
  firstName: "Bill",
  lastName: "Ivanov",

  showFirstName: function () {
    console.log(this.firstName);
  },

  showLastName: () => {
    console.log(this.lastName);
  },
};

obj.showFirstName(); // 'Bill'
obj.showLastName(); // undefined т.к. стрелочная функция не имеет своего this

obj.showFirstName.bind({ firstName: "Boris" })(); // 'Boris' т.к. bind перепривязал контекст
obj.showFirstName.bind({ firstName: "Boris" }).bind({ firstName: "Oleg" })(); // 'Boris' т.к. bind перепривязал контекст,
// а второй вызов bind не влияет на уже установленный контекст
obj.showLastName.bind({ lastName: "Boris" })(); // undefined т.к. стрелочная функция запомнила окружающий контекст в момент создания
// и bind не может изменить его внутри стрелочной функции

4;

const user = {
  name: "Mike",
  fn: function () {
    console.log(this.name);
  },
};

setTimeout(user.fn, 1000);

//Что будет выведено в консоль после истечения таймаута и почему? --> undefined т.к.setTimeout вызывает колбэк в глобальном контексте, где this undefined
//Сделайте так, чтоб починить и выводило "Mike" --> setTimeout(user.fn.bind(user), 1000) явно привяжем нужный контекст
// или вместо .bind(user) можно user.fn обернуть в стрелочную функцию

//Подсказка - ответ найдете в 5 ссылке README

5;
//Исправьте cтроку(***), чтобы всё работало (других строк изменять не надо, кроме password, чтобы проверить if else).

function askPassword(ok, fail) {
  let password = "rockstar2";
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: "Вася",

  loginOk() {
    console.log(`${this.name} logged in`);
  },

  loginFail() {
    console.log(`${this.name} failed to log in`);
  },
};

askPassword(user.loginOk.bind(user), user.loginFail.bind(user)); // была потеря контекста, через bind устанавливаем нужный
