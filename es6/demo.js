// 暂时性死区
// var temp = 123;
//
// if (true){
//    temp = 321;
//    let temp = 3;
//    // 这里会报错
//    // ReferenceError: temp is not defined
// }
//
// console.log(temp);
// JSON.stringify()


// let x=  x;

// if(1){
//     var a = 3;
// }
// console.log(a);


// function f() { console.log('I am outside!'); }
//
// (function () {
//   if (1) {
//     // 重复声明一次函数f
//     function f() { console.log('I am inside!'); }
//   }
//
//   f();
// }());

// const str = '今天有50%的产品是傻逼，我买了10把冲锋枪，解决了其中的80%';
// // 如果是以前的我，我可能不会用断言这个思路去弄，而直接用普通的正则，如下
// // console.log(str.match(/(\d+)%/)); //
// // console.log(str.match(/(\d+)%/g));
// console.log(str.match(/(\d+)(?!%|\d)/g));

// const str = '今天我买了15件衬衫，每件的价格是￥10，总共花了￥150';
// console.log(str.match(/(?<!￥)\d+/g));

const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const matchObj = RE_DATE.exec('1999-12-31');

function a() {
    arguments
}
