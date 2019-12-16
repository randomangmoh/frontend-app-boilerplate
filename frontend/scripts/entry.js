import Campaign from './modules/Campaign';

// Entry Point
document.addEventListener('DOMContentLoaded', () => {

    // Set up campaign
    new Campaign(document.querySelector('[data-campaign="container"]'));

});
