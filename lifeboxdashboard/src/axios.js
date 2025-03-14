import Vue from "vue";
import axios from "axios";

let config = {
    baseURL: "", timeout: 600 * 1000, header: {}
};
const _axios = axios.create(config);

_axios.interceptors.request.use(function (config) {
    config.headers["x-my-header"] = "Winner123";

    const token = sessionStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = sessionStorage.getItem("token");
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

_axios.interceptors.response.use(function (response) {
    const data = response.data;
    // errcode!==0
    if (data.errcode && data.errcode !== "0") {
        window.vm.$message.error({ message: data.errmsg || "未知错误!", showClose: true });
    }
    if (data.code && data.code === "500") {
        window.vm.$message.error({ message: data.msg || "未知错误!", showClose: true });
    }
    //status !== 200
    if (data.status && data.status !== 200) {
        window.vm.$message.error({ message: data.message || "未知错误!", showClose: true });
    }
    //success为false
    if (data.success !== undefined && typeof data.success === "boolean" && data.success === false) {
        window.vm.$message.error({ message: data.respMsg || "请求错误", showClose: true });
    }

    if (response.headers["Content-Disposition"] || response.headers["content-disposition"]) {
        return response;
    }
    return data;
}, function (error) {
    if (error.response.status == 400) {
        window.vm.$message.error({ message: error.response.data.respMsg || "请求错误", showClose: true });
    } else if (error.response.status == 401) {
        window.vm.$message.error({ message: "未授权，请登录", showClose: true });
        localStorage.setItem("token", null);
    } else if (error.response.status == 403) {
        window.vm.$message.error({ message: error.response.data.errmsg, showClose: true });
    } else if (error.response.status == 404) {
        window.vm.$message.error({ message: "请求地址出错", showClose: true });
    } else if (error.response.status == 408) {
        window.vm.$message.error({ message: "请求超时", showClose: true });
    } else if (error.response.status == 500) {
        const { message } = error.response.data;
        if (message == "402,token过期请重新登录！") {
            window.vm.$message.error("登录已过期，请重新登录");
            localStorage.setItem("token", null);
            return null;
        }
        if (message == "401") {
            window.vm.$message.error("登录已过期，请重新登录");
            localStorage.setItem("token", null);
            return null;
        }
        window.vm.$message.error({ message: "服务器内部错误", showClose: true });
    } else if (error.response.status == 501) {
        window.vm.$message.error({ message: "服务未实现", showClose: true });
    } else if (error.response.status == 502) {
        window.vm.$message.error({ message: "网关错误", showClose: true });
    } else if (error.response.status == 503) {
        window.vm.$message.error({ message: "服务不可用", showClose: true });
    } else if (error.response.status == 504) {
        window.vm.$message.error({ message: "网关超时", showClose: true });
    } else if (error.response.status == 505) {
        window.vm.$message.error({ message: "HTTP版本不受支持", showClose: true });
    }
    const response = {
        data: { success: false, respData: {} }
    };
    return response;
});
const Plugin = {
    install(Vue) {
        if (this.installed) {
            return;
        }
        this.installed = true;

        Vue.axios = _axios;
        window.axios = _axios;
        Object.defineProperties(Vue.prototype, {
            $axios: {
                get() {
                    return _axios;
                }
            },
        });
    }
};

Vue.use(Plugin);

export default Plugin;