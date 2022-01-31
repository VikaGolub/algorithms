const styles = {
  startBtn: `
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `,
  choices: `
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    gap: 20px;
    align-items: center;
    `,
  result: `
    width: 100px;
    text-align: center;
    `,
  counter: `
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    `,
  optionsPanel: `
    position: absolute;
    left: 50%;
    bottom: 10%;
    transform: translate(-50%, 0);
    /* border: 1px solid green; */
    `,
  choiceItem: `
    width: 200px;
    height: 200px; 
  `,
};

const gameScreen = document.body;
let startBtn = showStartButton(); // button start

function showStartButton() {
  const btn = document.createElement("button");
  btn.innerText = "Start New Game";
  btn.style = styles.startBtn;
  gameScreen.append(btn);
  btn.addEventListener("click", startGame);
  return btn;
}

function chooseRandom(...options) {
  return options[Math.floor(Math.random() * options.length)];
}

function looseDidntChoose() {
  const msg = document.createElement("div");
  msg.innerText = "You didn't make a choice, and now you loose. ";
  msg.style = styles.optionsPanel;
  gameScreen.append(msg);
  return msg;
}

function declareResults(panel, playerChoice, opponentChoice) {
  if (playerChoice === opponentChoice) {
    panel.innerText = "Draw! Play Again!";
  } else if (
    "paperstone, scissorspaper, stonescissors".includes(
      playerChoice + opponentChoice
    )
  ) {
    panel.innerText = "You won!";
  } else {
    panel.innerText = "You loose";
  }
}

async function startGame() {
  startBtn.remove();

  const timer = showTimer(3);

  const futurePlayerChoice = showOptions(timer, "stone", "scissors", "paper");
  const futureOpponentChoice = chooseRandom("stone", "scissors", "paper");

  try {
    const [playerChoice, opponentChoice] = await Promise.all([
      futurePlayerChoice,
      futureOpponentChoice,
    ]);
    var resultPanel = showChoices(playerChoice, opponentChoice);
    await sleep(1);
    declareResults(resultPanel, playerChoice, opponentChoice);
  } catch (err) {
    console.error(err);
    var looseMsg = looseDidntChoose();
  }

  await sleep(3);
  looseMsg?.remove();
  resultPanel?.parentElement.remove();
  startBtn = showStartButton();
}

async function showOptions(timer, ...options) {
  const panel = showOptionPanel(options);
  await timer;

  const selectedBtn = panel.querySelector(":focus");
  panel.remove();
  if (selectedBtn) {
    return selectedBtn.dataset.option;
  } else {
    throw false;
  }
}

function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay * 1000));
}

function showOptionPanel(options) {
  const panel = document.createElement("div");
  panel.style = styles.optionsPanel;
  gameScreen.append(panel);
  panel.append(
    ...options.map((option) => {
      const btn = document.createElement("button");
      btn.innerText = option;
      // btn.style = styles
      btn.dataset.option = option;
      return btn;
    })
  );
  return panel;
}

function showChoices(leftChoice, rightChoice) {
  const panel = document.createElement("div");
  panel.style = styles.choices;

  const leftItem = document.createElement("h2");
  leftItem.style = styles.choiceItem;
  leftItem.style.backgroundImage = `url('./${leftChoice}.jpeg')`;
  // leftItem.innerText = leftChoice;

  const rightItem = document.createElement("h2");
  rightItem.style = styles.choiceItem;
  rightItem.style.backgroundImage = `url('./${rightChoice}.jpeg')`;
  // rightItem.innerText = rightChoice;

  const resultPanel = document.createElement("div");
  resultPanel.style = styles.result;

  gameScreen.append(panel);

  panel.append(leftItem, resultPanel, rightItem);
  return resultPanel;
}

async function showTimer(duration) {
  let counter = document.createElement("h1");

  counter.innerText = duration;
  gameScreen.append(counter);
  counter.style = styles.counter;

  while (duration--) {
    await sleep(1);

    counter.innerText = duration;
  }

  counter.remove();
}
