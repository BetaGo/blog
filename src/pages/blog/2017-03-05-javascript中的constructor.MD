---
layout: post
title: "javascript 中的 constructor"
date: 2017-03-05
excerpt: "对 javascript 中 constructor 的理解"
tags: [web, 学习, 前端, javascript]
comments: true
---
**javascript 中的 constructor**

javascript的函数拥有 .constructor 和 .prototype.constructor 两个属性。 .constructor默认指向Function对象; .prototype.constructor 默认指向函数本身。

javascript的对象只拥有一个 .constructor 属性。 .constructor 指向该对象的构造函数；如果是直接创建的对象，则 .constructor 指向 Object 对象。

测试代码如下：

```js
var test = new Function();
console.log(typeof test); // function
console.log(test.constructor === Function); // true
console.log(test.prototype.constructor === test); //true


var Human = function (name) {
  this.name = name || 'unnamed';
};
Human.prototype.getName = function () {
  console.log('Human name is : ' + this.name);
};
console.log(typeof Human); // function
console.log(Human.constructor === Function); // true
console.log(Human.prototype.constructor === Human); //true


var xiaoming = new Human('xiaoming');
console.log(typeof xiaoming); // Object
console.log(xiaoming.constructor === Human); //true
console.log(xiaoming.prototype.constructor === xiaoming); // TypeError: Cannot read property 'constructor' of undefined


var obj = new Object();
console.log(typeof obj); // Object
console.log(obj.constructor === Object); //true
console.log(obj.prototype.constructor === obj); // TypeError: Cannot read property 'constructor' of undefined
```
