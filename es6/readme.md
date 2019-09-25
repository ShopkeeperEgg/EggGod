# ES6 相关东西

emmmmm，阮一峰软大神的这个东西真的很流啤，[软大神写的es6入门](http://es6.ruanyifeng.com)

这次是二刷，第一遍看了个大概，每次会对这个东西弄个心得之类的东西，这md没怎么用过，不过貌似蛮好用的。

不说废话了，进入正题。

那个。。如果有人看的话。。建议还是先刷一遍阮大神的那本书再看，我是基于他的那本书，把我觉得比较重要的东西写上去。

## let 和 const 命令

这玩意很容易用，也很方便，能避免变量污染，也可以对一些变量进行规范，项目大了，团队大了，一些规范也蛮重要的。

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
a = 3; // Uncaught ReferenceError: Cannot access 'a' before initialization
// xxx
const a = 3; // 此句上方是TDZ，从这一句之后开始，就"解除"了死区
console.log(a); // 此句开始就可以正常用了
```


for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。

```javascript
for (let i = 0; i < 10; i++) {
  let i = 3;
  // 这里不会报错
  console.log(i); // 3
}
```

PS： 我觉得这玩意就面试题能用到，谁要是在项目中乱弄这些死区，不被喷死都是好的


### 不允许重复声明

`let`不允许在相同作用域内，重复声明同一个变量。

```javascript
// 报错
function func(a) {
  // 在一个函数声明里，是可以这么做的
  a = 4;
  var a = 3;
  
  // 但是就不能这么做了
  // 因为是重复声明变量了
  // 我个人的理解是，函数里的形参a，可以这么理解
  // func(123); // 调用时
  // 此时在函数内部，就是这样的 fun(a) 这里做的事情就是， var a = 123;
  // 所以下面再使用 let/const 重新赋值的时候，就会报错
  let a = 3; // Uncaught SyntaxError: Identifier 'aa' has already been declared
}
```

### 解构赋值

## 默认值

解构赋值可以搞默认值

```javascript
let [x = 1] = [];
x // 1;
```

注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。


```javascript
function f() {
  console.log('aaa');
}

let [x = f()] = [1];
```

上面代码中，因为x能取到值，所以函数f根本不会执行。上面的代码其实等价于下面的代码。

```javascript
let x;
if ([1][0] === undefined) {
  x = f();
} else {
  x = [1][0];
}
```

有一个神奇的用法，就是使用解构赋值交换两个变量的值
```javascript
let a = 3;
let b = 4;
[a, b] = [b, a]
```


### 字符串的扩展

模板字符串可以作为函数的参数传递，方式如下
```javascript
function a(a, b, c, d, e) {
  console.log(a, b, c, d, e); // [ '', '11', '22', '33', '' ] 1 2 3 4
}
a`${1}11${2}22${3}33${4}`;
```

“标签模板”的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容。

```javascript
let message =
  SaferHTML`<p>${sender} has sent you a message.</p>`;

function SaferHTML(templateData) {
  let s = templateData[0];
  for (let i = 1; i < arguments.length; i++) {
    let arg = String(arguments[i]);

    // Escape special characters in the substitution.
    s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

    // Don't escape special characters in the template.
    s += templateData[i];
  }
  return s;
}
```

### 正则的拓展

这里主要讲讲修饰符吧，那些编码之类的东西看着头大

最基本的 i，g修饰符就不讲了，谁都会的，现在来说说新增的修饰符

- u 修饰符

> ES6 对正则表达式添加了u修饰符，含义为“Unicode 模式”，用来正确处理大于\uFFFF的 Unicode 字符。也就是说，*** 会正确处理四个字节的 UTF-16 编码。 ***

- y 修饰符

> '粘连'修饰符，作用和g有一点点像（官方解释，ps：像个鸡毛），作用是从上一次匹配成功后的第一位继续匹配，匹配上了就正常返回，否则的话就返回null

```javascript
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;
r1.exec(s); // aaa
r1.exec(s); // aa
r1.exec(s); // a
r1.exec(s); // null

r2.exec(s); // aaa
r2.exec(s); // null，因为第一次匹配完成之后
```

而且y修饰符必须特么从最前面开始匹？？惹，6的一批 /a+/y.exec('_aaa')  ---> null 吐血惹

So，和g修饰符近似在哪儿了，瞎几把扯 

实际上，y修饰符号隐含了头部匹配的标志

单单一个y修饰符对match方法，只能返回第一个匹配，必须与g修饰符联用，才能返回所有匹配。

```javascript
'a1a2a3'.match(/a\d/y) // ["a1"]
'a1a2a3'.match(/a\d/gy) // ["a1", "a2", "a3"]
```


- s 修饰符 ： dotAll 模式

正则表达式中，点（.）是一个特殊字符，代表任意的单个字符，但是有两个例外。一个是四个字节的 UTF-16 字符，这个可以用u修饰符解决；另一个是行终止符（line terminator character）。

所谓行终止符，就是该字符表示一行的终结。以下四个字符属于“行终止符”。

U+000A 换行符（\n）

U+000D 回车符（\r）

U+2028 行分隔符（line separator）

U+2029 段分隔符（paragraph separator）

```javascript
/foo.bar/.test('foo\nbar'); // false
// 可以用下面方法匹配，但是并不直观
/foo[^]bar/.test('foo\nbar'); // true
// 所以可以加上s修饰符，使.能够匹配到"行终止符"等等等
/foo.bar/s.test('foo\nbar'); // true
```

### 先行断言 和 后行断言

之前你一直有个沙雕一般的迷惑，就是先行断言和后行断言的迷惑，现在就来好好的整理一下

先说一下具体的解释

先行断言：x只有在y前面才匹配，必须写成/x(?=y)/。比如，只匹配百分号之前的数字，要写成/\d+(?=%)/。

先行否定断言：x只有不在y前面才匹配，必须写成/x(?!y)/。比如，只匹配不在百分号之前的数字，要写成/\d+(?!%)/。

比方说，现在你有一个需求，匹配一个字符传中所有百分号前面的数字

```javascript
const str = '今天有50%的产品是傻逼，我买了10把冲锋枪，解决了其中的80%';
// 如果是以前的我，我可能不会用断言这个思路去弄，而直接用普通的正则，如下
str.match(/(\d+)%/); // [ '50%','50',index: 3,input: '今天有50%的产品是傻逼，我买了10把冲锋枪，解决了其中的80%' ]
// 貌似的确可以匹配到耶，但是。。后面还有个80%。。于是我想到了修饰符g，然后我操作了
str.match(/(\d+)%/g); // [ '50%', '80%' ]
// 哟，这下和你的想法不太一样啊，于是就很尬，所以咱引入了先行断言
str.match(/\d+(?=%)/g); // 呦，这样需求不就解决了么
// 现在来匹配一下，非百分号前的数字
str.match(/\d+(?!%)/g); // [ '5', '10', '8' ]
// 惹，又出新问题了，没法50%的5后面不是%，也被匹配上了，于是再优化一下下。。。
str.match(/\d+(?!%|\d)/g); // ['10']
// OK 完美解决
```

后行断言与先行断言相反

后行断言：x只有在y后面才匹配，必须写成/(?<=y)x/。比如，只匹配美元符号之后的数字，要写成/(?<=\$)\d+/

后行否定断言：x只有不在y后面才匹配，必须写成/(?<!y)x/。比如，只匹配不在美元符号后面的数字，要写成/(?<!\$)\d+/。

```javascript
const str = '今天我买了15件衬衫，每件的价格是￥10，总共花了￥150';
str.match(/(?<=￥)\d+/g); // [ '10', '150' ] 获取所有的￥后的数字
str.match(/(?<!￥)\d+/g); // [ '15', '0', '50' ] 不符合预期
str.match(/(?<!￥|\d)\d+/g); // [ '15' ] 搞定
```

整理一下

先行断言：x(?=y)

后行断言：(?<=y)x

先行否定断言：x(?!y)

后行否定断言：(?<!y)x

### 具名组匹配

```javascript
const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;

const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj[1]; // 1999
const month = matchObj[2]; // 12
const day = matchObj[3]; // 31
```

ES2018 引入了具名组匹配（Named Capture Groups），允许为每一个组匹配指定一个名字，既便于阅读代码，又便于引用。

取的名字放到了 exec 或者 match 返回结果里的 groups 字段中

```javascript
const RE_DATE = /(?<Y>\d{4})-(?<M>\d{2})-(?<D>\d{2})/;
RE_DATE.exec('1995-06-19') // ⤵️
'1995-06-19'.match(RE_DATE) // ⤵️
/*
['1995-06-19', '1995', '06', '19', index: 0, groups: { D: '19', M: '06', Y: '1995' }, input: '1995-06-19']
*/

let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;

'2015-01-02'.replace(re, '$<day>/$<month>/$<year>')
// '02/01/2015'

'2015-01-02'.replace(re, (
   matched, // 整个匹配结果 2015-01-02
   capture1, // 第一个组匹配 2015
   capture2, // 第二个组匹配 01
   capture3, // 第三个组匹配 02
   position, // 匹配开始的位置 0
   S, // 原字符串 2015-01-02
   groups // 具名组构成的一个对象 {year, month, day}
 ) => {
 let {day, month, year} = groups;
 return `${day}/${month}/${year}`;
});

```
如果要在正则表达式内部引用某个“具名组匹配”，可以使用\k<组名>的写法。


```javascript
const RE_TWICE = /^(?<word>[a-z]+)!\k<word>$/;
RE_TWICE.test('abc!abc') // true
RE_TWICE.test('abc!ab') // false

// 数字引用（\1）依然有效。
const RE_TWICE = /^(?<word>[a-z]+)!\1$/;
RE_TWICE.test('abc!abc') // true
RE_TWICE.test('abc!ab') // false

// 这两种引用语法还可以同时使用
const RE_TWICE = /^(?<word>[a-z]+)!\k<word>!\1$/;
RE_TWICE.test('abc!abc!abc') // true
RE_TWICE.test('abc!abc!ab') // false
```

