'use strict';

{
  const newComment = document.getElementById('new-comment');
  const btnAdd = document.getElementById('btn-add');

  const tbody = document.querySelector('tbody');

  const tasks = [];

  //状態ボタンの作成
  function createStatusBtn() {
    const statusBtn = document.createElement('button');
    statusBtn.textContent = '作業中';
    statusBtn.classList.add('status');
    return statusBtn;
  }

  //削除ボタンの作成
  function createDeleteBtn() {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '削除';

    //削除ボタンが押された時の処理
    deleteBtn.addEventListener('click', e => {
      deleteTask(e.target);
    });

    return deleteBtn;
  }

  //新規タスクの追加
  function addNewTask() {
    //input要素の中身が空の場合は、処理をしない
    if (newComment.value === '') {
      return;
    }  

    tasks.push({
      id: tasks.length,
      comment: newComment.value,
      status: '作業中',
    });  

    //追加されたタスク（最後尾にある配列）をHTML上で表示する
    const tr = document.createElement('tr');
    tbody.appendChild(tr);

    for (let i = 0; i < 4; i++) {
      const td = document.createElement('td');
      tr.appendChild(td);
    }  

    const td1 = tr.children[0];
    td1.textContent = tasks[tasks.length - 1].id;

    const td2 = tr.children[1];
    td2.textContent = tasks[tasks.length - 1].comment;

    const td3 = tr.children[2];
    const statusBtn = createStatusBtn();
    td3.appendChild(statusBtn);

    const td4 = tr.children[3];
    const deleteBtn = createDeleteBtn();
    td4.appendChild(deleteBtn);

    //input要素の中身を空にする
    newComment.value = '';
  }  

  function deleteTask(pushedBtn) {
    //押された削除ボタンに対応するタスクのidを取得し、該当のタスクを削除する
    const targetTr = pushedBtn.parentNode.parentNode;
    const targetId = targetTr.firstElementChild.textContent;
    tasks.splice(targetId, 1);

    //一旦、tbodyの中身を全削除し、新たにidを振り直し、残っている全てのタスクを表示する。
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
      td3.appendChild(statusBtn);

      const td4 = tr.children[3];
      const deleteBtn = createDeleteBtn();
      td4.appendChild(deleteBtn);
    });  
  }  


  btnAdd.addEventListener('click', () => {
    addNewTask();
  });

}