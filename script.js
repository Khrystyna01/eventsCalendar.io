function getUserInfo() {
    fetch('http://127.0.0.1:8000/calendar/user/2/')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            const userInfoContainer = document.getElementById('user-info-container');
            if (userInfoContainer) {
                userInfoContainer.innerHTML = JSON.stringify(data);
            }
        });
}


function getAllEvents() {
    fetch('http://127.0.0.1:8000/calendar/event/read/')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            const eventsContainer = document.getElementById('events-container');
            if (eventsContainer) {
                eventsContainer.innerHTML = JSON.stringify(data);
            }
        });
}


function getAllEventsForUser2() {
    fetch('http://127.0.0.1:8000/calendar/user/2/event/read2/')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            const eventsContainer = document.getElementById('events_for_user_container');
            if (eventsContainer) {
                eventsContainer.innerHTML = '';

                data.forEach((event) => {
                    const eventElement = document.createElement('div');
                    eventElement.textContent = JSON.stringify(event);
                    eventsContainer.appendChild(eventElement);
                });
            }
        });
}

