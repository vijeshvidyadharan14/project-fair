import commonAPI from "./commonAPI";
import SERVER_BASE_URL from "./serverURL";

// registerAPI
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_BASE_URL}/register`, reqBody);
}

// login API
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_BASE_URL}/login`, reqBody)
}

// add-project
export const addProjectAPI = async (reqBody,reqHeader) => {
    return await commonAPI("POST", `${SERVER_BASE_URL}/add-project`, reqBody, reqHeader)
}

// home projects
export const HomeProjectsAPI = async () => {
    return await commonAPI("GET",`${SERVER_BASE_URL}/home-project`,{})
}

// user projects
export const userProjectsAPI = async (reqHeader) => {
    return await commonAPI("GET",`${SERVER_BASE_URL}/user-project`,{},reqHeader)
}

// all projects
export const allProjectsAPI = async (reqHeader, searchKey) => {
    return await commonAPI("GET",`${SERVER_BASE_URL}/all-project?search=${searchKey}`,{},reqHeader)
}