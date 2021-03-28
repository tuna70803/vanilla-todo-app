import { setAppType } from '../frontend/src/utils/settings.js';
import App from '../frontend/src/App.js';

setAppType('demo');

const body = document.querySelector('body');
const app = App();
body.appendChild(app.el);
