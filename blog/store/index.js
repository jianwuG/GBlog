import {createStore,compose,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

export const composeEnhancers=compose;
const store = createStore(
    reducer, /* preloadedState, */
    composeEnhancers(applyMiddleware(thunk))
);
export default store
