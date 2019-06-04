# ES6 相关东西

emmmmm，阮一峰软大神的这个东西真的很流啤，[软大神写的es6入门](http://es6.ruanyifeng.com)

这次是二刷，第一遍看了个大概，每次会对这个东西弄个心得之类的东西，这md没怎么用过，不过貌似蛮好用的。

不说废话了，进入正题。

那个。。如果有人看的话。。建议还是先刷一遍阮大神的那本书再看，我是基于他的那本书，把我觉得比较重要的东西写上去。

## let 和 const 命令

### 暂时性死区

只要块级作用域里存在 let/const 命令，它声明的这个变量就"绑定"在这个区域，外部的同名变量不会影响到它

```javascript
// 暂时性死区
var temp = 123;
if (true){
   temp = 321;
   let temp = 3;
   // 这里会报错
   // ReferenceError: temp is not defined
}

console.log(temp);
```

上述代码会报错，原因其实很简单，`let temp = 3;` 这段代码会使`if (true) {}`这个代码块中绑定了temp这个变量

由于 `let/const` 不存在变量提升的问题，如果在temp前面声明，就会出现变量未定义的错误

关键点有两个，一个就是**暂时性死区**，另一个就是 **let/temp 不存在变量提升**的问题 

ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

有个地方值得注意的是，typeof 不再是一个安全的操作

```javascript
// 一般情况下，typeof是一个相对安全的操作
// a 未定义
typeof a; // undefined
// es6情景下
typeof a; // Uncaught ReferenceError: Cannot access 'a' before initialization
let a = 3;
```

还有个东西，就是，死区好理解，那暂时性是啥意思呢？

每次使用`const/let`，声明代码段的上方是暂时性的，等到那个变量已经声明了，就可以正常使用这个变量了

暂时性死区（temporal dead zone，简称 TDZ）

```javascript
a = 3;
// xxx
const a = 3; // 此句上方是TDZ，从这一句之后开始，就"解除"了死区
console.log(a); // 此句开始就可以正常用了
```

PS： 我觉得这玩意就面试题能用到，谁要是在项目中乱弄这些死区，不被喷死都是好的
