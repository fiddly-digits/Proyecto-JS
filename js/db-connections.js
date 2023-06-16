const BASE_URL = `https://dev-clone-c0a56-default-rtdb.firebaseio.com`;
const POST_ENDPOINT = '/posts/';
const USER_ENDPOINT = '/users/';

export const getUsers = async () => {
  let response = await fetch(`${BASE_URL}${USER_ENDPOINT}.json`);
  let data = await response.json();
  return data;
};

export const getUser = async (user) => {
  let response = await fetch(`${BASE_URL}${USER_ENDPOINT}${user}/.json`);
  let data = await response.json();
  return data;
};

export const getPosts = async () => {
  let response = await fetch(`${BASE_URL}${POST_ENDPOINT}.json`);
  let data = await response.json();
  return data;
};

export const getAPost = async (postID) => {
  let response = await fetch(`${BASE_URL}${POST_ENDPOINT}${postID}/.json`);
  let data = await response.json();
  return data;
};

export const savePost = async (post) => {
  console.log(post);
  let response = await fetch(`${BASE_URL}${POST_ENDPOINT}.json`, {
    method: 'POST',
    body: JSON.stringify(post)
  });
  let data = await response.json();
  return data;
};
