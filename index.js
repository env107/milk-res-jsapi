; (function (that,f) {
    
    if (typeof exports === 'object') {
        module.exports = f()
    }else if (typeof define === 'function' && define.amd) {
        //支持AMD
		define([], f);
	}else {
		that.CryptoJS = f();
	}

}(this,function(){

    var crypto = require("crypto")
    var nonce = require("nonce-str")

    const MiJSSdk = function m(app_id, app_prefix) {
        var session_init_str = 'app_init'
        var base64_force = true
        var expires_time = 1800
        this.buildInitInfo = function (session_id = 0) {
            var authorizationData = []
            var nonce_str = nonce(16)
            var timestamp = new Date().getTime().toString()
            timestamp = timestamp.substr(0, timestamp.length - 3)
            var signature = hash_hmac256((app_id + session_id + timestamp), nonce_str)
            var info = {}
            if (app_id == undefined || app_id.toString().length < 1) {
                throw new Error('app_id must required')
            }
            if (app_prefix == undefined || app_prefix.toString().length < 1) {
                throw new Error('app_prefix must required')
            }
            if (expires_time < 1800 || expires_time > 7200) {
                throw new Error("expires_time must set in 30min-2hours")
            }
            session_id == undefined ? 0 : session_id
            console.log("Build Data...")
            authorizationData.push(app_id)
            authorizationData.push(session_id)
            authorizationData.push(nonce_str)
            authorizationData.push(timestamp)
            authorizationData.push(expires_time)
            authorizationData.push(session_init_str)
            authorizationData.push(signature)
            info.authorization = authorizationData.join("/")
            if (base64_force) {
                info.authorization = b64_encode(info.authorization)
                info['b64x'] = "force"
            }
            info['x-app-id'] = app_id.toString()
            info['x-app-prefix'] = app_prefix.toString()
            console.log("Build Success!")
            return info
        }
        this.buildApiInfo = function (session_id, params) {
            var queryData = []
            if (session_id == undefined) {
                throw new Error("session_id must required")
            }
            if (params == undefined) {
                throw new Error("params must required")
            }
            if (!params.hasOwnProperty("method")) {
                throw new Error("params.method must required")
            }
            if (!params.hasOwnProperty("host")) {
                throw new Error("params.host must required")
            }
            if (!params.hasOwnProperty("signature")) {
                throw new Error("params.signature must required")
            }
            if (!params.hasOwnProperty("path")) {
                throw new Error("params.path must required")
            }
            var authorizationData = []
            var nonce_str = nonce(16)
            var timestamp = new Date().getTime().toString()
            timestamp = timestamp.substr(0, timestamp.length - 3)
            var signature = hash_hmac256((app_id + session_id + timestamp), nonce_str)
            var server_signature = ''
            var info = {}
            var quertString = ''
            var request_id = []
            var contentMd5 = ''
            console.log("Build Data...")
            authorizationData.push(app_id)
            authorizationData.push(session_id)
            authorizationData.push(nonce_str)
            authorizationData.push(timestamp)
            authorizationData.push(expires_time)
            if (params.hasOwnProperty("query")) {
                for (var k in params.query) {
                    queryData.push(encodeURI(k) + "=" + encodeURI(params.query[k]))
                }
                quertString = queryData.join("&")
            }
            contentMd5 = b64_encode(md5(params['signature']))
            request_id.push("method:" + params['method'].toString().toUpperCase())
            request_id.push("host:" + params['host'])
            request_id.push("signature:" + params['signature'])
            request_id.push("path:" + params['path'])
            request_id.push("query:" + quertString)
            request_id.push("content-length:" + quertString.length)
            request_id.push("content-md5:" + contentMd5)
            request_id = request_id.join("\\n");
            request_id = b64_encode(request_id)
            authorizationData.push(request_id)
            server_signature = hash_hmac256(signature, params['signature'])
            authorizationData.push(server_signature)
            info.authorization = authorizationData.join("/")
            if (base64_force) {
                info.authorization = b64_encode(info.authorization)
                info['b64x'] = "force"
            }
            info['x-app-id'] = app_id.toString()
            info['x-app-prefix'] = app_prefix.toString()
            info['content-md5'] = contentMd5
            console.log("Build Success!")
            return info
        }
        this.setBase64Force = function () {
            base64_force = true
        }
        this.setExpiresTime = function (expire) {
            expires_time = expire
        }
    }

    function b64_encode(str) {
        return (new Buffer(str)).toString('base64')
    }
    function b64_decode(str) {
        return (new Buffer(str, 'base64')).toString()
    }
    function hash_hmac256(data, key) {
        var hmac = crypto.createHmac('sha256', key)
        var update = hmac.update(data)
        return update.digest('hex')
    }
    function md5(str) {
        var hash = crypto.createHash("md5")
        var update = hash.update(str)
        return update.digest('hex')
    }

    return MiJSSdk
}));


