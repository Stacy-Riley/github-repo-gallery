//Div is where your profile information will appear:
const overview = document.querySelector(".overview");
//UL where the repos are displayed:
const repoList = document.querySelector(".repo-list");
//Section where all the repos will appear:
const reposDisplay = document.querySelector(".repos");
//Area where individual repos appear:
const repoData = document.querySelector(".repo-data");
//Back to Repo Gallery button:
const backButton = document.querySelector(".view-repos");
//Filter input
const filterInput = document.querySelector(".filter-repos");
//Github username:
const username = "Stacy-Riley";


//Async function to fetch the username account:
const grabData = async function(){
    const request = await fetch(`https://api.github.com/users/${username}`);
    const data = await request.json();

    // console.log(data);
    displayData(data);
}

//Start:
grabData()


//Function to display the user's profile data from Github:
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
    grabRepos(username);
}


//Async function to grab repos from Github:
const grabRepos = async function(username){
    const request = await fetch(`https://api.github.com/users/${username}/repos?sort=updated/?per_page=100`);
    const repoData = await request.json();
    // console.log(repos);

    displayRepos(repoData);
}

//Function to display the repos:
const displayRepos = function(repos){
    //Display the input box to search repos:
    filterInput.classList.remove("hide");

    for(let item of repos){
        let listItem = document.createElement("li");
        listItem.classList.add("repo");
        listItem.innerHTML = `<H3>${item.name}</H3>`
        
        //Append so it displays in the HTML page:
        repoList.append(listItem);    
    }
}

//Click on the repo name and get the name of the repo so it can be used to get info of that specific repo:
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
    
    const repoDiv = document.createElement("div");
    repoDiv.innerHTML =     `<h3>Name: ${repoInfo.name}</h3>
                            <p>Description: ${repoInfo.description}</p>
                            <p>Default Branch: ${repoInfo.default_branch}</p>
                            <p>Languages: ${languages.join(", ")}</p>
                            <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`

    //Append newly created div and hide other elements so it displays properly:
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    reposDisplay.classList.add("hide");
    backButton.classList.remove("hide");

    repoData.append(repoDiv)
 }

 //Function to show a back button once the user opens an individual repo:
backButton.addEventListener("click", function(){
    reposDisplay.classList.remove("hide");
    repoData.classList.add("hide");
    backButton.classList.add("hide");
})

//Input event listener for the input box that allows a user to search for particular repo:
filterInput.addEventListener("input", function(e){
   const inputData = e.target.value
//    console.log(inputData);

    //grather all the repos together into this array:
    //listItem with classList.add("repo")
   const repos = document.querySelectorAll(".repo");
//    console.log(repos)

    //convert user input to lower case:
   const searchLowerText = inputData.toLowerCase()
   
   for(let repo of repos){
        let repoLowerText = repo.innerText.toLowerCase();

        if(repoLowerText.includes(searchLowerText)){
            repo.classList.remove("hide");
         } else {
            repo.classList.add("hide");
         }
}   
})
