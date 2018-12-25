function snow() {
    const c = document.getElementById('canvas');
    const $ = c.getContext('2d');
    let w = c.width = window.innerWidth;
    let h = c.height = window.innerHeight * 5;

    function Flake() {
        this.draw = function() {
            this.g = $.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.sz);
            this.g.addColorStop(0, 'hsla(255,255%,255%,1)');
            this.g.addColorStop(1, 'hsla(255,255%,255%,0)');
            $.moveTo(this.x, this.y);
            $.fillStyle = this.g;
            $.beginPath();
            $.arc(this.x, this.y, this.sz, 0, Math.PI * 2, true);
            $.fill();
        };
    }

    // eslint-disable-next-line no-unused-vars
    function Snowy() {
        // eslint-disable-next-line no-unused-vars
        const snow = null;
        const arr = [];
        const num = 100;
        const tsc = 1;
        const sp = 1;
        const sc = 1.3;
        const mv = 20;
        const min = 1;
        for (let i = 0; i < num; ++i) {
            const snow = new Flake();
            snow.y = Math.random() * (h + 50);
            snow.x = Math.random() * w;
            snow.t = Math.random() * (Math.PI * 2);
            snow.sz = (100 / (10 + (Math.random() * 100))) * sc;
            snow.sp = (Math.pow(snow.sz * 0.8, 2) * 0.15) * sp;
            snow.sp = snow.sp < min ? min : snow.sp;
            arr.push(snow);
        }

        function go() {
            window.requestAnimationFrame(go);
            $.clearRect(0, 0, w, h);
            // $.fillStyle = 'hsla(242, 95%, 3%, 1)';
            $.fillRect(0, 0, w, h);
            $.fill();
            for (let i = 0; i < arr.length; ++i) {
                const f = arr[i];
                f.t += 0.05;
                f.t = f.t >= Math.PI * 2 ? 0 : f.t;
                f.y += f.sp;
                f.x += Math.sin(f.t * tsc) * (f.sz * 0.3);
                if (f.y > h + 50) { f.y = -10 - Math.random() * mv; }
                if (f.x > w + mv) { f.x = -mv; }
                if (f.x < -mv) { f.x = w + mv; }
                f.draw();
            }
        }
        go();
    }

    Snowy();
    /* ________________________________________*/
    window.addEventListener('resize', () => {
        c.width = w = window.innerWidth;
        c.height = h = window.innerHeight;
    }, false);
}

export default snow;
