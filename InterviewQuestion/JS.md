## 一、隐藏类

- 基于浏览器的运行规矩，通过浏览器->内核->js 解析引擎，js 引擎会生成隐藏类，而多个属性顺序一致的 js 对象，会重用一个隐藏类，从而优化性能。
- 因此在编码习惯上：定义对象或类时，尽可能保持属性顺序一致。

## 二、数组的快速模式和字典模式

- 数组从 0 到 length-1 无空洞"，会进入快速模式，存放为 array。
- "数组中间有空洞"，会进入字典模式，存放为 HashMap。(这是 V8 的一个优化策略，保证用最合适的数据结构处理当下场景，如果遇到数据量过大或者是松散结构的话，就改变为 HashMap，牺牲遍历性能，换取访问性能。)
- 指导代码编写习惯:
  - 从 0 开始初始化数组，避免数组进入字典模式。
  - 让数组保持紧凑，避免数组进入字典模式。

## 三、如何判断对象为空

- 通过打印对象的长度：`Object.keys(obj).length === 0`
- 通过转成 JSON 格式：`JSON.stringify(obj) === '{}'`
- for in 判断
- 最严谨的判断：`Reflect.ownKeys(obj).length === 0`

## 四、if (a == 1 && a == 2 && a == 3) {console.log("111")}成立

- 使用 `valueOf()`劫持。（重点）
- 使用 `Proxy` 拦截。
- 使用数组 `join` 方式重写。

## 五、JS 单线程设计的目的

- javascript 是浏览器的脚本语言，主要用途是进行页面的一系列交互操作以及用户互动，多线程编程通常会引发竞态条件、死锁和资源竞争等问题。

## 六、如何判断 javascript 的数据类型

- `typeof` 操作符: 可以用来确定一个值的基本数据类型，返回一个表示数据类型的字符串。
- `Object.prototype.toString`:用于获取更详细的数据类型信息。

## 七、let 声明变量的特性

- 块级作用域
- 暂时性死区
- 同级作用域下不能重复声明
- 全局声明会挂在在 script 作用域下，不会挂在在 window

## 八、变量提升 & 函数提升(优先级)

- 函数提升>变量提升

## 九、如何判断对象相等

- 常用 JSON.stringify(obj1) === JSON.stringify(obj2)

## 十、null 和 undefined 的区别

### undefined

- 当声明了一个变量但未初始化它时，它的值为 `undefined`
- 当访问对象属性或数组元素中不存在的属性或索引时，也会返回 `undefined`
- 当函数没有返回值时，默认返回 `undefined`
- 如果函数的参数没有传递或没有被提供值，函数内的对应参数的值为 `undefined`

### null

- `nu11` 是一个特殊的关键字，表示一个空对象指针。
- 它通常用于显式地指示一个变量或属性的值是空的，`nu11` 是一个赋值的操作，用来表示"没有值"或"空"
- `null` 通常需要开发人员主动分配给变量，而不是自动分配的默认值。
- `nu11` 是原型链的顶层:所有对象都继承自 `object` 原型对象，`object`原型对象的原型是 `nu11`。

## 十一、setTimeout 和 setInterval 的区别

- setTimeout 是生成一个执行一个。
- setInterval 无视执行时间，生成一个就丢一个进行队列等待。

## 十二、宏任务和微任务

### 宏任务

- `setTimeout` / `setInterval`
- I/O 操作（文件读写、网络请求等）
- DOM 事件回调（如 click 事件）
- `script` 整体代码
- `requestAnimationFrame`（浏览器）
- `setImmediate`（Node.js 特有）

### 微任务

- `Promise.then()` / `catch()` / `finally()`
- `MutationObserver`（浏览器）
- `queueMicrotask()`
- `process.nextTick`（Node.js，优先级最高）

## 十三、 内存泄漏

- 意外的全局变量
- 闭包
- 事件监听
- 循环引用
- 定时器

## 十四、闭包，闭包的运用场景

### 闭包

- 闭包是指引用了另一个函数作用域中的变量的函数，通常是在嵌套函数中出现

### 运用场景

- 防抖/节流封装
- 临时凭证管理（提供短时权限）

## 十五、数组去重

### Set 只允许存储唯一的值，可以将数组转换为 Set，然后再将 Set 转换回数组以去重。

```js
const arr = [1,2,3.4,5.5,1]
onnst newArr = [...new Set(arr)]
```

### filter 方法遍历数组

```js
const arr=[1，2，2，3，4，4，5];
const uniqueArr = arr.filter((value, index, self)=>self.index0f(value)=== index);
```

### 用 reduce 方法逐个遍历数组元素，构建一个新的数组，只添加第一次出现的元素。

```js
const arr=[1，2，2，3，4，4，5];
const unigueArr =arr.reduce((acc,current)=>{
if(!acc.includes(current)){
acc.push(current)；
}
return acc;
}，[]);
```

### 使用 indexof 方法，遍历数组，对于每个元素，检查其在数组中的索引，如果第一次出现，则添加到新数组。

```js
const arr=[1，2，2，3，5];
const uniqueArr =[];
arr.forEach((value)=>{
    if(uniqueArr.index0f(value) === -1){
        uniqueArr.push(value);
    }
}
);
```

