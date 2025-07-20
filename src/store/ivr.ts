import { createSlice } from '@reduxjs/toolkit'

const callState = {
  status: 'idle', // idle, active, ended
  digit: '' // 1 | 2 | 3 |...| 9 | *
}

const ivrSlice = createSlice({
  name: 'ivr',
  initialState: callState,
 reducers: {
    updateCallStatus: (state, action) => {
      state.status = action.payload
    },
    updateDigit: (state, action) => {
      state.digit = action.payload
    }
  }
})

export const { updateCallStatus, updateDigit } = ivrSlice.actions
export default ivrSlice.reducer
