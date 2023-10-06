const sideMenu = document.querySelector("aside");
const profileBtn = document.querySelector("#profile-btn");
const themeToggler = document.querySelector(".theme-toggler");
const nextDay = document.getElementById('nextDay');
const prevDay = document.getElementById('prevDay');

profileBtn.onclick = function() {
    sideMenu.classList.toggle('active');
}
window.onscroll = () => {
    sideMenu.classList.remove('active');
    if(window.scrollY > 0){document.querySelector('header').classList.add('active');}
    else{document.querySelector('header').classList.remove('active');}
}

themeToggler.onclick = function() {
    document.body.classList.toggle('dark-theme');
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active')
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active')
}

let setData = (day) =>{
    document.querySelector('table tbody').innerHTML = ' '; //To clear out previous table data;  
    let daylist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    document.querySelector('.timetable div h2').innerHTML = daylist[day];
    switch(day){
        case(0): day = Sunday; break;
        case(1): day = Monday; break;
        case(2): day = Tuesday; break;
        case(3): day = Wednesday; break;
        case(4): day = Thursday; break;
        case(5): day = Friday; break;
        case(6): day = Saturday; break;
    }

    day.forEach(sub => {
        const tr = document.createElement('tr');
        const trContent = `
                            <td>${sub.time}</td>
                            <td>${sub.roomNumber}</td>
                            <td>${sub.subject}</td>
                            <td>${sub.type}</td>
                        `
        tr.innerHTML = trContent;
        document.querySelector('table tbody').appendChild(tr)                        
    });
}

let now = new Date();
let today = now.getDay(); // Will return the present day in numerical value; 
let day = today; //To prevent the today value from changing;

function timeTableAll(){
    document.getElementById('timetable').classList.toggle('active');
    setData(today);
    document.querySelector('.timetable div h2').innerHTML = "Today's Timetable";
}
nextDay.onclick = function() {
    day<=5 ? day++ : day=0;  // If else one liner
    setData(day);
}
prevDay.onclick = function() {
    day>=1 ? day-- : day=6;    
    setData(day);
}

setData(day); //To set the data in the table on loading window.
document.querySelector('.timetable div h2').innerHTML = "Today's Timetable"; //To prevent overwriting the heading on loading;
const dakika = document.getElementById("dakika");
const saniye = document.getElementById("saniye");

// Kutucuklar
const secilenDk = document.getElementById("secilen-dk");
const secilenSn = document.getElementById("secilen-sn");

// Butonlar
const baslatButonu = document.getElementById("baslat");
const sıfırlaButonu = document.getElementById("sıfırla");

let dur = false;

secilenDk.addEventListener("change", () => {
  dakika.textContent = secilenDk.value;
});

secilenSn.addEventListener("change", () => {
  saniye.textContent =
    secilenSn.value < 10 ? "0" + secilenSn.value : secilenSn.value;
});

baslatButonu.addEventListener("click", startTimer);

sıfırlaButonu.addEventListener("click", () => {
  dur = true;
  dakika.textContent = "00";
  saniye.textContent = "00";
  secilenDk.value = "00";
  secilenSn.value = "00";
});

function startTimer() {
  let dk = dakika.textContent;
  let sn = saniye.textContent;

  const interval = setInterval(() => {
    sn--;
    sn = sn < 10 ? "0" + sn : sn;
    if (sn == "0-1") {
      dk--;
      sn = 59;
    }
    if ((dk == 0 && sn == 0) || (dk == 0 && sn == 0)) {
      clearInterval(interval);
      window.alert("Süre doldu");
      secilenDk.value = "00";
      secilenSn.value = "00";
    }
    if (dur) {
      clearInterval(interval);
      return;
    }

    dakika.textContent = dk;
    saniye.textContent = sn;
  }, 1000);
}
const form = document.querySelector(".todo_form");
const input = document.querySelector(".todo_input");
const todo_container = document.querySelector(".todo_container");

const startConf = () => {
   // baslangic ayarlari
   const todos = JSON.parse(localStorage.getItem("todos"));
   if (!todos) {
      localStorage.setItem("todos", JSON.stringify([]));
   } else {
      todos.forEach(todo => {
         addHTML(todo);
      });
   } 
}

