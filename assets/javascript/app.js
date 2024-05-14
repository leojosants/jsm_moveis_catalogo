import { dataCards as dataCardsDB } from './database/cardsDB.js';

const containerAllCards = document.querySelector('[data-container-all-cards]');
const inputSearch = document.querySelector('[data-input-search]');
const select = document.querySelector('[data-select]');
const popup = document.querySelector('[data-popup-container]');
const buttonCloseDescription = document.querySelector('[data-button-close-description]');
const filterContainer = document.querySelector('[data-filter]');

const renderImages = () => {
    dataCardsDB.map(
        (product) => {
            const element_card = document.createElement('div');

            element_card.classList.add('c-card');
            element_card.setAttribute('data-cards', '');
            element_card.setAttribute('data-category', product.category);
            element_card.setAttribute('data-id', product.id);

            element_card.innerHTML = `
                <div class="c-card">
                    <div class="c-card-image">
                        <img src="${product.src}" alt="${product.alt}" width="${product.width}" height="${product.height}" style="top:${product.top}; left: ${product.left}"/>
                    </div>

                    <h3>${product.title}</h3>

                    <div class="c-card-info">
                        <p>ref: <span>${product.id}</span></p>
                        <button data-button="open-description">${product.description}</button>
                    </div>
                </div>
            `;

            containerAllCards.appendChild(element_card);
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

    window.scrollTo(
        {
            top: 0,
            behavior: 'smooth',
        }
    );
};

inputSearch.addEventListener('input',
    (event) => {
        const eventTarget = event.target;
        const inputValue = eventTarget.value.toLocaleLowerCase();
        const allCards = document.querySelectorAll('[data-cards]');

        allCards.forEach(
            (data) => {
                const title = data.querySelector('h3').textContent.toLocaleLowerCase();

                if (title.includes(inputValue)) {
                    data.style.display = 'block';
                }
                else {
                    data.style.display = 'none';
                }
            }
        );
    }
);

select.addEventListener('change',
    (event) => {
        inputSearch.value = '';
        const eventTarget = event.target;
        const filteredCategory = (eventTarget.value);
        const allCards = document.querySelectorAll('[data-cards]');

        switch (filteredCategory) {
            case 'all_categories':
                allCards.forEach(
                    (data) => {
                        data.style.display = 'block';
                    }
                );

                window.scrollTo(
                    {
                        top: 0,
                        behavior: 'smooth',
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

            case 'conjunto_category':
                showCategory(allCards, 'conjunto');
                break;

            default:
                break;
        }
    }
);

buttonCloseDescription.addEventListener('click',
    () => {
        popup.style.display = 'none';
        filterContainer.style.display = 'block';
    }
);

window.addEventListener('click',
    (event) => {
        const eventTarget = event.target;
        const isButtonOpenDescription = (eventTarget.dataset.button === 'open-description');
        if (!isButtonOpenDescription) return;

        popup.style.display = 'block';
        filterContainer.style.display = 'none';
    }
);

window.addEventListener('DOMContentLoaded',
    () => {
        renderImages();
    }
);