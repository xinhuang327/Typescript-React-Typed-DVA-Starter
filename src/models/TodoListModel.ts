//
//  TodoListModel.ts
//  Typed-DVA-Starter
//
//	Todo List DVA model implementation 
//
//  Copyright © 2019 HuangXin. All rights reserved.
//
import { Router } from 'react-router';
import { Model, Action } from "typed-dva"
import { EffectsCommandMap } from "typed-dva/src/createDva"
import { push, replace, RouterState } from 'react-router-redux'
import { delay } from "redux-saga"
import { call, take, put, select, race } from 'redux-saga/effects'
import { TypedModel, ReducerFunc, GetEffectLink, GetReducerLink, TypedDispatch } from "./types"

import { Api, ResultType, Ret, Paging, PagedRows, ChangeInfo, ApiResult } from "../api/Api"
import { UserProfileResponse, TagResponse, MediaDetailResponse, MediaNode } from "../api/Models"
import * as api from "../api/ApiBase"
import { checkApiError, getApiError } from "../api/ApiBase"
import { States } from "./states"

// State
export interface TodoListState {
    html?: string
}


// Reducers
export interface TodoListReducers {
    SetState: ReducerFunc<TodoListState, TodoListState>
}

// Effects, defines most user actions
export interface TodoListEffects {
    LoadHtml({ infoName }: { infoName: string })
}

// Simplified type name for Todo List Model
export type TodoListModel = TypedModel<TodoListState, TodoListReducers, TodoListEffects>

// Model implementation
export let model: TodoListModel = {

    namespace: 'TodoList',

    state: {
    },

    reducers: {
        SetState(state, action): TodoListState {
            return { ...state, ...action }
        },
    },

    effects: {
        *LoadHtml({ infoName }) {
            let resp: Response = yield fetch("/info_pages/" + infoName + ".html")
            let html = yield resp.text()
            yield put(reducers(r => r.SetState)({ html }))
        }
    },
}

// Synatx sugar for binding reducers/effects with views
export let reducers = GetReducerLink(model)
export let effects = GetEffectLink(model)

export type TodoListDispatch = TypedDispatch<TodoListState, TodoListReducers, TodoListEffects>

