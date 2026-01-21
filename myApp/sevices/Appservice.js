import Api from "./Api";

const api = Api;

export const addExpense = (expense) => {
  return api.post("/expense_track/expense/expense", expense);
};

export const getcategory=()=>{
  return api.get("/expense_track/category//categories")
}

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

export const delexpense=(expid)=>{
  // console.log(expid);
  return api.delete(`/expense_track/expense/delete/${expid}`)


}

export const editexpense = (id, data) => {
  return api.put(`/expense_track/expense/update/${id}`, data);
};


export const totalExpense=(user_id)=>{
  return api.get(`/expense_track/expense/current_month/${user_id}`)

}

export const Expensebyyear=(user_id,year)=>{
  return api.get(`/expense_track/expense/expensebyyear/:user_id`, {
  params: {
    year: 2024
  }
}); 


}


export const getuser  = (id) => {
   return api.get(`/expense_track/users/userbyid/${id}`);


}
export const deleteuser=(id)=>{
  return api.delete(`/expense_track/users/delete/${id}`);
}

// export const getgroups=()=>{
//   return api.get("/groups");
// }
