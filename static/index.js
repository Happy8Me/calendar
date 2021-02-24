import Calendar from './views/Calendar.js';
import Event from './views/Event.js';
import { CreateTable } from './components/CreateTable.js';
import { hours }  from './data.js'  

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: '/calendar', view: Calendar },
        { path: '/event', view: Event },
    ]; 

    // check route for match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if (!match) {
        match = {
            route: routes[0],
        };
    }

    const view = new match.route.view();
    document.querySelector('#app').innerHTML = await view.getHtml();
    if(location.pathname === '/event') {
         view.addEvent();
         view.showOpts();
    } else {
        CreateTable(hours, document.querySelector('#table'));
        view.addEventToCalendar();
        view.sortEvents();
    }
};

window.addEventListener('popstate', router);  

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    router();
});

export { navigateTo };
