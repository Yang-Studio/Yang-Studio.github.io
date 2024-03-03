(function() { // execute immidiately
  // pick letter from "LIUYANG"
  function getRandomLetter() {
    var letters = "LIUYANG";
    var randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
  }

  // css of letter
  function applyLetterStyle(letterDiv) {
    letterDiv.style.position = 'absolute';
    letterDiv.style.left = Math.random() * window.innerWidth + 'px';
    letterDiv.style.top = Math.random() * window.innerHeight + 'px';
    letterDiv.style.fontSize = '2vw';
    letterDiv.style.color = Math.random() < 0.5 ? 'black' : 'white';
    letterDiv.style.zIndex = '1000';
    letterDiv.style.userSelect = 'none';
  }

  // create a div to show letter, delete it after 3000ms
  function createAndShowLetter() {
    var letter = getRandomLetter();
    var letterDiv = document.createElement('div');
    letterDiv.textContent = letter;
    applyLetterStyle(letterDiv);
    document.body.appendChild(letterDiv);

    setTimeout(function() {
      document.body.removeChild(letterDiv);
    }, 3000);
  }

  // repeat create letter every 500ms
  setInterval(createAndShowLetter, 500);
})();
  