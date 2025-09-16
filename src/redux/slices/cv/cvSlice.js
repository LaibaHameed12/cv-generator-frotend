import { createSlice } from '@reduxjs/toolkit';

const cvSlice = createSlice({
  name: 'cv',
  initialState: { draft: null },
  reducers: {
    setCvDraft: (state, action) => { state.draft = action.payload; },
    clearCvDraft: (state) => { state.draft = null; },
  },
});

export const { setCvDraft, clearCvDraft } = cvSlice.actions;
export const selectCvDraft = (state) => state.cv.draft;
export default cvSlice.reducer;
