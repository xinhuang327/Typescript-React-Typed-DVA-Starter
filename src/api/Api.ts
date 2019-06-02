
import * as api from "./ApiBase"
import {apiPOST, apiGET, ApiResult, IResponse, Ret, Paging, PagedRows, QueryOption} from "./ApiBase"
export * from "./ApiBase"
import * as models from "./Models"

export class Api {
    // // File:   api_default.go
 
    // Get User Profile 
    // ApiResult_DataType: models.UserProfileResponse 
    
	static GetUserProfile(query: {
        username?: string,
		max_id?: string,
		}): Promise<Ret<models.UserProfileResponse>> {
		
		return new Promise((resolve, reject) => {
			apiPOST("GetUserProfile"+'?'+'username='+query.username+'&'+'max_id='+query.max_id, null, null, false, (err, res) => {
				resolve({ err, res, apiResult: !res? null : res.jsonData as ApiResult<models.UserProfileResponse> })
			});
		})
    }
    
    // Get Tag 
    // ApiResult_DataType: models.TagResponse 
    
	static GetTag(query: {
        tagName?: string,
		max_id?: string,
		}): Promise<Ret<models.TagResponse>> {
		
		return new Promise((resolve, reject) => {
			apiPOST("GetTag"+'?'+'tagName='+query.tagName+'&'+'max_id='+query.max_id, null, null, false, (err, res) => {
				resolve({ err, res, apiResult: !res? null : res.jsonData as ApiResult<models.TagResponse> })
			});
		})
    }
    
    // Get Top Search 
    // ApiResult_DataType: models.TopSearchResponse 
    
	static GetTopSearch(query: {
        query?: string,
		}): Promise<Ret<models.TopSearchResponse>> {
		
		return new Promise((resolve, reject) => {
			apiPOST("GetTopSearch"+'?'+'query='+query.query, null, null, false, (err, res) => {
				resolve({ err, res, apiResult: !res? null : res.jsonData as ApiResult<models.TopSearchResponse> })
			});
		})
    }
    
    // Get Media Detail 
    // ApiResult_DataType: models.MediaDetailResponse 
    
	static GetMediaDetail(query: {
        mediaCode?: string,
		}): Promise<Ret<models.MediaDetailResponse>> {
		
		return new Promise((resolve, reject) => {
			apiPOST("GetMediaDetail"+'?'+'mediaCode='+query.mediaCode, null, null, false, (err, res) => {
				resolve({ err, res, apiResult: !res? null : res.jsonData as ApiResult<models.MediaDetailResponse> })
			});
		})
    }
    
    // Get User Collection user items 
    // ApiResult_DataType: models.TFUserCollectionIGUser[] 
    
	static GetUserCollectionUsersByName(query: {
        name?: string,
		lang?: string,
		skipCount?: number,
		}): Promise<Ret<models.TFUserCollectionIGUser[]>> {
		
		return new Promise((resolve, reject) => {
			apiGET("GetUserCollectionUsersByName"+'?'+'name='+query.name+'&'+'lang='+query.lang+'&'+'skipCount='+query.skipCount, null,  false, (err, res) => {
				resolve({ err, res, apiResult: !res? null : res.jsonData as ApiResult<models.TFUserCollectionIGUser[]> })
			});
		})
    }
    
    // Get User Collection 
    // ApiResult_DataType: models.TFUserCollection 
    
	static GetUserCollectionByName(query: {
        name?: string,
		}): Promise<Ret<models.TFUserCollection>> {
		
		return new Promise((resolve, reject) => {
			apiPOST("GetUserCollectionByName"+'?'+'name='+query.name, null, null, false, (err, res) => {
				resolve({ err, res, apiResult: !res? null : res.jsonData as ApiResult<models.TFUserCollection> })
			});
		})
    }
    
    // Get Similar IG User 
    // ApiResult_DataType: models.IGUserSuggest[] 
    
	static GetSimilarIGUsers(query: {
        igUsername?: string,
		}): Promise<Ret<models.IGUserSuggest[]>> {
		
		return new Promise((resolve, reject) => {
			apiPOST("GetSimilarIGUsers"+'?'+'igUsername='+query.igUsername, null, null, false, (err, res) => {
				resolve({ err, res, apiResult: !res? null : res.jsonData as ApiResult<models.IGUserSuggest[]> })
			});
		})
    }
    
