import React from 'react';
import { useSelector } from 'react-redux';
import { MobileView, BrowserView } from 'react-device-detect';

import moneyImage from '../img/gem.png';

import { GameState } from '../Types';
import Begin from './Begin';
import Defeat from './Defeat';
import Display from './Display';

const Overlay = ({ onReset }: { onReset: () => void }) => {
    const this_money = useSelector((state: GameState)=> state.this_money);
    const highMoney = useSelector((state: GameState)=>state.highMoney);
    const money = useSelector((state: GameState) => state.money);
    const defeat = useSelector((state: GameState) => state.defeat);

    return (
        <div className="overlay">
            {/* <Begin /> */}
            <Defeat onReset={onReset} />
            <div className="score">
                <Display
                    title="Score"
                    value={(
                        <>
                            {Math.round(this_money)} <img src={moneyImage} alt="Money" />
                        </>
                    )}
                />
                <Display
                    title="highest score"
                    value={(
                        <>
                            {Math.round(highMoney)} <img src={moneyImage} alt="Money" />
                        </>
                    )}
                />
                <Display
                    title="Cumulative score"
                    value={(
                        <>
                            {Math.round(money)} <img src={moneyImage} alt="Money" />
                        </>
                    )}
                />
            </div>
            <div className="help">
                <MobileView>
                    Tap on left and right sides of the screen to move.
                </MobileView>
                <BrowserView>
                    {defeat ?
                        'Press Space to restart.'
                        :
                        'Use left and right arrow keys to move.'
                    }
                </BrowserView>
            </div>
        </div>
    )
};

export default Overlay;