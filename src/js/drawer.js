'use strict';

export default class BasisDrawer {
  constructor(container, params) {
    if (!container) {
      container = '._c-drawer';
    }

    this.params    = this.setParams(params);
    this.container = document.querySelectorAll(container);
    this.setListener();
  }

  setParams(params) {
    if (!params) {
      params = {};
    }
    if (!params.drawer) {
      params.drawer = '._c-drawer__body';
    }
    if (!params.btn) {
      params.btn = '._c-drawer__btn';
    }
    if (!params.toggleSubmenus) {
      params.toggleSubmenus = '._c-drawer__toggle';
    }
    return params;
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
        this.toggle(drawer);
        btn.classList.toggle('is-close');
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
            this.toggle(has_submenus[i]);
            event.stopPropagation();
          }, false);
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
    }
  }

  open(drawer) {
    drawer.setAttribute('aria-expanded', 'true');
  }

  close(drawer) {
    drawer.setAttribute('aria-expanded', 'false');
    const has_submenus = drawer.querySelectorAll('[aria-expanded]');
    for (let i = 0; i < has_submenus.length; i ++) {
      this.close(has_submenus[i]);
    }
  }
}
