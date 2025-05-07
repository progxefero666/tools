

export class Timer {
    private timerId: number | null = null;
    private readonly duration: number;

    constructor(duration: number) {
        this.duration = duration;
    }

    start(callback: () => void): void {
        if (this.timerId === null) {
            this.timerId = window.setInterval(callback, this.duration); // <- setInterval
        }
    }

    stop(): void {
        if (this.timerId !== null) {
            window.clearInterval(this.timerId); // <- clearInterval
            this.timerId = null;
        }
    }
}