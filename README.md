# oneIsAll
仿韩寒one is all的vue版本
# 关于接口
接口都是在于自己用fiddler抓one is all的ios包分析出来，并且自己用node与axios做了一层代理,仅供自己学习使用,并不会用于任何商业用途。
# 踩坑
1.在移动端不能通过new Date('2017-07-19 19：00：00')这种方式获取毫秒数,会返回NAN,需要用到Date.parse
