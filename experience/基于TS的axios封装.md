## axios 请求方式

- axios(config)
- axios.request(config)
- axios.get(url[, config])
- axios.delete(url[, config])
- axios.head(url[, config])
- axios.post(url[, data[, config]])
- axios.put(url[, data[, config]])
- axios.patch(url[, data[, config]])

```js
import axios from 'axios'

// axios的实例对象
// get请求
axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log(res.data)
})

// 额外补充的Promise中类型的使用
// Promise本身是可以有类型
new Promise<string>((resolve) => {
  // 泛型指定了,只能传string
  resolve('abc')
}).then((res) => {
  // 并且res也是string类型的
  console.log(res.length)
}

// 使用http://httpbin.org模拟数据请求

// get请求,并且传入参数
axios
  .get('http://httpbin.org/get', {
    // get请求使用params传参,并且最后会拼接到url后面
    params: {
      name: 'coderwhy',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  })

// post请求,传入参数
axios
  .post('http://httpbin.org/post', {
    // post请求使用data传参
    data: {
      name: 'why',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  })
```

- 同时使用两个请求

```js
// axios.all -> 多个请求, 一起返回
axios
  .all([
    axios.get("/get", { params: { name: "why", age: 18 } }),
    axios.post("/post", { data: { name: "why", age: 18 } }),
  ])
  .then((res) => {
    // 结果是个数组
    console.log(res[0].data);
    console.log(res[1].data);
  });
```

## 封装 axios

#### 首先要安装 axios

```js
npm install axios
```

- 项目结构

```txt
├─index.ts
│
├─config
│ index.ts
│
└─request
index.ts
type.ts

```

#### 配置的目的

- 可以对某个请求、某个请求实例的所有请求、所有请求实例的所有请求，设置拦截和是否显示 loading。

#### 配置 config.ts

```js
// 根据process.env.NODE_ENV区分
// 开发环境: development
// 生成环境: production
// 测试环境: test

let BASE_URL = "";
const TIME_OUT = 10000;

if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://123.207.32.32:8000/";
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "http://coderwhy.org/prod";
} else {
  BASE_URL = "http://coderwhy.org/test";
}

export { BASE_URL, TIME_OUT };
```

#### 配置 type.ts

- 用于规定创建请求实例或者调用 request 方法的时候传入的参数是什么样的

```js
import type { AxiosRequestConfig, AxiosResponse } from "axios";

// 定义一个接口,表示这个接口的实例要有这4个属性,当然不是必须的,是可选的
// 传入一个泛型,默认值是AxiosResponse
export interface HYRequestInterceptors<T = AxiosResponse> {
  // 拦截器都是可选的
  // 请求拦截
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  // 请求错误拦截
  requestInterceptorCatch?: (error: any) => any;
  // 响应拦截
  // 由于我们在前面直接将res.data返回了,所以这里如果传入了T,那么返回的类型就是传入的T
  responseInterceptor?: (res: T) => T;
  // 响应错误拦截
  responseInterceptorCatch?: (error: any) => any;
}

// 定义一个新的接口,继承于AxiosRequestConfig,表示我们传入的参数要有interceptors和showLoading,当然也是可选的
export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  // 对原来的AxiosRequestConfig进行扩展,添加拦截器和是否显示loading,可选的
  interceptors?: HYRequestInterceptors<T>;
  showLoading?: boolean;
}
```

#### 核心 request/index.js

