export function renderUI() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="max-w-md mx-auto bg-white shadow-lg rounded-lg mt-10">
      <div class="tabs tabs-boxed">
        <button data-tab="active" class="tab flex-1">Активные</button>
        <button data-tab="completed" class="tab flex-1">Завершённые</button>
        <button data-tab="deleted" class="tab flex-1">Удалённые</button>
      </div>
      <div class="p-4">
        <div id="formSection" class="mb-4">
          <input id="taskInput"
                 type="text"
                 class="input input-bordered w-full mb-2"
                 placeholder="Добавить новую задачу" />
          <button id="addBtn" class="btn btn-primary w-full">Добавить</button>
        </div>
        <ul id="taskList" class="space-y-2"></ul>
      </div>
    </div>
  `;

  // state
  const tasks = {
    active:   [],
    completed: [],
    deleted:  []
  };
  let activeTab = 'active';

  // элементы
  const taskInput = document.getElementById('taskInput');
  const addBtn     = document.getElementById('addBtn');
  const taskList   = document.getElementById('taskList');
  const tabs       = document.querySelectorAll('.tab');
  const formSection= document.getElementById('formSection');

  // рендер списка в зависимости от activeTab
  function updateList() {
    taskList.innerHTML = '';
    tasks[activeTab].forEach((text, idx) => {
      const li = document.createElement('li');
      li.className = 'flex justify-between items-center bg-gray-100 p-2 rounded';

      // текст задачи
      const span = document.createElement('span');
      span.textContent = text;

      // контейнер кнопок
      const ctrl = document.createElement('div');
      ctrl.className = 'flex gap-2';

      if (activeTab === 'active') {
        // кнопка «выполнить»
        const done = document.createElement('button');
        done.className = 'btn btn-sm btn-success';
        done.textContent = '✔';
        done.onclick = () => {
          tasks.completed.push(text);
          tasks.active.splice(idx, 1);
          updateList();
        };
        // кнопка «удалить»
        const trash = document.createElement('button');
        trash.className = 'btn btn-sm btn-error';
        trash.textContent = '🗑';
        trash.onclick = () => {
          tasks.deleted.push(text);
          tasks.active.splice(idx, 1);
          updateList();
        };
        ctrl.append(done, trash);

      } else if (activeTab === 'completed') {
        // только кнопка «в корзину»
        const trash = document.createElement('button');
        trash.className = 'btn btn-sm btn-error';
        trash.textContent = '🗑';
        trash.onclick = () => {
          tasks.deleted.push(text);
          tasks.completed.splice(idx, 1);
          updateList();
        };
        ctrl.append(trash);

      } else {
        // deleted: кнопка «восстановить» + «удалить навсегда»
        const restore = document.createElement('button');
        restore.className = 'btn btn-sm btn-warning';
        restore.textContent = '↺';
        restore.onclick = () => {
          tasks.active.push(text);
          tasks.deleted.splice(idx, 1);
          updateList();
        };
        const delForever = document.createElement('button');
        delForever.className = 'btn btn-sm btn-error';
        delForever.textContent = '✖';
        delForever.onclick = () => {
          tasks.deleted.splice(idx, 1);
          updateList();
        };
        ctrl.append(restore, delForever);
      }

      li.append(span, ctrl);
      taskList.append(li);
    });
  }

  // добавление новой задачи
  addBtn.onclick = () => {
    const text = taskInput.value.trim();
    if (!text) return;
    tasks.active.push(text);
    taskInput.value = '';
    if (activeTab === 'active') updateList();
  };

  // переключение табов
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      activeTab = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('tab-active'));
      tab.classList.add('tab-active');

      // прячем форму добавления не-в «active»
      if (activeTab === 'active') {
        formSection.classList.remove('hidden');
      } else {
        formSection.classList.add('hidden');
      }

      updateList();
    });
  });

  // активируем первый таб
  tabs[0].click();
}

