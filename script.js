class TrelloClone {
    constructor() {
        this.boards = [];
        this.currentBoardId = null;
        this.draggedCard = null;
        this.draggedFromList = null;
        this.init();
    }

    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Board creation
        document.getElementById('addBoardBtn').addEventListener('click', () => this.openBoardModal());
        document.getElementById('createBoardBtn').addEventListener('click', () => this.createBoard());

        // Modal close buttons
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => this.closeModal(e.target.closest('.modal')));
        });

        // Modal window clicks
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeModal(modal);
            });
        });

        // Enter key in inputs
        document.getElementById('boardNameInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.createBoard();
        });

        document.getElementById('listNameInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.createList();
        });

        document.getElementById('cardTitleInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.createCard();
        });
    }

    openBoardModal() {
        document.getElementById('boardModal').style.display = 'block';
        document.getElementById('boardNameInput').value = '';
        document.getElementById('boardNameInput').focus();
    }

    openListModal(boardId) {
        this.currentBoardId = boardId;
        document.getElementById('listModal').style.display = 'block';
        document.getElementById('listNameInput').value = '';
        document.getElementById('listNameInput').focus();
    }

    openCardModal(listId, boardId) {
        this.currentBoardId = boardId;
        this.currentListId = listId;
        document.getElementById('cardModal').style.display = 'block';
        document.getElementById('cardTitleInput').value = '';
        document.getElementById('cardDescInput').value = '';
        document.getElementById('cardTitleInput').focus();
    }

    openEditCardModal(cardId, listId, boardId) {
        const board = this.boards.find(b => b.id === boardId);
        const list = board.lists.find(l => l.id === listId);
        const card = list.cards.find(c => c.id === cardId);

        document.getElementById('editCardModal').style.display = 'block';
        document.getElementById('editCardTitleInput').value = card.title;
        document.getElementById('editCardDescInput').value = card.description || '';

        // Store card info for saving
        this.currentEditCard = { cardId, listId, boardId };

        // Setup save and delete buttons
        document.getElementById('saveCardBtn').onclick = () => this.saveCard();
        document.getElementById('deleteCardBtn').onclick = () => this.deleteCard();
    }

    closeModal(modal) {
        modal.style.display = 'none';
        this.currentBoardId = null;
        this.currentListId = null;
        this.currentEditCard = null;
    }

    createBoard() {
        const input = document.getElementById('boardNameInput');
        const name = input.value.trim();

        if (!name) {
            input.focus();
            return;
        }

        const board = {
            id: Date.now().toString(),
            name: name,
            lists: []
        };

        this.boards.push(board);
        this.saveToStorage();
        this.render();
        this.closeModal(document.getElementById('boardModal'));
    }

    deleteBoard(boardId) {
        if (confirm('Are you sure you want to delete this board?')) {
            this.boards = this.boards.filter(b => b.id !== boardId);
            this.saveToStorage();
            this.render();
        }
    }

    createList() {
        const input = document.getElementById('listNameInput');
        const name = input.value.trim();

        if (!name) {
            input.focus();
            return;
        }

        const board = this.boards.find(b => b.id === this.currentBoardId);
        const list = {
            id: Date.now().toString(),
            name: name,
            cards: []
        };

        board.lists.push(list);
        this.saveToStorage();
        this.render();
        this.closeModal(document.getElementById('listModal'));
    }

    deleteList(boardId, listId) {
        if (confirm('Are you sure you want to delete this list?')) {
            const board = this.boards.find(b => b.id === boardId);
            board.lists = board.lists.filter(l => l.id !== listId);
            this.saveToStorage();
            this.render();
        }
    }

    createCard() {
        const titleInput = document.getElementById('cardTitleInput');
        const descInput = document.getElementById('cardDescInput');
        const title = titleInput.value.trim();

        if (!title) {
            titleInput.focus();
            return;
        }

        const board = this.boards.find(b => b.id === this.currentBoardId);
        const list = board.lists.find(l => l.id === this.currentListId);

        const card = {
            id: Date.now().toString(),
            title: title,
            description: descInput.value.trim()
        };

        list.cards.push(card);
        this.saveToStorage();
        this.render();
        this.closeModal(document.getElementById('cardModal'));
    }

    saveCard() {
        const { cardId, listId, boardId } = this.currentEditCard;
        const title = document.getElementById('editCardTitleInput').value.trim();
        const description = document.getElementById('editCardDescInput').value.trim();

        if (!title) {
            document.getElementById('editCardTitleInput').focus();
            return;
        }

        const board = this.boards.find(b => b.id === boardId);
        const list = board.lists.find(l => l.id === listId);
        const card = list.cards.find(c => c.id === cardId);

        card.title = title;
        card.description = description;

        this.saveToStorage();
        this.render();
        this.closeModal(document.getElementById('editCardModal'));
    }

    deleteCard() {
        const { cardId, listId, boardId } = this.currentEditCard;

        if (confirm('Are you sure you want to delete this card?')) {
            const board = this.boards.find(b => b.id === boardId);
            const list = board.lists.find(l => l.id === listId);
            list.cards = list.cards.filter(c => c.id !== cardId);

            this.saveToStorage();
            this.render();
            this.closeModal(document.getElementById('editCardModal'));
        }
    }

    setupDragAndDrop(card, listId, boardId) {
        card.draggable = true;

        card.addEventListener('dragstart', (e) => {
            this.draggedCard = {
                cardId: card.dataset.cardId,
                listId: listId,
                boardId: boardId
            };
            card.classList.add('dragging');
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
        });
    }

    setupListDropZone(listContainer, listId, boardId) {
        listContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (this.draggedCard) {
                listContainer.classList.add('drag-over');
            }
        });

        listContainer.addEventListener('dragleave', () => {
            listContainer.classList.remove('drag-over');
        });

        listContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            listContainer.classList.remove('drag-over');

            if (this.draggedCard) {
                this.moveCard(this.draggedCard.cardId, this.draggedCard.listId, this.draggedCard.boardId, listId, boardId);
                this.draggedCard = null;
            }
        });
    }

    moveCard(cardId, fromListId, fromBoardId, toListId, toBoardId) {
        if (fromBoardId !== toBoardId) return; // Prevent moving between boards

        const board = this.boards.find(b => b.id === fromBoardId);
        const fromList = board.lists.find(l => l.id === fromListId);
        const toList = board.lists.find(l => l.id === toListId);

        const cardIndex = fromList.cards.findIndex(c => c.id === cardId);
        const card = fromList.cards.splice(cardIndex, 1)[0];

        toList.cards.push(card);
        this.saveToStorage();
        this.render();
    }

    render() {
        const app = document.getElementById('app');

        if (this.boards.length === 0) {
            app.innerHTML = `
                <div class="no-boards">
                    <i class="fas fa-folder-open"></i>
                    <p>No boards yet. Create your first board to get started!</p>
                </div>
            `;
            return;
        }

        app.innerHTML = this.boards.map(board => `
            <div class="board" data-board-id="${board.id}">
                <div class="board-header">
                    <h2 class="board-title">${board.name}</h2>
                    <div class="board-actions">
                        <button class="board-btn" onclick="trello.openListModal('${board.id}')">
                            <i class="fas fa-plus"></i> Add List
                        </button>
                        <button class="board-btn delete" onclick="trello.deleteBoard('${board.id}')">
                            <i class="fas fa-trash"></i> Delete Board
                        </button>
                    </div>
                </div>
                <div class="lists-container">
                    ${board.lists.map(list => `
                        <div class="list">
                            <div class="list-header">
                                <h3 class="list-title">${list.name}</h3>
                                <button class="delete-list-btn" onclick="trello.deleteList('${board.id}', '${list.id}')">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                            <div class="cards-container" data-list-id="${list.id}" data-board-id="${board.id}">
                                ${list.cards.map(card => `
                                    <div class="card"
                                         data-card-id="${card.id}"
                                         onclick="trello.openEditCardModal('${card.id}', '${list.id}', '${board.id}')">
                                        <div class="card-title">${card.title}</div>
                                        ${card.description ? `<div class="card-description">${card.description}</div>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                            <button class="add-card-btn" onclick="trello.openCardModal('${list.id}', '${board.id}')">
                                <i class="fas fa-plus"></i> Add a card
                            </button>
                        </div>
                    `).join('')}
                    <button class="add-list-btn" onclick="trello.openListModal('${board.id}')">
                        <i class="fas fa-plus"></i> Add another list
                    </button>
                </div>
            </div>
        `).join('');

        // Setup drag and drop after rendering
        this.boards.forEach(board => {
            board.lists.forEach(list => {
                const listContainer = document.querySelector(`[data-list-id="${list.id}"][data-board-id="${board.id}"]`);
                this.setupListDropZone(listContainer, list.id, board.id);

                list.cards.forEach(card => {
                    const cardElement = listContainer.querySelector(`[data-card-id="${card.id}"]`);
                    this.setupDragAndDrop(cardElement, list.id, board.id);
                });
            });
        });

        // Setup list modal
        document.getElementById('createListBtn').onclick = () => this.createList();

        // Setup card modal
        document.getElementById('createCardBtn').onclick = () => this.createCard();
    }

    saveToStorage() {
        localStorage.setItem('trello-boards', JSON.stringify(this.boards));
    }

    loadFromStorage() {
        const saved = localStorage.getItem('trello-boards');
        if (saved) {
            this.boards = JSON.parse(saved);
        } else {
            // Create a sample board for demonstration
            this.boards = [
                {
                    id: 'default-board',
                    name: 'Welcome Board',
                    lists: [
                        {
                            id: 'todo',
                            name: 'To Do',
                            cards: [
                                { id: '1', title: 'Welcome to Trello Clone!', description: 'Click on this card to edit or delete it' },
                                { id: '2', title: 'Drag and drop cards', description: 'You can drag cards between lists' }
                            ]
                        },
                        {
                            id: 'doing',
                            name: 'In Progress',
                            cards: []
                        },
                        {
                            id: 'done',
                            name: 'Done',
                            cards: []
                        }
                    ]
                }
            ];
            this.saveToStorage();
        }
    }
}

// Initialize the app
const trello = new TrelloClone();