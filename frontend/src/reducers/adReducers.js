import {
    AD_LIST_REQUEST,
    AD_LIST_SUCCESS,
    AD_LIST_FAIL,
    AD_DETAILS_REQUEST,
    AD_DETAILS_SUCCESS,
    AD_DETAILS_FAIL,
    AD_DELETE_REQUEST,
    AD_DELETE_SUCCESS,
    AD_DELETE_FAIL,
    AD_CREATE_RESET,
    AD_CREATE_FAIL,
    AD_CREATE_SUCCESS,
    AD_CREATE_REQUEST,
    AD_UPDATE_REQUEST,
    AD_UPDATE_SUCCESS,
    AD_UPDATE_FAIL,
    AD_UPDATE_RESET,
    AD_TOP_REQUEST,
    AD_TOP_SUCCESS,
    AD_TOP_FAIL,
  } from '../constants/adConstants'
  
  export const adListReducer = (state = { ads: [] }, action) => {
    switch (action.type) {
      case AD_LIST_REQUEST:
        return { loading: true, ads: [] }
      case AD_LIST_SUCCESS:
        return {
          loading: false,
          ads: action.payload.ads,
          pages: action.payload.pages,
          page: action.payload.page,
        }
      case AD_LIST_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const adDetailsReducer = (
    state = { ad: {} },
    action
  ) => {
    switch (action.type) {
      case AD_DETAILS_REQUEST:
        return { loading: true, ...state }
      case AD_DETAILS_SUCCESS:
        return { loading: false, ad: action.payload }
      case AD_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const adDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case AD_DELETE_REQUEST:
        return { loading: true }
      case AD_DELETE_SUCCESS:
        return { loading: false, success: true }
      case AD_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  
  export const adCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case AD_CREATE_REQUEST:
        return { loading: true }
      case AD_CREATE_SUCCESS:
        return { loading: false, success: true, ad: action.payload }
      case AD_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case AD_CREATE_RESET:
        return {}
      default:
        return state
    }
  }
  
  export const adUpdateReducer = (state = { ad: {} }, action) => {
    switch (action.type) {
      case AD_UPDATE_REQUEST:
        return { loading: true }
      case AD_UPDATE_SUCCESS:
        return { loading: false, success: true, ad: action.payload }
      case AD_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case AD_UPDATE_RESET:
        return { ad: {} }
      default:
        return state
    }
  }
  
  export const adTopRatedReducer = (state = { ads: [] }, action) => {
    switch (action.type) {
      case AD_TOP_REQUEST:
        return { loading: true, ads: [] }
      case AD_TOP_SUCCESS:
        return { loading: false, ads: action.payload }
      case AD_TOP_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  