    // // File:   api_admin.go
 
    // Add IG User to User Fav Collection 
    // ApiResult_DataType: any 
    
	static AddToFavUsers(query: {
        igUsername?: string,
		}): Promise<Ret<any>> {
		
		return new Promise((resolve, reject) => {
			apiPOST("AddToFavUsers"+'?'+'igUsername='+query.igUsername, null, null, false, (err, res) => {
				resolve({ err, res, apiResult: !res? null : res.jsonData as ApiResult<any> })
			});
		})
    }
    
    // Remove IG User from User Fav Collection 
    // ApiResult_DataType: any 
    
	static RemoveFromFavUsers(query: {
        igUsername?: string,
		}): Promise<Ret<any>> {
		
		return new Promise((resolve, reject) => {
			apiPOST("RemoveFromFavUsers"+'?'+'igUsername='+query.igUsername, null, null, false, (err, res) => {
				resolve({ err, res, apiResult: !res? null : res.jsonData as ApiResult<any> })
			});
		})
    }
    
    // Get User Fav Collection's IG Users 
    // ApiResult_DataType: models.TFUserCollectionIGUser[] 
    
	static GetFavUsers(): Promise<Ret<models.TFUserCollectionIGUser[]>> {
		
		return new Promise((resolve, reject) => {
			apiPOST("GetFavUsers"+'', null, null, false, (err, res) => {
				resolve({ err, res, apiResult: !res? null : res.jsonData as ApiResult<models.TFUserCollectionIGUser[]> })
			});
		})
    }
    
    // MarkAllFavUserNewToZero 
    // ApiResult_DataType: any 
    
	static ClearAllMediaCountDiff(): Promise<Ret<any>> {
		
		return new Promise((resolve, reject) => {
			apiPOST("ClearAllMediaCountDiff"+'', null, null, false, (err, res) => {
				resolve({ err, res, apiResult: !res? null : res.jsonData as ApiResult<any> })
			});
		})
    }
    
    // Sign in for web 
    // ApiResult_DataType: models.TFUser 
    
	static SignInWeb(query: {
        email?: string,
		password?: string,
		}): Promise<Ret<models.TFUser>> {
		
		return new Promise((resolve, reject) => {
			apiPOST("SignInWeb"+'?'+'email='+query.email+'&'+'password='+query.password, null, null, false, (err, res) => {
				resolve({ err, res, apiResult: !res? null : res.jsonData as ApiResult<models.TFUser> })
			});
		})
    }
    
    // Register new user 
    // ApiResult_DataType: models.TFUser 
    
	static RegisterUser(query: {
        email?: string,
		password?: string,
		}): Promise<Ret<models.TFUser>> {
		
		return new Promise((resolve, reject) => {
			apiPOST("RegisterUser"+'?'+'email='+query.email+'&'+'password='+query.password, null, null, false, (err, res) => {
				resolve({ err, res, apiResult: !res? null : res.jsonData as ApiResult<models.TFUser> })
			});
		})
    }
    
    // Change password 
    // ApiResult_DataType: any 
    
	static ChangePassword(query: {
        email?: string,
		password?: string,
		newPassword?: string,
		}): Promise<Ret<any>> {
		
		return new Promise((resolve, reject) => {
			apiPOST("ChangePassword"+'?'+'email='+query.email+'&'+'password='+query.password+'&'+'newPassword='+query.newPassword, null, null, false, (err, res) => {
				resolve({ err, res, apiResult: !res? null : res.jsonData as ApiResult<any> })
			});
		})
    }
    
    // Resend Activation Mail 
    // ApiResult_DataType: any 
    
	static ResendActivationMail(query: {
        email?: string,
		password?: string,
		}): Promise<Ret<any>> {
		
		return new Promise((resolve, reject) => {
			apiPOST("ResendActivationMail"+'?'+'email='+query.email+'&'+'password='+query.password, null, null, false, (err, res) => {
				resolve({ err, res, apiResult: !res? null : res.jsonData as ApiResult<any> })
			});
		})
    }
    
