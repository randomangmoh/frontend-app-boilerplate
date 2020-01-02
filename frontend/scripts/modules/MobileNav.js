export default class MobileNav {


    /**
     * @constructor
     */
    constructor(container) {

        if(!container) return 'No nav container passed';

        this.container = container;
        this.navBtn = this.container.querySelector('[data-mobile-nav="btn"]');
        this.navBtnClose = this.container.querySelector('[data-mobile-nav="close"]');
        this.mobileNav = this.container.querySelector('[data-mobile-nav="container"]');

        this.navBtn.addEventListener('click', (e) => this.onNavBtnClick(e));
        this.navBtnClose.addEventListener('click', (e) => this.onNavBtnClick(e));

    }


    /**
     * On nav button click
     *
     * @return {Void}
     */
    onNavBtnClick() {

        this.mobileNav.classList.toggle('active');

    }

}