```ts
import axios from "axios";
// 导入axios实例的类型
import type { AxiosInstance } from "axios";
import type { HYRequestInterceptors, HYRequestConfig } from "./type";

// 引入loading组件
import { ElLoading } from "element-plus";
// 引入loading组件的类型
import { ILoadingInstance } from "element-plus/lib/el-loading/src/loading.type";

// 默认显示loading
const DEAFULT_LOADING = true;

class HYRequest {
  // axios实例
  instance: AxiosInstance;
  // 当前请求实例的拦截器
  interceptors?: HYRequestInterceptors;
  // 是否显示loading
  showLoading: boolean;
  // 保存的loading实例
  loading?: ILoadingInstance;

  constructor(config: HYRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config);
    // 保存基本信息
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? DEAFULT_LOADING;

    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 2.添加所有的实例都有的拦截器
    // 请求的时候,先添加的拦截器后执行
    // 响应的时候,先添加的拦截器先执行
    this.instance.interceptors.request.use(
      (config) => {
        console.log("所有的实例都有的拦截器: 请求成功拦截");

        // 所有的请求都添加loading
        if (this.showLoading) {
          // 添加loading
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求数据....",
            background: "rgba(0, 0, 0, 0.5)",
          });
        }
        return config;
      },
      (err) => {
        console.log("所有的实例都有的拦截器: 请求失败拦截");
        return err;
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        console.log("所有的实例都有的拦截器: 响应成功拦截");
        // 所有的请求,将loading移除
        this.loading?.close();

        // 因为我们需要的就是res.data,所以我们可以在所有请求实例的请求的响应拦截器里面,直接把res.data返回,这样我们就可以直接使用了
        const data = res.data;
        // 判断当HttpErrorCode是200的时候,服务端和客户端一块自定义的错误信息
        if (data.returnCode === "-1001") {
          console.log("请求失败~, 错误信息");
        } else {
          return data;
        }
      },
      (err) => {
        console.log("所有的实例都有的拦截器: 响应失败拦截");
        // 所有的请求,将loading移除
        this.loading?.close();

        // 判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log("404的错误~");
        }
        return err;
      }
    );
  }

  // 1.传入返回结果的类型T,这样在Promise中我们就知道返回值的类型是T了
  // 2.通过HYRequestConfig<T>,将返回值类型T告诉接口,从而在接口的返回响应拦截中指明返回值类型就是T
  request<T>(config: HYRequestConfig<T>): Promise<T> {
    // 返回一个Promise对象,好让使用者在外面拿到数据
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        // 如果有单个请求的拦截器,就执行一下这个函数,然后返回
        config = config.interceptors.requestInterceptor(config);
      }

      // 2.判断单个请求是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }

      this.instance
        // request里面有两个泛型,第一个泛型默认是any,第二个泛型是AxiosResponse
        // 由于前面我们已经将res.data直接返回了,所以其实最后的数据就是T类型的,所以我们在第二个泛型中要指定返回值的类型T
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING;

          // 3.将结果resolve返回出去
          resolve(res);
        })
        .catch((err) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING;
          reject(err);
          return err;
        });
    });
  }

  get<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }

  post<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }

  delete<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }

  patch<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}

export default HYRequest;
```

#### 外层 index.ts

```js
// service统一出口
import HYRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";

// 创建一个新的请求,并传入参数
const hyRequest = new HYRequest({
  // 传入baseurl
  baseURL: BASE_URL,
  // 传入超时时间
  timeout: TIME_OUT,
  // 传入拦截器
  interceptors: {
    requestInterceptor: (config) => {
      // 给当前请求实例所有的请求添加token
      const token = "";
      if (token) {
        // 模板字符串进行拼接
        config.headers.Authorization = `Bearer ${token}`;
      }

      console.log("请求成功的拦截");
      return config;
    },
    requestInterceptorCatch: (err) => {
      console.log("请求失败的拦截");
      return err;
    },
    responseInterceptor: (res) => {
      console.log("响应成功的拦截");
      return res;
    },
    responseInterceptorCatch: (err) => {
      console.log("响应失败的拦截");
      return err;
    },
  },
});

export default hyRequest;
```

#### 请求拦截

```js
interceptors: {
  requestSuccessFn: (config) => {
    // 每一个请求都自动携带token
    const token = localCache.getCache(LOGIN_TOKEN);
    if (config.headers && token) {
      // 类型缩小
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  };
}
```
