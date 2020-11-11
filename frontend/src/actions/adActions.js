import axios from 'axios'
import {
  AD_LIST_REQUEST,
  AD_LIST_SUCCESS,
  AD_LIST_FAIL,
  AD_DETAILS_REQUEST,
  AD_DETAILS_SUCCESS,
  AD_DETAILS_FAIL,
  AD_DELETE_SUCCESS,
  AD_DELETE_REQUEST,
  AD_DELETE_FAIL,
  AD_CREATE_REQUEST,
  AD_CREATE_SUCCESS,
  AD_CREATE_FAIL,
  AD_UPDATE_REQUEST,
  AD_UPDATE_SUCCESS,
  AD_UPDATE_FAIL,
  AD_TOP_REQUEST,
  AD_TOP_SUCCESS,
  AD_TOP_FAIL,
} from '../constants/adConstants'

export const listAds = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: AD_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/ads?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: AD_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: AD_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listADDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: AD_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/ads/${id}`)

    dispatch({
      type: AD_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: AD_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteAD = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AD_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/ads/${id}`, config)

    dispatch({
      type: AD_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: AD_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createAD = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: AD_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/ads`, {}, config)

    dispatch({
      type: AD_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: AD_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateAD = (ad) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AD_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/ads/${ad._id}`,
      ad,
      config
    )

    dispatch({
      type: AD_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: AD_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}



export const listTopADs = () => async (dispatch) => {
  try {
    dispatch({ type: AD_TOP_REQUEST })

    const { data } = await axios.get(`/api/ads/top`)

    dispatch({
      type: AD_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: AD_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
