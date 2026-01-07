// 10 Fragen passend zu eurer Präsentation
const questions = [
  {
    id: "q1",
    type: "mc",
    text: "Welche Kombination beschreibt die soziale Marktwirtschaft am besten?",
    hint: "Denk an die 3 Säulen aus der Präsentation.",
    options: [
      "Wettbewerb + sozialer Ausgleich + Staat setzt Regeln",
      "Planwirtschaft + keine Regeln + keine Sozialleistungen",
      "Nur freier Markt ohne Staat",
      "Nur Sozialstaat ohne Wettbewerb"
    ],
    correctIndex: 0
  },
  {
    id: "q2",
    type: "boolean",
    text: "Wettbewerb ist ein wichtiger Teil der sozialen Marktwirtschaft.",
    hint: "",
    correctIndex: 0 // Ja
  },
  {
    id: "q3",
    type: "mc",
    text: "Welche Person wird als wichtiger Kopf der sozialen Marktwirtschaft genannt?",
    hint: "",
    options: ["Ludwig Erhard", "Karl Marx", "Elon Musk", "Otto von Bismarck"],
    correctIndex: 0
  },
  {
    id: "q4",
    type: "mc",
    text: "Wofür steht der Mindestlohn im Kontext der sozialen Marktwirtschaft?",
    hint: "Beispiel für sozialen Ausgleich.",
    options: [
      "Schutz vor zu niedrigen Löhnen",
      "Abschaffung aller Steuern",
      "Verbot von Unternehmen",
      "Der Staat bestimmt alle Preise"
    ],
    correctIndex: 0
  },
  {
    id: "q5",
    type: "boolean",
    text: "Beim Generationenvertrag (Rente) zahlen die Jüngeren für die Älteren.",
    hint: "",
    correctIndex: 0 // Ja
  },
  {
    id: "q6",
    type: "mc",
    text: "Welche Aufgabe passt am besten zum Kartellamt?",
    hint: "",
    options: [
      "Monopole verhindern und fairen Wettbewerb sichern",
      "Renten auszahlen",
      "Krankenhäuser leiten",
      "Schulpflicht kontrollieren"
    ],
    correctIndex: 0
  },
  {
    id: "q7",
    type: "mc",
    text: "Was ist laut Präsentation ein Demografie-Problem?",
    hint: "Stichwort Verhältnis Jung/Alt.",
    options: [
      "Weniger Junge zahlen für mehr Alte",
      "Zu viele Firmen konkurrieren",
      "Zu viele Exportgüter",
      "Zu viele Feiertage"
    ],
    correctIndex: 0
  },
  {
    id: "q8",
    type: "boolean",
    text: "Bürokratie kann Innovation und Startups ausbremsen.",
    hint: "",
    correctIndex: 0 // Ja
  },
  {
    id: "q9",
    type: "mc",
    text: "Was ist eine sinnvolle Markt-Lösung für Klimaschutz?",
    hint: "",
    options: [
      "CO₂-Preis statt nur Verbote",
      "Gar nichts tun",
      "Alle Firmen verstaatlichen",
      "Wettbewerb komplett abschaffen"
    ],
    correctIndex: 0
  },
  {
    id: "q10",
    type: "mc",
    text: "Welche Aussage passt zu „Tech-Monopolen“?",
    hint: "",
    options: [
      "Einige wenige große Plattformen werden zu mächtig",
      "Es gibt zu viele kleine Firmen",
      "Niemand nutzt das Internet",
      "Der Staat setzt keine Gesetze mehr durch"
    ],
    correctIndex: 0
  }
];

// ---------- App State ----------
const state = {
  index: 0,
  answers: new Array(questions.length).fill(null), // answers[qIndex] = selectedIndex
};

// ---------- Helpers ----------
function getOptions(q){
  if(q.type === "boolean") return ["Ja", "Nein"];
  return q.options;
}

function isCorrect(qIndex){
  const q = questions[qIndex];
  const a = state.answers[qIndex];
  return a !== null && a === q.correctIndex;
}

function calcScore(){
  let s = 0;
  for(let i=0;i<questions.length;i++){
    if(isCorrect(i)) s++;
  }
  return s;
}

// ---------- Elements ----------
const startView = document.getElementById("startView");
const quizView = document.getElementById("quizView");
const resultView = document.getElementById("resultView");
const reviewView = document.getElementById("reviewView");

