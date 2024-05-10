import { dataCards } from './database/cardsDB.js';

const container_all_cards = document.querySelector('[data-container-all-cards]');

const renderImages = () => {
    dataCards.map(
        (product) => {
            const element_card = document.createElement('div');

            element_card.classList.add('c-card');
            element_card.setAttribute('data-cards', '');
            element_card.setAttribute('data-category', product.category);
            element_card.setAttribute('data-id', product.id);

            element_card.innerHTML = `
            <img class="c-post-img" src="${product.src}" alt="${product.alt}"/>
            <h2>${product.title}</h2>
            <p>ref: ${product.id}</p>
            <p>
               R$<span>${product.price}</span>
            </p>
            <p>${product.description}</p>
        `;

            container_all_cards.appendChild(element_card);
        }
    );
};

const showCategory = (allCards, productCategory) => {
    allCards.forEach(
        (data) => {
            if (data.dataset.category === `${productCategory}`) {
                data.style.display = 'block';
            }
            else {
                data.style.display = 'none';
            }
        }
    );
};

window.addEventListener('click',
    (event) => {
        const eventTarget = event.target;
        const filteredCategory = eventTarget.dataset.filter;
        const allCards = document.querySelectorAll('[data-cards]');

        switch (filteredCategory) {
            case 'all_categories':
                allCards.forEach(
                    (data) => {
                        data.style.display = 'block';
                    }
                );
                break;

            case 'mesa_category':
                showCategory(allCards, 'mesa');
                break;

            case 'cadeira_category':
                showCategory(allCards, 'cadeira');
                break;

            case 'cama_category':
                showCategory(allCards, 'cama');
                break;

            case 'armario_category':
                showCategory(allCards, 'armario');
                break;

            case 'banco_category':
                showCategory(allCards, 'banco');
                break;

            case 'mesa_com_cadeira_category':
                showCategory(allCards, 'mesa_com_cadeira');
                break;

            default:
                break;
        }
    }
);

window.addEventListener('DOMContentLoaded',
    () => {
        renderImages();
    }
);