document.getElementById('add-task').addEventListener('click', function() {
    const taskName = document.getElementById('task-name').value;
    const taskDeadline = document.getElementById('task-deadline').value;
    const taskPriority = document.getElementById('task-priority').value;
    const taskCategory = document.getElementById('task-category').value;

    if (taskName && taskDeadline && taskPriority && taskCategory) {
        const taskList = document.getElementById('task-list');
        let categoryDiv = document.querySelector(`div[data-category="${taskCategory}"]`);

        if (!categoryDiv) {
            categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category');
            categoryDiv.setAttribute('data-category', taskCategory);
            categoryDiv.innerHTML = `<h2>${taskCategory}</h2>`;
            taskList.appendChild(categoryDiv);
        }

        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task', `${taskPriority}-priority`);
        taskDiv.innerHTML = `
            <div>
                <input type="checkbox" onclick="toggleTask(this)">
                <p><strong>Task:</strong> ${taskName}</p>
                <p><strong>Deadline:</strong> ${taskDeadline}</p>
                <p><strong>Priority:</strong> ${taskPriority.charAt(0).toUpperCase() + taskPriority.slice(1)}</p>
                <p><strong>Label:</strong> ${taskCategory}</p>
            </div>
            <button onclick="removeTask(this)">Remove</button>
        `;

        categoryDiv.appendChild(taskDiv);

        // Clear form fields
        document.getElementById('task-name').value = '';
        document.getElementById('task-deadline').value = '';
        document.getElementById('task-priority').value = 'high';
        document.getElementById('task-category').value = 'Planning and Research';

        updateProgress();
    } else {
        alert('Please fill in all fields.');
    }
});

function removeTask(button) {
    const taskDiv = button.parentElement;
    const categoryDiv = taskDiv.parentElement;
    taskDiv.remove();

    if (!categoryDiv.querySelector('.task')) {
        categoryDiv.remove();
    }

    updateProgress();
}

function toggleTask(checkbox) {
    const taskDiv = checkbox.parentElement.parentElement;
    taskDiv.classList.toggle('completed');

    updateProgress();
}

function updateProgress() {
    const tasks = document.querySelectorAll('.task');
    const completedTasks = document.querySelectorAll('.task.completed');
    const progress = document.getElementById('progress-bar');
    const progressPercent = document.getElementById('progress-percent');

    const totalTasks = tasks.length;
    const totalCompleted = completedTasks.length;

    const percentComplete = totalTasks === 0 ? 0 : (totalCompleted / totalTasks) * 100;

    progress.value = percentComplete;
    progressPercent.textContent = `${Math.round(percentComplete)}%`;
}
