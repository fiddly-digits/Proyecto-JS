// * Aqui trabajan Angel y Kar

const POST_ENDPOINT = 'https://dev-clone-c0a56-default-rtdb.firebaseio.com/posts/.json';

const getAPost = async () => {
    let response = await fetch (POST_ENDPOINT);
    let data = await response.json();
    return data;
};

const printPost = async () => {
    let post = await getAPost();
    console.log(post);
};

printPost();

// LEER UN POST
const NewPost = async () => {
let newPost1 = {
    postBody : "Hola que hace",
    postDate : Date,
};

let response = await fetch (POST_ENDPOINT,
{
    method:"POST",
    body: JSON.stringify(NewPost),
}
);
let data = response.json();
return data;
};

