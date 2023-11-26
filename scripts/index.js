let formProblems = document.querySelector('.problems__form');
let formButton = document.querySelector('.problems__button-add');
let formInput = document.querySelector('.problems__input');
let formButtonAdd = document.querySelector('.problems__button-add_add');
let problemsSaved = document.querySelector('.problems-saved');
let addNewCaptionBtn = document.querySelector(".main-table__new-caption")
let popup = document.querySelector(".popup");
let popupAdd = popup.querySelector(".popup__add")
let recordsArr = [];
let problemsArr = [];

fetch('http://mariofan765.tplinkdns.com:3000/data')    .then(response => response.json())
    .then((data) => {
        addRecords(data)
        data.forEach(item => problemsArr.push(item))
    })
    .catch(error => console.error('Error:', error));

fetch('http://mariofan765.tplinkdns.com:3000/getRecords')
    .then((res) => res.json())
    .then((data) => {
        addNewString(data)
        data.forEach((item, i) => {
            recordsArr.push(item)
        })
    })
    .then(
        () => {
            document.querySelector(".main-table__new-caption").addEventListener('click', (e) => {
                popup.style.display = "flex";
                let formattedDate = getFormattedDate();
                popup.querySelector(".popup__date").value = formattedDate;
                fadeIn(popup, 100)
            })
        }
    )

function addRecords(data) {
    console.log(data)
    data.forEach((item, i) => {
    let newProblem = document.createElement('div');
    newProblem.className = "problems-saved__point";
    newProblem.innerHTML =
        `<p class="problems-saved__p">
            ${item.context}
        </p> 
        <div class="problems-saved__other-btns">
        <button class="problems-saved__del">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </button>
        <button class="problems-saved__change">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.265 4.16231L19.21 5.74531C19.3978 5.9283 19.5031 6.17982 19.5015 6.44201C19.5 6.70421 19.3919 6.9545 19.202 7.13531L17.724 8.93531L12.694 15.0723C12.6069 15.1749 12.4897 15.2473 12.359 15.2793L9.75102 15.8793C9.40496 15.8936 9.10654 15.6384 9.06702 15.2943L9.18902 12.7213C9.19806 12.5899 9.25006 12.4652 9.33702 12.3663L14.15 6.50131L15.845 4.43331C16.1743 3.98505 16.7938 3.86684 17.265 4.16231Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5.5 18.2413C5.08579 18.2413 4.75 18.5771 4.75 18.9913C4.75 19.4056 5.08579 19.7413 5.5 19.7413V18.2413ZM19.2 19.7413C19.6142 19.7413 19.95 19.4056 19.95 18.9913C19.95 18.5771 19.6142 18.2413 19.2 18.2413V19.7413ZM14.8455 6.22062C14.6904 5.83652 14.2534 5.65082 13.8693 5.80586C13.4852 5.9609 13.2995 6.39796 13.4545 6.78206L14.8455 6.22062ZM17.8893 9.66991C18.2933 9.57863 18.5468 9.17711 18.4556 8.77308C18.3643 8.36904 17.9628 8.1155 17.5587 8.20678L17.8893 9.66991ZM5.5 19.7413H19.2V18.2413H5.5V19.7413ZM13.4545 6.78206C13.6872 7.35843 14.165 8.18012 14.8765 8.8128C15.6011 9.45718 16.633 9.95371 17.8893 9.66991L17.5587 8.20678C16.916 8.35198 16.3609 8.12551 15.8733 7.69189C15.3725 7.24656 15.0128 6.63526 14.8455 6.22062L13.4545 6.78206Z" fill="#000000"/>
            </svg>
        </button>
        </div>`;
    problemsSaved.appendChild(newProblem);
    })
    updateProblemList()
}

formProblems.addEventListener('click', preventDefault);
formButton.addEventListener('click', displayFormInput);
formInput.addEventListener("click", displayFormButtonAdd);
formInput.addEventListener("keyup", handleKeyUp);
formButtonAdd.addEventListener("click", addNewProblem);

function preventDefault(e) {
    e.preventDefault();
}

function displayFormInput() {
    formInput.style.display = "block";
    fadeIn(formInput, 100);
}

function displayFormButtonAdd() {
    formButtonAdd.style.display = "block";
    fadeIn(formButtonAdd, 100);
}

function handleKeyUp(e) {
    if(e.keyCode == 13) {
        addNewProblem();
    }
}

function addNewProblem() {
    if(formInput.value != "") {
        addProblemToSaved();
        resetForm();
    }

    updateProblemList();
}

