import Api from "./Api";

const api = Api;

export const addExpense = (expense) => {
  return api.post("/expenses", expense);
};

export const getExpenses = () => {
  return api.get("/expenses");
}
export const registerUser = (userData) => {
  return api.post("/register", userData);
}

export const loginUser = (credentials) => {
  return api.post("/login", credentials);
}

// export const getuser  = () => {
//   return api.get("/me");


// }
