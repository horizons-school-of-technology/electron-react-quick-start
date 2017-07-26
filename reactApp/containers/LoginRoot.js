import PropTypes from 'prop-types';
import React from 'react';
import {Provider} from 'react-redux';
import {HashRouter, Route} from 'react-router-dom';

import App from '../components/App';
import DevTools from './DevTools';

export default function Root({store, history}) {
    return (
        <Provider store={store}>
            <div>
                <HashRouter history={history}>
                    <Route path="/" component={App}/>
                </HashRouter>
                <DevTools />
            </div>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
