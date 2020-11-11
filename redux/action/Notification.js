export const APICHANGE_ASYNCDATA = "APICHANGE_ASYNCDATA";
export const APIUPDATE_MESSAGES = "APIUPDATE_MESSAGES";

export const apiChangeAsyncData = (data) => {
  return { type: APICHANGE_ASYNCDATA, data: data };
};

export const apiUpdateMessages = (header, count) => {
  return { type: APIUPDATE_MESSAGES, header: header, count: count };
};
