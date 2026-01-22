import Api from "./Api";

const api = Api;

export const addExpense = (expense) => {
  return api.post("/expense_track/expense/expense", expense);
};

export const addGroupExpense = (expense) => {
  return api.post("/expense_track/expense/group-expense", expense);
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
  return api.get(`/expense_track/expense/total/${user_id}`)

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


export const createGroup = (groupData) => {
  return api.post("/expense_track/groups/group/create", groupData);
};

export const getUserGroups = (user_id) => {
  return api.get(`/expense_track/groups/users/${user_id}/groups`);
};

export const getGroupDetails = (group_id) => {
  return api.get(`/expense_track/groups/groups/${group_id}`);
};

export const updateGroupName = (group_id, groupData) => {
  return api.put(`/expense_track/groups/groups/${group_id}`, groupData);
};

export const getGroupMembers = (group_id) => {
  return api.get(`/expense_track/groups/groups/${group_id}/members`);
};

export const addGroupMember = (group_id, userData) => {
  console.log(group_id);
  console.log(userData);
  return api.post(`/expense_track/groups/groups/${group_id}/members`, userData);

};

export const removeGroupMember = (group_id, user_id) => {
  return api.delete(`/expense_track/groups/groups/${group_id}/members/${user_id}`);
};

export const changeMemberRole = (group_id, user_id, roleData) => {
  return api.put(`/expense_track/groups/groups/${group_id}/members/${user_id}/role`, roleData);
};

export const leaveGroup = (group_id, userData) => {
  return api.delete(`/expense_track/groups/groups/${group_id}/leave`, { data: userData });
};

export const getGroupExpenses = (group_id) => {
  return api.get(`/expense_track/groups/groups/${group_id}/expenses`);
};

export const getGroupSummary = (group_id) => {
  return api.get(`/expense_track/groups/groups/${group_id}/summary`);
};

export const checkGroupMembership = (group_id, user_id) => {
  return api.get(`/expense_track/groups/groups/${group_id}/members/check/${user_id}`);
};

export const deactivateGroup = (group_id) => {
  return api.put(`/expense_track/groups/groups/${group_id}/deactivate`);
};

