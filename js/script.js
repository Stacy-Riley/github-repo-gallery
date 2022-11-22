//Div is where your profile information will appear:
const overview = document.querySelector(".overview");
//UL where the repos are displayed:
const repoList = document.querySelector(".repo-list");
//Github username:
const username = "Stacy-Riley";


//Async function to fetch repos:
const grabData = async function(){
    const request = await fetch(`https://api.github.com/users/${username}`);
    const data = await request.json();

    // console.log(data);
    displayData(data);
}

//Start:
grabData()


//Function to display the users data from Github:
const displayData = function(data){
    const div = document.createElement("div");
    div.classList.add("user-info");

    //Format the pulled data to display in newly created div with
    //the connections to the data properties from the async function:
    div.innerHTML =    `<figure>
                            <img alt="user avatar" src=${data.avatar_url} />
                        </figure>
                        <div>
                            <p><strong>Name:</strong> ${data.name}</p>
                            <p><strong>Bio:</strong> ${data.bio}</p>
                            <p><strong>Location:</strong> ${data.location}</p>
                            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
                        </div> ` 
    
    //Append so it displays in the HTML page:
    overview.append(div);
    
    //Call to start grabbing repo data:
    grabRepos();
}


//Async function to grab repos from Github:
const grabRepos = async function(){
    const request = await fetch(`https://api.github.com/users/${username}/repos?sort=updated/?per_page=100`);
    const repos = await request.json();
    // console.log(repos);

    displayRepos(repos);
}

//Function to display the repos:
const displayRepos = function(repos){
    for(let item of repos){
        let listItem = document.createElement("li");
        listItem.classList.add("repos");
        listItem.innerHTML = `<H3>${item.name}</H3>`
        
        //Append so it displays in the HTML page:
        repoList.append(listItem);    
    }
}