const addTodo = (e) => {
   e.preventDefault();
   
   const inputVal = input.value;

   if (inputVal == '')  { // boş değer girilmeye çalışıyor ise hata veriyoruz
      input.style.border = '1px solid tomato';
      setTimeout(() => {
         input.style.borderColor = 'transparent';
      }, 2500);
      return false;
   }

   const todo = {
      text: inputVal,
      isCompleted: false,
   };

   const todos = JSON.parse(localStorage.getItem("todos"));
   todos.push(todo);
   localStorage.setItem("todos", JSON.stringify(todos));

   addHTML(todo);

   form.reset();
}

const deleteTodo = (e) => {
   const todo = e.target.parentElement.parentElement;
   const text = todo.firstChild.children[1].textContent;

   let todos = JSON.parse(localStorage.getItem("todos"));
   todos = todos.filter(td => td.text != text);
   localStorage.setItem("todos", JSON.stringify(todos));

   todo.remove();
}

const completeTodo = (e) => {
   const todo = e.target.parentElement.parentElement;
   const text = todo.firstChild.children[1].textContent;

   let todos = JSON.parse(localStorage.getItem("todos"));
   
   todos.forEach(td => {
      if (td.text === text) td.isCompleted = !td.isCompleted 
   });

   localStorage.setItem("todos", JSON.stringify(todos));
}

const saveTodo = (e) => {
   const todo = e.target.parentElement.parentElement;
   const prevText = todo.firstChild.children[1].textContent; // değiştirilmeden önceki değer
   const newText = todo.firstChild.children[2].value; // editlerken girdiğimiz yeni değer

   let todos = JSON.parse(localStorage.getItem("todos"));
   
   todos.forEach(td => {
      if (td.text === prevText) td.text = newText;
   });

   localStorage.setItem("todos", JSON.stringify(todos));

   todo.firstChild.children[1].textContent = newText;  // HTML üzerindeki değerini de değiştiriyoruz

   todo.classList.remove("-edited"); // verdiğimiz classı kaldırıyoruz
}

const editTodo = (e) => {
   const todo = e.target.parentElement.parentElement;
   todo.classList.add("-edited");
}

const addHTML = (todo) => {
   const todoDiv = document.createElement("div");
   todoDiv.classList.add("todo");

   const todoLeft = document.createElement("div");
   todoLeft.classList.add("todo_left");
   
   const editInput = document.createElement("input");
   editInput.classList.add("todo_editInput")
   editInput.defaultValue = todo.text;

   const todoCb = document.createElement("input");
   todoCb.type = "checkbox";
   todoCb.checked = todo.isCompleted; 
   todoCb.classList.add("todo_cb");
   todoCb.addEventListener("click", completeTodo); // direkt olustururken veriyoruz event listenerlari

   const todoText = document.createElement("span");
   todoText.classList.add("todo_text");
   todoText.textContent = todo.text;

   todoLeft.appendChild(todoCb);
   todoLeft.appendChild(todoText);
   todoLeft.appendChild(editInput);

   const todoRight = document.createElement("div");
   todoRight.classList.add("todo_right");

   const deleteBtn = document.createElement("button");
   deleteBtn.classList.add("todo_delete");
   deleteBtn.textContent = "Delete";
   deleteBtn.addEventListener("click", deleteTodo); // direkt olustururken veriyoruz event listenerlari
   
   const editBtn = document.createElement("button");
   editBtn.classList.add("todo_edit");
   editBtn.textContent = "Edit";
   editBtn.addEventListener("click", editTodo); // direkt olustururken veriyoruz event listenerlari
   
   const saveBtn = document.createElement("button");
   saveBtn.classList.add("todo_save");
   saveBtn.textContent = "Save";
   saveBtn.addEventListener("click", saveTodo);

   todoRight.appendChild(deleteBtn);
   todoRight.appendChild(editBtn);
   todoRight.appendChild(saveBtn);

   todoDiv.appendChild(todoLeft);
   todoDiv.appendChild(todoRight);

   todo_container.appendChild(todoDiv);
}

startConf();

form.addEventListener("submit", addTodo);