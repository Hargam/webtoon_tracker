const form = document.querySelector('#webtoon-form');
const webtoonList = document.querySelector('#webtoon-list');
let webtoons = [];

// Afficher la liste de webtoons
function renderWebtoons() {
    // Effacer les éléments de la liste avant de les afficher à nouveau
    webtoonList.innerHTML = '';
    // Parcourir la liste de webtoons et ajouter chaque élément à la liste
    for (let i = 0; i < webtoons.length; i++) {
        const webtoon = webtoons[i];
        const li = document.createElement('li');
        li.textContent = `${webtoon.name} - chapitre ${webtoon.chapter}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.setAttribute('data-index', i);
        deleteButton.addEventListener('click', deleteWebtoon);

        li.appendChild(deleteButton);
        webtoonList.appendChild(li);
    }
}

function getExistingWebtoon(webtoonName) {
    return webtoons.find((webtoon) => webtoon.name === webtoonName) || null;
}

// Enregistrer un nouveau webtoon
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêcher la soumission du formulaire
    const webtoonNameInput = document.querySelector('#webtoon-name');
    const chapterNumberInput = document.querySelector('#chapter-number');
    const webtoonName = webtoonNameInput.value;
    const chapterNumber = chapterNumberInput.value;
    if (webtoonName.trim() === '' || chapterNumber.trim() === '') {
        alert('Veuillez entrer un nom de webtoon et un numéro de chapitre valide');
        return;
    }
    // Vérifier si un webtoon avec le même nom est déjà présent dans la liste
    const existingWebtoon = getExistingWebtoon(webtoonName);
    if (existingWebtoon) {
        // Si oui, mettre à jour le numéro de chapitre de ce webtoon
        existingWebtoon.chapter = chapterNumber;
        alert('Le numéro de chapitre a été mis à jour pour le webtoon existant "' + webtoonName + '".');
    } else {
        // Sinon, ajouter un nouveau webtoon à la liste
        const webtoon = {
            name: webtoonName,
            chapter: chapterNumber
        };
        webtoons.push(webtoon);
        alert('Le webtoon "' + webtoonName + '" a été ajouté à la liste.');
    }
    webtoonNameInput.value = '';
    chapterNumberInput.value = '';
    renderWebtoons();
    localStorage.setItem('webtoons', JSON.stringify(webtoons)); // Enregistrer les webtoons dans le stockage local
});

// Ranger par ordre aplha-numérique
function alphaNumericSort(a, b) {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    const chapterA = parseInt(a.chapter);
    const chapterB = parseInt(b.chapter);

    if (nameA === nameB) {
        return chapterA - chapterB;
    } else {
        return nameA.localeCompare(nameB);
    }
}

// Supprimer un webtoon
function deleteWebtoon(event) {
    const index = event.target.getAttribute('data-index');
    webtoons.splice(index, 1);
    renderWebtoons();
    localStorage.setItem('webtoons', JSON.stringify(webtoons)); // Enregistrer les webtoons dans le stockage local
}

// Charger les webtoons depuis le stockage local
function loadWebtoons() {
    const webtoonsData = localStorage.getItem('webtoons');
    if (webtoonsData) {
        webtoons = JSON.parse(webtoonsData);
        webtoons.sort(alphaNumericSort);
        renderWebtoons();
    }
}

loadWebtoons();