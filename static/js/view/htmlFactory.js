export const htmlTemplates = {
    board: 1,
    card: 2,
    boardTitleInput: 3,
    column: 4,
}


export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.boardTitleInput]: boardTitleInputBuilder,
    [htmlTemplates.column]: columnBuilder,
};


export function htmlFactory(template) {
    if (builderFunctions.hasOwnProperty(template)) {
        return builderFunctions[template];
    }
    console.error("Undefined template: " + template);
    return () => {
        return "";
    };
}


function boardBuilder(board) {
    return `
        <div class="board-container">
            <div class="board" data-board-id='${board.id}'>
                <span class="edit-title" contenteditable="true" data-board-id='${board.id}'>${board.title}</span>
                <div class="board-columns" data-board-id='${board.id}'></div>
            </div>
            <div class="board_buttons">
                <button class="board-save-button" data-buttons-board-id='${board.id}'>Save</button>
                <button class="add-new-card" data-buttons-board-id='${board.id}'>New card</button>
                <button class="add-new-status" data-buttons-board-id='${board.id}'>New status</button>
                <button class="delete-board-button" data-buttons-board-id='${board.id}'>Delete Board</button>
                <button class="toggle-archive-button" data-buttons-board-id='${board.id}'>Show Archive</button>
                <button class="toggle-board-button" data-buttons-board-id='${board.id}'>Show Cards</button>
            </div>
        </div>`
}
function cardBuilder(card) {
    return `
        <div class="card" draggable="true" data-card-id="${card.id}">
            <span contenteditable="true">${card.title}</span>
            <button class="card-accept" data-card-id="${card.id}">+</button>
            <button class="card-errase" data-card-id="${card.id}">-</button>
        </div>`;
}


function columnBuilder(column) {
    return `<div class="board-column">
                <div class="board-column-title" data-status-id="${column.id}">
                    <div class="column-title">
                        <span contenteditable="true">${column.title}</span>
                        <button class="rename-column" data-status-id="${column.id}">Save</button>
                        <button class="delete-column" data-status-id="${column.id}">Delete</button>
                    </div>
                    <span class="column-remove" data-status-id="${column.id}"><i class="fas fa-trash-alt"></i></span>
                    <div class="board-column-content"></div>
                </div>
            </div>`;
}


function boardTitleInputBuilder(title) {
    return `<div class="board-title-input">
                <input type="text" name="${title}" id="title-input">
                <button id="submit-board">Save</button>            
        </div>`
}
