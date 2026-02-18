import axios from "axios";

// const API = axios.create({ baseURL: 'https://stackoverflow-clone-production.up.railway.app/'})
const API = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });

//keep-alive

if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
  setInterval(() => {
    API.get("/keep-alive-endpoint")
      .then((response) => {
        if (response.status !== 200) {
          console.error("Keep-alive request failed:", response.status, response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error sending keep-alive request:", error.message);
      });
  }, 240000);
}


API.interceptors.request.use(
  (req) => {
    const user = JSON.parse(localStorage.getItem("profile"));
    if (user) {
      req.headers.authorization = `Bearer ${user.token}`;
    }
    return req;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);

export const postQuestion = (questionData) =>
  API.post("/questions/Ask", questionData);
export const getAllQuestions = (params = {}) => API.get("/questions/get", { params });
export const getQuestionById = (id) => API.get(`/questions/get/${id}`);
export const getQuestionStats = () => API.get("/questions/stats");
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value) =>
  API.patch(`/questions/vote/${id}`, { value });

export const postAnswer = (id, answerBody, userAnswered) =>
  API.patch(`/answer/post/${id}`, {
    answerBody,
    userAnswered,
  });
export const deleteAnswer = (id, answerId) =>
  API.patch(`/answer/delete/${id}`, { id, answerId });

export const getAllUsers = () => API.get("/user/getAllUsers");
export const updateProfile = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData);
