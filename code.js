const XKCD = "https://xkcd.now.sh/?comic="

/// ce que je rajoute :

let currentComic = null;
let latestComic = null;

const fetchIssue = (num) => {
    return fetch(XKCD + num).then((response) => {
        if (response.ok) {
            console.log(response);
            return response.json();
        }
        else {
            console.error("Problem");
        }
    }).then((data) => {
        console.log("dans le second then");
        console.log(data);
        
        console.log(`Image num: ${data.num}`);


        currentComic = data.num;


        if (!latestComic) {
        latestComic = data.num;
        }


        updateButtons();



        if (!data) return;


        document.getElementById("num").textContent = data.num;


        const imgElement = document.querySelector("#xkcd img");
        imgElement.src = data.img;
        imgElement.alt = data.title;

    })
  };


  const next = () => {
    if (currentComic < latestComic) {
        fetchIssue(currentComic + 1);
    }
};

const previous = () => {
    if (currentComic > 1) {
        fetchIssue(currentComic - 1);
    }
};




const updateButtons = () => {
    document.getElementById("previous").disabled = (currentComic <= 1);
    document.getElementById("next").disabled = (currentComic >= latestComic);
};



  document.addEventListener("DOMContentLoaded", () => {
    const resetButton = document.getElementById("reset");

    document.getElementById("previous").addEventListener("click", previous);
    document.getElementById("next").addEventListener("click", next);
    document.getElementById("reset").addEventListener("click", () => fetchIssue("latest"));

    
    
    const fetchAndDisplayIssue = (num) => {
        fetchIssue(num).then((data) => {
            if (data) {
                document.getElementById("num").textContent = data.num;
            }
        });
    };

    
    resetButton.addEventListener("click", () => fetchAndDisplayIssue("latest"));

    
    fetchAndDisplayIssue("latest");
});



