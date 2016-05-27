'use strict';

export default class BasisDrawer {
	constructor(container, params) {
		if (!container) {
			container = '._c-drawer';
		}
		if (!params) {
			params = {};
		}
		this.params = params;
		if (!this.params.drawer) {
			this.params.drawer = '._c-drawer__body';
		}
		if (!this.params.btn) {
			this.params.btn = '._c-drawer__btn';
		}
		if (!this.params.toggleSubmenus) {
			this.params.toggleSubmenus = '._c-drawer__toggle';
		}

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
				btn.classList.remove('is-close');
			}, false);

			drawer.addEventListener('click', (event) => {
				event.stopPropagation();
			}, false);

			btn.addEventListener('click', (event) => {
				this.toggleDrawer(drawer);
				event.stopPropagation();
			}, false);

			window.addEventListener('resize', (event) => {
				this.close(drawer);
				btn.classList.remove('is-close');
			}, false);

			const has_submenus = drawer.querySelectorAll('[aria-expanded]');
			for (let i = 0; i < has_submenus.length; i ++) {
				const toggleSubmenus = has_submenus[i].querySelector(this.params.toggleSubmenus);
				if (toggleSubmenus) {
					toggleSubmenus.addEventListener('click', (event) => {
						this.toggleSubmenus(has_submenus[i]);
						event.stopPropagation();
					}, false);
				}
			}
		}
	}

	toggleDrawer(drawer) {
		event.preventDefault();
		for (let i = 0; i < this.container.length; i ++) {
			const btn = this.container[i].querySelector(this.params.btn);
			if (drawer.getAttribute('aria-expanded') === 'false') {
				this.open(drawer);
				btn.classList.add('is-close');
			} else {
				this.close(drawer);
				btn.classList.remove('is-close');
				const has_submenus = drawer.querySelectorAll('[aria-expanded]');
				for (let i = 0; i < has_submenus.length; i ++) {
					this.close(has_submenus[i]);
				}
			}
		}
	}

	toggleSubmenus(submenus) {
		event.preventDefault();
		if (submenus.getAttribute('aria-expanded') === 'false') {
			this.open(submenus);
		} else {
			this.close(submenus);
			const has_submenus = submenus.querySelectorAll('[aria-expanded]');
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
