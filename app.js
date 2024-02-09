const quotes = document.getElementById("quotes");
const author = document.getElementById("author");
const newQ = document.getElementById("newQ");
const tweetMe = document.getElementById("tweetMe");
let realData = "";
let quotesData = "";

// Go to Twitter and tweet now
const tweetNow = () => {
    let tweetPost = `https://twitter.com/intent/tweet?text=${quotesData.text}`;
    window.open(tweetPost);
}

// Get random quotes
const getNewQuotes = () => {
    let rnum = Math.floor(Math.random() * 10);
    quotesData = realData[rnum];
    
    // Display quote text
    quotes.innerText = `${quotesData.text}`;

    // Display author, handling the case when the author is not present
    if (quotesData.author) {
        author.innerText = `${quotesData.author.replace(", type.fit", "")}`;
    } else {
        author.innerText = "Unknown Author";
    }
}

// Fetch API and get data
let getQuotes = async () => {
    let api = "https://type.fit/api/quotes";
    try {
        let data = await fetch(api);
        realData = await data.json();
        getNewQuotes();
    } catch (error) {
        console.error("Error fetching quotes:", error.message);
    }
}

// Event listeners to call functions
newQ.addEventListener("click", getNewQuotes);
tweetMe.addEventListener("click", tweetNow);
getQuotes();
