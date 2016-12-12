'use strict';

import React from 'react';
import Footer from './layout/Footer.jsx';
import Header from './layout/Header.jsx';
import ToolBar from './layout/ToolBar.jsx';
import ReportContainer from './report/ReportContainer.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="container-fluid">
                <Header />
                <ReportContainer />
                <Footer />
            </div>
        );
    }
}
