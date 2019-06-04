# 一些比较混杂的笔记

### 变量污染

```javascript
function test () {
  a = 3;
}
test();
console.log(a); // 3 
```

上面就污染了全局变量a

