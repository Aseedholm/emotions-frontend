import {State, Action, StateContext, Selector} from '@ngxs/store';
import { Injectable } from "@angular/core";
import { AngerEmotion } from '../../shared/models/anger.model';

//Actions to Manager the State
export class AddAnger {
    static readonly type = '[Anger] Add';
    constructor(public payload: AngerEmotion) {}
}

export class RemoveAnger {
    static readonly type = '[Anger] Remove';
    constructor(public id: number) {}
}

export class UpdateAnger {
    static readonly type = '[Anger] Update';
    constructor(public payload: AngerEmotion) {}
}

@State<AngerEmotion[]>({
    name: 'anger',
    defaults: []
})
@Injectable()
export class AngerState {
    @Selector()
    static getAllAngers(state: AngerEmotion[]) {
        return state;
    }

    @Action(AddAnger)
    addAnger({ getState, setState }: StateContext<AngerEmotion[]>, { payload }: AddAnger) {
        const state = getState();
        setState([...state, payload]); // Use setState here
    }

    @Action(RemoveAnger)
    removeAnger({ getState, setState }: StateContext<AngerEmotion[]>, { id }: RemoveAnger) {
        const state = getState();
        setState(state.filter(angerEmotion => angerEmotion.id !== id)); // Use setState here
    }

    @Action(UpdateAnger)
    updateAnger({ getState, setState }: StateContext<AngerEmotion[]>, { payload }: UpdateAnger) {
        const state = getState();
        setState(
            state.map(angerEmotion => 
                angerEmotion.id === payload.id ? { ...angerEmotion, ...payload } : angerEmotion)
        ); // Use setState here
    }
}
