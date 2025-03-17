import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue2";
import {partyBackApi} from "./src/constants.js";
// https://vite.dev/config/
export default defineConfig({
    base: "./",
    server: {
        proxy: {
            "/Handler": {
                target: "http://180.169.38.40:8089/Handler",
                timeout: 1800000,
                ws: true,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/Handler/, ""), //路径重写，把'/api'替换为''
            },
            "/partyBackApi": {
                target: "http://180.169.38.40:8089/partyBackApi",
                timeout: 1800000,
                ws: true,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/partyBackApi/, ""), //路径重写，把'/api'替换为''
            },
        }
    },
    resolve: {
        alias: {
            vue: "vue/dist/vue.esm.js",
        },
    },
    build: {
        target: "es2015", // 设置构建目标环境，可以是'es2015'等
        outDir: "lifeBoxDashboard", // 构建时输出目录
        assetsDir: "assets", // 放置生成的静态资源的目录
        minify: "false", // 构建时是否进行代码压缩
        sourcemap: false,
        terserOptions: { // 传递给Terser的更多选项
            compress: {
                drop_console: true, // 是否删除所有的`console`语句
            },
        },
        rollupOptions: { // 自定义Rollup的选项
            output: {
                chunkFileNames: "static/js/[name]-[hash].js", // 构建时的代码块文件名
            },
        },
    },
    plugins: [vue()],
});
