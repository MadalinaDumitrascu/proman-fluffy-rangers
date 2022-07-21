import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";


export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        console.log(boards)
        for (let board of boards) {
            const columns = await dataHandler.getStatuses(board.id)

            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content)

            domManager.addEventListener(
                `.board-save-button[data-buttons-board-id='${board.id}']`,
                "click",
                changeBoardTitle)
            domManager.addEventListener(
                `.toggle-board-button[data-buttons-board-id='${board.id}']`,
                "click",
                showHideButtonHandler);
            domManager.addEventListener(
                `.add-new-status[data-buttons-board-id='${board.id}']`,
                "click"
                , addStatus);
            domManager.addEventListener(
                `.delete-board-button[data-buttons-board-id='${board.id}']`,
                "click",
                deleteBoard);

        }


    },
    loadCreateBoard: async function(){ domManager.addEventListener(
                `.add-board`,
                "click",
                showAddNewBoard)
    }
};

async function changeBoardTitle(clickEvent) {
    console.log(clickEvent)
    const boardId = clickEvent.target.dataset.buttonsBoardId;
    console.log(boardId)
    const element = document.querySelector(`.board-container>.board[data-board-id='${boardId}']>.edit-title[data-board-id='${boardId}']`)
    await dataHandler.renameBoard(boardId, element.innerHTML).then()
    window.location = window.location.href
}

function createNewBoard(clickEvent) {
    clickEvent.preventDefault()
    const input = document.querySelector("#title-input")
    const title = input.value

    if (title) {
        const titleNewBoard = {boardTitle: title};
        dataHandler.createBoard(titleNewBoard);
    }

    window.location = window.location.href;
}

function showAddNewBoard() {
    const button = document.querySelector('.add-board')
    if (!button.classList.contains('visible')) {
        button.classList.add('visible')
        domManager.addChild('.add-board-title', htmlFactory(htmlTemplates.boardTitleInput)('title'))
        domManager.addEventListener(`#submit-board`, "click", createNewBoard)
    } else {
        button.classList.remove('visible')
        domManager.removeElement('.board-title-input')

    }
}


function showHideButtonHandler(clickEvent) {
    console.log(clickEvent)
    const boardId = clickEvent.target.dataset.buttonsBoardId
    const button = document.querySelector(`.toggle-board-button[data-buttons-board-id='${boardId}']`)
    if (!button.classList.contains('visible')) {
        button.classList.add('visible')
        cardsManager.loadCards(boardId);
    } else {
        button.classList.remove('visible')
        document.querySelector(`.board[data-board-id='${boardId}']>.board-columns`)
            .innerHTML = ''
    }

}

async function addStatus(clickEvent) {
    const boardId = clickEvent.target.dataset.buttonsBoardId;
    console.log("this is the boardId " + boardId)
    await dataHandler.getStatus(boardId)
    window.location = window.location.href
}



async function deleteBoard(clickEvent) {
    const board_id = clickEvent.target.dataset.buttonsBoardId;
    await dataHandler.deleteBoard(board_id)
    window.location = window.location.href
}