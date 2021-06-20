'use strict'; 

{
  const tasks = [];

  document.getElementById('btn').addEventListener('click', () => {
    const comment = document.getElementById('comment').value;
    tasks.push(comment);

    const taskId = tasks.indexOf(comment);

    const tr = document.createElement('tr');
    const tbody = document.querySelector('tbody');
    tbody.appendChild(tr);
  
    
    const td1 = document.createElement('td');
    td1.textContent = taskId;
    tr.appendChild(td1);

    const td2 = document.createElement('td');
    td2.textContent = tasks[taskId];
    tr.appendChild(td2);
    
    const td3 = document.createElement('td');
    tr.appendChild(td3);
    const doingBtn = document.createElement('button'); 
    doingBtn.textContent = '作業中';
    td3.appendChild(doingBtn);
    
    const td4 = document.createElement('td');
    tr.appendChild(td4);
    const deleteBtn = document.createElement('button'); 
    deleteBtn.textContent = '削除';
    td4.appendChild(deleteBtn);

    document.getElementById('comment').value = '';


    // 以下、ループ処理を使ってtdとtrの作成を試みたが、失敗。
    // const tableRow = [];
    // tableRow.push(taskId);
    // tableRow.push(tasks[taskId]);
    // tableRow.push(document.createElement('button').textContent = '作業中');
    // tableRow.push(document.createElement('button').textContent = '削除');

    // tableRow.forEach( item => {
    //   const td = document.createElement('td');
    //   td.textContent = item;
    //   tr.appendChild(td);
    // });
    

  });
}