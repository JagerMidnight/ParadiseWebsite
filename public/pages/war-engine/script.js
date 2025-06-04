import { dungeonData } from './dungeons.js';

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

const exploreDungeonsBtn = document.getElementById('exploreDungeonsBtn');
const dungeonCardsSection = document.getElementById('dungeonCardsSection');
const dungeonSearchInput = document.getElementById('dungeonSearch');
const dungeonCardsGrid = document.getElementById('dungeonCardsGrid');
const noResultsMessage = document.getElementById('noResults');

const legalToggleBtn = document.getElementById('legal-toggle-btn');
const legalSummary = document.getElementById('legal-summary');
const legalFullContent = document.getElementById('legal-full-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.dataset.tab;

        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        button.classList.add('active');
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        if (targetTab === 'dungeon') {
            dungeonCardsSection.classList.remove('expanded');
            exploreDungeonsBtn.textContent = 'Explore All Dungeon Guides';
            exploreDungeonsBtn.style.display = 'block';
        } else {
            dungeonCardsSection.classList.remove('expanded');
            exploreDungeonsBtn.textContent = 'Explore All Dungeon Guides';
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

if (exploreDungeonsBtn && dungeonCardsSection) {
    exploreDungeonsBtn.addEventListener('click', () => {
        dungeonCardsSection.classList.toggle('expanded');

        if (dungeonCardsSection.classList.contains('expanded')) {
            exploreDungeonsBtn.textContent = 'Hide Dungeon Guides';
            dungeonSearchInput.focus();
            renderDungeonCards(dungeonData);
        } else {
            exploreDungeonsBtn.textContent = 'Explore All Dungeon Guides';
        }
    });
}

if (dungeonSearchInput && dungeonCardsGrid && noResultsMessage) {
    dungeonSearchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredDungeons = dungeonData.filter(dungeon =>
            dungeon.title.toLowerCase().includes(searchTerm) ||
            dungeon.category.toLowerCase().includes(searchTerm)
        );
        renderDungeonCards(filteredDungeons);
    });
}

if (legalToggleBtn && legalSummary && legalFullContent) {
    legalToggleBtn.addEventListener('click', function() {
        if (legalFullContent.style.display === 'none' || legalFullContent.style.display === '') {
            legalFullContent.style.display = 'block';
            legalSummary.style.display = 'none';
            legalToggleBtn.textContent = 'Hide';
        } else {
            legalFullContent.style.display = 'none';
            legalSummary.style.display = 'block';
            legalToggleBtn.textContent = 'Show';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderDungeonCards(dungeonData);
});
