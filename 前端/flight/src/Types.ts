import ActionType from './constants/ActionType';

export interface Action {
    type: ActionType,
    value?: number | boolean,
};

export interface GameState {
    isbegin:boolean,
    score: number,
    highScore: number,
    highMoney: number,
    lane: number,
    this_money:number,
    money: number,
    defeat: boolean,
};

export interface SavedState {
    highScore: number,
    highMoney: number,
    money: number,
};