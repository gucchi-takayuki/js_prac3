'use strict';
{
  const newComment = document.getElementById('new-comment');
  const btnAdd = document.getElementById('btn-add');

  const radioDisplay = document.getElementById('radio_display');
  const radioNodeList = radioDisplay.status;

  const tbody = document.querySelector('tbody');

  const tasks = [];


  //一旦、tbodyの中身を全削除し、新たにidを振り直し、全てのタスクを表示する。
  const showTasks = () => {

    tbody.innerHTML = '';

    tasks.forEach((task, index) => {
      const tr = document.createElement('tr');
      tbody.appendChild(tr);

      for (let i = 0; i < 4; i++) {
        const td = document.createElement('td');
        tr.appendChild(td);
      }

      const td1 = tr.children[0];
      td1.textContent = index;

      const td2 = tr.children[1];
      td2.textContent = task.comment;

      const td3 = tr.children[2];
      const statusBtn = createStatusBtn();
      statusBtn.textContent = task.status;
      td3.appendChild(statusBtn);

      const td4 = tr.children[3];
      const deleteBtn = createDeleteBtn();
      td4.appendChild(deleteBtn);

      if (task.status === '作業中') {
        tr.classList.remove('finish');
      } else {
        tr.classList.add('finish');
      }

      switchDisplay(radioNodeList.value);

    });
  }

  //状態ボタンの作成
  const createStatusBtn = () => {
    const statusBtn = document.createElement('button');

    //状態ボタンが押された時の処理
    statusBtn.addEventListener('click', e => {
      changeStatus(e.target);
    });
    return statusBtn;
  }


  //削除ボタンの作成
  const createDeleteBtn = () => {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '削除';

    //削除ボタンが押された時の処理
    deleteBtn.addEventListener('click', e => {
      deleteTask(e.target);
    });
    return deleteBtn;
  }


  //タスク削除機能
  const deleteTask = pushedBtn => {
    //押された削除ボタンに対応するタスクのidを取得し、該当のタスクを削除する
    const targetTr = pushedBtn.parentNode.parentNode;
    const targetId = targetTr.firstElementChild.textContent;
    tasks.splice(targetId, 1);

    showTasks();
  }


  //タスク状態の変更機能
  const changeStatus = pushedBtn => {
    //押されたボタンに対応するタスクのidを取得し、該当のタスクの状態を変更する
    const targetTr = pushedBtn.parentNode.parentNode;
    const targetId = targetTr.firstElementChild.textContent;

    if (tasks[targetId].status === '作業中') {
      tasks[targetId].status = '完了';
    } else if (tasks[targetId].status === '完了') {
      tasks[targetId].status = '作業中';
      targetTr.classList.remove('finish');
    }

    showTasks();
  }


  // タスク表示・非表示切り替え機能
  const switchDisplay = radioValue => {

    const trs = document.querySelectorAll('tbody tr');
    const finishes = document.querySelectorAll('.finish');

    if (radioValue === 'working') {
      trs.forEach(tr => {
        tr.style.display = '';
      });

      finishes.forEach(finish => {
        finish.style.display = 'none';
      });

    } else if (radioValue === 'finish') {
      trs.forEach(tr => {
        tr.style.display = 'none';
      });

      finishes.forEach(finish => {
        finish.style.display = '';
      });

    } else {
      trs.forEach(tr => {
        tr.style.display = '';
      });
    }
  }


  // タスクの新規追加発火
  btnAdd.addEventListener('click', () => {
    if (newComment.value === '') {
      return;
    }

    tasks.push({
      id: tasks.length,
      comment: newComment.value,
      status: '作業中',
    });

    showTasks();

    newComment.value = '';
  });

   // ラジオボタン操作時、タスク表示・非表示切り替え発火
   radio_display.addEventListener('change', e => {
    switchDisplay(e.target.value);
  });

}