export let dataHandler = {
    getBoards: async function () {
        return await apiGet("/api/boards");
    },
    createBoard: async function(boardTitle) {
        await apiPost(`/api/create_new_boards/`, boardTitle);
    },
    getStatuses: async function (boardId) {
        // the statuses are retrieved and then the callback function is called with the statuses
        return await apiGet(`/api/statuses/${boardId}`);
    },
    getStatus: async function (boardId) {
        // the status is retrieved and then the callback function is called with the status
        await apiPost(`/api/status/${boardId}`);
    },
    getCardsByBoardId: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}/cards/`);
    },
    deleteCard:async function (card_id){
        return await apiPost(`/api/delete-card/${card_id}`)
    },
    createNewCard: async function (boardId) {
        // creates new card, saves it and calls the callback function with its data
        await apiPost(`/api/new-card/${boardId}`)
    },
    renameBoard: async function(boardId, boardTitle){
        await apiPost(`/api/rename-board-by-id/${boardId}/${boardTitle}`, boardTitle)
    },
    deleteBoard: async function(board_id){
        return await apiPost(`/api/delete-board-by-id/${board_id}`)
    },
    renameCard: async function(card_id,cardTitle){
        await apiPost(`/api/rename-card-by-id/${card_id}/${cardTitle}`, cardTitle)
    },
    renameColumn: async function(status_id,statusTitle){
        await apiPost(`/api/rename-column/${status_id}/${statusTitle}`,statusTitle)
    },
    deleteColumn: async function(statusId){
        await apiPost(`/api/delete-status/${statusId}`,statusId)
    }
};


async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.ok) {
        return await response.json();
    }
}


async function apiPost(url, data) {
    console.log("we are in POst")
    console.log(data +"data")
    const request = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    if (request.ok) {
        return await request.json();
    }
}
