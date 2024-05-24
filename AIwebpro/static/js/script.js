// drag function
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

// note function
function showInput() {
    var noteInputArea = document.getElementById("noteInputArea");
    noteInputArea.style.display = "block";
}

function addNote() {
    var noteInput = document.getElementById("noteInput");
    var noteText = noteInput.value.trim();

    if (noteText !== "") {
        var noteList = document.getElementById("noteList");
        var li = document.createElement("li");
        li.textContent = noteText;

        var editButton = document.createElement("button");
        editButton.textContent = "edit";
        editButton.onclick = function() {
            editNoteText(li);
        };

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.onclick = function() {
            li.remove();
        };

        // add edit and delete button
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        noteList.appendChild(li);

        noteInput.value = "";
    }
}

function editNoteText(noteElement) {
    var newText = prompt("edit note", noteElement.textContent);
    if (newText !== null) {
        noteElement.textContent = newText;

        var editButton = document.createElement("button");
        editButton.textContent = "edit";
        editButton.onclick = function() {
            editNoteText(noteElement);
        };

        noteElement.appendChild(editButton);
        noteElement.appendChild(deleteButton);
    }
}

var deleteButton = document.createElement("button");
deleteButton.textContent = "delete";
deleteButton.onclick = function() {
    this.parentElement.remove();
};
//background color and line color function
var bgColor = localStorage.getItem('bgColor');
if (bgColor) {
    document.body.style.backgroundColor = bgColor;
    document.getElementById("bgColor").value = bgColor;
}

function changeBackgroundColor() {
    var color = document.getElementById("bgColor").value;
    document.body.style.backgroundColor = color;
    
    localStorage.setItem('bgColor', color);
}

function changeLineColor() {
    var color = document.getElementById("lineColor").value;
    var chart_div = document.getElementById("chart_div");
    var svg = chart_div.querySelector('svg');
    var line = svg.querySelector('.js-line');
    line.style.stroke = color;
}

