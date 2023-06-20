const BASE_URL = `http://localhost:8080/`;
const POST_ENDPOINT = 'posts/';
const USER_ENDPOINT = 'users/';
const AUTH_ENDPOINT = 'auth';

export const getUsers = async () => {
  let response = await fetch(`${BASE_URL}${USER_ENDPOINT}`);
  let data = await response.json();
  return data.data;
};

export const getUser = async (user) => {
  let response = await fetch(`${BASE_URL}${USER_ENDPOINT}${user}`);
  let data = await response.json();
  return data.data;
};

export const getPosts = async () => {
  let response = await fetch(`${BASE_URL}${POST_ENDPOINT}`);
  let data = await response.json();
  return data.data;
};

export const getAPost = async (postID) => {
  let response = await fetch(`${BASE_URL}${POST_ENDPOINT}${postID}`);
  let data = await response.json();
  return data.data;
};

export const authUser = async (loginObj) => {
  const response = await fetch(`${BASE_URL}${AUTH_ENDPOINT}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginObj)
  });
  const data = await response.json();
  console.log('Backend Data', data);
  return data;
};

export const savePost = async (post) => {
  let token = localStorage.getItem('token') || sessionStorage.getItem('token');
  console.log(post);
  let response = await fetch(`${BASE_URL}${POST_ENDPOINT}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  });
  let data = await response.json();
  return data;
};

export const modifyPost = async (post, id) => {
  let token = localStorage.getItem('token') || sessionStorage.getItem('token');
  let response = await fetch(`${BASE_URL}${POST_ENDPOINT}${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  });
  let data = await response.json();
  return data;
};

export const deletePost = async (id) => {
  let token = localStorage.getItem('token') || sessionStorage.getItem('token');
  let response = await fetch(`${BASE_URL}${POST_ENDPOINT}${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  let data = await response.json();
  return data;
};
