class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.selector = document.querySelector(selector);
        this.targetDate = targetDate;
        this.refs = {
            days: this.selector.querySelector('[data-value="days"]'),
            hours: this.selector.querySelector('[data-value="hours"]'),
            minutes: this.selector.querySelector('[data-value="mins"]'),
            seconds: this.selector.querySelector('[data-value="secs"]'),
        }
        this.init();
        this.start();
    }
    init() {
        const time = this.getTimeRemaining(0);
        this.updateClock(time);
    }
    start() {
        this.timeIntervalId = setInterval(() => {
            const startTime = this.targetDate - Date.now();
            if (startTime <= 0) {
                clearInterval(this.timeIntervalId);
                return;
            }

            const timeRemaining = this.getTimeRemaining(startTime);
            this.updateClock(timeRemaining);
        }, 1000)
    }

    updateClock({ days, hours, minutes, seconds }) {
        this.refs.days.textContent = days;
        this.refs.hours.textContent = hours;
        this.refs.minutes.textContent = minutes;
        this.refs.seconds.textContent = seconds;
    }

    getTimeRemaining(time) {
        const seconds = this.pad(Math.floor((time / 1000) % 60));
        const minutes = this.pad(Math.floor((time / 1000 / 60) % 60));
        const hours = this.pad(Math.floor((time / (1000 * 60 * 60)) % 24));
        const days = this.pad(Math.floor((time / (1000 * 60 * 60 * 24))));

        return { days, hours, minutes, seconds };
    }
    pad(value) {
        return String(value).padStart(2, '0');
    }
}

    new CountdownTimer({
        selector: '#timer-1',
        targetDate: new Date('May 26, 2022'),
    });