const app =() => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.vid-container video');

  //sounds
  const sounds =document.querySelectorAll('.sound-picker button');
  //time display
  const timeDisplay = document.querySelector('.timeDisplay');
  const timeSelect = document.querySelectorAll('.time-selector button');
  //get length of outline
  const outlineLength = outline.getTotalLength();
  // console.log(outlineLength);
  //Duration
  let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

  // choose sounds
  sounds.forEach(sound => {
    sound.addEventListener('click', function(){
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaying(song);
    });
  });


  //play the sounds
    play.addEventListener("click", () => {
      checkPlaying(song);
    });

    //select sound
    timeSelect.forEach(Option => {
      Option.addEventListener('click', function (){
        fakeDuration = this.getAttribute('data-time')
        timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
      })
    })


    //create function to stop and play
    const checkPlaying = song =>{
      if(song.paused){
        song.play();
        video.play();
        play.src = "./svg/pause.svg";
      }else{
          song.pause();
          video.pause()
          play.src = "./svg/play.svg";
      }
    };
    // animate the circle
    song.ontimeupdate = () => {
      let currentTime = song.currentTime;
      let elasped = fakeDuration - currentTime;
      let seconds = Math.floor(elasped % 60);
      let minutes = Math.floor(elasped / 60);

      let progress = outlineLength -(currentTime / fakeDuration) * outlineLength;
      outline.style.strokeDashoffset = progress;

      //animate text
      timeDisplay.textContent = `${minutes}:${seconds}`;

      if(currentTime >= fakeDuration){
        song.pause();
        song.currentTime = 0;
        play.src = "./svg/play.svg";
        video.pause();
      }

    };
};


app()