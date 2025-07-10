export const icyVeinsDungeonData = [
    { id: 'ragefire', title: 'Ragefire Chasm', category: 'Classic', link: 'https://www.icy-veins.com/wow-classic/ragefire-chasm-dungeon-guide' },
    { id: 'deadmines', title: 'Deadmines', category: 'Classic', link: 'https://www.icy-veins.com/wow-classic/deadmines-dungeon-guide' },
    { id: 'wailing-caverns', title: 'Wailing Caverns', category: 'Classic', link: 'https://www.icy-veins.com/wow-classic/wailing-caverns-dungeon-guide' },
    { id: 'shadowfang', title: 'Shadowfang Keep', category: 'Classic', link: 'https://www.icy-veins.com/wow-classic/shadowfang-keep-dungeon-guide' },
    { id: 'blackfathom', title: 'Blackfathom Deeps', category: 'Classic', link: 'https://www.icy-veins.com/wow-classic/blackfathom-deeps-dungeon-guide' },
    { id: 'stockades', title: 'The Stockades', category: 'Classic', link: 'https://www.icy-veins.com/wow-classic/the-stockade-dungeon-guide' },
    { id: 'razorfen-kraul', title: 'Razorfen Kraul', category: 'Classic', link: 'https://www.icy-veins.com/wow-classic/razorfen-kraul-dungeon-guide' },
    { id: 'gnomeregan', title: 'Gnomeregan', category: 'Classic', link: 'https://www.icy-veins.com/wow-classic/gnomeregan-dungeon-guide' },
    { id: 'sm-graveyard', title: 'Scarlet Monastery Graveyard', category: 'Classic', link: 'https://www.icy-veins.com/wow-classic/scarlet-monastery-graveyard-dungeon-guide' },
    { id: 'sm-library', title: 'Scarlet Monastery Library', category: 'Classic', link: 'https://www.icy-veins.com/wow-classic/scarlet-monastery-library-dungeon-guide' },
    { id: 'sm-armory', title: 'Scarlet Monastery Armory', category: 'Classic', link: 'https://www.icy-veins.com/wow-classic/scarlet-monastery-armory-dungeon-guide' },
    { id: 'sm-cathedral', title: 'Scarlet Monastery Cathedral', category: 'Classic', link: 'https://www.icy-veins.com/wow-classic/scarlet-monastery-cathedral-dungeon-guide' },
    { id: 'razorfen-downs', title: 'Razorfen Downs', category: 'Classic', link: 'https://www.icy-veins.com/wow-classic/razorfen-downs-dungeon-guide' },
    { id: 'uldaman', title: 'Uldaman', category: 'Classic', link: 'https://www.icy-veins.com/wow-classic/uldaman-dungeon-guide' },
    { id: 'zulfarrak', title: 'Zul\'Farrak', category: 'Classic', link: 'https://www.icy-veins.com/wow-classic/zul-farrak-dungeon-guide' },
    { id: 'maraudon', title: 'Maraudon', category: 'Classic', link: 'https://www.icy-veins.com/wow-classic/maraudon-dungeon-guides-hub' },
    { id: 'brd', title: 'Blackrock Depths', category: 'Classic', link: 'https://www.icy-veins.com/wow-classic/blackrock-depths-dungeon-guides-hub' },
    { id: 'sunken-temple', title: 'Sunken Temple', category: 'Classic', link: 'https://www.icy-veins.com/wow-classic/sunken-temple-dungeon-guide' }
];

export const wowheadDungeonData = [
    { id: 'wh-deadmines', title: 'Deadmines (Wowhead)', category: 'Classic', link: 'https://www.wowhead.com/classic/guides/deadmines-dungeon-guide' },
    { id: 'wh-wailing-caverns', title: 'Wailing Caverns (Wowhead)', category: 'Classic', link: 'https://www.wowhead.com/classic/guides/wailing-caverns-dungeon-guide' },
    { id: 'wh-sm-cathedral', title: 'Scarlet Monastery Cathedral (Wowhead)', category: 'Classic', link: 'https://www.wowhead.com/classic/guides/scarlet-monastery-cathedral-dungeon-guide' },
];

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

export function setupDungeonTab(icyVeinsData, wowheadData) {
    setupGuideSection(
        'exploreIcyVeinsDungeonsBtn',
        'icyVeinsDungeonCardsSection',
        'icyVeinsDungeonSearch',
        'icyVeinsDungeonCardsGrid',
        'noIcyVeinsDungeonResults',
        icyVeinsData
    );

    setupGuideSection(
        'exploreWowheadDungeonsBtn',
        'wowheadDungeonCardsSection',
        'wowheadDungeonSearch',
        'wowheadDungeonCardsGrid',
        'noWowheadDungeonResults',
        wowheadData
    );
}
