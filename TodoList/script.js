let tasks = [];

let taskInput = document.getElementById("taskInput");
let newTaskBtn = document.getElementById("newTask");
let taskList = document.getElementById("taskList");

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    addTask(taskInput.value.trim());
});

// Add a new Task
function addTask(taskText){

    if(taskText === ""){
        return;
    }
    
    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    taskInput.value = "";

    displayTasks();
    saveTask();
    updateProgress();
}

// Display task onto the screen 
function displayTasks(){
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task-item";

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleComplete(${index})">
            <div class="task-text">${task.text}</div>
            <div class="task-action">
                <button onclick="editTask(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        taskList.append(li);

    });
}

// Toggle completed task
function toggleComplete(index){
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
    saveTask();
    updateProgress();
}

// Delete Task 
function deleteTask(index){
    tasks.splice(index, 1);
    displayTasks();
    saveTask();
    updateProgress();
}

// Edit Task 
function editTask(index){

    const li = taskList.children[index];
    const textDiv = li.querySelector(".task-text");

    textDiv.setAttribute("contentEditable", "true");
    textDiv.focus();

    textDiv.addEventListener("keydown", function(e){
        if(e.key === "Enter"){
            e.preventDefault();
            const updated = textDiv.textContent.trim();
            if(updated !== ""){
                tasks[index].text = updated;
            }
            textDiv.removeAttribute("contentEditable");
            displayTasks();
            saveTask();
            updateProgress();
        }
    });

    textDiv.addEventListener("blur", function(){
        const updated = textDiv.textContent.trim();
        if(updated !== ""){
            tasks[index].text = updated;
        }
        textDiv.removeAttribute("contentEditable");
        displayTasks();
        saveTask();
        updateProgress();
    });
}

// Save Tasks
function saveTask(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load Tasks
function loadTasks(){
    const savedTasks = localStorage.getItem("tasks");
    if(savedTasks){
        tasks = JSON.parse(savedTasks);
        displayTasks();
    }
}

const blaskConfetti = () => {
  const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}

// Update Pogress 
function updateProgress(){
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;

    const numbersDiv = document.getElementById("numbers");
    numbersDiv.textContent = `${completed} / ${total}`;

    const progress = document.getElementById("progress");
    const percent = total > 0 ? (completed / total) * 100 : 0;
    progress.style.width = `${percent}%`;

    if(total > 0 && completed === total){
        blaskConfetti();
    }
}

loadTasks();
updateProgress();