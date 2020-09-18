const header = `<div class="container">
                  <h1>To Do List</h1>
                  <div class="todo__header">
                     <input class="todo__input" type="text" placeholder="What are you going to do?">
                     <button class="button__add">Add</button>
                  </div>
                  <ul class="todo__list">
                  </ul>
               </div>`;

document.body.innerHTML = header;

const buttonAdd = document.querySelector('.button__add');
const addInput = document.querySelector('.todo__input');
const toDoList = document.querySelector('.todo__list');

if(localStorage.getItem('todo')) {
  storage = JSON.parse(localStorage.getItem('todo'));

  for (let i = 0; i < storage.length; i++) {
    const list = createTask(storage[i]);
    toDoList.appendChild(list);
    bindTasks(list);
  };
};

function createTask(task) {
  const listItem = document.createElement('li');
  const label = document.createElement('label');
  const input = document.createElement('input');
  const buttonEdit = document.createElement('button');
  const buttonDelete = document.createElement('button');

  label.innerText = task;
  input.type = 'text';
  buttonEdit.classList.add('button__edit');
  buttonEdit.innerHTML = 'Edit';
  buttonDelete.classList.add('button__delete');
  buttonDelete.innerHTML = 'Delete';

  listItem.appendChild(label);
  listItem.appendChild(input);
  listItem.appendChild(buttonEdit);
  listItem.appendChild(buttonDelete);
   
  return listItem;
};

function addTask() {
  if (addInput.value) {
    const item = createTask(addInput.value);
    toDoList.appendChild(item);
    bindTasks(item);
    addInput.value = '';
  };

  save();
};

buttonAdd.addEventListener('click', () => {
  addTask();
});

function deleteTask() {
  const item = this.parentNode;
  toDoList.removeChild(item);
  save();
};

function editTask() {
  const EDIT = 'Edit';
  const SAVE = 'Save';
  const buttonEdit = this;
  const item = this.parentNode;
  const label = item.querySelector('label');
  const input = item.querySelector('input[type="text"]');
  const containsClass = item.classList.contains('editMode');
  
  if (containsClass) {
    label.innerText = input.value;
    buttonEdit.innerHTML = EDIT;
    save();
  } else {
    input.value = label.innerText;
    buttonEdit.innerHTML = SAVE;
  };

  item.classList.toggle('editMode');
};

function bindTasks(listItem) {
  const buttonEdit = listItem.querySelector('.button__edit');
  const buttonDelete = listItem.querySelector('.button__delete');
   
  buttonEdit.addEventListener('click', editTask);
  buttonDelete.addEventListener('click', deleteTask);
};

function save() {
  const tasks = [];

  for (let i = 0; i < toDoList.children.length; i++) {
    tasks.push(toDoList.children[i].getElementsByTagName('label')[0].innerText);
  };

  localStorage.removeItem('todo');
  localStorage.setItem('todo', JSON.stringify(tasks));
};
