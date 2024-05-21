import { dataCards as dataCardsDB } from './database/cardsDB.js';

const containerAllCards = document.querySelector('[data-container-all-cards]');
const inputSearch = document.querySelector('[data-input-search]');
const select = document.querySelector('[data-select]');
const popup = document.querySelector('[data-popup-container]');

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
                        <img
                            src="${product.src}" 
                            alt="${product.alt}" 
                            width="${product.width}" 
                            height="${product.height}" 
                            style="top:${product.top}; 
                            left: ${product.left}"
                        />
                    </div>

                    <h3>
                        ${product.title}
                    </h3>

                    <div class="c-card-info">
                        <p>
                            ref: <span>${product.id}</span>
                        </p>
                        
                        <button data-button="open-description">
                            ${product.description}
                        </button>
                    </div>
                </div>
            `;

            containerAllCards.appendChild(element_card);
        }
    );
};

const showCategory = (allCards, productCategory) => {
    if (productCategory === 'all_categories') {
        allCards.forEach(
            (data) => {
                data.style.display = 'block';
            }
        );

    }
    else {
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
    }

    window.scrollTo(
        {
            top: 0,
            behavior: 'smooth',
        }
    );
};

inputSearch.addEventListener('input',
    (event) => {
        select.value = 'Categorias';
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
                showCategory(allCards, 'all_categories');
                break;

            case 'armario_category':
                showCategory(allCards, 'armario');
                break;

            case 'banco_category':
                showCategory(allCards, 'banco');
                break;


            case 'cadeira_category':
                showCategory(allCards, 'cadeira');
                break;

            case 'conjunto_category':
                showCategory(allCards, 'conjunto');
                break;

            case 'mesa_category':
                showCategory(allCards, 'mesa');
                break;

            case 'rack_category':
                showCategory(allCards, 'rack');
                break;

            default:
                break;
        }
    }
);

window.addEventListener('click',
    (event) => {
        const eventTarget = event.target;
        const isButtonCloseDescription=(eventTarget.dataset.button === 'close-description');
        const isButtonOpenDescription = (eventTarget.dataset.button === 'open-description');
        const productId = Number(eventTarget.parentElement.parentElement.parentElement.dataset.id);
        
        if (isButtonOpenDescription) {
            popup.style.display = 'block';

            dataCardsDB.forEach(
                (data) => {
                    if (data.id === productId) {
                        popup.innerHTML = `
                            <div class="c-popup-content">
                                <h2>
                                    Descrição
                                </h2>

                                <p style="font-weight: 500">
                                    Nome: <span>${data.title}</span>
                                </p>
                                
                                <p style="font-weight: 500">
                                    Ref: <span data-ref>${data.id}</span>
                                </p>
                                
                                <p style="font-weight: 500">
                                    Preço: R$<span data-price>${data.price.toFixed(2)}</span>
                                </p>
                                
                                <p style="font-weight: 500">
                                    Largura: <span data-width>0</span>cm²
                                </p>
                                
                                <p style="font-weight: 500">
                                    Altura: <span data-height>0</span>cm²
                                </p>

                                <div class="c-popup-button">
                                    <button data-button="close-description">
                                        Fechar
                                    </button>
                                </div>
                            </div>
                        `;
                    }
                }
            );
        }

        if (isButtonCloseDescription) {
            popup.style.display = 'none';
        }
    }
);

window.addEventListener('DOMContentLoaded',
    () => {
        renderImages();
    }
);