export const craftingData = [];

function createGuideCard(guide) {
    const card = document.createElement('a');
    card.href = guide.link;
    card.className = `
        guide-card
        block bg-gray-700 p-6 rounded-lg shadow-md border border-gray-600
        text-center flex flex-col justify-between items-center space-y-3
        hover:bg-gray-600 hover:border-purple-500
        transition-all duration-200 ease-in-out
    `;

    const title = document.createElement('h3');
    title.className = 'text-2xl font-bold text-purple-300';
    title.textContent = guide.title;

    const category = document.createElement('p');
    category.className = 'text-gray-400 text-sm italic';
    category.textContent = guide.category;

    card.appendChild(title);
    card.appendChild(category);

    return card;
}

function setupGuideSection(buttonId, sectionId, searchInputId, gridId, noResultsId, data) {
    const exploreButton = document.getElementById(buttonId);
    const cardsSection = document.getElementById(sectionId);
    const searchInput = document.getElementById(searchInputId);
    const cardsGrid = document.getElementById(gridId);
    const noResultsMessage = document.getElementById(noResultsId);

    if (exploreButton && cardsSection) {
        exploreButton.addEventListener('click', () => {
            cardsSection.classList.toggle('expanded');
            if (cardsSection.classList.contains('expanded')) {
                exploreButton.textContent = `Hide ${exploreButton.textContent.replace('Explore ', '')}`;
                if (searchInput) searchInput.focus();
                renderCards(data, cardsGrid, noResultsMessage);
            } else {
                exploreButton.textContent = `Explore ${exploreButton.textContent.replace('Hide ', '')}`;
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            const searchTerm = event.target.value.toLowerCase();
            const filteredData = data.filter(guide =>
                guide.title.toLowerCase().includes(searchTerm) ||
                guide.category.toLowerCase().includes(searchTerm)
            );
            renderCards(filteredData, cardsGrid, noResultsMessage);
        });
    }
}

function renderCards(dataToRender, gridElement, noResultsElement) {
    gridElement.innerHTML = '';
    if (dataToRender.length === 0) {
        noResultsElement.classList.remove('hidden');
    } else {
        noResultsElement.classList.add('hidden');
        dataToRender.forEach(guide => {
            gridElement.appendChild(createGuideCard(guide));
        });
    }
}

export function setupCraftingTab(craftingData) {
    setupGuideSection(
        'exploreCraftingGuidesBtn',
        'craftingCardsSection',
        'craftingSearch',
        'craftingCardsGrid',
        'noCraftingResults',
        craftingData
    );
}
