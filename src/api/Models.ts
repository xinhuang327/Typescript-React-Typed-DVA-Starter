/* Do not change, this code is generated from Golang structs */


export interface MediaNodeLocation {
    slug: string
    id: string
    name: string
    has_public_page: boolean
}

export interface MediaLike {
    user: BasicUser;
}
export interface MediaNodeLikes {
    count: number
    viewer_has_liked: boolean
    nodes: MediaLike[]
}
export interface BasicUser {
    username: string
    profile_pic_url: string
    id: string
}
export interface MediaComment {
    text: string
    created_at: number
    id: string
    user: BasicUser;
}

export interface MediaNodeComments {
    count: number
    page_info: PageInfo;
    nodes: MediaComment[]
}
export interface MediaNodeOwner {
    username: string
    full_name: string
    requested_by_viewer: boolean
    followed_by_viewer: boolean
    has_blocked_viewer: boolean
    profile_pic_url: string
    is_unpublished: boolean
    blocked_by_viewer: boolean
    id: string
    is_private: boolean
}
export interface __MediaNode_usertags {
    nodes: any[]
}
export interface __MediaNode_dimensions {
    width: number
    height: number
}
export interface MediaNode {
    caption_is_edited: boolean
    code: string
    video_url: string
    dimensions: __MediaNode_dimensions;
    usertags: __MediaNode_usertags;
    owner: MediaNodeOwner;
    comments: MediaNodeComments;
    is_ad: boolean
    caption: string
    likes: MediaNodeLikes;
    date: number
    is_video: boolean
    id: string
    display_src: string
    thumbnail_src: string
    __typename: string
    sidecar_urls: string[]
    location: MediaNodeLocation;
}
export interface PageInfo {
    has_previous_page: boolean
    start_cursor: string
    end_cursor: string
    has_next_page: boolean
}
export interface UserProfileResponseUserMedia {
    count: number
    page_info: PageInfo;
    nodes: MediaNode[]
}
export interface __UserProfileResponseUser_followed_by {
    count: number
}
export interface __UserProfileResponseUser_follows {
    count: number
}
export interface UserProfileResponseUser {
    username: string
    has_blocked_viewer: boolean
    follows: __UserProfileResponseUser_follows;
    requested_by_viewer: boolean
    followed_by: __UserProfileResponseUser_followed_by;
    external_url_linkshimmed: string
    has_requested_viewer: boolean
    country_block: any;
    follows_viewer: boolean
    profile_pic_url_hd: string
    profile_pic_url: string
    is_private: boolean
    full_name: string
    media: UserProfileResponseUserMedia;
    blocked_by_viewer: boolean
    followed_by_viewer: boolean
    is_verified: boolean
    id: string
    biography: string
    external_url: string
}
export interface UserProfileResponse {
    user: UserProfileResponseUser;
    isChannel: boolean
}


export interface TFUserProfileCache {
    ID: number
    CreatedAt: Date;
    UpdatedAt: Date;
    Username: string
    UserID: string
    Language: string
    Data: UserProfileResponse;
}
export interface TFUserMediaCache {
    CreatedAt: Date;
    UpdatedAt: Date;
    ID: string
    Username: string
    UserID: string
    IsDetail: boolean
    Node: MediaNode;
    Language: string
    Script: string
}
export interface ____TagResponse_tag_top_posts {
    nodes: MediaNode[]
}


export interface ____TagResponse_tag_media {
    count: number
    page_info: PageInfo;
    nodes: MediaNode[]
}
export interface __TagResponse_tag {
    media: ____TagResponse_tag_media;
    content_advisory: any;
    top_posts: ____TagResponse_tag_top_posts;
    name: string
}
export interface TagResponse {
    tag: __TagResponse_tag;
}


export interface TFTagCache {
    ID: number
    CreatedAt: Date;
    UpdatedAt: Date;
    TagName: string
    Data: TagResponse;
}
export interface TFTagMediaCache {
    CreatedAt: Date;
    UpdatedAt: Date;
    ID: string
    TagName: string
    Node: MediaNode;
}
export interface TFUser {
    ID: number
    CreatedAt: Date;
    UpdatedAt: Date;
    Status: string
    NickName: string
    Email: string
    PasswordHash: string
    ApiToken: string
    LastLoginTime: Date;
    ApnDeviceToken: string
}
export interface TFUserCollectionIGUser {
    CreatedAt: Date;
    IGUserName: string
    IGUserID: string
    DisplayName: string
    FollowsCount: number
    FollowedByCount: number
    MediaCount: number
    MediaCountDiff: number
    ProfilePicURLHd: string
    ProfilePicURL: string
    IsPrivate: boolean
    FullName: string
    Biography: string
    Lang: string
}


export interface TFUserCollection {
    ID: number
    CreatedAt: Date;
    UpdatedAt: Date;
    IGUsers: TFUserCollectionIGUser[]
    OwnerID: number
    Category: string
    SubCategory: string
    DisplayName: string
    HasNew: boolean
}

export interface TFChannel {
    CreatedAt: Date;
    UpdatedAt: Date;
    ID: string
    Order: number
    Tags: string
    DisplayName: string
    ForLoggedInUser: boolean
}
export interface TFUserMark {
    ID: number
    CreatedAt: Date;
    UpdatedAt: Date;
    IGUserID: string
    IGUserName: string
    MarkType: string
}
export interface TFUserCollectionFeedMedia {
    ID: number
    CreatedAt: Date;
    UpdatedAt: Date;
    CollectionID: number
    Username: string
    Node: MediaNode;
}
export interface ____TopSearchResponse_users_user {
    username: string
    has_anonymous_profile_picture: boolean
    byline: string
    mutual_followers_count: number
    profile_pic_url: string
    full_name: string
    follower_count: number
    pk: string
    is_verified: boolean
    is_private: boolean
}
export interface __TopSearchResponse_users {
    position: number
    user: ____TopSearchResponse_users_user;
}
export interface ____TopSearchResponse_hashtags_hashtag {
    media_count: number
    name: string
    id: number
}
export interface __TopSearchResponse_hashtags {
    position: number
    hashtag: ____TopSearchResponse_hashtags_hashtag;
}
export interface TopSearchResponse {
    has_more: boolean
    status: string
    hashtags: __TopSearchResponse_hashtags[]
    users: __TopSearchResponse_users[]
    places: any[]
}
export interface MediaDetailResponse {
    media: MediaNode;
}
export interface IGUserSuggest {
    IGUserName: string
    Type: string
    Weight: number
    FullName: string
    ProfilePicURLHd: string
    ProfilePicURL: string
    FollowedByCount: number
}