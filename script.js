const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const accessKey = '5h6DA4DRsKTiWf5KOMXnxqUTJ0rANz4-ESuQXrYXjts';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&query=dictionary`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const imageUrl = data.urls.regular;
    document.body.style.backgroundImage = `url(${imageUrl})`;
  })
  .catch(error => console.error(error));

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        result.innerHTML= 
        `<div class="word">
        <h3>${inpWord}</h3>
        <button onClick="playSound()">
          <i class="fas fa-volume-up"></i>
        </button>
      </div>
      <div class="details">
          <p>${data[0].meanings[0].partOfSpeech}</p>
          <p>/${data[0].phonetics}/</p>
      </div>
      <p class="word-meaning">
          ${data[0].meanings[0].definitions[0].definition}
      </p>
      <p class="word-example">
          ${data[0].meanings[0].definitions[0].example || "No examples available"}
      </p>`;
      if (data[0].phonetics && data[0].phonetics[0].audio){
      sound.setAttribute("src", `https:${data[0].phonetics[0].audio
      }`);
      }else{
        sound.removeAttribute("src");
      }

    })
    .catch(()=>{
        result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`
    })
});

function playSound(){
   sound.Play();
}