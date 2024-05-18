document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.draggable');
    const container = document.querySelector('.container');
    const toggleButton = document.getElementById('toggle-button');
    let dragEnabled = false;

    toggleButton.addEventListener('click', () => {
        dragEnabled = !dragEnabled;
        toggleButton.textContent = dragEnabled ? 'Disable Drag and Drop' : 'Enable Drag and Drop';

        draggables.forEach(draggable => {
            draggable.setAttribute('draggable', dragEnabled);
        });
    });

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => {
            if (!dragEnabled) return;
            e.dataTransfer.setData('text/plain', null); // For Firefox compatibility
            const rect = draggable.getBoundingClientRect();
            draggable.offsetX = e.clientX - rect.left;
            draggable.offsetY = e.clientY - rect.top;
        });

        //drag style px 
        draggable.addEventListener('dragend', (e) => {
            if (!dragEnabled) return;
            const x = e.clientX - draggable.offsetX;
            const y = e.clientY - draggable.offsetY;
            draggable.style.left = `${x}px`;
            draggable.style.top = `${y}px`;
            saveLayout();
        });
    });

    container.addEventListener('dragover', (e) => {
        if (!dragEnabled) return;
        e.preventDefault();
    });

    container.addEventListener('drop', (e) => {
        if (!dragEnabled) return;
        e.preventDefault();
    });


    //save layout
    function saveLayout() {
        const layout = [];
        draggables.forEach(draggable => {
            layout.push({
                content: draggable.innerHTML,
                left: draggable.style.left,
                top: draggable.style.top
            });
        });
        localStorage.setItem('layout', JSON.stringify(layout));
    }

    function loadLayout() {
        const layout = JSON.parse(localStorage.getItem('layout'));
        if (layout) {
            layout.forEach((item, index) => {
                const draggable = draggables[index];
                draggable.innerHTML = item.content;
                draggable.style.left = item.left;
                draggable.style.top = item.top;
            });
        }
    }

    loadLayout();
});
