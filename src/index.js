import './index.html';
import './index.css';
import dva from 'dva';
import createLogger from 'dva-logger';
import Logger from 'js-logger';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Log messages will be written to the window's console.
Logger.useDefaults({
  defaultLevel: Logger.DEBUG
});

// 1. Initialize
const app = dva();

app.model(require('./models/figure-explorer'));
app.model(require("./models/figure-builder"));

// 2. Plugins
const loggerOpts = {};
app.use(createLogger(loggerOpts));

// 3. Model
// app.model(require('./models/example'))

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
