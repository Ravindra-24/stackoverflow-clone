import axios from "axios";

// const API = axios.create({ baseURL: 'https://stackoverflow-clone-production.up.railway.app/'})
const API = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });

//keep-alive

// Send a GET request to your server's keep-alive endpoint every 5 minutes (300,000 milliseconds)
setInterval(() => {
  API.get("/questions/get") // Replace with your server's actual endpoint
    .then(response => {
      if (response.status !== 200) {
        console.error('Keep-alive request failed:', response.status, response.statusText);
      }
    })
    .catch(error => {
      console.error('Error sending keep-alive request:', error.message);
    });
}, 300000);


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
export const getAllQuestions = () => API.get("/questions/get");
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value, userId) =>
  API.patch(`/questions/vote/${id}`, { value, userId });

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) =>
  API.patch(`/answer/post/${id}`, {
    noOfAnswers,
    answerBody,
    userAnswered,
    userId,
  });
export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answer/delete/${id}`, { id, answerId, noOfAnswers });

export const getAllUsers = () => API.get("user/getAllUsers");
export const updateProfile = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData);
