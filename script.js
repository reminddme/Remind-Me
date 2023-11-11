document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const remindersList = document.getElementById("reminders");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const birthdate = document.getElementById("birthdate").value;
        const notificationOption = parseInt(document.getElementById("notification").value);

        if (name && birthdate) {
            const reminder = { name, birthdate };
            addReminder(reminder, notificationOption);
            form.reset();
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });

    function addReminder(reminder, notificationOption) {
        const nextBirthday = getNextBirthday(reminder.birthdate);
        const notification = calculateNotification(nextBirthday, notificationOption);

        const reminderItem = document.createElement("li");
        reminderItem.innerHTML = `
            <strong>${reminder.name}</strong><br>
            Data de Nascimento: ${reminder.birthdate}<br>
            Próximo Aniversário: ${nextBirthday}<br>
            Você será notificado(a) em: ${notification} ${notification === 1 ? "dia" : "dias"}`;
        remindersList.appendChild(reminderItem);
    }

    function getNextBirthday(birthdate) {
        const today = new Date();
        const birthdateParts = birthdate.split("-");
        const birthMonth = parseInt(birthdateParts[1]) - 1;
        const birthDay = parseInt(birthdateParts[2]);

        const nextBirthday = new Date(today.getFullYear(), birthMonth, birthDay);

        if (nextBirthday < today) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }

        return formatDate(nextBirthday);
    }

    function calculateNotification(nextBirthday, notificationOption) {
        const today = new Date();
        const nextBirthdayDate = new Date(nextBirthday);
        const timeDiff = nextBirthdayDate - today;
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        return daysDiff - notificationOption;
    }

    function formatDate(date) {
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, "0");
        let day = date.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
    }
});
