import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";


export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        const columns = await dataHandler.getStatuses(boardId);
        const columnsContainer = `.board-columns[data-board-id="${boardId}"]`;
        for (let column of columns) {
            const columnBuilder = htmlFactory(htmlTemplates.column);
            const colContent = columnBuilder(column);
            domManager.addChild(columnsContainer, colContent);
            domManager.addEventListener(
                `.column-remove[data-status-id="${column.id}"]`,
                "click",
                async function () {
                    await columnRemove(column.id);
                });
            domManager.addEventListener(`.delete-column[data-status-id="${column.id}"]`,"click",deleteColumn)
            domManager.addEventListener(`.rename-column[data-status-id="${column.id}"]`,
                    'click', renameColumn)
        }
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            domManager.addChild(`.board-column-content`, content);
            domManager.addEventListener(
                `.card-accept[data-card-id="${card.id}"]`,
                "click",
                EditTextCard)
            domManager.addEventListener(
                `.card-errase[data-card-id="${card.id}"]`,
                "click",
                deleteCard
            );
        }
        domManager.addEventListener(
                `.add-new-card[data-buttons-board-id="${boardId}"]`,
                "click",
                createNewCard
            );
    }
};


async function deleteColumn(clickEvent){
    const column_id = clickEvent.target.dataset.statusId;
    await dataHandler.deleteColumn(column_id)
    window.location = window.location.href
}


async function createNewCard(clickEvent){
    await dataHandler.createNewCard(clickEvent.target.dataset.buttonsBoardId)
    console.log(ok)
    window.location = window.location.href;
}


async function deleteCard(clickEvent){
    const card_id = clickEvent.target.dataset.cardId;
    domManager.removeElement(`.card[data-card-id="${card_id}"]`)
    await dataHandler.deleteCard(card_id)
}


async function EditTextCard(focus){
    const card_id = focus.target.parentElement.dataset.cardId
    const element = document.querySelector(`.card[data-card-id="${card_id}"]>span`)
    const cardTitle = element.innerHTML
    await dataHandler.renameCard(card_id,cardTitle).then()
    window.location = window.location.href
}

async function renameColumn(clickEvent) {
    console.log(clickEvent)
    const status_id = clickEvent.target.dataset.statusId;
    console.log(status_id)
    const element = document.querySelector(`.board-column-title[data-status-id="${status_id}"]>.column-title>span`)
    console.log(element)
    await dataHandler.renameColumn(status_id,element.innerText)
    window.location = window.location.href
}