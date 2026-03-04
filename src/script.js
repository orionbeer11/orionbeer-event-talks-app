document.addEventListener('DOMContentLoaded', () => {
    const schedule = document.getElementById('schedule');
    const searchInput = document.getElementById('search');

    const scheduleWithBreaks = [
        talks[0],
        { time: '11:00 - 11:10', title: 'Break', isBreak: true },
        talks[1],
        { time: '12:10 - 13:10', title: 'Lunch Break', isBreak: true },
        talks[2],
        { time: '14:10 - 14:20', title: 'Break', isBreak: true },
        talks[3],
        { time: '15:20 - 15:30', title: 'Break', isBreak: true },
        talks[4],
        { time: '16:30 - 16:40', title: 'Break', isBreak: true },
        talks[5]
    ];

    function renderSchedule(filter = '') {
        schedule.innerHTML = '';
        scheduleWithBreaks.forEach(item => {
            if (item.isBreak) {
                const breakElement = document.createElement('div');
                breakElement.className = 'break';
                breakElement.innerHTML = `<strong>${item.time}</strong> - ${item.title}`;
                schedule.appendChild(breakElement);
            } else {
                const categories = item.categories.map(c => c.toLowerCase());
                if (filter && !categories.some(c => c.includes(filter.toLowerCase()))) {
                    return;
                }

                const talkElement = document.createElement('div');
                talkElement.className = 'talk';

                let speakers = '';
                if (item.speakers && item.speakers.length > 0) {
                    speakers = `<div class="talk-meta"><span>Speakers:</span> ${item.speakers.join(', ')}</div>`;
                }

                let categoriesHTML = '';
                if (item.categories && item.categories.length > 0) {
                    categoriesHTML = `<div class="categories">
                        ${item.categories.map(cat => `<span>${cat}</span>`).join('')}
                    </div>`;
                }

                talkElement.innerHTML = `
                    <h2>${item.title}</h2>
                    <div class="talk-meta"><span>Time:</span> ${item.time}</div>
                    ${speakers}
                    <p>${item.description}</p>
                    ${categoriesHTML}
                `;
                schedule.appendChild(talkElement);
            }
        });
    }

    searchInput.addEventListener('input', (e) => {
        renderSchedule(e.target.value);
    });

    renderSchedule();
});
