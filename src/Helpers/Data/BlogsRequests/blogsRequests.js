import axios from 'axios';
import apiKeys from '../../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getBlogsRequest = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/blogs.json`)
    .then((res) => {
      console.log('get Request data:', res);
      const blogs = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          blogs.push(res.data[key]);
        });
      }
      resolve(blogs);
      console.log(blogs);
    })
    .catch(err => reject(err));
});

const deleteBlog = blogId => axios.delete(`${firebaseUrl}/tutorials/${blogId}.json`);

const postBlogRequest = blog => axios.post(`${firebaseUrl}/blogs.json`, blog);

const getSingleBlog = blogId => axios.get(`${firebaseUrl}/blogs/${blogId}.json`);

const putBlogRequest = (blogId, blog) => axios.put(`${firebaseUrl}/blogs/${blogId}.json`, blog);

export default {
  getBlogsRequest,
  deleteBlog,
  postBlogRequest,
  getSingleBlog,
  putBlogRequest,
};
