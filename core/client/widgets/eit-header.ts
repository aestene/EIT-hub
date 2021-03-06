import html from "./eit-header.html";

export default class EitHeader extends HTMLElement{
    constructor(public value: number = 0) {
        super();

        const shadow = this.attachShadow({mode:'closed'});
        shadow.innerHTML = html;

    }
}

customElements.define('eit-header', EitHeader);