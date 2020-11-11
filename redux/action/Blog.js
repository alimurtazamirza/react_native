export const APIGET_BLOGS = "APIGET_BLOGS";
export const APILIKED_BLOGS = "APILIKED_BLOGS";
export const APICOMMENT_BLOGS = "APICOMMENT_BLOGS";
export const APICOMMENT_DELETE = "APICOMMENT_DELETE";
export const APIUSER_BLOGS = "APIUSER_BLOGS";
export const APIACCOUNT_BLOGS = "APIACCOUNT_BLOGS";

export const apiGetBlogs = (data) => {
  return { type: APIGET_BLOGS, Data: data };
};

export const apiUserBlogs = (data) => {
  return { type: APIUSER_BLOGS, Data: data };
};

export const apiAccountBlogs = (data) => {
  return { type: APIACCOUNT_BLOGS, Data: data };
};

export const apiLikedBlogs = (blog_id, status, master) => {
  return {
    type: APILIKED_BLOGS,
    blog_id: blog_id,
    status: status,
    master: master,
  };
};

export const apiCommentBlogs = (commentObj, id, master) => {
  return {
    type: APICOMMENT_BLOGS,
    comment: commentObj,
    id: id,
    master: master,
  };
};

export const apiCommentDelete = (blog_id, id, master) => {
  return { type: APICOMMENT_DELETE, blog_id: blog_id, id: id, master: master };
};
