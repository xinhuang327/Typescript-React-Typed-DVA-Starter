//
//  states.ts
//  Typed-DVA-Starter
//
//	Register child model states into a single root state
//
//  Copyright © 2019 HuangXin. All rights reserved.
//
import { RouterState } from "react-router-redux"
import { TodoListState } from "./TodoListModel"

export interface States {
    TodoList: TodoListState,
}