### 使用 includes 方法:类似于 index0f 方法，只不过使用 includes 来检查元素是否已存在于新数组。

```js
const arr=[1，2，2，3，4，4，5];
const uniqueArr =[]
;arr.forEach((value)=>{
    if(!uniqueArr.includes(value)){
        uniqueArr.push(value);
        }
});
```

## 十六、数组的一些方法

### 遍历

- for(const i = 0;i < list.length;i++){}
- for(const key in list){}
- for(const item of list){}
- forEach(item=>{})
  - 仅遍历
- map (item=>{})
  - 返回新数组

### 逻辑判断

- every(item=>{}) 全部返回 true 则函数返回 true

- some(item=>{}) 有一项返回 true，则函数返回 true，内部 或 关系

### 过滤

- filter(item=>{}) 返回过滤后的新数组

### 查找

- index0f();
  - 第一个找到的位置，否则为 -1
- lastIndex0f();
  - 最后一个找到的位置，否则为 -1
- includes();
  - 接受一个参数，如果数组有目标值，则返回 true
- find();
  - 如果找到目标值，返回目标值，否则返回 undefined
- list.findIndex();
  - 如果找到目标值，返回下标，否则返回-1

## 十七、js 数组的 reduce 使用

- 累加

```js
const result = [1, 2, 3].reduce((pre, cur) => pre + cur);
console.log(result);
```

- 找最大值

```js
const result = [1, 2, 3, 2, 1].reduce((pre, cur) => Math.max(pre, cur));
console.log(result);
```

- 数组去重

```js
const resultList =[1,2,3,2,1].reduce((prelist,cur)=>{
    if(preList.indexOf(cur) === -1){
        preList.push(cur);
    }
return prelist;
}，[]);
console.log(resultList);
```

- 归类

```js
const dataList=[{
name:'aa',
country:'China'
},{
name: 'bb',
country:'China
},{
name:'cc',
country:'USA
},{
name: 'dd',
country:'EN
}];
const resultObj = dataList.reduce((pre0bj,cur)=>{const{country}= cur;
if(!preobj[country]){
    preobj[country]=[];
}
preobj[country].push(cur);
return preObj;
}, {});
console.log(resultobj);

```

- 字符串反转

```js
const str = "hello world";
const resultStr = Array.from(str).reduce((pre, cur) => {
  return `${cur}${pre}`;
}, "");
console.log(resultstr);
```

## 十八、如何遍历对象

### for in

```js
const obj = { a: 1, b: 2, c: 3 };
for (let key in obj) {
  console.log(key, obj[key]);
}
```

### object.keys

```js
const obj={a:1,b:2,c:3 };
const keys = 0bject.keys(obj);
keys.forEach(key =>{
console.log(key,obj[key]);
});
```

### 0bject.entries

```js
const obj={a:1，b:2，c:3};
const entries =0bject.entries(obj);
entries.forEach([key,value])=>{console.log(key,value)};
```

## Reflect.ownKeys

```js
const obj={a:1,b:2，c:3 };Reflect.ownKeys(obj).forEach(key) =>{conosle.log(key,obj[key])};
```

### 十九、创建函数的方式

- 函数声明

```js
function sayHello() {
  console.log("hello");
}
```

- 函数表达式

```js
const sayHello = () {
  console.log("hello")
}
sayHello()
```

- 箭头函数

```js
const add = (a, b) => {
  a + b;
};
```

- 匿名函数

```js
setTimeout(function(){
  console.log("hello")
},1000),
```

### 二十、创建对象的几种方式

- 对象字面量

```js
const obj= {
  name
  age
}
```

- 构造函数

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const person = new Person("a", 30);
```

- Object.create()方法

```js
const obj = Object.create(null);
obj.name = "a";
obj.age = 18;
```

- 工厂函数

```js
function createPerson(name, age) {
  return {
    name,
    age,
  };
}
const person = createPerson("a", 30);
```

- 类

```js
class Person {
  c(name, age) {
    this.name = name;
    this.age = age;
  }
}
const person = new Person("a", 30);
```

### 宿主对象、内置对象、原生对象

- 宿主对象(Host Objects)
  - 宿主对象是由宿主环境(通常是浏览器或 Node.js)提供的对象。它们不属于 JavaScript 的核心，而是根据运行环境提供的功能而存在。宿主对象可以包括
  - 浏览器环境中的 window、document、XMLHttpRequest
  - Node.js 环境中的 global、process 等。
- 宿主对象的定义和行为取决于宿主环境，因此它们可能在不同的环境中有不同的特性。
- 内置对象(Built-in Objects)
  - 内置对象是 JavaScript 语言本身提供的对象，它们包含在 JavaScript 的标准规范中。这些对象包括全局对象、数学对象、日期对象、正则表达式对象等。内置对象可以直接在任何 JavaScript 环境中使用，无需额外导入或引入。例如，全局对象 Math 用于数学计算，日期对象 Date 用于日期和时间操作。
- 原生对象(Native Objects)
  - 原生对象是 JavaScript 语言的一部分，但它们不是内置对象。原生对象是通过构造函数或字面量方式创建的对象，例如数组、字符串、函数、对象等。这些对象可以通过 JavaScript 代码自定义，它们通常是开发人员用来构建应用程序的基本构建块。

boy undefond undefond ADa nan undefond baby boy
