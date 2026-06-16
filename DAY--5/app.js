// 1. Change Text
function changeText() {
    const text = document.getElementById("myText");
    if (text.innerText === "Hello World!") {
        text.innerText = "Text Changed! 🎉";
    } else {
        text.innerText = "Hello World!";
    }
}

// 2. Change Color
function changeColor() {
    const colors = ["red", "blue", 
    "green", "orange", "purple"];
    const random = Math.floor
    (Math.random() * colors.length);
    document.getElementById("colorText")
    .style.color = colors[random];
}

// 3. Show Hide
function toggleVisible() {
    const text = document.getElementById
    ("hideText");
    if (text.style.display === "none") {
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
}

// 4. Add Items
function addItem() {
    const input = document.getElementById
    ("itemInput");
    const list = document.getElementById
    ("itemList");

    if (input.value === "") {
        alert("Please type something!");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = input.value + 
    '<span class="delete" onclick="this.parentElement.remove()">X</span>';

    list.appendChild(li);
    input.value = "";
}