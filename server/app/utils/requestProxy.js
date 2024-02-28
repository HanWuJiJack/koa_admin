const request = require('./request'); // 引入第三方request库
const Tools = require("./tools")

const UserAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
];


(async () => {
  // const get_proxies = await request({
  //   url: "https://uu-proxy.com/api/get_proxies",
  //   params: {
  //     id: "GDAJ8XZS79",
  //     support_https: true
  //   },
  //   data: {
  //     id: "GDAJ8XZS79",
  //     support_https: true
  //   }
  // }).catch((err) => {
  //   console.log(err)
  // })
  // console.log(get_proxies)

  const res = await request({
    // url: "https://management.shshpl.com/api/captchaImage",
    url: "https://management.shshpl.com:23810/pp",
    headers: {
      // "Accept-Encoding": "gzip", // 使用gzip压缩让数据传输更快
      "User-Agent": UserAgents[Tools.getRandom(0, UserAgents.length - 1)],
    },
    // proxy:"175.24.215.79:80"
  }).catch((err) => {
    console.log(err)
  })
  console.log(res)
})()