import {State, Action, StateContext, Selector} from '@ngxs/store';
import { Injectable } from "@angular/core";
import { AngerEmotion } from '../../shared/models/anger.model';
import { AngerService } from '../services/anger.service';
import { tap } from 'rxjs/operators';


export class GetAnger {
    static readonly type = '[Anger] Get'
}
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
    constructor(private angerService: AngerService) {}

    @Selector()
    static getAllAngers(state: AngerEmotion[]) {
        return state;
    }

    @Action(GetAnger)
    getAnger({setState}: StateContext<AngerEmotion[]>) {
        return this.angerService.getAnger().pipe(
            tap((angers : AngerEmotion[]) => {
                setState(angers);
            })
        )
    }

    @Action(AddAnger)
    addAnger({ getState, setState }: StateContext<AngerEmotion[]>, { payload }: AddAnger) {
        return this.angerService.addAnger(payload).pipe(
            tap(() => {
                const state = getState();
                setState([...state, payload]); // Use setState here
            })
        );
    }

    @Action(RemoveAnger)
    removeAnger({ getState, setState }: StateContext<AngerEmotion[]>, { id }: RemoveAnger) {
        const state = getState();
        setState(state.filter(angerEmotion => angerEmotion.id !== id));
        return null; //todo implement removeAnger method.
    }

    @Action(UpdateAnger)
    updateAnger({ getState, setState }: StateContext<AngerEmotion[]>, { payload }: UpdateAnger) {
        const state = getState();
        setState(
            state.map(angerEmotion => 
                angerEmotion.id === payload.id ? { ...angerEmotion, ...payload } : angerEmotion)
        ); // todo implement updateAnger method
    }
}
