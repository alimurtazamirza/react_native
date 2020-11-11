import { APIGET_BLOGS } from "../action/Blog";
import { APILIKED_BLOGS } from "../action/Blog";
import { APICOMMENT_BLOGS } from "../action/Blog";
import { APICOMMENT_DELETE } from "../action/Blog";
import { APIUSER_BLOGS } from "../action/Blog";
import { APIACCOUNT_BLOGS } from "../action/Blog";

const initialState = {
  blog: [],
  category: "",
  user_blog: [],
  account_blog: [],
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case APIGET_BLOGS:
      let newState = action.Data;
      return { ...state, blog: newState.blog, category: newState.category };

    case APIUSER_BLOGS:
      let userBlogs = action.Data;
      return { ...state, user_blog: userBlogs };

    case APIACCOUNT_BLOGS:
      let accountBlogs = action.Data;
      return { ...state, account_blog: accountBlogs };

    case APICOMMENT_DELETE:
      let previousState = { ...state };
      if (action.master == "user") {
        let previousBlog = previousState.user_blog.find(
          (blog) => blog.id == action.blog_id
        );
        previousBlog.comments_all = previousBlog.comments_all.filter(
          (comment) => comment.id != action.id
        );
        previousBlog.comments = --previousBlog.comments;
        return { ...state, user_blog: [...previousState.user_blog] };
      } else if (action.master == "account") {
        let previousBlog = previousState.account_blog.find(
          (blog) => blog.id == action.blog_id
        );
        previousBlog.comments_all = previousBlog.comments_all.filter(
          (comment) => comment.id != action.id
        );
        previousBlog.comments = --previousBlog.comments;
        return { ...state, account_blog: [...previousState.account_blog] };
      } else {
        let previousBlog = previousState.blog.find(
          (blog) => blog.id == action.blog_id
        );
        previousBlog.comments_all = previousBlog.comments_all.filter(
          (comment) => comment.id != action.id
        );
        previousBlog.comments = --previousBlog.comments;
        return { ...state, blog: [...previousState.blog] };
      }

    case APICOMMENT_BLOGS:
      if (action.master == "user") {
        let preState = { ...state };
        let preblog = preState.user_blog.find((blogs) => blogs.id == action.id);
        let newComment = [...preblog.comments_all, action.comment];
        preblog.comments_all = newComment;
        preblog.comments = ++preblog.comments;
        return { ...state, ...preState };
      } else if (action.master == "account") {
        let preState = { ...state };
        let preblog = preState.account_blog.find(
          (blogs) => blogs.id == action.id
        );
        let newComment = [...preblog.comments_all, action.comment];
        preblog.comments_all = newComment;
        preblog.comments = ++preblog.comments;
        return { ...state, ...preState };
      } else {
        let preState = { ...state };
        let preblog = preState.blog.find((blogs) => blogs.id == action.id);
        let newComment = [...preblog.comments_all, action.comment];
        preblog.comments_all = newComment;
        preblog.comments = ++preblog.comments;
        return { ...state, ...preState };
      }

    case APILIKED_BLOGS:
      if (action.master == "user") {
        let blog_id = action.blog_id;
        let status = action.status;
        let oldState = { ...state };
        let oldblog = oldState.user_blog.find((blogs) => blogs.id == blog_id);
        if (oldblog) oldblog.liked = status;
        status
          ? (oldblog.likes = oldblog.likes + 1)
          : (oldblog.likes = oldblog.likes - 1);

        return { ...state, ...oldState };
      } else if (action.master == "account") {
        let blog_id = action.blog_id;
        let status = action.status;
        let oldState = { ...state };
        let oldblog = oldState.account_blog.find(
          (blogs) => blogs.id == blog_id
        );
        if (oldblog) oldblog.liked = status;
        status
          ? (oldblog.likes = oldblog.likes + 1)
          : (oldblog.likes = oldblog.likes - 1);

        return { ...state, ...oldState };
      } else {
        let blog_id = action.blog_id;
        let status = action.status;
        let oldState = { ...state };
        let oldblog = oldState.blog.find((blogs) => blogs.id == blog_id);
        if (oldblog) oldblog.liked = status;
        status
          ? (oldblog.likes = oldblog.likes + 1)
          : (oldblog.likes = oldblog.likes - 1);

        return { ...state, ...oldState };
      }

    default:
      return state;
  }
};

export default blogReducer;
