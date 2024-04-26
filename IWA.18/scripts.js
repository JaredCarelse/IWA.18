// scripts.js

/**
 * A handler that fires when a user drags over any element inside a column. In
 * order to determine which column the user is dragging over the entire event
 * bubble path is checked with `event.path` (or `event.composedPath()` for
 * browsers that don't support `event.path`). The bubbling path is looped over
 * until an element with a `data-area` attribute is found. Once found both the
 * active dragging column is set in the `state` object in "data.js" and the HTML
 * is updated to reflect the new column.
 *
 * @param {Event} event
 */
const handleDragOver = (event) => {
    event.preventDefault();
    const path = event.path || event.composedPath();
    let column = null;

    for (const element of path) {
        const { area } = element.dataset;
        if (area) {
            column = area;
            break;
        }
    }

    if (!column) return;
    updateDragging({ over: column });
    updateDraggingHtml({ over: column });
};

const handleDragStart = (event) => {};
const handleDragEnd = (event) => {};

const handleHelpToggle = (event) => {
    const helpOverlay = document.querySelector('.help-overlay');
    helpOverlay.classList.toggle('show');

    if (helpOverlay.classList.contains('show')) {
        helpOverlay.focus();
    } else {
        document.querySelector('.add-order-btn').focus();
    }
};

const handleAddToggle = (event) => {
    const addOverlay = document.querySelector('.add-overlay');
    addOverlay.classList.toggle('show');

    if (addOverlay.classList.contains('show')) {
        addOverlay.querySelector('.order-text').value = '';
        addOverlay.querySelector('.order-table').value = '';
        addOverlay.querySelector('.order-text').focus();
    } else {
        document.querySelector('.add-order-btn').focus();
    }
};

const handleAddSubmit = (event) => {
    event.preventDefault();
    handleAddToggle();
    // Add new order logic here
};

const handleEditToggle = (event) => {
    const editOverlay = document.querySelector('.edit-overlay');
    editOverlay.classList.toggle('show');

    if (editOverlay.classList.contains('show')) {
        editOverlay.querySelector('.order-text').value = '';
        editOverlay.querySelector('.order-table').value = '';
        editOverlay.querySelector('.order-text').focus();
    } else {
        document.querySelector('.add-order-btn').focus();
    }
};

const handleEditSubmit = (event) => {
    event.preventDefault();
    handleEditToggle();
    // Update order logic here
};

const handleDelete = (event) => {
    handleEditToggle();
    // Delete order logic here
};

document.querySelector('.add-order-btn').addEventListener('click', handleAddToggle);
document.querySelector('.help-btn').addEventListener('click', handleHelpToggle);
document.querySelector('.help-close-btn').addEventListener('click', handleHelpToggle);
document.querySelector('.add-cancel-btn').addEventListener('click', handleAddToggle);
document.querySelector('.add-submit-btn').addEventListener('click', handleAddSubmit);
document.querySelector('.edit-cancel-btn').addEventListener('click', handleEditToggle);
document.querySelector('.edit-submit-btn').addEventListener('click', handleEditSubmit);
document.querySelector('.edit-delete-btn').addEventListener('click', handleDelete);

for (const htmlColumn of Object.values(html.columns)) {
    htmlColumn.addEventListener('dragstart', handleDragStart);
    htmlColumn.addEventListener('dragend', handleDragEnd);
}

for (const htmlArea of Object.values(html.area)) {
    htmlArea.addEventListener('dragover', handleDragOver);
}
