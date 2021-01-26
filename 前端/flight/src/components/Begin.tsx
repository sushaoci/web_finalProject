import React from 'react';
import classNames from 'classnames';
import { createStore } from 'redux';
import gameState from '../reducers/gameState';
import ActionType from '../constants/ActionType';

const gameStateStore = createStore(gameState);

const Begin = () => {
    let st = gameStateStore.getState();
    return (
        <div className={classNames('defeat', {
            'hidden': st.isbegin
        })}>
            <div className="text">
                Ready--
            </div>
            <div className="actions">
                <button onClick={() => {
                    gameStateStore.dispatch({ type: ActionType.SET_BEGIN, value: true });
                }}>Go!</button>
            </div>
        </div>
    )
};

export default Begin;