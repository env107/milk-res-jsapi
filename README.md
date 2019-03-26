#mi-jssdk 使用文档

## 安装

```
    npm install mi-jssdk
```

## 使用

```
    var sdk = require("mi-jssdk")
    
    var msdk = new sdk([app_id],[app_prefix]); //必填两个参数,第一个是app_id,第二个是app_prefix

    //初始化会话
    msdk.buildInitInfo()

```

## buildInitInfo() 创建初始化会话资源签名
#### 通过该接口可以生成初始化会话签名以及头部信息
#### 参数
####    session_id : 会话id, 可选参数;
#### 返回一个对象，储存发送请求的头部信息

### 示例

```
    var sdk = require("mi-jssdk")
    
    var msdk = new sdk([app_id],[app_prefix]); //必填两个参数,第一个是app_id,第二个是app_prefix

    //初始化会话
    var data = msdk.buildInitInfo([session_id])
```

### 返回

```
{ 
    'authorization':'YTd1djE5Y09NZ2U4NzJtSEc2YUovMC9WRUFtRUVMdTRkZDNqeGtpLzE1NTM1ODIwMDQvMTgwMC9hcHBfaW5pdC8yM2Y5MWY0ODFiOWVjNWYwMDMyNjU0MWNjNGY1YTQxM2RlNjJmNTRhN2Q5MzE1N2ZiY2I2Yjg5NWU5MzQyZWM2',
    'b64x': 'force',
    'x-app-id': 'a7uv19cOMge872mHG6aJ',
    'x-app-prefix': 'optional' 
}
```

## buildApiInfo() 创建api请求签名
#### 通过该接口可以生成api请求接口的签名
#### 参数
####    session_id : 会话ID，必选
####        params : 请求信息,必选参数,该参数为一个对象
####        params.method : 请求方法 get | post | put | delete 
####        params.host : 主机名称 例如 example.com
####        params.signature : 初始化会话服务器返回的32位签名字符串
####        params.path : pathinfo,例如 /path/info
####        params.query : 查询参数(QueryString) , 一个对象(推荐使用),也可以是一个QueryString ,该参数可选

### 返回一个对象，储存发送请求的头部信息

### 示例

```
    var sdk = require("mi-jssdk")
    
    var msdk = new sdk([app_id],[app_prefix]); //必填两个参数,第一个是app_id,第二个是app_prefix

    //初始化会话
    var data = msdk.buildApiInfo([session_id],[params])
```

### 返回

```
{ 
    'authorization':'YTd1djE5Y09NZ2U4NzJtSEc2YUovMC9WRUFtRUVMdTRkZDNqeGtpLzE1NTM1ODIwMDQvMTgwMC9hcHBfaW5pdC8yM2Y5MWY0ODFiOWVjNWYwMDMyNjU0MWNjNGY1YTQxM2RlNjJmNTRhN2Q5MzE1N2ZiY2I2Yjg5NWU5MzQyZWM2',
    'b64x': 'force',
    'x-app-id': 'a7uv19cOMge872mHG6aJ',
    'x-app-prefix': 'optional' ,
    'content-md5' : '098f6bcd4621d373cade4e832627b4f6'
}
```

## setExpiresTime() 设定会话数据过期时间
#### 设置会话有效时间
#### 参数
#### expires_time : 过期时间,单位:秒 默认值1800
#### 参数说明
#### 有效时间最小值为30分钟，最大值为2小时

### 示例

```
    var sdk = require("mi-jssdk")
    
    var msdk = new sdk([app_id],[app_prefix]); //必填两个参数,第一个是app_id,第二个是app_prefix

    msdk.setExpiresTime(2000)

    var data = msdk.buildApiInfo([session_id],[params])
```
