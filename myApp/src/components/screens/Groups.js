import { View, Text, Pressable, ScrollView, TextInput, ActivityIndicator, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import tailwind from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { 
  createGroup, 
  getUserGroups, 
  getGroupMembers, 
  addGroupMember,
  removeGroupMember,
  changeMemberRole,
  leaveGroup,
  updateGroupName,
  getGroupSummary,
  getGroupExpenses,
  deactivateGroup,
  getGroupDetails,
  checkGroupMembership
} from "../../../sevices/Appservice";

const Groups = ({ navigation }) => {
  const [userid, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupMembers, setGroupMembers] = useState([]);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberUserId, setNewMemberUserId] = useState("");
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [editGroupName, setEditGroupName] = useState("");
  const [groupSummary, setGroupSummary] = useState(null);
  const [groupExpenses, setGroupExpenses] = useState([]);
  const [showExpenses, setShowExpenses] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [groupDetails, setGroupDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [membershipStatus, setMembershipStatus] = useState({});

  useEffect(() => {
    AsyncStorage.getItem("user_id").then(id => setUserId(id));
  }, []);

  useEffect(() => {
    if (userid) {
      fetchGroups();
    }
  }, [userid]);

  const fetchGroups = async () => {
    if (!userid) return;
    try {
      setLoading(true);
      const res = await getUserGroups(userid);
      setGroups(res.data || []);
    } catch (error) {
      console.error("Error fetching groups:", error);
      Alert.alert("Error", "Failed to fetch groups");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      Alert.alert("Error", "Please enter a group name");
      return;
    }
    try {
      setLoading(true);
      const res = await createGroup({
        group_name: groupName,
        user_id: userid
      });
      Alert.alert("Success", res.data?.message || "Group created successfully");
      setGroupName("");
      setShowCreateGroup(false);
      fetchGroups();
    } catch (error) {
      console.error("Error creating group:", error);
      Alert.alert("Error", error.response?.data?.message || "Failed to create group");
    } finally {
      setLoading(false);
    }
  };

  const handleViewMembers = async (group) => {
    try {
      setLoading(true);
      setSelectedGroup(group);
      const res = await getGroupMembers(group.group_id);
      setGroupMembers(res.data || []);
      // Check membership status for current user
      if (userid) {
        try {
          const membershipRes = await checkGroupMembership(group.group_id, userid);
          setMembershipStatus(prev => ({
            ...prev,
            [group.group_id]: membershipRes.data
          }));
        } catch (err) {
          console.error("Error checking membership:", err);
        }
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      Alert.alert("Error", "Failed to fetch group members");
    } finally {
      setLoading(false);
    }
  };

  const handleViewGroupDetails = async (group) => {
    try {
      setLoading(true);
      const res = await getGroupDetails(group.group_id);
      setGroupDetails(res.data);
      setShowDetails(true);
      setSelectedGroup(group);
      // Also check membership status
      if (userid) {
        try {
          const membershipRes = await checkGroupMembership(group.group_id, userid);
          setMembershipStatus(prev => ({
            ...prev,
            [group.group_id]: membershipRes.data
          }));
        } catch (err) {
          console.error("Error checking membership:", err);
        }
      }
    } catch (error) {
      console.error("Error fetching group details:", error);
      Alert.alert("Error", "Failed to fetch group details");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async () => {
  if (!newMemberUserId.trim()) {
    Alert.alert("Error", "Please enter a user ID");
    return;
  }

  if (!selectedGroup) return;

  try {
    setLoading(true);

    const res = await addGroupMember(selectedGroup.group_id, {
      user_id: parseInt(newMemberUserId)
    });

    Alert.alert("Success", res.data?.message || "Member added successfully");
    setNewMemberUserId("");
    setShowAddMember(false);
    handleViewMembers(selectedGroup);
  } catch (error) {
    console.error("Error adding member:", error.response?.data || error.message);
    Alert.alert("Error", error.response?.data?.message || "Failed to add member");
  } finally {
    setLoading(false);
  }
};


  const handleRemoveMember = async (memberId) => {
    if (!selectedGroup) return;
    Alert.alert(
      "Remove Member",
      "Are you sure you want to remove this member?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              const res = await removeGroupMember(selectedGroup.group_id, memberId);
              Alert.alert("Success", res.data?.message || "Member removed successfully");
              handleViewMembers(selectedGroup);
            } catch (error) {
              console.error("Error removing member:", error);
              Alert.alert("Error", error.response?.data?.message || "Failed to remove member");
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const handleChangeRole = async (memberId, currentRole) => {
    if (!selectedGroup) return;
    const newRole = currentRole === 'admin' ? 'member' : 'admin';
    Alert.alert(
      "Change Role",
      `Change role to ${newRole}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Change",
          onPress: async () => {
            try {
              setLoading(true);
              const res = await changeMemberRole(selectedGroup.group_id, memberId, {
                user_role: newRole
              });
              Alert.alert("Success", res.data?.message || "Role changed successfully");
              handleViewMembers(selectedGroup);
            } catch (error) {
              console.error("Error changing role:", error);
              Alert.alert("Error", error.response?.data?.message || "Failed to change role");
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const handleLeaveGroup = async (group) => {
    Alert.alert(
      "Leave Group",
      `Are you sure you want to leave "${group.group_name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Leave",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              const res = await leaveGroup(group.group_id, { user_id: userid });
              Alert.alert("Success", res.data?.message || "Left group successfully");
              fetchGroups();
              setSelectedGroup(null);
              setGroupMembers([]);
            } catch (error) {
              console.error("Error leaving group:", error);
              Alert.alert("Error", error.response?.data?.message || "Failed to leave group");
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const handleEditGroupName = async (group) => {
    if (!editGroupName.trim()) {
      Alert.alert("Error", "Please enter a group name");
      return;
    }
    try {
      setLoading(true);
      const res = await updateGroupName(group.group_id, {
        group_name: editGroupName
      });
      Alert.alert("Success", res.data?.message || "Group name updated successfully");
      setEditingGroupId(null);
      setEditGroupName("");
      fetchGroups();
    } catch (error) {
      console.error("Error updating group:", error);
      Alert.alert("Error", error.response?.data?.message || "Failed to update group name");
    } finally {
      setLoading(false);
    }
  };

  const handleViewSummary = async (group) => {
    try {
      setLoading(true);
      const res = await getGroupSummary(group.group_id);
      setGroupSummary(res.data);
      setShowSummary(true);
      setSelectedGroup(group);
    } catch (error) {
      console.error("Error fetching summary:", error);
      Alert.alert("Error", "Failed to fetch group summary");
    } finally {
      setLoading(false);
    }
  };

  const handleViewExpenses = async (group) => {
    try {
      setLoading(true);
      const res = await getGroupExpenses(group.group_id);
      setGroupExpenses(res.data || []);
      setShowExpenses(true);
      setSelectedGroup(group);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      Alert.alert("Error", "Failed to fetch group expenses");
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivateGroup = async (group) => {
    Alert.alert(
      "Deactivate Group",
      `Are you sure you want to deactivate "${group.group_name}"? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Deactivate",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              const res = await deactivateGroup(group.group_id);
              Alert.alert("Success", res.data?.message || "Group deactivated successfully");
              fetchGroups();
              setSelectedGroup(null);
              setGroupMembers([]);
            } catch (error) {
              console.error("Error deactivating group:", error);
              Alert.alert("Error", error.response?.data?.message || "Failed to deactivate group");
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const isUserAdmin = (group) => {
    return group.user_role === 'admin';
  };

  const isCurrentUser = (memberId) => {
    return parseInt(memberId) === parseInt(userid);
  };

  if (loading && groups.length === 0) {
    return (
      <View style={tailwind`flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={tailwind`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tailwind`px-4 pt-6 pb-10`}>
        {/* Header */}
        <View style={tailwind`mb-6`}>
          <Text style={tailwind`text-2xl font-bold text-black`}>
            Groups
          </Text>
          <Text style={tailwind`text-gray-500 mt-1`}>
            Manage your expense groups
          </Text>
        </View>

        {/* Create Group Button */}
        <Pressable
          onPress={() => setShowCreateGroup(!showCreateGroup)}
          style={tailwind`bg-blue-500 rounded-xl py-4 mb-4`}
        >
          <Text style={tailwind`text-white text-center font-semibold text-base`}>
            + Create New Group
          </Text>
        </Pressable>

        {/* Create Group Form */}
        {showCreateGroup && (
          <View style={tailwind`border border-gray-300 rounded-xl p-4 mb-4 bg-gray-50`}>
            <Text style={tailwind`text-sm text-gray-500 mb-2`}>Group Name</Text>
            <TextInput
              placeholder="Enter group name"
              placeholderTextColor="#9CA3AF"
              value={groupName}
              onChangeText={setGroupName}
              style={tailwind`border border-gray-300 rounded-xl px-4 py-3 text-black mb-3`}
            />
            <View style={tailwind`flex-row gap-2`}>
              <Pressable
                onPress={handleCreateGroup}
                style={tailwind`flex-1 bg-blue-500 rounded-xl py-3`}
              >
                <Text style={tailwind`text-white text-center font-semibold`}>
                  Create
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setShowCreateGroup(false);
                  setGroupName("");
                }}
                style={tailwind`flex-1 bg-gray-300 rounded-xl py-3`}
              >
                <Text style={tailwind`text-black text-center font-semibold`}>
                  Cancel
                </Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Groups List */}
        {groups.length === 0 ? (
          <View style={tailwind`items-center py-8`}>
            <Text style={tailwind`text-gray-500 text-center`}>
              No groups yet. Create your first group!
            </Text>
          </View>
        ) : (
          groups.map((group) => (
            <View
              key={group.group_id}
              style={tailwind`border border-gray-300 rounded-xl p-4 mb-4 bg-white`}
            >
              {/* Group Header */}
              <View style={tailwind`flex-row justify-between items-center mb-3`}>
                <View style={tailwind`flex-1`}>
                  {editingGroupId === group.group_id ? (
                    <View>
                      <TextInput
                        placeholder="Group name"
                        value={editGroupName}
                        onChangeText={setEditGroupName}
                        style={tailwind`border border-blue-300 rounded-lg px-3 py-2 text-black mb-2`}
                      />
                      <View style={tailwind`flex-row gap-2`}>
                        <Pressable
                          onPress={() => handleEditGroupName(group)}
                          style={tailwind`flex-1 bg-blue-500 rounded-lg py-2`}
                        >
                          <Text style={tailwind`text-white text-center text-xs font-semibold`}>
                            Save
                          </Text>
                        </Pressable>
                        <Pressable
                          onPress={() => {
                            setEditingGroupId(null);
                            setEditGroupName("");
                          }}
                          style={tailwind`flex-1 bg-gray-300 rounded-lg py-2`}
                        >
                          <Text style={tailwind`text-black text-center text-xs font-semibold`}>
                            Cancel
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  ) : (
                    <>
                      <Text style={tailwind`text-lg font-semibold text-black`}>
                        {group.group_name}
                      </Text>
                      <Text style={tailwind`text-xs text-gray-500 mt-1`}>
                        {group.member_count} members • {group.user_role}
                      </Text>
                    </>
                  )}
                </View>
              </View>

              {/* Group Actions */}
              <View style={tailwind`flex-row flex-wrap gap-2 mb-3`}>
                <Pressable
                  onPress={() => handleViewGroupDetails(group)}
                  style={tailwind`bg-indigo-100 px-3 py-1 rounded-lg`}
                >
                  <Text style={tailwind`text-indigo-600 text-xs font-medium`}>
                    Details
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    if (selectedGroup?.group_id === group.group_id && !showDetails && !showExpenses && !showSummary) {
                      setSelectedGroup(null);
                      setGroupMembers([]);
                    } else {
                      setShowDetails(false);
                      setShowExpenses(false);
                      setShowSummary(false);
                      handleViewMembers(group);
                    }
                  }}
                  style={tailwind`bg-blue-100 px-3 py-1 rounded-lg`}
                >
                  <Text style={tailwind`text-blue-600 text-xs font-medium`}>
                    {selectedGroup?.group_id === group.group_id && !showDetails && !showExpenses && !showSummary ? "Hide" : "View"} Members
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setShowDetails(false);
                    setShowExpenses(false);
                    handleViewSummary(group);
                  }}
                  style={tailwind`bg-purple-100 px-3 py-1 rounded-lg`}
                >
                  <Text style={tailwind`text-purple-600 text-xs font-medium`}>
                    Summary
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setShowDetails(false);
                    setShowSummary(false);
                    handleViewExpenses(group);
                  }}
                  style={tailwind`bg-green-100 px-3 py-1 rounded-lg`}
                >
                  <Text style={tailwind`text-green-600 text-xs font-medium`}>
                    Expenses
                  </Text>
                </Pressable>
                {isUserAdmin(group) && (
                  <Pressable
                    onPress={() => {
                      setEditingGroupId(group.group_id);
                      setEditGroupName(group.group_name);
                    }}
                    style={tailwind`bg-yellow-100 px-3 py-1 rounded-lg`}
                  >
                    <Text style={tailwind`text-yellow-600 text-xs font-medium`}>
                      Edit
                    </Text>
                  </Pressable>
                )}
                <Pressable
                  onPress={() => handleLeaveGroup(group)}
                  style={tailwind`bg-red-100 px-3 py-1 rounded-lg`}
                >
                  <Text style={tailwind`text-red-600 text-xs font-medium`}>
                    Leave
                  </Text>
                </Pressable>
                {isUserAdmin(group) && (
                  <Pressable
                    onPress={() => handleDeactivateGroup(group)}
                    style={tailwind`bg-red-200 px-3 py-1 rounded-lg`}
                  >
                    <Text style={tailwind`text-red-700 text-xs font-medium`}>
                      Deactivate
                    </Text>
                  </Pressable>
                )}
              </View>

              {/* Group Details */}
              {showDetails && selectedGroup?.group_id === group.group_id && groupDetails && (
                <View style={tailwind`bg-indigo-50 rounded-lg p-3 mb-3 border border-indigo-200`}>
                  <Text style={tailwind`text-sm font-semibold text-indigo-800 mb-2`}>
                    Group Details
                  </Text>
                  <View style={tailwind`flex-row justify-between mb-1`}>
                    <Text style={tailwind`text-xs text-gray-600`}>Group ID:</Text>
                    <Text style={tailwind`text-xs font-semibold`}>{groupDetails.group_id}</Text>
                  </View>
                  <View style={tailwind`flex-row justify-between mb-1`}>
                    <Text style={tailwind`text-xs text-gray-600`}>Group Name:</Text>
                    <Text style={tailwind`text-xs font-semibold`}>{groupDetails.group_name}</Text>
                  </View>
                  <View style={tailwind`flex-row justify-between mb-1`}>
                    <Text style={tailwind`text-xs text-gray-600`}>Created At:</Text>
                    <Text style={tailwind`text-xs font-semibold`}>
                      {new Date(groupDetails.created_at).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={tailwind`flex-row justify-between mb-1`}>
                    <Text style={tailwind`text-xs text-gray-600`}>Total Members:</Text>
                    <Text style={tailwind`text-xs font-semibold`}>{groupDetails.member_count || 0}</Text>
                  </View>
                  <View style={tailwind`flex-row justify-between mb-1`}>
                    <Text style={tailwind`text-xs text-gray-600`}>Status:</Text>
                    <Text style={tailwind`text-xs font-semibold ${groupDetails.is_active ? 'text-green-600' : 'text-red-600'}`}>
                      {groupDetails.is_active ? 'Active' : 'Inactive'}
                    </Text>
                  </View>
                  {membershipStatus[group.group_id] && (
                    <View style={tailwind`mt-2 pt-2 border-t border-indigo-200`}>
                      <View style={tailwind`flex-row justify-between`}>
                        <Text style={tailwind`text-xs text-gray-600`}>Your Role:</Text>
                        <Text style={tailwind`text-xs font-semibold text-indigo-700`}>
                          {membershipStatus[group.group_id].user_role || 'Member'}
                        </Text>
                      </View>
                      <View style={tailwind`flex-row justify-between mt-1`}>
                        <Text style={tailwind`text-xs text-gray-600`}>Membership Status:</Text>
                        <Text style={tailwind`text-xs font-semibold text-green-600`}>
                          {membershipStatus[group.group_id].is_member ? 'Active Member' : 'Not a Member'}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              )}

              {/* Group Summary */}
              {showSummary && selectedGroup?.group_id === group.group_id && groupSummary && (
                <View style={tailwind`bg-purple-50 rounded-lg p-3 mb-3 border border-purple-200`}>
                  <Text style={tailwind`text-sm font-semibold text-purple-800 mb-2`}>
                    Group Summary
                  </Text>
                  <View style={tailwind`flex-row justify-between mb-1`}>
                    <Text style={tailwind`text-xs text-gray-600`}>Total Members:</Text>
                    <Text style={tailwind`text-xs font-semibold`}>{groupSummary.member_count}</Text>
                  </View>
                  <View style={tailwind`flex-row justify-between mb-1`}>
                    <Text style={tailwind`text-xs text-gray-600`}>Total Expenses:</Text>
                    <Text style={tailwind`text-xs font-semibold`}>₹{parseFloat(groupSummary.total_expenses || 0).toFixed(2)}</Text>
                  </View>
                  <View style={tailwind`flex-row justify-between`}>
                    <Text style={tailwind`text-xs text-gray-600`}>Expense Count:</Text>
                    <Text style={tailwind`text-xs font-semibold`}>{groupSummary.expense_count}</Text>
                  </View>
                </View>
              )}

              {/* Group Expenses */}
              {showExpenses && selectedGroup?.group_id === group.group_id && (
                <View style={tailwind`bg-green-50 rounded-lg p-3 mb-3 border border-green-200`}>
                  <Text style={tailwind`text-sm font-semibold text-green-800 mb-2`}>
                    Group Expenses ({groupExpenses.length})
                  </Text>
                  {groupExpenses.length === 0 ? (
                    <Text style={tailwind`text-xs text-gray-500`}>No expenses yet</Text>
                  ) : (
                    groupExpenses.slice(0, 5).map((expense) => (
                      <View key={expense.expense_id} style={tailwind`mb-2 pb-2 border-b border-green-100`}>
                        <Text style={tailwind`text-xs font-medium text-black`}>
                          {expense.descriptions || 'No description'}
                        </Text>
                        <View style={tailwind`flex-row justify-between mt-1`}>
                          <Text style={tailwind`text-xs text-gray-600`}>
                            {expense.paid_by_name} • {expense.category_name}
                          </Text>
                          <Text style={tailwind`text-xs font-semibold text-green-700`}>
                            ₹{parseFloat(expense.amount).toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    ))
                  )}
                  {groupExpenses.length > 5 && (
                    <Text style={tailwind`text-xs text-gray-500 mt-2`}>
                      +{groupExpenses.length - 5} more expenses
                    </Text>
                  )}
                </View>
              )}

              {/* Group Members */}
              {selectedGroup?.group_id === group.group_id && !showExpenses && !showSummary && !showDetails && (
                <View style={tailwind`mt-3 pt-3 border-t border-gray-200`}>
                  <View style={tailwind`flex-row justify-between items-center mb-3`}>
                    <Text style={tailwind`text-sm font-semibold text-gray-700`}>
                      Members ({groupMembers.length})
                    </Text>
                    {isUserAdmin(group) && (
                      <Pressable
                        onPress={() => setShowAddMember(!showAddMember)}
                        style={tailwind`bg-green-100 px-3 py-1 rounded-lg`}
                      >
                        <Text style={tailwind`text-green-600 text-sm font-medium`}>
                          + Add Member
                        </Text>
                      </Pressable>
                    )}
                  </View>

                  {/* Add Member Form */}
                  {showAddMember && (
                    <View style={tailwind`bg-gray-50 rounded-lg p-3 mb-3`}>
                     <Text style={tailwind`text-xs text-gray-500 mb-2`}>User ID</Text>

<TextInput
  placeholder="Enter user ID"
  placeholderTextColor="#9CA3AF"
  value={newMemberUserId}
  onChangeText={setNewMemberUserId}
  keyboardType="numeric"
  style={tailwind`border border-gray-300 rounded-lg px-3 py-2 text-black mb-2`}
/>

                      <View style={tailwind`flex-row gap-2`}>
                        <Pressable
                          onPress={handleAddMember}
                          style={tailwind`flex-1 bg-green-500 rounded-lg py-2`}
                        >
                          <Text style={tailwind`text-white text-center text-sm font-semibold`}>
                            Add
                          </Text>
                        </Pressable>
                        <Pressable
                          onPress={() => {
                            setShowAddMember(false);
                            setNewMemberUsername("");
                          }}
                          style={tailwind`flex-1 bg-gray-300 rounded-lg py-2`}
                        >
                          <Text style={tailwind`text-black text-center text-sm font-semibold`}>
                            Cancel
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  )}

                  {/* Members List */}
                  {groupMembers.length === 0 ? (
                    <Text style={tailwind`text-gray-500 text-sm`}>
                      No members yet
                    </Text>
                  ) : (
                    groupMembers.map((member) => (
                      <View
                        key={member.user_id}
                        style={tailwind`flex-row justify-between items-center py-2 border-b border-gray-100`}
                      >
                        <View style={tailwind`flex-1`}>
                          <Text style={tailwind`text-black font-medium`}>
                            {member.user_name}
                            {isCurrentUser(member.user_id) && " (You)"}
                          </Text>
                          <Text style={tailwind`text-xs text-gray-500`}>
                            {member.user_role} {member.email ? `• ${member.email}` : ''}
                          </Text>
                        </View>
                        {isUserAdmin(group) && !isCurrentUser(member.user_id) && (
                          <View style={tailwind`flex-row gap-2`}>
                            <Pressable
                              onPress={() => handleChangeRole(member.user_id, member.user_role)}
                              style={tailwind`bg-yellow-100 px-2 py-1 rounded`}
                            >
                              <Text style={tailwind`text-yellow-700 text-xs`}>
                                {member.user_role === 'admin' ? 'Demote' : 'Promote'}
                              </Text>
                            </Pressable>
                            <Pressable
                              onPress={() => handleRemoveMember(member.user_id)}
                              style={tailwind`bg-red-100 px-2 py-1 rounded`}
                            >
                              <Text style={tailwind`text-red-700 text-xs`}>Remove</Text>
                            </Pressable>
                          </View>
                        )}
                      </View>
                    ))
                  )}
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Groups;

