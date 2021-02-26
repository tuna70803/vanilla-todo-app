export default class App {
    constructor({ $target }) {
        this.$target = $target;

        this.render();
    }

    template() {
        return '<span>todo app</span>';
    }

    render() {
        this.$target.innerHTML = this.template();
    }
}
