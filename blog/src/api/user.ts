// 用户类型模型
export interface User {
    id: number;
    username: string;
    createdTime: string;
    profile: Profile
}
// 用户信息模型
export interface Profile {
    id: number;
    nickName: string;
    avatar: string;
    signature: string;
    homepage: string;
    userId: string;
    createdTime: string;
    updatedTime: string;
}
