import { create } from "apisauce";

const apiServer = create({
  baseURL: "https://www.lovesetgo.com/love/api",
});

export default apiServer;
