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
    "Xue Level (4 Levels)": ["bleeding", "severe delirium", "dark purple rash", "convulsions", "deep crimson tongue"],
    "Upper Jiao": ["fever", "aversion to cold", "headache", "sore throat", "floating rapid pulse"],
    "Middle Jiao": ["high fever", "abdominal fullness", "constipation|hard stool", "yellow tongue coating"],
    "Lower Jiao": ["low grade fever", "night sweats", "five center heat", "dry mouth", "deep crimson tongue"],
    "Seven Emotional Factors": ["joy", "fear", "sadness", "anger", "worry", "fright", "grief"],
    "Six Exogenous Factors": ["wind", "cold", "heat", "dryness", "damp", "summer heat"]
};


let currentAnswers = [];
let score = 0;
let isGameOver = false;

// Create menu
const menuDiv = document.getElementById('quiz-buttons');
Object.keys(quizzes).forEach(name => {
    const btn = document.createElement('button');
    btn.innerText = name;
    btn.onclick = () => startQuiz(name);
    menuDiv.appendChild(btn);
});

function showMenu() {
    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('quiz-area').classList.add('hidden');
}

function startQuiz(name) {
    isGameOver = false;
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('quiz-area').classList.remove('hidden');
    document.getElementById('current-quiz-title').innerText = name;
    
    // Reset message
    const msg = document.getElementById('message-display');
    msg.innerText = "";
    msg.className = "";

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
    if (isGameOver) return;
    isGameOver = true;
    document.getElementById('guess-input').disabled = true;
    
    const msg = document.getElementById('message-display');
    msg.innerText = "Keep studying these missed symptoms!";
    msg.className = "give-up-text";

    const boxes = document.getElementsByClassName('answer-box');
    currentAnswers.forEach((ans, i) => {
        if (!boxes[i].classList.contains('revealed')) {
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
    
    const index = currentAnswers.findIndex(item => {
        const synonyms = item.toLowerCase().split('|');
        return synonyms.includes(guess);
    });
    
    if (index !== -1) {
        const boxes = document.getElementsByClassName('answer-box');
        if (!boxes[index].classList.contains('revealed')) {
            boxes[index].innerText = currentAnswers[index].split('|')[0]; 
            boxes[index].classList.add('revealed');
            score++;
            updateScore();
            e.target.value = '';
            
            if (score === currentAnswers.length) {
                isGameOver = true;
                const msg = document.getElementById('message-display');
                msg.innerText = "Mastery Achieved! Perfect Score.";
                msg.className = "success-text";
            }
        }
    }
});
