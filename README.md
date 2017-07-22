# oneIsAll
仿韩寒one is all的vue版本
# 关于接口
接口都是在于自己用fiddler抓one is all的ios包分析出来，并且自己用node与axios做了一层代理,仅供自己学习使用,并不会用于任何商业用途。
# 踩坑
1.在移动端不能通过new Date('2017-07-19 19：00：00')这种方式获取毫秒数,会返回NAN,需要用到Date.parse
2.在使用动态路由,比如/user/123 push到/user/234的时候,组件并不会被销毁，而是直接被复用，这意味着生命周期的钩子函数都不会执行
https://router.vuejs.org/zh-cn/essentials/dynamic-matching.html，这个是尤大给的建议。但是他这个只能解决数据渲染的问题，而我是需要在/user/123 push到/user/234由的时候也要重复执行组件的css3过度效果,所以我在App.vue组件的router-view上面绑定了key,相当于不复用组件,网上也有另一种方案，设置canReuse为false，但是自己没配置成功。先记录下
