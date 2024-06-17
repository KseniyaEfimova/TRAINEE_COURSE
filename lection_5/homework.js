//1.
// const a = {b: 1},
//     c = Object.create(a);
//
// console.log(c.b); // 1
// delete c.b;
// console.log(c.b); // 1
// delete a.b;
// console.log(c.b); // undefined
// a.z = 2;
// console.log(c.z); // 2
// c.z = 3;
// console.log(a.z); // 2
/* Object.create создает новый объект, который прототипно наследует свойства и методы от указанного объекта. 
Изменения в унаследованном объекте никак не повлияют на родительский объект, но изменения в родительском объекте, наоборот, 
затронут и унаследованный объект, поскольку он ссылается 
на родительский через цепочку прототипов.
 */

// 2.

// const promise = new Promise(() => {
// })
// promise.prototype === Promise.__proto__ // false
//
// const obj = {}
// obj.__proto__ === Object.prototype // true
//
// new Array([]).__proto__ === Array.prototype // true
//
// function Fn1 () {}
// function Fn2 () {}
// Fn1.constructor === Fn2.constructor // true
//
// Fn1.prototype === Fn2.prototype // false
/* 
1. false т.к. свойство prototype имеют только классы и функции (кроме стрелочных), но не экземпляры объектов, созданные с помощью этих функций, а
Promise.__proto__ === Function.prototype  
2. true т.к. объект имеет __proto__, который равен прототипу объекта, с помощью которого он был создан.
3. true т.к. аналогично примеру 2, только разница в синтаксисе создания объекта (массива в данном случае) перед .__proto__
4. true т.к. и Fn1 и Fn2 созданы с помощью одного и того же конструктора new Function() и наследуют общее для них свойство constructor
5. false т.к. у обоих фкнкций prototype это новый пустой объект, но это два разных объекта, которые не равны между собой
*/
//3.

// У вас есть два конструктора, Animal и Bird.
// Каждый объект типа Bird должен наследовать метод speak от Animal.
// Однако, Bird также должен иметь свой собственный метод fly.

// Создайте функцию-конструктор Animal, который принимает параметр name и устанавливает его как свойство объекта.
// Добавьте метод speak в Animal, который выводит в консоль звук, издаваемый животным (например, "Some generic sound").
// Создайте конструктор Bird, который принимает параметр name и вызывает конструктор Animal с тем же именем.
// Добавьте метод fly в Bird, который выводит в консоль сообщение о том, что птица летит (например, "Flying high!").
// Создайте объекты animal и bird с использованием соответствующих конструкторов и вызовите их методы speak и fly.
// Решите задачу, используя прототипное наследование, чтобы Bird наследовал от Animal.

// Должно быть такое поведение:
// const animal = new Animal("Дженни");
// const bird = new Bird("Воробей");
//
// animal.speak(); // "Some generic sound"
// bird.speak();   // "Some generic sound"
// bird.fly();     // "Flying high!"

// Решение:
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  console.log("Some generic sound");
};

function Bird(name) {
  Animal.call(this, name); // Вызов конструктора Animal для установки свойства name
}

Bird.prototype = Object.create(Animal.prototype); // Наследование от Animal через прототип

Bird.prototype.fly = function () {
  console.log("Flying high!");
};
