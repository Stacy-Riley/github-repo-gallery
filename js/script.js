//Div is where your profile information will appear:
const overview = document.querySelector(".overview");
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
}