function addProblemToSaved() {
    let newProblem = document.createElement('div');
    newProblem.className = "problems-saved__point";
    newProblem.innerHTML =
        `<p class="problems-saved__p">
            ${formInput.value}
        </p> 
        <div class="problems-saved__other-btns">
        <button class="problems-saved__del">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </button>
        <button class="problems-saved__change">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.265 4.16231L19.21 5.74531C19.3978 5.9283 19.5031 6.17982 19.5015 6.44201C19.5 6.70421 19.3919 6.9545 19.202 7.13531L17.724 8.93531L12.694 15.0723C12.6069 15.1749 12.4897 15.2473 12.359 15.2793L9.75102 15.8793C9.40496 15.8936 9.10654 15.6384 9.06702 15.2943L9.18902 12.7213C9.19806 12.5899 9.25006 12.4652 9.33702 12.3663L14.15 6.50131L15.845 4.43331C16.1743 3.98505 16.7938 3.86684 17.265 4.16231Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5.5 18.2413C5.08579 18.2413 4.75 18.5771 4.75 18.9913C4.75 19.4056 5.08579 19.7413 5.5 19.7413V18.2413ZM19.2 19.7413C19.6142 19.7413 19.95 19.4056 19.95 18.9913C19.95 18.5771 19.6142 18.2413 19.2 18.2413V19.7413ZM14.8455 6.22062C14.6904 5.83652 14.2534 5.65082 13.8693 5.80586C13.4852 5.9609 13.2995 6.39796 13.4545 6.78206L14.8455 6.22062ZM17.8893 9.66991C18.2933 9.57863 18.5468 9.17711 18.4556 8.77308C18.3643 8.36904 17.9628 8.1155 17.5587 8.20678L17.8893 9.66991ZM5.5 19.7413H19.2V18.2413H5.5V19.7413ZM13.4545 6.78206C13.6872 7.35843 14.165 8.18012 14.8765 8.8128C15.6011 9.45718 16.633 9.95371 17.8893 9.66991L17.5587 8.20678C16.916 8.35198 16.3609 8.12551 15.8733 7.69189C15.3725 7.24656 15.0128 6.63526 14.8455 6.22062L13.4545 6.78206Z" fill="#000000"/>
            </svg>
        </button>
        </div>`;
    problemsSaved.appendChild(newProblem);
    fetch('http://mariofan765.tplinkdns.com:3000/data',
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_user: 1,
                data: formInput.value.toString()
            })
        })
    }


    function resetForm() {
    formButtonAdd.style.display = "none";
    formButtonAdd.style.opacity = 0;
    formInput.value = null;
}

function updateProblemList() {
    let lastPharagraph = document.querySelectorAll(".problems-saved__point");
    lastPharagraph.forEach((item, i) => {
        item.querySelector(".problems-saved__del")
            .addEventListener('click', deleteProblem);
        item.querySelector(".problems-saved__change")
            .addEventListener('click', changeProblem);
        reCalculate();
    });
    displayProblemsSaved();
}

function deleteProblem(e) {
    let idUsers;
    let record = e
            .target
            .closest(".problems-saved__point")
            .querySelector(".problems-saved__p")
            .textContent
            .slice(2, e
                .target
                .closest(".problems-saved__point")
                .querySelector(".problems-saved__p")
                .textContent
                .length)
            .trim();

    problemsArr.forEach(item => {
        if (item.context.trim() == record) {
            console.log(item)
            idUsers = item.id_for_users;
        }
    })
    fetch('http://mariofan765.tplinkdns.com:3000/delData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_user: 1,
            id_for_users: idUsers,
            data: record
        })
    })
    e.target.closest(".problems-saved__point").remove();
    if(problemsSaved.innerHTML == "") {
        problemsSaved.style.display = "none";
        problemsSaved.classList.remove("block_visible");
    }
    reCalculate();
}

function changeProblem(e) {
    let valueOfP = e
        .target
        .closest(".problems-saved__point")
        .querySelector(".problems-saved__p")
        .textContent
        .trim();
    valueOfP = valueOfP.slice(2, valueOfP.length);
    formInput.value = valueOfP;
    formButtonAdd.style.display = "block";
    fadeIn(formButtonAdd, 100);
    e.target.closest(".problems-saved__point").remove();
    if(problemsSaved.innerHTML == "") {
        problemsSaved.style.display = "none";
        problemsSaved.classList.remove("block_visible");
    }
    displayFormInput();

    reCalculate();
}

function displayProblemsSaved() {
    if(problemsSaved.innerHTML != "") {
        problemsSaved.style.display = "flex";
        problemsSaved.classList.add("block_visible");
    }
}

function reCalculate() {
    let allProblemsSaved = problemsSaved.querySelectorAll(".problems-saved__p");
    allProblemsSaved.forEach((item, i) => {
        let text = item.textContent.trim();
        text = text.slice(text.indexOf(".") + 1); // Remove old number
        item.textContent = (i + 1) + ". " + text; // Add new number
    });
}

function fadeIn(el, speed) {
    var step = 1 / speed;
    var interval = setInterval(function() {
        if (+el.style.opacity >= 1)
            clearInterval(interval);
        el.style.opacity = +el.style.opacity + step;
    }, speed / 1000);
}
function getFormattedDate() {
    let date = new Date();
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months start from 0 in JavaScript
    let year = date.getFullYear();
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}


