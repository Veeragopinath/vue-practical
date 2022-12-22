import { endpoints } from '~/constants/endpoints';

export const state = () => ({
     username:'',
     password:'',
     authToken:'',
     listOfUsers:[],
     listOfSkills:[],
     userdetails:{},
     listOfCategories:[],
     skillDetails:{}
});
export const getters = {
  basicAuthCredentials(state) {
    return  "Basic " + btoa(state.username + ":" + state.password);
  },
}


export const actions = {

  userLogin({ commit , getters}){
    debugger
    return  this.$axios
    .post(
      `${endpoints.LOGIN}`,
      {},
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: getters.basicAuthCredentials,
        },
      }

    )
    .then((res) => {
      
      commit('setAuthToken', res.data.auth_token);
      return res.data;
    });
  },
  getUserList({dispatch, commit , state }) {
    dispatch("userLogin").then(()=>{
      return this.$axios
      .get(`${endpoints.LIST_OF_USERS}`,{
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: state.authToken,
        },
      })
    })
    
    .then((res) => {
      
      commit('setListOfUsers', res.data);
    
    });
  },
  createUser({ dispatch,state },user){
    debugger
    // state.userdetails={...user}
    dispatch("userLogin")
    // .then(({state})=>{
      debugger
      return  this.$axios
    .post(
      `${endpoints.CREATE_USER}`,
      {...user},
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: state.authToken,
        },
      }
    )
    
    // })
    .then((res) => {
      return res;
      dispatch('getUserList');
    });
  },
  getSkillList({ commit , state,dispatch }) {
    dispatch("userLogin").then(()=>{
      return this.$axios
      .get(`${endpoints.LIST_OF_SKILLS}`,{
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: state.authToken,
        },
      })
    })
   
    .then((res) => {
      
      commit('setListOfSkills', res.data);
    
    });
  },
  createSkill({ dispatch ,state},skill){
    debugger
    // state.skillDetails = skill;
    // dispatch("userLogin").then(()=>{
      return  this.$axios
    .post(
      `${endpoints.CREATE_SKILL}`,
      {...skill},
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: state.authToken,
        },
      }
    )
    // })
    
    .then(() => {
      dispatch('getSkillList');
    });
  },
  getCategoryList({dispatch, commit , state }) {
    dispatch("userLogin").then(()=>{
      return this.$axios
      .get(`${endpoints.LIST_OF_CATEGORY}`,{
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: state.authToken,
        },
      })
    })
    
    .then((res) => {
      
      commit('setListOfCategories', res.data);
    
    });
  },
  deleteUser({ dispatch }, userId) {
    return this.$axios
      .delete(`${endpoints.DELETE_USER}/${userId}`)
      // .then(() => {
      //   dispatch('getTaskTypes');
      // });
  },
  // getCategoryById({ dispatch }, categoryId) {
  //   return this.$axios
  //     .delete(`${endpoints.GET_CATEGORY_BY_ID}/${categoryId}`)
  //     .then((res) => {
  //       return res.data;
  //     });
  // },
};

export const mutations = {
  setUserDetails(state,userDetails){
    debugger
    state.username = userDetails.username;
    state.password = userDetails.password;
     
  },
  setAuthToken(state, res) {
    
    state.authToken = "Basic "+ btoa(res+":");
  },
  setListOfUsers(state, res) {
    
    state.listOfUsers = res;
  },
  setListOfSkills(state, res) {
    
    state.listOfSkills = res;
  },
  setListOfCategories(state, res) {
    
    state.listOfCategories = res;
  },
 
};
