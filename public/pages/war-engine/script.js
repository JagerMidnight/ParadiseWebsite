import { setupDungeonTab, icyVeinsDungeonData, wowheadDungeonData } from './dungeons.js';
import { setupClassTab, icyVeinsClassData, wowheadClassData } from './classes.js';
import { setupCraftingTab, craftingData } from './crafting.js';

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

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
    });
});

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
    setupDungeonTab(icyVeinsDungeonData, wowheadDungeonData);
    setupClassTab(icyVeinsClassData, wowheadClassData);
    setupCraftingTab(craftingData);
});
