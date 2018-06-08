import React from 'react';
import StartQuestionPage from './components/Common/StartQuestionPage';
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import PracticePage from './components/Common/PracticePage';
const routes = [
    {
        path: '/',
        exact: true,
        main: () => <HomePage />
    },
    { 
        path: '/PracticePage/:code',
        exact: false,
        main: ({match,history}) => <PracticePage match={match} history ={history} />
    },
    { 
        path: '/category/:code',
        exact: false,
        main: ({match,history}) => <StartQuestionPage match={match} history ={history} />
    },
    {
        path: '',
        exact: false,
        main: () => <NotFoundPage />
    },
 
];

export default routes;