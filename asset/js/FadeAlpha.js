(function() {
  function getRandomLetter() {
    var letters = "LIUYANG";
    var randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
  }

  function applyLetterStyle(letterDiv) {
    letterDiv.style.position = 'absolute';
    letterDiv.style.left = Math.random() * window.innerWidth + 'px';
    letterDiv.style.top = Math.random() * window.innerHeight + 'px';
    letterDiv.style.fontSize = '2vw';
    letterDiv.style.color = Math.random() < 0.5 ? 'black' : 'white';
    letterDiv.style.zIndex = '1000';
    letterDiv.style.userSelect = 'none';
  }

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

  setInterval(createAndShowLetter, 500);
})();

