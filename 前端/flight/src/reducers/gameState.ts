import ActionType from '../constants/ActionType';
import { Action, GameState, SavedState } from '../Types';

let savedState: SavedState = {
    highScore: 0,
    highMoney: 0,
    money: 0,
};

const savedStateSerialized = localStorage.getItem('savedState');
if (savedStateSerialized) {
    try {
        savedState = JSON.parse(savedStateSerialized) as SavedState;
    } catch {}
}
  
const initialState: GameState = {
    isbegin:false,
    score: 0,
    highScore: savedState.highScore,
    highMoney: savedState.highMoney,
    defeat: false,
    lane: 0,
    this_money: 0,
    money: savedState.money,
};
  
export default function gameState(state = initialState, action: Action) {
    const newState = {...state};
    switch (action.type) {
        case ActionType.SET_BEGIN:
            newState.isbegin = action.value as boolean;
            break;
        case ActionType.SET_DEFEAT:
            newState.defeat = action.value as boolean;

            savedState.highScore = newState.highScore;
            savedState.highMoney = newState.highMoney;
            savedState.money = newState.money;

            localStorage.setItem('savedState', JSON.stringify(savedState));
            break;
        case ActionType.SET_SCORE:
            newState.score = action.value as number;
            break;
        case ActionType.SET_LANE:
            newState.lane = action.value as number;
            break;
        case ActionType.SET_MONEY:
            newState.this_money = action.value as number;
            break;
        case ActionType.ADD_SCORE:
            newState.score += action.value as number;
            break;
        case ActionType.ADD_MONEY:
            newState.money += action.value as number;
            newState.this_money += action.value as number;
            break;
        default:
            return state;
    }

    if (newState.score > newState.highScore) {
        newState.highScore = newState.score;
    }
    if (newState.this_money > newState.highMoney) {
        newState.highMoney = newState.this_money;
    }

    return newState;
};