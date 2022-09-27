import React from 'react';
import ReactDOM  from 'react-dom';
import Container from 'react-bootstrap/Container';
// reduc devtool import
import { devToolsEnhancer } from 'redux-devtools-extension';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp  from './reducers/reducers';
import  MainView from './components/main-view/main-view';
//Importing statement to indicate that you need to bundle './index.scss'
import './index.scss';

// const store = createStore(moviesApp);
//redux devtools
const store = createStore(moviesApp, devToolsEnhancer());

//Main component(will eventually use all the others)
class MovieApp extends React.Component {
    render(){
            return (
                <Provider store={store}>
                    <Container fluid>
                        <MainView />
                    </Container>
                </Provider>
                );
    }
}

//Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

//Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MovieApp), container);
