const todoApi = {
    verifyUser: `${process.env.REACT_APP_BASEURL}/verify`,
    getUserData: `${process.env.REACT_APP_BASEURL}/getUserData`
}
export const path = {
    root: '/',
    ...todoApi
}