    // Sign out for web 
    // ApiResult_DataType: any 
    
	static SignOutWeb(): Promise<Ret<any>> {
		
		return new Promise((resolve, reject) => {
			apiPOST("SignOutWeb"+'', null, null, false, (err, res) => {
				resolve({ err, res, apiResult: !res? null : res.jsonData as ApiResult<any> })
			});
		})
    }
    
    // Submit Forget password 
    // ApiResult_DataType: models.TFUser 
    
	static SubmitForgetPassword(query: {
        email?: string,
		}): Promise<Ret<models.TFUser>> {
		
		return new Promise((resolve, reject) => {
			apiPOST("SubmitForgetPassword"+'?'+'email='+query.email, null, null, false, (err, res) => {
				resolve({ err, res, apiResult: !res? null : res.jsonData as ApiResult<models.TFUser> })
			});
		})
    }
    
    // MarkAllFavUserNewToZero 
    // ApiResult_DataType: any 
    
	static MarkUser(query: {
        igUserName?: string,
		igUserID?: string,
		markType?: string,
		}): Promise<Ret<any>> {
		
		return new Promise((resolve, reject) => {
			apiPOST("MarkUser"+'?'+'igUserName='+query.igUserName+'&'+'igUserID='+query.igUserID+'&'+'markType='+query.markType, null, null, false, (err, res) => {
				resolve({ err, res, apiResult: !res? null : res.jsonData as ApiResult<any> })
			});
		})
    }
    
    
}

export class ResultType {
    // // File:   api_default.go
 
    // Get User Profile 
    // ApiResult_DataType: models.UserProfileResponse 
    
    static GetUserProfile(action: any): Ret<models.UserProfileResponse> {
        let ret = action.ret ? action.ret : action
        return {
            err: ret.err,
            res: ret.res as IResponse,
            apiResult: ret.apiResult as ApiResult<models.UserProfileResponse>
        }
    }
    
    // Get Tag 
    // ApiResult_DataType: models.TagResponse 
    
    static GetTag(action: any): Ret<models.TagResponse> {
        let ret = action.ret ? action.ret : action
        return {
            err: ret.err,
            res: ret.res as IResponse,
            apiResult: ret.apiResult as ApiResult<models.TagResponse>
        }
    }
    
    // Get Top Search 
    // ApiResult_DataType: models.TopSearchResponse 
    
    static GetTopSearch(action: any): Ret<models.TopSearchResponse> {
        let ret = action.ret ? action.ret : action
        return {
            err: ret.err,
            res: ret.res as IResponse,
            apiResult: ret.apiResult as ApiResult<models.TopSearchResponse>
        }
    }
    
    // Get Media Detail 
    // ApiResult_DataType: models.MediaDetailResponse 
    
    static GetMediaDetail(action: any): Ret<models.MediaDetailResponse> {
        let ret = action.ret ? action.ret : action
        return {
            err: ret.err,
            res: ret.res as IResponse,
            apiResult: ret.apiResult as ApiResult<models.MediaDetailResponse>
        }
    }
    
    // Get User Collection user items 
    // ApiResult_DataType: models.TFUserCollectionIGUser[] 
    
    static GetUserCollectionUsersByName(action: any): Ret<models.TFUserCollectionIGUser[]> {
        let ret = action.ret ? action.ret : action
        return {
            err: ret.err,
            res: ret.res as IResponse,
            apiResult: ret.apiResult as ApiResult<models.TFUserCollectionIGUser[]>
        }
    }
    
    // Get User Collection 
    // ApiResult_DataType: models.TFUserCollection 
    
    static GetUserCollectionByName(action: any): Ret<models.TFUserCollection> {
        let ret = action.ret ? action.ret : action
        return {
            err: ret.err,
            res: ret.res as IResponse,
            apiResult: ret.apiResult as ApiResult<models.TFUserCollection>
        }
    }
    
    // Get Similar IG User 
    // ApiResult_DataType: models.IGUserSuggest[] 
    
