import { T, timeAgoFormatter } from "./I18n"
import { TFUser } from "../api/Models";
import { encSuf } from "./encsuf"

export function optional(defaultValue, input, ...evaluators) {
	let v = input
	let hasValue = true
	for (let ev of evaluators) {
		if (!v) {
			hasValue = false
			break
		}
		v = ev(v)
	}
	if (hasValue) {
		return v
	}
	return defaultValue
}

export function objAssign<T, U>(source1: T, source2: U): T & U {
	return Object.assign({}, source1, source2)
}

export function objAssignProp<T, U>(source1: T, propName: string, propValue: any): T {
	let source2 = {}
	source2[propName] = propValue
	return Object.assign({}, source1, source2)
}

export function objAssignTyped<T>(source1: T, source2: T): T {
	return Object.assign({}, source1, source2)
}

export function getCtxData(): any {
	if ((window as any).ctxData) {
		return (window as any).ctxData
	} else {
		return {}
	}
}

export function getLoggedInUser(): TFUser {
	return getCtxData().loggedInUser as TFUser
}

export function isAdminLoggedIn(): boolean {
	return getLoggedInUser() && getLoggedInUser().ID == 1
}


export function getAuthObj(): any {
	let { userID, passwordHash } = getCtxData()
	if (userID && passwordHash) {
		return { ID: userID, PasswordHash: passwordHash }
	} else {
		return null
	}
}

export function arraysEqual(a, b) {
	if (a == b) return true;
	if (a == null || b == null) return false;
	if (a.length != b.length) return false;
	for (var i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) return false;
	}
	return true;
}

// a:[1,2,3], b[1,2] returns true
export function arraysHasPrefix(a, b) {
	if (a == b) return false;
	if (!a || !b) return false;
	if (a.length <= b.length) return false;
	for (var i = 0; i < b.length; ++i) {
		if (a[i] !== b[i]) return false;
	}
	return true;
}

export function calculatePageCount(pageSize: number, totalRows: number): number {
	if (totalRows % pageSize == 0) {
		return totalRows / pageSize
	} else {
		return Math.floor(totalRows / pageSize) + 1
	}
}

export function removePrefix(str: string, prefix: string): string {
	if (str && str.startsWith(prefix)) {
		return str.substr(prefix.length, str.length - prefix.length)
	}
	return str
}

let isLangZh = (function () {
	let ctxData = (window as any).ctxData
	if (ctxData && ctxData.lang) {
		let lang = ctxData.lang as string
		if (lang.startsWith("zh-cn") || lang.startsWith("zh,") || lang.startsWith("zh;")) {
			return true
		}
	}
	if (navigator && navigator.language && navigator.language.toLowerCase) {
		if (navigator.language.toLowerCase().startsWith("zh-") || navigator.language.toLowerCase() == "zh") {
			return true
		}
	}
	return false
})()


var Base64Module = require('../Util/Base64.js')
var Base64 = (window as any).Base64

// https://scontent-lhr3-1.cdninstagram.com/vp/ca59c194830f16d075b5fbd9462e85dc/5CF3BE88/t51.2885-15/sh0.08/e35/s640x640/
// 50943476_119250595830699_4475412821363510091_n.jpg?_nc_ht=scontent-lhr3-1.cdninstagram.com

export function getWinPad(u: string) {

	// return u // disable ins proxy, no Chinese users.

	if (!isLangZh) {
		return u
	}
	if (!u) {
		return u
	}

	// New Method:  012345.789
	var dotIdx = u.lastIndexOf(".")
	var ext = u.substring(dotIdx)
	// var ext = u.indexOf(".jpg") > -1 ? ".jpg" : ".mp4";
	var u = u.substr(0, u.lastIndexOf('.'));
	var u = u.replace("http://", "").replace("https://", "")
		.replace(/instagram/g, "_iii_")
		.replace(/fbcdn/g, "_fff_")

	let result = encSuf(u)
	ext = result[0] + ext;
	// let slashIdx = upath.lastIndexOf("/")
	// let num = parseInt(upath.substr(slashIdx + 1, 4))
	// if (!num) {
	// 	num = 0
	// }

	// // let subdomains = ["x", "ip1", "ip2", "ip3", "ip4", "ip5"]
	// let subdomains = ["x", "ip1", "ip2"]
	// let randDomain = subdomains[Math.abs(num) % subdomains.length]
	// return "https://" + randDomain + ".gto.cc" + "/img/" + upath

	return "https://x.gto.cc" + "/img/" + u + ext;
	// return "http://localhost:8010" + "/img/" + u + ext;
}

// (window as any).getWinPad = getWinPad

export function convertToKNumber(num) {
	if (getCtxData() && getCtxData()["lang"].startsWith("zh")) {
		if (num) {
			if (num > 99999999) {
				return Math.floor(num / 10000000) / 10 + "亿";
			}
			if (num > 9999) {
				return Math.floor(num / 10000) + "万";
			}
			if (num > 999) {
				return Math.floor(num / 1000) + "千";
			}
		}
		return num
	}
	if (num) {
		if (num > 999999) {
			return Math.floor(num / 100000) / 10 + T("m");
		}
		if (num > 999) {
			return Math.floor(num / 1000) + T("k");
		}
	}
	return num
}

export function tweetfyHtml(html, linkTarget): any {
	if (!html) {
		return { __html: "" }
	}
	let userPageBaseUrl = ""
	let searchTagBaseUrl = "/tag"
	if (html) {
		html = html.replace(/@([^\s#@,:"!?~<>]*)/g, "<a href='" + userPageBaseUrl + "/$1' target='" + linkTarget + "'>@$1</a>")
		html = html.replace(/#([^\s#@,:"!?~<>]*)/g, "<a href='" + searchTagBaseUrl + "/$1' target='" + linkTarget + "'>#$1</a>")
	}
	return { __html: html }
}

export function getInitialApiResult(): any {
	let win = window as any
	if (win.ctxData && win.ctxData.initialApiResult && win.ctxData.initialApiResult.Success) {
		let ret = Object.assign(win.ctxData.initialApiResult, {})
		win.ctxData.initialApiResult = null // clear after first use
		return ret
	}
	return null
}