const metaInfo = document.getElementById("metaInfo");
const startBtn = document.getElementById("startBtn");

const progressBar = document.getElementById("progressBar");
const counter = document.getElementById("counter");
const questionText = document.getElementById("questionText");
const questionHint = document.getElementById("questionHint");
const answersEl = document.getElementById("answers");

const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

const scoreText = document.getElementById("scoreText");
const scoreMsg = document.getElementById("scoreMsg");
const reviewBtn = document.getElementById("reviewBtn");
const restartBtn = document.getElementById("restartBtn");

const reviewPill = document.getElementById("reviewPill");
const reviewList = document.getElementById("reviewList");
const backToResultBtn = document.getElementById("backToResultBtn");
const restartBtn2 = document.getElementById("restartBtn2");

// ---------- Render ----------
function show(view){
  [startView, quizView, resultView, reviewView].forEach(v => v.classList.add("hidden"));
  view.classList.remove("hidden");
}

function renderMeta(){
  metaInfo.textContent = `${questions.length} Fragen`;
}

function renderQuestion(){
  const q = questions[state.index];
  const total = questions.length;

  counter.textContent = `Frage ${state.index + 1}/${total}`;
  progressBar.style.width = `${(state.index / total) * 100}%`;

  questionText.textContent = q.text;
  questionHint.textContent = q.hint || "";

  const opts = getOptions(q);
  answersEl.innerHTML = "";

  opts.forEach((label, idx) => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.type = "button";
    btn.textContent = label;

    if(state.answers[state.index] === idx){
      btn.classList.add("selected");
    }

    btn.addEventListener("click", () => {
      state.answers[state.index] = idx;
      [...answersEl.querySelectorAll(".answer")].forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      nextBtn.disabled = false;
    });

    answersEl.appendChild(btn);
  });

  backBtn.disabled = state.index === 0;
  nextBtn.textContent = (state.index === total - 1) ? "Fertig" : "Weiter";
  nextBtn.disabled = (state.answers[state.index] === null);
}

function renderResult(){
  const score = calcScore();
  const total = questions.length;

  const percent = Math.round((score / total) * 100);

  scoreText.textContent = `${percent}%`;
  scoreMsg.textContent = `Richtig: ${score} von ${total}`;
}

function renderReview(){
  const score = calcScore();
  reviewPill.textContent = `Score: ${score}/${questions.length}`;

  reviewList.innerHTML = "";
  questions.forEach((q, i) => {
    const opts = getOptions(q);
    const your = state.answers[i];
    const correct = q.correctIndex;

    const item = document.createElement("div");
    item.className = "reviewItem";

    const ok = your === correct;
    const tag = `<span class="tag ${ok ? "ok" : "bad"}">${ok ? "Richtig" : "Falsch"}</span>`;

    item.innerHTML = `
      <div><strong>Frage ${i+1}:</strong> ${q.text} ${tag}</div>
      ${q.hint ? `<div class="muted" style="margin-top:6px">${q.hint}</div>` : ""}
      <div style="margin-top:10px">
        <div class="muted">Deine Antwort: <strong>${your !== null ? opts[your] : "—"}</strong></div>
        <div class="muted">Richtig: <strong>${opts[correct]}</strong></div>
      </div>
    `;

    reviewList.appendChild(item);
  });
}

// ---------- Navigation ----------
function start(){
  state.index = 0;
  state.answers.fill(null);
  show(quizView);
  renderQuestion();
}

function next(){
  const total = questions.length;

  if(state.index === total - 1){
    progressBar.style.width = `100%`;
    show(resultView);
    renderResult();
    return;
  }

  state.index++;
  renderQuestion();
}

function back(){
  if(state.index === 0) return;
  state.index--;
  renderQuestion();
}

function restart(){
  show(startView);
  renderMeta();
  progressBar.style.width = "0%";
}

// ---------- Events ----------
startBtn.addEventListener("click", start);
nextBtn.addEventListener("click", next);
backBtn.addEventListener("click", back);

reviewBtn.addEventListener("click", () => {
  show(reviewView);
  renderReview();
});

restartBtn.addEventListener("click", restart);
restartBtn2.addEventListener("click", restart);

backToResultBtn.addEventListener("click", () => {
  show(resultView);
  renderResult();
});

// init
renderMeta();
