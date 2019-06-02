// interface TranslationItem { id: string; translation: string; }

export function T(id: string, params?: { [key: string]: any }): string {
	var translations = (window as any).translations
	for (var pair of translations) {
		if (pair.id == id) {
			return pair.translation
		}
	}
	return id
}

let ta_buildFormatter = require('react-timeago/lib/formatters/buildFormatter').default
let ta_en = require('./language-strings/en').default
let ta_zhcn = require('./language-strings/zh-CN').default
let ta_zhtw = require('./language-strings/zh-TW').default
let ta_ja = require('./language-strings/ja').default
let ta_ko = require('./language-strings/ko').default
let ta_ru = require('./language-strings/ru').default
let ta_de = require('./language-strings/de').default
let ta_languages = {
	"en": ta_en,
	"zh-cn": ta_zhcn,
	"zh-tw": ta_zhtw,
	"ja": ta_ja,
	"ko": ta_ko,
	"ru": ta_ru,
	"de": ta_de,
}

function ta_defaultFormatter(value, unit, suffix) {
	if (value !== 1) {
		unit += 's'
	}
	return value + ' ' + unit + ' ' + suffix
}

function getTimeAgoFormatter(): any {
	let lang = ((window as any).ctxData.lang as string).toLowerCase()
	let langBase = lang.substr(0, 2)
	if (langBase == "en") {
		return ta_defaultFormatter
	}
	let ta_lang = ta_languages[lang]
	if (!ta_lang) {
		ta_lang = ta_languages[langBase]
	}
	if (ta_lang) {
		return ta_buildFormatter(ta_lang)
	}
	return ta_defaultFormatter
}

export let timeAgoFormatter: any = getTimeAgoFormatter()
