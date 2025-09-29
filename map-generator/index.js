
/** @type {HTMLCanvasElement} */
const canvas = document.querySelector("#gator");

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
let ratio = window.devicePixelRatio;
function resizeCanvas() {
    ratio = window.devicePixelRatio;
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    render();
}

class Lines {
    static nodeslistlist = [];
    static current = [];

    static addNode(x, y) {
        this.current.push([x, y]);
        render();
    }

    static removeNode() {
        this.current.pop();
        render();
    }

    static closeLine() {
        this.nodeslistlist.push([...this.current]);
        this.current = [];
        render();
    }

    static render() {
        ctx.lineWidth=3;
        ctx.strokeStyle="rgb(56, 136, 255)";
        ctx.fillStyle="rgb(56, 136, 255)";
        for (const nodesList of this.nodeslistlist) {
            let prev = null;
            for (const node of nodesList) {
                /** @type {[number,number]} */
                const [x, y] = node;
                ctx.beginPath();
                ctx.ellipse(x, y, 5, 5,0,0,2*Math.PI);
                ctx.fill();
                if (prev) {
                    ctx.beginPath();
                    ctx.moveTo(prev[0], prev[1]);
                    ctx.lineTo(node[0], node[1]);
                    ctx.stroke();
                }

                prev = node;
            }
        }
        let prev = null;
        ctx.strokeStyle="#e11";
        ctx.fillStyle="#e11";
        for (const node of this.current) {
            /** @type {[number,number]} */
            const [x, y] = node;
            ctx.beginPath();
            ctx.ellipse(x, y, 10, 10,0,0,2*Math.PI);
            ctx.fill();
            if (prev) {
                ctx.beginPath();
                ctx.moveTo(prev[0], prev[1]);
                ctx.lineTo(node[0], node[1]);
                ctx.stroke();
            }

            prev = node;
        }
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#000";
    ctx.strokeStyle = "#111"
    Lines.render();
    // ctx.fillRect(0, 0, 100, 100);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let mode = "edit";
document.querySelectorAll("#mode button").forEach(el => el.addEventListener("click", () => {
    document.querySelector(`#${mode}`).removeAttribute("selected");
    mode = el.id;
    el.setAttribute("selected", "");
}));

window.addEventListener("keydown",e => {
    if (e.metaKey && e.key=="z") {
        e.preventDefault();
        Lines.removeNode();
    }
    if (e.key == "Enter") {
        Lines.closeLine();
    }
})

render();

window.addEventListener("mouseup", () => selected = null);

window.addEventListener("mousedown", e => {
    if (document.querySelector("#mode:hover")) return;
    Lines.addNode(e.clientX * ratio, e.clientY * ratio);
})