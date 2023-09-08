const todoListObjects = JSON.parse(localStorage.getItem("todoList")) || [];
const todoList = document.querySelector("#todo-list");
const input = document.querySelector("#thing-to-do");

const checkCompletion = document.querySelector('input[type="checkbox"]');

const TODO_KEY = "todoList";
const form = document.querySelector("#add-todo");

if (todoListObjects) {
  for (let i = 0; i < todoListObjects.length; i++) {
    const savedList = document.createElement("li");

    const parsedBtn = document.createElement("button");
    const parsedCheckbox = document.createElement("input");

    parsedCheckbox.type = "checkbox";
    parsedCheckbox.checked =
      todoListObjects[i].class === "completed" ? true : false;

    parsedBtn.innerText = "remove";
    savedList.innerText = todoListObjects[i].thing;
    savedList.className = todoListObjects[i].class;
    savedList.appendChild(parsedCheckbox);
    savedList.appendChild(parsedBtn);

    todoList.appendChild(savedList);

    parsedCheckbox.addEventListener("click", function (e) {
      if (parsedCheckbox.checked) {
        e.target.parentElement.className = "completed";

        let thingName = e.target.parentElement.innerText.replace("remove", "");
        const objIndex = todoListObjects.findIndex(
          ({ thing }) => thing === thingName
        );

        todoListObjects[objIndex].class = "completed";
      } else if (!parsedCheckbox.checked) {
        e.target.parentElement.className = "";

        let thingName = e.target.parentElement.innerText.replace("remove", "");
        const objIndex = todoListObjects.findIndex(
          ({ thing }) => thing === thingName
        );

        todoListObjects[objIndex].class = "";
      }
      localStorage.setItem(TODO_KEY, JSON.stringify(todoListObjects));
    });
  }
}

//const removeBtns = document.querySelectorAll('.remove-btn');

// for (let btn of removeBtn) {
//   btn.addEventListener("click", function (e) {
//     e.target.parentElement.remove();
//   });
// }
/*
<li>
          <input type="checkbox" id="check" />walmart<button>remove</button>
        </li>
        */

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const newTodo = document.createElement("li");
  console.log(newTodo);
  const newBtn = document.createElement("button");
  const newCheckbox = document.createElement("input");

  newCheckbox.type = "checkbox";
  newCheckbox.setAttribute("id", "check");
  newBtn.innerText = "remove";
  newTodo.innerText = input.value;

  newTodo.appendChild(newCheckbox);
  newTodo.appendChild(newBtn);

  console.log(todoList);
  todoList.appendChild(newTodo);

  todoListObjects.push({
    thing: input.value,
    class: "",
  });

  localStorage.setItem(TODO_KEY, JSON.stringify(todoListObjects));

  newCheckbox.addEventListener("click", function (e) {
    if (newCheckbox.checked) {
      e.target.parentElement.className = "completed";
      console.log(e);

      let thingName = e.target.parentElement.innerText.replace("remove", "");
      const objIndex = todoListObjects.findIndex(
        ({ thing }) => thing === thingName
      );
      console.log(objIndex);

      todoListObjects[objIndex].class = "completed";

      localStorage.setItem(TODO_KEY, JSON.stringify(todoListObjects));
    } else if (!newCheckbox.checked) {
      e.target.parentElement.className = "";

      let thingName = e.target.parentElement.innerText.replace("remove", "");
      const objIndex = todoListObjects.findIndex(
        ({ thing }) => thing === thingName
      );

      todoListObjects[objIndex].class = "";
      localStorage.setItem(TODO_KEY, JSON.stringify(todoListObjects));
    }
  });

  newBtn.addEventListener("click", function (e) {
    //get the "thing" string value
    let text = e.target.parentElement.innerText.replace("remove", "");
    console.log(text);
    e.target.parentElement.remove();
    let filteredList = todoListObjects.filter(({ thing }) => thing !== text);
    localStorage.setItem(TODO_KEY, JSON.stringify(filteredList));

    todoListObjects = filteredList;
  });

  localStorage.setItem(TODO_KEY, JSON.stringify(todoListObjects));

  input.value = "";
});

/*
1. When and how do we save to localStorage
2. When and how do we update or remove from LS
3. What do we do when we retrieve values from LS first time loading page

LOCAL STORAGE MODEL
[
    { label: "test", "completed": false},
    { label: "test1", "completed": true}
]
*/

/*

loadPage() {
  getData()
  transformData()
  buildUI()
  addEvents()
}

createNewRow() {
  saveData()
  buildUI()
  addEvents()
}

// call a function
saveData("active", 123);
// define a function
function saveData(class, id) {
  //function logic
  //return something
}
*/
