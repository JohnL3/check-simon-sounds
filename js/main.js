let d = (...x) => console.log(...x);
	
	
function Simon() {
	let greenAudio  = new Audio('https://raw.githubusercontent.com/pffy/mp3-piano-sound/master/mp3/a1.mp3'),//new Audio('https://raw.githubusercontent.com/JohnL3/Photos/master/simonSound1.mp3'),
		  redAudio    = new Audio('https://raw.githubusercontent.com/JohnL3/Photos/master/simonSound2.mp3'),
		  yellowAudio = new Audio('https://raw.githubusercontent.com/JohnL3/Photos/master/simonSound3.mp3'),
		  blueAudio   = new Audio('https://raw.githubusercontent.com/JohnL3/Photos/master/simonSound4.mp3'),
		  errorAudio = new Audio('https://raw.githubusercontent.com/JohnL3/Photos/master/errorbsound.mp3');
	



const tones = {
	  red: {gain: null, oscillator: null},
	  green: {gain: null, oscillator: null},
	  yellow: {gain: null, oscillator: null},
	  blue: {gain: null, oscillator: null},
	  audContext: ''
};

function init() {
	
	tones.audContext = new window.AudioContext();
	let freq = [523.25,329.63,261.63,392.0]
	let keys = Object.keys(tones);
	
	for(let key in keys) {
		if(keys[key] != 'audContext'){
		tones[keys[key]].gain = tones.audContext.createGain();
		tones[keys[key]].gain.gain.setTargetAtTime(0, tones.audContext.currentTime + 0, 0.0);
		tones[keys[key]].gain.connect(tones.audContext.destination);
		tones[keys[key]].oscillator = tones.audContext.createOscillator();
	    tones[keys[key]].oscillator.type = "triangle";
	    tones[keys[key]].oscillator.frequency.setValueAtTime(freq[key], tones.audContext.currentTime);
	    tones[keys[key]].oscillator.connect(tones[keys[key]].gain);
	    tones[keys[key]].oscillator.start();
		}
	}

}

function playTone(color) {
	tones[color].gain.gain.setTargetAtTime(0.6, tones.audContext.currentTime + 0, 0.1);
	setTimeout(function(){
		tones[color].gain.gain.setTargetAtTime(0, tones.audContext.currentTime + 0, 0.1);
	},500)
}

	this.start = '';
	this.clicked = '';
	this.index = 0;
	this.count = 0;
	this.flash = false;
	this.on_off = false;
	this.strict_on = false;
	this.panels = [];
	this.started = false;
	this.playerTurn = false;
	
	this.game_on_off = function() {
		clearInterval(this.start);
		if (this.on_off === false) {
		  this.on_off = true;
		  init();
		  tones.audContext.resume();
		  this.start = '';
		  $('.switch').css('float', 'right');
		  return this.on_off;
		} else {
		  clearInterval(this.start);
		  this.start = '';
		  $('.switch').css('float', 'left');
		  $('.cou').text('--');
		  $('.strict-col').css('background-color', '#b96666');
		  $('.red').css('background-color', 'red');
		  $('.green').css('background-color', 'green');
		  $('.blue').css('background-color', 'blue');
		  $('.yellow').css('background-color', 'yellow');
		  this.count = 0;
		  this.clicked = '';
		  this.strict_on = false;
		  this.on_off = false;
		  this.started = false;
		  this.index = 0;
		  this.panels = [];
		  this.flash = false;
		  this.playerTurn = false;
		  return this.on_off;
		}
	};
	this.startSimon = function() {
		if(this.on_off === true && this.started === false){
		this.started = true;
		this.simonMakesMusic();
		return this.started;
		}
		return this.started;
	}
	this.setStrict = function(){
		if(this.on_off === true) {
			if(this.strict_on === false) {
				$('.strict-col').css('background-color', 'red');
				this.strict_on = true;
			} else {
				  $('.strict-col').css('background-color', '#b96666');
				  this.strict_on = false;
				}
		}
	}
	this.simonMakesMusic = function() {
		this.addPanels(this.randColor());
		this.start = setInterval(()=>{this.simonPlayNotes()},500);
	}
	this.addPanels = function(item) {
		if(this.on_off === true && this.started === true) { 
		this.panels.push(item);
		return item;
		}
		return null;
	}
	this.randColor = (colors = ['.red','.green','.yellow','.blue']) => colors[randomNum(0,3)];
	let randomNum = (min = Math.ceil(min), max = Math.floor(max)) => Math.floor(Math.random() * (max - min + 1)) + min;
	
	this.simonPlayNotes = function(){
		if(this.index < this.panels.length) {
				let className = this.panels[this.index];
				let color = this.getColor(className);
				$( className ).css('backgroundColor',color);
  		    
				if(this.flash === false) {
						$('.cou').text(this.panels.length);
						this.playSound(className);
					}
				if(this.flash === true) this.index++;
				
				this.flash = !this.flash;
			} else {
		    
				clearInterval(this.start);
				this.playerTurn = true;
				this.index = 0;
			}
	}
	this.getColor = (nameC)=>{
		switch(nameC) {
			case '.red':
				return (this.flash)? '#b50000':'#f15b5b';
			case '.green':
				return (this.flash)? '#005500':'#00d500';//#30AB30
			case '.yellow':
				return (this.flash)? '#dad518':'#f1f15b';
			case '.blue':
				return (this.flash)? '#000075':'#4b4bd2';
		}
	}
	this.playSound = (nameC = errorAudio) => {
			switch(nameC) {
			case '.red':
				//playTone('red');
				redAudio.play();
				break;
			case '.green':
				//playTone('green');
				greenAudio.play();
				break;
			case '.yellow':
				//playTone('yellow');
				yellowAudio.play();
				break;
			case '.blue':
				//playTone('blue');
				blueAudio.play();
				break;
			default:
				nameC.play();
			  }
	};
	this.clickedPanel = (panel)=>{
		if(this.playerTurn && this.on_off === true){
			
			this.clicked = '.' + panel; // $(this).attr('class').split(' ')[0].trim();
		 
			this.checkPanelClicked();
			
			this.resetPlayerTurn();
			return true;
		}
		return null;
	}
	this.checkPanelClicked = () => {
		if(this.panels[this.count] === this.clicked) {
		  this.playNoteHuman(this.clicked);
		  this.checkCount();
		  return true;
		}else {
			this.runError();
			return true;
		}
	}
	this.runError = () => {
		 (this.strict_on)? this.panels = []: null;
		 setTimeout(()=>{
			 $('.cou').text(this.panels.length)
			 },300);
		 this.playSound();
		 $('.cou').text('!!');
		 this.count = 0;
	}
	
	this.playNoteHuman = (note) => {
		 
		 let noteColor = this.getColor(note);
		 let classname = note;
		 $( classname ).css('backgroundColor',noteColor);
		 
		  this.start = setInterval(()=>{this.humanNotes(note)},300);
	};
	this.humanNotes = (cls) => {
		 
		let note = cls;
		if(this.flash === false) this.playSound(note);
   
		this.flash = true;
		let noteColor = this.getColor(note);
  
		$( cls ).css('backgroundColor',noteColor);
		this.flash = false;
		clearInterval(this.start);
	  
	}
	this.resetPlayerTurn = () => {
		if(this.count === this.panels.length){
			this.count = 0;
			this.playerTurn = false;
			setTimeout(()=>{this.simonMakesMusic()}, 1000);
		}
	}
	this.checkCount = () => {
		if(this.count <= this.panels.length){
		  this.count++;
		}
	}
}
simon = new Simon();

$('.on-off').click(()=>{
	simon.game_on_off();
})

$('.start-btn').click(() => {
	simon.startSimon();
})

$('.strict').click(()=>{
	simon.setStrict();
})

$('.panels').click(function(){
	simon.clickedPanel($(this).attr('class').split(' ')[0].trim());
})
