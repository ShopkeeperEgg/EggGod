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


## 页面之间的通信

### 基本概念
同源： 

域名，协议，端口相同。

例：

``https://www.baidu.com/xxx`` 和 ``https://www.baidu.com/test`` 是同源

``http://www.baidu.com`` 和 ``https://www.baidu.com`` 非同源

``https://www.baidu.com:8080`` 和 ``https://www.baidu.com:744`` 非同源



> [这篇文章不错](https://blog.csdn.net/weixin_28900307/article/details/88560814) 说跨域的- -看到这个我都不想写了。。

大致看了一下这篇文章，大概总结了一下

1. CORS - 跨域资源共享（Cross-origin resource sharing）服务端解决

2. JSONP - 利用script的天生可跨域性进行解决

3. iframe/window.opener + window.name / window.hash / postMessage - 只要取到不同页面的window对象，剩下的就想咋做就咋做了


    父获取子的window对象： iframe.contentWindow / window.open('xxxxx')
    
    子获取父的window对象： window.parent / window.opener
    
4. nginx配置 - 运维搞

    同源策略是浏览器的安全策略，不是HTTP协议的一部分。服务器端调用HTTP接口只是使用HTTP协议，不会执行JS脚本，不需要同源策略，也就不存在跨越问题
    
    通过nginx配置一个【代理服务器（域名与domain1相同，端口不同）】做跳板机，【反向代理访问domain2接口】，并且可以顺便【修改cookie中domain】信息，方便当前域cookie写入，实现【跨域登录】。
    
    ![Alt](https://img-blog.csdnimg.cn/20190314203358407.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8yODkwMDMwNw==,size_16,color_FFFFFF,t_70)


