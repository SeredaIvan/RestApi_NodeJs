document.getElementById('get_users_button').addEventListener('click', async () => {
    try {
        const response = await fetch('/users', { method: 'GET' });
        if (!response.ok) throw new Error(await response.text());
        const users = await response.json();
        console.log(users);
        let table = document.getElementById('users_table');
        for (let i = 0; i < users.length; i++) {
            let tr = document.createElement('tr');
            let tdName = document.createElement('td');
            let tdEmail = document.createElement('td');
            let tdPass = document.createElement('td');
            let tdAge = document.createElement('td');
            tdName.innerText = users[i].name;
            tdEmail.innerText = users[i].email;
            tdPass.innerText = users[i].password;
            tdAge.innerText = users[i].age;
            tr.appendChild(tdName);
            tr.appendChild(tdEmail);
            tr.appendChild(tdPass);
            tr.appendChild(tdAge);
            table.appendChild(tr);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});


// Get user by ID
document.getElementById('get_id_user_button').addEventListener('click', async () => {
    const userId = document.getElementById('get_id_user').value;
    try {
        const response = await fetch(`/users/${userId}`, { method: 'GET' });
        if (!response.ok) throw new Error(await response.text());
        const user = await response.json();
        console.log(user);
        let table = document.getElementById('user_table');

        let tr = document.createElement('tr');
        let tdName = document.createElement('td');
        let tdEmail = document.createElement('td');
        let tdPass = document.createElement('td');
        let tdAge = document.createElement('td');
        tdName.innerText = user.name;
        tdEmail.innerText = user.email;
        tdPass.innerText = user.password;
        tdAge.innerText = user.age;
        tr.appendChild(tdName);
        tr.appendChild(tdEmail);
        tr.appendChild(tdPass);
        tr.appendChild(tdAge);
        table.appendChild(tr);

    } catch (error) {
        console.error('Error:', error.message);
    }
});


// Post new user
document.getElementById('post_user_form').addEventListener('submit', postFormUser);

async function postFormUser(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    console.log('Form Data:', jsonData);

    try {
        const response = await fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData)
        });



        if (!response.ok) throw new Error(await response.text());

        const responseData = await response.json();
        console.log(responseData);
        alert("User added successfully");
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Patch user by ID
document.getElementById('patch_user_button').addEventListener('click', async () => {
    const userId = document.getElementById('patch_user').value;

    try {
        const response = await fetch(`/users/${userId}`, { method: 'GET' });
        if (!response.ok) throw new Error(await response.text());

        const user = await response.json();

        document.getElementById('patch_name').value = user.name;
        document.getElementById('patch_age_user').value = user.age;
        document.getElementById('patch_password_user').value = user.password;
        document.getElementById('patch_email_user').value = user.email;

        document.getElementById('patch_user_form').style.display = 'block';
    } catch (error) {
        console.error('Error:', error.message);
    }
});

document.getElementById('patch_user_form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userId = document.getElementById('patch_user').value;

    const patchData = {
        name: document.getElementById('patch_name').value,
        age: document.getElementById('patch_age_user').value,
        password: document.getElementById('patch_password_user').value,
        email: document.getElementById('patch_email_user').value
    };

    try {
        const response = await fetch(`/users/${userId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patchData)
        });

        if (!response.ok) throw new Error(await response.text());

        const responseData = await response.json();
        console.log(responseData);
        alert("User updated successfully");
    } catch (error) {
        console.error('Error:', error.message);
    }
});

// Delete user by ID
document.getElementById('delete_user_by_id_button').addEventListener('click', async () => {
    const userId = document.getElementById('delete_user_by_id').value;

    try {
        const response = await fetch(`/users/${userId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(await response.text());
        alert("User deleted successfully");
    } catch (error) {
        console.error('Error:', error.message);
    }
});

// Delete all users
document.getElementById('delete_users_button').addEventListener('click', async () => {
    try {
        const response = await fetch('/users', { method: 'DELETE' });
        if (!response.ok) throw new Error(await response.text());
        alert("All users deleted successfully");
    } catch (error) {
        console.error('Error:', error.message);
    }
});



//#################################################################################

document.getElementById('get_tasks_button').addEventListener('click', async () => {
    try {
        const response = await fetch('/tasks', { method: 'GET' });
        if (!response.ok) throw new Error(await response.text());
        const tasks = await response.json();
        console.log(tasks);
        let table = document.getElementById('tasks_table');
        for (let i = 0; i < tasks.length; i++) {
            let tr = document.createElement('tr');
            let tdTitle = document.createElement('td');
            let tdDescription = document.createElement('td');
            let tdCompleted = document.createElement('td');

            tdTitle.innerText = tasks[i].title;
            tdDescription.innerText = tasks[i].description;
            tdCompleted.innerText = tasks[i].completed?'Yes':"No";

            tr.appendChild(tdTitle);
            tr.appendChild(tdDescription);
            tr.appendChild(tdCompleted);

            table.appendChild(tr);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});


// Get task by ID
// Get task by ID
document.getElementById('get_id_task_button').addEventListener('click', async () => {
    const taskId = document.getElementById('get_id_task').value;
    try {
        const response = await fetch(`/tasks/${taskId}`, { method: 'GET' });
        if (!response.ok) throw new Error(await response.text());
        const task = await response.json();
        console.log(task);
        let table = document.getElementById('task_table');

        let tr = document.createElement('tr');
        let tdTitle = document.createElement('td');
        let tdDescription = document.createElement('td');
        let tdCompleted = document.createElement('td');

        tdTitle.innerText = task.title;
        tdDescription.innerText = task.description;
        tdCompleted.innerText = task.completed ? 'Yes' : "No";

        tr.appendChild(tdTitle);
        tr.appendChild(tdDescription);
        tr.appendChild(tdCompleted);

        table.appendChild(tr);

    } catch (error) {
        console.error('Error:', error.message);
    }
});



// Post new task
document.getElementById('post_task_form').addEventListener('submit', postFormTask);

async function postFormTask(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    jsonData.completed = e.target.querySelector('#post_comleted_task').checked;

    console.log('Form Data:', jsonData);

    try {
        const response = await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData)
        });

        if (!response.ok) throw new Error(await response.text());

        const responseData = await response.json();
        console.log(responseData);
        alert("Task added successfully");
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Patch user by ID
document.getElementById('patch_task_button').addEventListener('click', async () => {
    const taskId = document.getElementById('patch_task').value;

    try {
        const response = await fetch(`/tasks/${taskId}`, { method: 'GET' });
        if (!response.ok) throw new Error(await response.text());

        const task = await response.json();

        document.getElementById('patch_desciption').value = task.title;
        document.getElementById('patch_title').value = task.description;

        document.getElementById('patch_task_form').style.display = 'block';
    } catch (error) {
        console.error('Error:', error.message);
    }
});

document.getElementById('patch_task_form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const taskId = document.getElementById('patch_task').value;

    const patchData = {
        title: document.getElementById('patch_title').value,
        description: document.getElementById('patch_desciption').value,
        completed: true
    };

    try {
        const response = await fetch(`/tasks/${taskId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patchData)
        });

        if (!response.ok) throw new Error(await response.text());

        const responseData = await response.json();
        console.log(responseData);
        alert("Task updated successfully");
    } catch (error) {
        console.error('Error:', error.message);
    }
});


// Delete task by ID
document.getElementById('delete_task_by_id_button').addEventListener('click', async () => {
    const taskId = document.getElementById('delete_task_by_id').value;

    try {
        const response = await fetch(`/tasks/${taskId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(await response.text());
        alert("Task deleted successfully");
    } catch (error) {
        console.error('Error:', error.message);
    }
});


// Delete all users
document.getElementById('delete_tasks_button').addEventListener('click', async () => {
    try {
        const response = await fetch('/tasks', { method: 'DELETE' });
        if (!response.ok) throw new Error(await response.text());
        alert("All task deleted successfully");
    } catch (error) {
        console.error('Error:', error.message);
    }
});


