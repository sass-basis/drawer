'use strict';

export default class BasisDrawer {
	constructor(params) {
		this.params = Object.assign({
			'container': '._c-drawer',
			'drawer'   : '._c-drawer__body',
			'btn'      : '._c-drawer__btn'
		}, params);

		this.container = document.querySelectorAll(this.params.container);
		this.setListener();
	}

	setListener() {
		for (let i = 0; i < this.container.length; i ++) {
			const container = this.container[i];
			const drawer    = container.querySelector(this.params.drawer);
			const btn       = container.querySelector(this.params.btn);

			container.addEventListener('click', (event) => {
				this.close(drawer);
			}, false);

			drawer.addEventListener('click', (event) => {
				event.stopPropagation();
			}, false);

			btn.addEventListener('click', (event) => {
				this.toggle(drawer);
				event.stopPropagation();
			}, false);

			container.addEventListener('resize', (event) => {
				this.close(drawer);
			}, false);
		}
	}

	toggle(drawer) {
		event.preventDefault();
		if (drawer.getAttribute('aria-expanded') === 'false') {
			this.open(drawer);
		} else {
			this.close(drawer);
		}
	}

	open(drawer) {
		drawer.setAttribute('aria-expanded', 'true');
	}

	close(drawer) {
		drawer.setAttribute('aria-expanded', 'false');
	}
}
