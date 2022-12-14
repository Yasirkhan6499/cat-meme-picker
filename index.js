import { catsData } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')
const main_section = document.querySelector("main");
let isDisplayed = false;
let loopNumber;

emotionRadios.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderCat)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
    memeModal.style.display = 'none';
}
main_section.addEventListener("click",(e)=>{
    console.log(e.target.id);
    if(isDisplayed && e.target.id!=="get-image-btn"){
    closeModal();
    }
});

function renderCat(){
    memeModalInner.innerHTML ="";

    const catObject = getSingleCatObject(); 

    for(let i=0; i<loopNumber; i++){
        console.log("cat Object lengthg: "+catObject.length);
        let img_element = `
        <img 
        class="cat-img" 
        src="./images/${catObject[i].image}"
        alt="${catObject[i].alt}"
        
        `;
        if(catObject.length>1){
            console.log("more memes");
            memeModalInner.classList.remove("single-meme");
            memeModalInner.classList.add("more-memes"); 

            // if(i===2 && catObject.length===3)
            // memeModalInner.innerHTML += img_element+'style="grid-area: main;">';
            // else if(i===1 && catObject.length===2)
            // memeModalInner.innerHTML += img_element+'style="grid-area: main;">';
            // else if(i===0 && catObject.length===2)
            // memeModalInner.innerHTML += img_element+'style="grid-area: header;">';
            // else 
            memeModalInner.innerHTML += img_element+">";

        }
        else {
            memeModalInner.classList.remove("more-memes"); 
            memeModalInner.classList.add("single-meme");
            memeModalInner.innerHTML += img_element+">";
           
        }
    }

    memeModal.style.display = 'flex'
    isDisplayed=true;
}


function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    
    if(catsArray.length === 1){
        return catsArray[0]
    }
    else{
        let randomNumber;
        let newCatArr = [];
         loopNumber = Math.floor(Math.random() * catsArray.length) || 1;
        for(let i=0; i<loopNumber; i++){
          randomNumber= Math.floor(Math.random() * catsArray.length);
          newCatArr[i] = catsArray[randomNumber];

        }
        return newCatArr;
    }
}

function getMatchingCatsArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter(function(cat){
            
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingCatsArray 
    }  
}

function getEmotionsArray(cats){
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){
        
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)




