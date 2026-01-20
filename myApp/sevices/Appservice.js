import Api from "./Api";

const api = Api;

export const addExpense = (expense) => {
  return api.post("/expense_track/expense/expense", expense);
};

export const getExpenses = (user_id) => {
  return api.get(`/expense_track/expense/user/${user_id}`);
}
export const registerUser = (userData) => {
  return api.post("/expense_track/users/register", userData);
}

export const loginUser = (credentials) => {
  return api.post("/expense_track/users/login", credentials);
}

export const setCategory=(category) => {
  return api.post("/expense_track/category/addcate", category);
}

export const delexpense=()=>{

}

export const editexpense=()=>{

}

export const totalExpense=(user_id)=>{
  return api.get(`/expense_track/expense/total/${user_id}`)

}


export const getuser  = () => {
  // return api.get("/me");


}

// export const getgroups=()=>{
//   return api.get("/groups");
// }
