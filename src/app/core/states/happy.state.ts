import { Action, Selector, State, StateContext } from "@ngxs/store";
import { HappyEmotion } from "../../shared/models/happy.model";
import { Injectable } from "@angular/core";
import { HappyService } from "../services/happy.service";
import { tap } from "rxjs";


export class GetHappy {
    static readonly type = '[Happy] Get'
}
export class AddHappy {
    static readonly type = '[Happy] Add';
    constructor(public payload: HappyEmotion) {}
}

export class RemoveHappy {
    static readonly type = '[Happy] Remove';
    constructor(public id: number) {}
}

export class UpdateHappy {
    static readonly type = '[Happy] Update';
    constructor(public payload: HappyEmotion) {}
}

@State<HappyEmotion[]>({
    name: 'happy',
    defaults: []
})
@Injectable()
export class HappyState {
    constructor(private happyService: HappyService) {}

    @Selector()
    static getAllHappys(state: HappyEmotion[]) {
        return state;
    }

    @Action(GetHappy)
    getHappy({setState}: StateContext<HappyEmotion[]>) {
        return this.happyService.getHappy().pipe(
            tap((happys : HappyEmotion[]) => {
                setState(happys);
            })
        )
    }

    @Action(AddHappy)
    addHappy({ getState, setState }: StateContext<HappyEmotion[]>, { payload }: AddHappy) {
        return this.happyService.addHappy(payload).pipe(
            tap(() => {
                const state = getState();
                setState([...state, payload]); // Use setState here
            })
        );
    }

    @Action(RemoveHappy)
    removeHappy({ getState, setState }: StateContext<HappyEmotion[]>, { id }: RemoveHappy) {
        const state = getState();
        setState(state.filter(happyEmotion => happyEmotion.id !== id));
        return null; //todo implement removeHappy method.
    }

    @Action(UpdateHappy)
    updateHappy({ getState, setState }: StateContext<HappyEmotion[]>, { payload }: UpdateHappy) {
        const state = getState();
        setState(
            state.map(happyEmotion => 
                happyEmotion.id === payload.id ? { ...happyEmotion, ...payload } : happyEmotion)
        ); // todo implement updateHappy method
    }
}
