import axios from 'axios';

class AxiosWrapper {

  static create() {
    // base instance
    // 多分、cancelTokenの設定は不要な気がするので、サーバーサイドcors設定完了後、消してしまっても良いかもしれません
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const instance = axios.create({
      baseURL: "https://node-app-separated-187489b363c3.herokuapp.com/",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json;charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        // これはあった方が良いかもと思ったけど、無くても平気な気がする
        //'Accept': 'application/json, text/plain, */*',
        //'Host': 'node-app-separated-187489b363c3.herokuapp.com',
      },
      timeout: 30000,
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