addNewCaptionBtn.addEventListener('click', (e) => {
    popup.style.display = "flex";
    let formattedDate = getFormattedDate();
    popup.querySelector(".popup__date").value = formattedDate;
    fadeIn(popup, 100)
})

popup.querySelector(".popup__close").addEventListener('click', (e) => {
    e.target.closest(".popup").style.display = 'none'
    e.target.closest(".popup").style.opacity = 0
} )

popup.addEventListener('click', (e) => {
    offPopup(e)
})

function offPopup(e) {
    if(e.target.classList === 'popup') {
        popup.style.display = 'none';
    }
}

document.addEventListener('keyup', (e) => {
    if(e.keyCode == 27) {
        popup.style.opacity = 0;
        popup.style.display = "none"
    }
})

popupAdd.addEventListener('click', (e) => {
    let data = popup.querySelectorAll(".id")
    recordsArr.push({
        date: data[0].value.replace("T", ", "),
        situation: data[1].value === '' ? data[1].value = null : data[1].value,
        mind:  data[2].value === '' ? data[2].value = null : data[2].value,
        emotion:  data[3].value === '' ? data[3].value = null : data[3].value,
        strong:  data[4].value === '' ? data[4].value = null : data[4].value
    })
    addNewString(recordsArr)
    data.forEach((item, i) => {
        console.log(item)
    })
    document.querySelector(".main-table__new-caption").addEventListener('click', (e) => {
        popup.style.display = "flex";
        let formattedDate = getFormattedDate();
        popup.querySelector(".popup__date").value = formattedDate;
        fadeIn(popup, 100)
    })
    fetch('http://mariofan765.tplinkdns.com:3000/addNewCaption', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_user: 1,
            data: recordsArr[recordsArr.length - 1]
        })
    })

})


function addNewString(recordsArr) {
    let del = document.querySelectorAll(".main-table__row")
    for(let i = 1; i < del.length; i++) {
        del[i].parentNode.removeChild(del[i])
    }

    recordsArr.forEach((item, i) => {
        let template = `
<div class="main-table__row">
        <p class="main-table__column">${item.date}</p>
        <p class="main-table__column">${item.situation}</p>
        <p class="main-table__column">${item.mind}</p>
        <p class="main-table__column">${item.emotion}</p>
        <p class="main-table__column">${item.strong}</p>
    </div>`

        document.querySelector(".main-table").innerHTML += (template)


    })
    popup.style.opacity = 0;
    popup.style.display = "none"

}

let popupRegOrLogBack = document.querySelector(".popup-reg-and-log")
let popupRegOrLog = document.querySelector(".popup-reg-and-log-inner")
let popupFirst = document.querySelector(".popup-reg-and-log__first-template")
let popupSecond = document.querySelector(".popup-reg-and-log__second-template")
let popupConfirm = document.querySelector(".popup-reg-and-log__confirm")
let popupBtnReg = document.querySelector(".reg-and-log__button-reg")
let popupBtnLog = document.querySelector(".reg-and-log__button-log")
let popupRegOrLogTitle = document.querySelector(".popup-reg-and-log__title")

popupBtnReg.addEventListener('click', (e) => {
    popupRegOrLogBack.style.display = "flex";
    fadeIn(popupRegOrLogBack, 100)
    popupRegOrLogTitle.textContent = "Регистрация"
    popupConfirm.textContent = "Зарегистрироваться"
})
popupFirst.addEventListener('input', (e) => {
    document.querySelector(".popup-reg-and-log__error-log").textContent = ""
})
popupBtnLog.addEventListener('click', (e) => {
    popupRegOrLogBack.style.display = "flex";
    fadeIn(popupRegOrLogBack, 100)
    popupRegOrLogTitle.textContent = "Вход"
    popupConfirm.textContent = "Войти"
})

document.addEventListener('keyup', (e) => {
    if (e.keyCode == 27) {
        popupRegOrLogBack.style.display = "none";
        popupRegOrLogBack.style.opacity = 0
    }
})
popupRegOrLog.addEventListener('submit', async  (e) => {
    e.preventDefault()
    if(popupFirst.value == "" || popupSecond.value == "") {
        return
    } else {
        let log = popupFirst.value
        let pas = popupSecond.value
        let res; //action
        res = {
            log: log,
            pas: pas
        }
        let result = await fetch('http://mariofan765.tplinkdns.com:3000/newUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(res)

        })
        if(result.status != 200) {
            document.querySelector(".popup-reg-and-log__error-log").textContent = "Пользователь с таким логином уже существует"
        } else {
            popupRegOrLogBack.style.display = "none";
            popupRegOrLogBack.style.opacity = 0
        }
    }

})



