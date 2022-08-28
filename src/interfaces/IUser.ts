interface IUserImage {
    png: string
    webp: string
}

export interface IUser {
    image?: IUserImage
    username?: string
}