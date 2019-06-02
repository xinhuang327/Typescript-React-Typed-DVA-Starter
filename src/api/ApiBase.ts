// import { getCtxData } from "../Util/Utility"
// import 'whatwg-fetch'
import "isomorphic-fetch" // implicit js dependicy

// TODO: implement getCtxData
function getCtxData(): any {
	return {}
}

let API_HOST = "//127.0.0.1:8089/api/"

if (process.env.NODE_ENV == "production") {
	API_HOST = "//" + window.location.hostname + "/api/"
}

API_HOST = "/api/"

export interface IResponse {
	type: ResponseType;
	url: string;
	status: number;
	ok: boolean;
	statusText: string;
	headers: Headers;
	jsonData: any; // don't use body as name, conflict
}

export function apiPOST(endpoint: string, query: any, payload: any, needsAuth: boolean, endCallback: (err: any, res: IResponse) => void) {
	let allPayloads = null
	if (needsAuth) {
		let { userID, passwordHash } = getCtxData()
		allPayloads = { ID: userID, PasswordHash: passwordHash }
	}
	if (payload) {
		if (allPayloads) {
			// join auth payload and input payload
			if (Array.isArray(payload)) {
				let payloadArr = payload as Array<any>
				payloadArr.unshift(allPayloads)
				allPayloads = payloadArr
			} else {
				allPayloads = [allPayloads, payload]
			}
		} else {
			// use input payload as all payloads
			if (Array.isArray(payload) && payload.length == 1) {
				allPayloads = payload[0]
			} else {
				allPayloads = payload
			}
		}
	}

	fetch(API_HOST + endpoint, {
		method: "POST",
		body: JSON.stringify(allPayloads),
		credentials: 'include',
	}).then((response) => {
		let res = response as any
		response.json().then(json => {
			res.jsonData = json
			endCallback(null, res)
		}).catch((err => {
			endCallback(err, null)
		}))
	}).catch((err) => {
		endCallback(err, null)
	})
}

export function apiGET(endpoint: string, query: any, needsAuth: boolean, endCallback: (err: any, res: IResponse) => void) {

	fetch(API_HOST + endpoint, {
		method: "GET",
	}).then((response) => {
		let res = response as any
		response.json().then(json => {
			res.jsonData = json
			endCallback(null, res)
		}).catch((err => {
			endCallback(err, null)
		}))
	}).catch((err) => {
		endCallback(err, null)
	})
}



export function checkApiError(ret: Ret<any>): boolean {
	if (ret.err) {
		return true
	} else if (ret.apiResult && ret.apiResult.Error) {
		return true
	}
	return false
}

export function getApiError(ret: Ret<any>): string {
	if (ret.err) {
		return ret.err.toString()
	} else if (ret.apiResult && ret.apiResult.Error) {
		return ret.apiResult.Error
	}
	return ""
}

export interface Ret<T> {
	err?: any
	res?: IResponse
	apiResult?: ApiResult<T>
}

export class ApiResult<T> {
	Success: boolean
	Data: T
	Error: string
}


export class Paging {
	PageSize?: number
	PageNum?: number
	TotalRows?: number

	constructor(init?: Paging) {
		if (!init) return
		if (init.PageSize) this.PageSize = init.PageSize
		if (init.PageNum) this.PageNum = init.PageNum
		if (init.TotalRows) this.TotalRows = init.TotalRows
	}

}
export class PagedRows<T> {
	Rows?: T[]
	Paging?: Paging

	constructor(init?: PagedRows<T>) {
		if (!init) return
		if (init.Rows) this.Rows = init.Rows
		if (init.Paging) this.Paging = init.Paging
	}

}

export class QueryOption {
	GetCount?: boolean
	GetFirst?: boolean
	GetExists?: boolean

	constructor(init?: QueryOption) {
		if (!init) return
		if (init.GetCount) this.GetCount = init.GetCount
		if (init.GetFirst) this.GetFirst = init.GetFirst
		if (init.GetExists) this.GetExists = init.GetExists
	}

}


export class ChangeInfo {
	Updated?: number
	Removed?: number
	Matched?: number
	UpsertedId?: any

	constructor(init?: ChangeInfo) {
		if (!init) return
		if (init.Updated) this.Updated = init.Updated
		if (init.Removed) this.Removed = init.Removed
		if (init.Matched) this.Matched = init.Matched
		if (init.UpsertedId) this.UpsertedId = init.UpsertedId
	}

}
