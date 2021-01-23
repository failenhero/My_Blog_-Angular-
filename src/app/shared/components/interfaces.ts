export interface User {
  email: string,
  password: string
}

export interface Post {
  id?: string,
  title: string,
  text: string,
  email: any,
  date: Date
}


export interface FbAuthResponse {
  idToken: string
}
