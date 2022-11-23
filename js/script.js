//Div is where your profile information will appear:
const overview = document.querySelector(".overview");
//UL where the repos are displayed:
const repoList = document.querySelector(".repo-list");
//Section where all the repos will appear:
const repos = document.querySelector(".repos");
//Area where individual repos appear:
const repoData = document.querySelector(".repo-data");
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

//Click on the repo name and get the name of the repo:
repoList.addEventListener("click", function(e){
    if(e.target.matches("h3")){
        const repoName = e.target.innerText;

        grabRepoName(repoName);
    }
})


//Async Function to take that repo's name and the coding languages used in the repo:
const grabRepoName = async function(repoName){
    const request = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await request.json();

    //Fetch the languages used for the repo clicked on:
    const fetchLanguages = await fetch(repoInfo.languages_url)
    const languageData = await fetchLanguages.json();

    //Array to hold the name of the coding languages found in each clicked repo:
    let languages = [];
    for(let item in languageData){
        languages.push(item)
    }

    // console.log(languages);
    displayRepoInfo(repoInfo, languages);
}

//Function to display specific information of the repo clicked on:
const displayRepoInfo = function(repoInfo ,languages){
    repoData.innerHTML = "";
    const repoDiv = document.createElement("div");
    repoDiv.innerHTML =     `<h3>Name: ${repoInfo.name}</h3>
                            <p>Description: ${repoInfo.description}</p>
                            <p>Default Branch: ${repoInfo.default_branch}</p>
                            <p>Languages: ${languages.join(", ")}</p>
                            <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`

    //Append newly created div and hide other elements so it displays properly:
    repoData.append(repoDiv)
    repoData.classList.remove("hide");
    repos.classList.add("hide");
 }

