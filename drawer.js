'use strict';

export default class BasisDrawer {
	constructor(container, params) {
		if (!container) {
			container = '._c-drawer';
		}
		this.params = Object.assign({
			'drawer': '._c-drawer__body',
			'btn'   : '._c-drawer__btn'
		}, params);

		this.container = document.querySelectorAll(container);
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

			const has_submenus = drawer.querySelectorAll('[aria-expanded]');
			for (let i = 0; i < has_submenus.length; i ++) {
				const element = has_submenus[i].children;
				for (let j = 0; j < element.length; j ++) {
					if (element[j].tagName.toUpperCase() == 'A') {
						element[j].addEventListener('click', (event) => {
							this.toggle(has_submenus[i]);
							event.stopPropagation();
						}, false);
					}
				}
			}
		}
	}

	toggle(drawer) {
		event.preventDefault();
		if (drawer.getAttribute('aria-expanded') === 'false') {
			this.open(drawer);
		} else {
			this.close(drawer);
			const has_submenus = drawer.querySelectorAll('[aria-expanded]');
			for (let i = 0; i < has_submenus.length; i ++) {
				this.close(has_submenus[i]);
			}
		}
	}

	open(drawer) {
		drawer.setAttribute('aria-expanded', 'true');
	}

	close(drawer) {
		drawer.setAttribute('aria-expanded', 'false');
	}
}