    static GetSimilarIGUsers(action: any): Ret<models.IGUserSuggest[]> {
        let ret = action.ret ? action.ret : action
        return {
            err: ret.err,
            res: ret.res as IResponse,
            apiResult: ret.apiResult as ApiResult<models.IGUserSuggest[]>
        }
    }
    
    // // File:   api_admin.go
 
    // Add IG User to User Fav Collection 
    // ApiResult_DataType: any 
    
    static AddToFavUsers(action: any): Ret<any> {
        let ret = action.ret ? action.ret : action
        return {
            err: ret.err,
            res: ret.res as IResponse,
            apiResult: ret.apiResult as ApiResult<any>
        }
    }
    
    // Remove IG User from User Fav Collection 
    // ApiResult_DataType: any 
    
    static RemoveFromFavUsers(action: any): Ret<any> {
        let ret = action.ret ? action.ret : action
        return {
            err: ret.err,
            res: ret.res as IResponse,
            apiResult: ret.apiResult as ApiResult<any>
        }
    }
    
    // Get User Fav Collection's IG Users 
    // ApiResult_DataType: models.TFUserCollectionIGUser[] 
    
    static GetFavUsers(action: any): Ret<models.TFUserCollectionIGUser[]> {
        let ret = action.ret ? action.ret : action
        return {
            err: ret.err,
            res: ret.res as IResponse,
            apiResult: ret.apiResult as ApiResult<models.TFUserCollectionIGUser[]>
        }
    }
    
    // MarkAllFavUserNewToZero 
    // ApiResult_DataType: any 
    
    static ClearAllMediaCountDiff(action: any): Ret<any> {
        let ret = action.ret ? action.ret : action
        return {
            err: ret.err,
            res: ret.res as IResponse,
            apiResult: ret.apiResult as ApiResult<any>
        }
    }
    
    // Sign in for web 
    // ApiResult_DataType: models.TFUser 
    
    static SignInWeb(action: any): Ret<models.TFUser> {
        let ret = action.ret ? action.ret : action
        return {
            err: ret.err,
            res: ret.res as IResponse,
            apiResult: ret.apiResult as ApiResult<models.TFUser>
        }
    }
    
    // Register new user 
    // ApiResult_DataType: models.TFUser 
    
    static RegisterUser(action: any): Ret<models.TFUser> {
        let ret = action.ret ? action.ret : action
        return {
            err: ret.err,
            res: ret.res as IResponse,
            apiResult: ret.apiResult as ApiResult<models.TFUser>
        }
    }
    
    // Change password 
    // ApiResult_DataType: any 
    
    static ChangePassword(action: any): Ret<any> {
        let ret = action.ret ? action.ret : action
        return {
            err: ret.err,
            res: ret.res as IResponse,
            apiResult: ret.apiResult as ApiResult<any>
        }
    }
    
    // Resend Activation Mail 
    // ApiResult_DataType: any 
    
    static ResendActivationMail(action: any): Ret<any> {
        let ret = action.ret ? action.ret : action
        return {
            err: ret.err,
            res: ret.res as IResponse,
            apiResult: ret.apiResult as ApiResult<any>
        }
    }
    
    // Sign out for web 
    // ApiResult_DataType: any 
    
    static SignOutWeb(action: any): Ret<any> {
        let ret = action.ret ? action.ret : action
        return {
            err: ret.err,
            res: ret.res as IResponse,
            apiResult: ret.apiResult as ApiResult<any>
        }
    }
    
    // Submit Forget password 
    // ApiResult_DataType: models.TFUser 
    
    static SubmitForgetPassword(action: any): Ret<models.TFUser> {
        let ret = action.ret ? action.ret : action
        return {
            err: ret.err,
            res: ret.res as IResponse,
            apiResult: ret.apiResult as ApiResult<models.TFUser>
        }
    }
    
    // MarkAllFavUserNewToZero 
    // ApiResult_DataType: any 
    
    static MarkUser(action: any): Ret<any> {
        let ret = action.ret ? action.ret : action
        return {
            err: ret.err,
            res: ret.res as IResponse,
            apiResult: ret.apiResult as ApiResult<any>
        }
    }
    
    
}

