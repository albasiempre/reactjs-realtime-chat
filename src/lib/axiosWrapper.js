import axios from 'axios';

class AxiosWrapper {

  static create() {
    // base instance
    const instance = axios.create({
      baseURL: "https://node-app-separated-187489b363c3.herokuapp.com/",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      timeout: 30000, // 30sec
      withCredentials: true
    })

    // registered request interceptor
    instance.interceptors.request.use(
        (config) => {
          // リクエスト作成成功時
          console.log('---- request(success) ----')
          console.log('%o', config)
        }, (error) => {
          // リクエスト作成失敗時
          console.log('---- request(error)')
          console.log('%o', error)
        });

    // registered response interceptor
    instance.interceptors.response.use(
        (response) => {
          // レスポンス取得成功時(ステータスコード: 200)
          console.log('---- response(success) ----')
          console.log('%o', response);
        },
        (error) => {
          // レスポンス取得失敗時(ステータスコード: 200以外と思われる)
          console.log('---- response(error) ----')
          console.log('%o', error);
        }
    );

    return instance
  }
}

export default AxiosWrapper;