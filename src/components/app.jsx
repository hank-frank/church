import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { render } from 'react-dom';

function App () {

    const smartsheetTest = () => {
        fetch('/ss')
            .then((response) => {
                let reader = response.body.getReader();
                console.log(`SS reader: `, reader)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const PCPeople = () => {
        fetch('/pc-people')
            .then((response) => {
                let reader = response.body.getReader();
                console.log(`PC reader: `, reader)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const PCEvent = () => {
        fetch('/pc-event')
            .then((response) => {
                let reader = response.body.getReader();
                console.log(`PC reader: `, reader)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <button onClick={ smartsheetTest }>Smartsheet test!</button>
            <button onClick={ PCPeople }>planningCenter people test</button>
            <button onClick={ PCEvent }>planningCenter event test</button>
        </>
    )
};

export default App;