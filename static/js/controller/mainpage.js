import {domManager} from "../view/domManager.js";


export let mainManager = {
    loadMain: async function () {
        const boardBuilder = meniuNewBoardBuilder();
        domManager.addChild("#root", boardBuilder);
    }
};


function meniuNewBoardBuilder() {
    return `
        <button class="add-board">Create new Board</button>
        <div class="add-board-title"></div>
            `
}


