export default class Logo {

    constructor() {

        this.canvas = document.querySelector('[data-logo="canvas"]');
        this.canvas.width = 1266;
        this.canvas.height = 284;

        this.ctx = this.canvas.getContext('2d');

        this.image = new Image();
        this.image.src = '../img/logo-transparent.png';

        console.log([this.image]);

        this.dimensions = {
            width: this.canvas.width,
            height: this.canvas.height
        };

        this.pos = {
            x: 0,
            y: 0
        };

        this.image.onload = () => {

            this.loop();
            this.addEventListeners();

        };


    }


    loop() {

        this.ctx.clearRect(0, 0, this.dimensions.width, this.dimensions.height);

        this.ctx.drawImage(this.image, 0, 0, this.dimensions.width, this.dimensions.height);

        this.ctx.beginPath();
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
        this.ctx.fill();

        window.requestAnimationFrame(this.loop.bind(this));

    }

    drawImage() {

    }

    addEventListeners() {
        window.addEventListener('mousemove', this.mouseMove.bind(this));
    }


    mouseMove(event) {

        event.preventDefault();
        const canvasPos = Logo.getAbsolutePosition(this.canvas);
        const mousePos = { x: event.clientX, y: event.clientY };

        this.pos.x = mousePos.x - canvasPos.x;
        this.pos.y = mousePos.y - canvasPos.y;

    }

    static getAbsolutePosition(element) {

        const pos = element.getBoundingClientRect();

        return {
            x: Math.floor(pos.x),
            y: Math.floor(pos.y)
        }

    };

}
