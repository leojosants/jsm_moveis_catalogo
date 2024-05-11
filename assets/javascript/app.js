import { dataCards } from './database/cardsDB.js';

const containerAllCards = document.querySelector('[data-container-all-cards]');
const inputSearch = document.querySelector('[data-input-search]');
const select = document.querySelector('[data-select]');

const renderImages = () => {
    dataCards.map(
        (product) => {
            const element_card = document.createElement('div');

            element_card.classList.add('c-card');
            element_card.setAttribute('data-cards', '');
            element_card.setAttribute('data-category', product.category);
            element_card.setAttribute('data-id', product.id);

            element_card.innerHTML = `
            <div>
                <img class="c-post-img" src="${product.src}" alt="${product.alt}"/>
            </div>

            <h3 style="margin-bottom: 1rem">${product.title}</h3>
            
            <span>ref: ${product.id}</span> 

            <div class="c-card-info">
                <span>R$${product.price}</span>
                <button>${product.description}</button>
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




// window.addEventListener('click',
//     (event) => {
//         const eventTarget = event.target;
//         const filteredCategory = eventTarget.dataset.filter;
//         const allCards = document.querySelectorAll('[data-cards]');

//         switch (filteredCategory) {
//             case 'all_categories':
//                 allCards.forEach(
//                     (data) => {
//                         data.style.display = 'block';
//                     }
//                 );
//                 break;

//             case 'mesa_category':
//                 showCategory(allCards, 'mesa');
//                 break;

//             case 'cadeira_category':
//                 showCategory(allCards, 'cadeira');
//                 break;

//             case 'cama_category':
//                 showCategory(allCards, 'cama');
//                 break;

//             case 'armario_category':
//                 showCategory(allCards, 'armario');
//                 break;

//             case 'banco_category':
//                 showCategory(allCards, 'banco');
//                 break;

//             case 'mesa_com_cadeira_category':
//                 showCategory(allCards, 'mesa_com_cadeira');
//                 break;

//             default:
//                 break;
//         }
//     }
// );

window.addEventListener('DOMContentLoaded',
    () => {
        renderImages();
    }
);