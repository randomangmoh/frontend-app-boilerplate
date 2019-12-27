import Campaign from './modules/Campaign';
import MobileNav from './modules/MobileNav';

// Entry Point
document.addEventListener('DOMContentLoaded', () => {

    // Set up campaign
    new Campaign(document.querySelector('[data-campaign="container"]'));

    const navContainer = document.querySelector('[data-nav="container"]');
    new MobileNav(navContainer);

});
