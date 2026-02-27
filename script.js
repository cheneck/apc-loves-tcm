const quizzes = {
    "Shao Yang (6 Stages)": ["bitter taste|bitter mouth", "dry throat", "blurry vision|blurred vision", "alternating chills and fever", "fullness in chest|chest distension", "irritability", "nausea", "wiry pulse"],
    "Tai Yang (6 Stages)": ["aversion to cold", "headache", "stiff neck", "floating pulse", "fever"],
    "Yang Ming (6 Stages)": ["big fever|high fever", "big sweat|profuse sweating", "big thirst", "big pulse|flooding pulse|surging pulse", "constipation", "abdominal pain"],
    "Tai Yin (6 Stages)": ["abdominal fullness", "diarrhea", "vomiting", "no thirst", "pale tongue", "weak pulse"],
    "Shao Yin (6 Stages)": ["extreme fatigue", "desire to sleep", "cold limbs", "faint pulse", "diarrhea with undigested food"],
    "Jue Yin (6 Stages)": ["hunger without desire to eat", "surging qi to heart", "pain in heart", "vomiting roundworms", "cold limbs"],
    "Wei Level (4 Levels)": ["fever", "slight chills", "sore throat", "cough", "headache", "floating rapid pulse"],
    "Qi Level (4 Levels)": ["high fever", "intense thirst", "sweating", "red tongue with yellow coat", "forceful pulse"],
    "Ying Level (4 Levels)": ["fever worse at night", "restlessness", "delirium", "crimson tongue", "faint skin rashes"],
    "Xue Level (4 Levels)": ["bleeding", "severe delirium", "dark purple rash", "convulsions", "deep crimson tongue"]
};

let currentAnswers = [];
let score = 0;
let isGameOver = false;

function showMenu() {
    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('quiz-area').classList.add('hidden');
}

function startQuiz(name) {
    isGameOver = false;
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('quiz-area').classList.remove('hidden');
    document.getElementById('current-quiz-title').innerText = name;
    
    currentAnswers = quizzes[name];
    score = 0;
    updateScore();
    
    const input = document.getElementById('guess-input');
    input.value = '';
    input.disabled = false;
    input.focus();
    
    const grid = document.getElementById('answer-grid');
    grid.innerHTML = '';
    currentAnswers.forEach(() => {
        const div = document.createElement('div');
        div.className = 'answer-box';
        div.innerText = '???';
        grid.appendChild(div);
    });
}

function giveUp() {
    isGameOver = true;
    document.getElementById('guess-input').disabled = true;
    const boxes = document.getElementsByClassName('answer-box');
    currentAnswers.forEach((ans, i) => {
        if (!boxes[i].classList.contains('revealed')) {
            // Display the first synonym if they give up
            boxes[i].innerText = ans.split('|')[0];
            boxes[i].classList.add('missed');
        }
    });
}

function updateScore() {
    document.getElementById('score').innerText = score;
    document.getElementById('total').innerText = currentAnswers.length;
}

document.getElementById('guess-input').addEventListener('input', (e) => {
    if (isGameOver) return;
    const guess = e.target.value.toLowerCase().trim();
    
    // Logic for multiple-answer/synonym matching
    const index = currentAnswers.findIndex(item => {
        const synonyms = item.toLowerCase().split('|');
        return synonyms.includes(guess);
    });
    
    if (index !== -1) {
        const boxes = document.getElementsByClassName('answer-box');
        if (!boxes[index].classList.contains('revealed')) {
            // Reveal the exact synonym they typed (or the first one)
            boxes[index].innerText = guess; 
            boxes[index].classList.add('revealed');
            score++;
            updateScore();
            e.target.value = '';
            
            if (score === currentAnswers.length) {
                isGameOver = true;
                alert("Perfect! You've mastered this pattern.");
            }
        }
    }
});

const menuDiv = document.getElementById('quiz-buttons');
Object.keys(quizzes).forEach(name => {
    const btn = document.createElement('button');
    btn.innerText = name;
    btn.onclick = () => startQuiz(name);
    menuDiv.appendChild(btn);
});
