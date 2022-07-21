import {boardsManager} from "./controller/boardsManager.js";
import {mainManager as mainpage} from "./controller/mainpage.js";

function init() {
    mainpage.loadMain();
    boardsManager.loadCreateBoard();
    boardsManager.loadBoards();

}

init();
