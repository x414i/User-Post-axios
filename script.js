let getPosts = (userID) => {
    fetch("https://jsonplaceholder.typicode.com/posts?userId=" + userID)
    .then(response => {
        if(response.ok)
        return response.json()
    })
    .then(posts => {

        let postsContainer = document.getElementById("posts");
                    postsContainer.innerHTML = ''; // Clear previous posts
                    
                    posts.forEach(post => {
                        let content = `
                         <div id="post">
                            <h3>${post.title}</h3>
                            <h4>${post.body}</h4>
                         </div>`;
                        postsContainer.innerHTML += content;
                    });
                }   
   ) }
let getUsers = () => {
   return new Promise((resolve , reject) => {

        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if(response.ok)
            return response.json()
        else{
    reject("Erorr with user request")
        }
        })
        .then(users => {
    
            let usersContainer = document.getElementById("users");
                usersContainer.innerHTML = ''; // Clear previous users
                
                users.forEach(user => {
                    let content = `
                     <div class="user" onclick="clickUser(${user.id}, this)">
                        <h3>${user.name}</h3>
                        <h3>${user.email}</h3>
                     </div>`;
                    usersContainer.innerHTML += content;
                } )       
                 resolve();

            
            
}
            );
        }
            
       ) }
let clickUser = (userID, element) => {
    // Remove 'selected' class from all users
    let allUsers = document.querySelectorAll('.user');
    allUsers.forEach(user => {
        user.classList.remove('selected');
    });

    // Add 'selected' class to the clicked user
    element.classList.add('selected');
    
    // Load posts for the selected user
    getPosts(userID);
};
let getUserUsingAxios = ()=>{
    return new Promise((resolve,reject) =>{

        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response)=>{
            let users = response.data;
            let usersContainer = document.getElementById("users");
            usersContainer.innerHTML = ''; // Clear previous users
            
            users.forEach(user => {
                let content = `
                 <div class="user" onclick="clickUser(${user.id}, this)">
                    <h3>${user.name}</h3>
                    <h3>${user.email}</h3>
                 </div>`;
                usersContainer.innerHTML += content;
                resolve()
            }         
        )     
        })
        .catch(erorr =>{
            alert(erorr)
            reject()
        })
    })
}

let getPostsofUser = (userID)=>{
    let url = "https://jsonplaceholder.typicode.com/posts?userId=" + userID
    axios.get(url)
    .then((response)=>{
        let posts = response.data
        let postsContainer = document.getElementById("posts");
        postsContainer.innerHTML = ''; // Clear previous posts
        
        posts.forEach(post => {
            let content = `
             <div id="post">
                <h3>${post.title}</h3>
                <h4>${post.body}</h4>
             </div>`;
            postsContainer.innerHTML += content;
        });
    }).catch(error =>{
        alert(error)
        reject(error)
    })
}
window.onload = function() {
   
    getUserUsingAxios()
    .then(()=>{
        getPostsofUser(1)
    }).catch(erorr=>{
        reject(erorr)
    })
};
