import Server from "./Server";

const getBlogs = (category, user_id) =>
  Server.get(`/blog/${category}/${user_id}`);

const getUserBlogs = (user_id) => Server.get(`/blog/user/${user_id}`);

const deleteUserBlogs = (blog_id) =>
  Server.post(`/blog/post/delete`, { id: blog_id });

const getSingleBlog = (id, user_id) =>
  Server.get(`/blog/single/${id}/${user_id}`);

const likeBlog = (blog_id, user_id, status) =>
  Server.get(`/blog/like/${blog_id}/${user_id}/${status}`);

const commentBlog = (blog_id, user_id, text) =>
  Server.get(`/blog/comment/insert/${blog_id}/${user_id}/${text}`);

const deletcomment = (commnet_id) =>
  Server.post(`/blog/comment/delete`, { id: commnet_id });

export default {
  getBlogs,
  getSingleBlog,
  commentBlog,
  deletcomment,
  getUserBlogs,
  likeBlog,
  deleteUserBlogs,
};
