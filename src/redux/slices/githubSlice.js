import { createSlice } from "@reduxjs/toolkit";

const githubSlice = createSlice({
  name: "github",
  initialState: {
    username: "",
    repository: "",
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setRepository: (state, action) => {
      state.repository = action.payload;
    },
  },
});

export const { setUsername } = githubSlice.actions;
export const { setRepository } = githubSlice.actions;
export default githubSlice.reducer;
