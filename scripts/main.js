//ES6 Class
class TypeWriter {
    constructor(txtElement, words, wait = 2000) {
        this.txtElement = txtElement; //the Span that will cycle the words
        this.words = words; //the list of words (attribute of Span)
        this.txt = ''; //the current text being typed out (not necessarily complete word yet)
        this.wordIndex = 0; //index of word in the list
        this.wait = parseInt(wait, 10); //the wait time
        this.type(); // creates the type function below
        this.isDeleting = false; //represent the state if current word is deleting
    }

    type() {
        //Current index of word
        const currentIndex = this.wordIndex % this.words.length;

        //Get full text of current word
        const fullTxt = this.words[currentIndex];

        //Check if deleting
        if(this.isDeleting) {
            //Remove a character
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            //Add a character
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        //Insert this.txt into element; not the use of back ticks to allow use of template literal
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        //Type Speed
        let typeSpeed = 150;

        if(this.isDeleting) {
            typeSpeed /= 2;
        }

        //check if word is complete
        if(!this.isDeleting && this.txt === fullTxt) {
            //Create a pause when word is completed
            typeSpeed = this.wait;
            
            //Set delete to true now
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            
            //Move to the next word
            this.wordIndex++;

            //Pause before typing again
            typeSpeed = 400;
        }
        
        //set's a repeating loop by calling the type() over and over to keep typing the words in the list
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init on DOM Load
document.addEventListener('DOMContentLoaded', init);

// Initialize App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    // Initialize TypeWriter
    new TypeWriter(txtElement, words, wait);
}

/*
** This is the same functionality but different syntax.. more difficult IMO **

const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement; //the Span that will cycle the words
    this.words = words; //the list of words (attribute of Span)
    this.txt = ''; //the current text being typed out (not necessarily complete word yet)
    this.wordIndex = 0; //index of word in the list
    this.wait = parseInt(wait, 10); //the wait time
    this.type(); // creates the type function below
    this.isDeleting = false; //represent the state if current word is deleting
}

// Type Method
TypeWriter.prototype.type = function() {
    //Current index of word
    const currentIndex = this.wordIndex % this.words.length;

    //Get full text of current word
    const fullTxt = this.words[currentIndex];

    //Check if deleting
    if(this.isDeleting) {
        //Remove a character
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        //Add a character
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    //Insert this.txt into element; not the use of back ticks to allow use of template literal
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //Type Speed
    let typeSpeed = 300;

    if(this.isDeleting) {
        typeSpeed /= 2;
    }

    //check if word is complete
    if(!this.isDeleting && this.txt === fullTxt) {
        //Create a pause when word is completed
        typeSpeed = this.wait;
        
        //Set delete to true now
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        
        //Move to the next word
        this.wordIndex++;

        //Pause before typing again
        typeSpeed = 500;
    }
    
    //set's a repeating loop by calling the type() over and over to keep typing the words in the list
    setTimeout(() => this.type(), typeSpeed);
}
*/