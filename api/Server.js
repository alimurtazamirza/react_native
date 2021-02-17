import { create } from "apisauce";

const apiServer = create({
  baseURL: "https://www.lovesetgo.com/love/api",
  // baseURL: "http://localhost/2020/lovesetgo/api",
});

export default apiServer;
