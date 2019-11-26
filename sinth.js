//new SpeechSynthesisUtterance() rappresenta una richiesta vocale. Contiene il contenuto che il servizio vocale deve leggere e informazioni su come leggerlo
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const filterDropdown = document.querySelector('[name="filter"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');


//accedo alla proprietà text dell'oggetto msg assegnandole il valore contenuto nel text box
msg.text = document.querySelector('[name="text"]').value;
// msg.lang = setFilter()
console.log(msg)


function addListVoice(){
voices = this.getVoices()
const listVoices = voices
.filter(voice => (voice.lang.includes('it')))
.map(voice =>(`<option value="${voice.name}">${voice.name} (${voice.lang})</option>`))
.join('')
// console.log(listVoices)
voicesDropdown.innerHTML = listVoices
}

function setVioce(){
msg.voice = voices.find(voice => (voice.name === this.value))
toggle()
}

//farma/parte la riproduzione vocale
function toggle(start = true){
speechSynthesis.cancel()
if (start) {
    speechSynthesis.speak(msg)
}
}

function setOption(){
//msg[this.name] identifica all'interno dell'oggetto msg il nome del tag cambiato, ad esemprio <input name="pitch"> assengnandoli il nuovo valore.
msg[this.name] = this.value
console.log(msg)
toggle()
}


voicesDropdown.addEventListener('change', setVioce);
speechSynthesis.addEventListener('voiceschanged', addListVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));