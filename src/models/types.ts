import { Model, Action } from "typed-dva"
import { Dispatch } from "redux"

// defines a typed-dva model
export interface TypedModel<TState, TReducers, TEffects> extends Model {
	state: TState
	reducers: TReducers
	effects: TEffects
}

/* Effects */

// A Function takes actionGetter and returns TEffectFunc
// export type EffectLinkFunc<TEffects> = <TEffectFunc extends Function>(actionGetter: (effects: TEffects) => TEffectFunc) => TEffectFunc
export type EffectLinkFunc<TEffects> = <TActionProps>(actionGetter: (effects: TEffects) => ActionGeneratorFunc<TActionProps>) => ActionGeneratorFunc<TActionProps>

// Get EffectLinkFunc for the model
export function GetEffectLink<TState, TReducers, TEffects>
	(model: TypedModel<TState, TReducers, TEffects>): EffectLinkFunc<TEffects> {

	return function <TFunc extends Function>(actionGetter: (effects: TEffects) => TFunc): TFunc {
		// HACK: use regex to match action getter lambda function to get effect name!
		// Because original method of get name property will break when uglified in production build
		let re = /return \w+\.(\w+)/g
		let actionGetterFuncText = actionGetter.toString()
		// console.log("actionGetter", re.exec(actionGetterFuncText))
		let effectName = re.exec(actionGetterFuncText)[1]
		let type = model.namespace + "/" + effectName

		return function (parameter: Object): Action {
			return { type, ...parameter }
		} as any
	}
}

// Takes action props and returns a action object
export type ActionGeneratorFunc<TActionProps> = (actionProps?: TActionProps) => Action
// export type ActionGeneratorFuncVoid = () => Action

// For auto effect dispatching
export function GetDispatchEffectFunc<TEffects>
	(dispatch: Dispatch<any>, effectLink: EffectLinkFunc<TEffects>):
	EffectLinkFunc<TEffects> {

	return function <TActionProps>
		(actionGetter: (e: TEffects) => ActionGeneratorFunc<TActionProps>): ActionGeneratorFunc<TActionProps> {
		// When calling returned function, the action will be dispatched
		let innerFunc = effectLink(actionGetter)
		return function (param?: TActionProps): Action {
			return dispatch(innerFunc(param))
		}
	}
}


/* Reducers */

export type ReducerFunc<TState, TAction> = (state: TState, action: TAction) => TState

// A Function takes actionGetter and returns ActionGeneratorFunc
export type ReducerLinkFunc<TState, TReducers> =
	<TActionProps>(actionGetter: (reducers: TReducers) => ReducerFunc<TState, TActionProps>) => ActionGeneratorFunc<TActionProps>

// Get ReducerLinkFunc for the model
export function GetReducerLink<TState, TReducers, TEffects>
	(model: TypedModel<TState, TReducers, TEffects>):
	ReducerLinkFunc<TState, TReducers> {

	return function <TActionProps>
		(actionGetter: (reducers: TReducers) => ReducerFunc<TState, TActionProps>): ActionGeneratorFunc<TActionProps> {
		// let type = model.namespace + "/" + actionGetter(model.reducers).name	
		// HACK: use regex to match action getter lambda function to get effect name!
		// Because original method of get name property will break when uglified in production build
		let re = /return \w+\.(\w+)/g
		let actionGetterFuncText = actionGetter.toString()
		// console.log("actionGetter", re.exec(actionGetterFuncText))
		let effectName = re.exec(actionGetterFuncText)![1]
		let type = model.namespace + "/" + effectName

		return function (parameter: Object): Action {
			return { type, ...parameter }
		} as any
	}
}


// For auto reducer dispatching
export function GetDispatchReducerFunc<TState, TReducers>
	(dispatch: Dispatch<any>, reducerLink: ReducerLinkFunc<TState, TReducers>):
	ReducerLinkFunc<TState, TReducers> {

	return function <TActionProps>
		(actionGetter: (reducers: TReducers) => ReducerFunc<TState, TActionProps>): ActionGeneratorFunc<TActionProps> {
		// When calling returned function, the action will be dispatched
		let innerFunc = reducerLink(actionGetter)
		return function (param: TActionProps): Action {
			return dispatch(innerFunc(param))
		}
	}
}

/* Dispatch */

export interface TypedDispatch<TState, TReducers, TEffects> {
	Do: Dispatch<any>
	Reducer: ReducerLinkFunc<TState, TReducers>
	Effect: EffectLinkFunc<TEffects>
}

// Returns helper dispatch object for the model
export function GetTypedDispatch<TState, TReducers, TEffects>(model: TypedModel<TState, TReducers, TEffects>, dispatch: Dispatch<any>): TypedDispatch<TState, TReducers, TEffects> {
	return {
		Do: dispatch,
		Reducer: GetDispatchReducerFunc(dispatch, GetReducerLink(model)),
		Effect: GetDispatchEffectFunc(dispatch, GetEffectLink(model)),
	}
}