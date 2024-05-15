const state = {
  tukuType: '2' // 图库类型1:bxj,2:状元红
}

const mutations = {
  SET_TUKUTYPE: (state, tukuType) => {
    state.tukuType = tukuType
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions  
}