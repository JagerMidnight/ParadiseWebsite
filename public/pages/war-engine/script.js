import { dungeonData } from './dungeons.js';

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

const exploreDungeonsBtn = document.getElementById('exploreDungeonsBtn');
const dungeonCardsSection = document.getElementById('dungeonCardsSection');
const dungeonSearchInput = document.getElementById('dungeonSearch');
const dungeonCardsGrid = document.getElementById('dungeonCardsGrid');
const noResultsMessage = document.getElementById('noResults');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        button.classList.add('active');

        const targetTab = button.dataset.tab;
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        if (targetTab !== 'dungeon') {
            dungeonCardsSection.classList.remove('expanded');
            exploreDungeonsBtn.style.display = 'block';
        } else {
             dungeonCardsSection.classList.remove('expanded');
             exploreDungeonsBtn.style.display = 'block';
        }
    });
});

function createDungeonCard(dungeon) {
    const card = document.createElement('a');
    card.href = dungeon.link;
    card.className = `
        dungeon-card
        block bg-gray-700 p-6 rounded-lg shadow-md border border-gray-600
        text-center flex flex-col justify-between items-center space-y-3
        hover:bg-gray-600 hover:border-purple-500
        transition-all duration-200 ease-in-out
    `;

    const title = document.createElement('h3');
    title.className = 'text-2xl font-bold text-purple-300';
    title.textContent = dungeon.title;

    const category = document.createElement('p');
    category.className = 'text-gray-400 text-sm italic';
    category.textContent = dungeon.category;

    card.appendChild(title);
    card.appendChild(category);

    return card;
}

function renderDungeonCards(dungeonsToRender) {
    dungeonCardsGrid.innerHTML = '';
    if (dungeonsToRender.length === 0) {
        noResultsMessage.classList.remove('hidden');
    } else {
        noResultsMessage.classList.add('hidden');
        dungeonsToRender.forEach(dungeon => {
            dungeonCardsGrid.appendChild(createDungeonCard(dungeon));
        });
    }
}

renderDungeonCards(dungeonData);

exploreDungeonsBtn.addEventListener('click', () => {
    dungeonCardsSection.classList.add('expanded');
    exploreDungeonsBtn.style.display = 'none';
    dungeonSearchInput.focus();
    renderDungeonCards(dungeonData);
});

dungeonSearchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredDungeons = dungeonData.filter(dungeon =>
        dungeon.title.toLowerCase().includes(searchTerm) ||
        dungeon.category.toLowerCase().includes(searchTerm)
    );
    renderDungeonCards(filteredDungeons);
});
