import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toys: [],
  categories: [],
};

const toysSlice = createSlice({
  name: "toys",
  initialState,
  reducers: {
    // טעינת נתונים מ-JSON
    loadToys: (state, action) => {
      state.toys = action.payload.toys || [];
      state.categories = action.payload.categories || [];
    },
    // הוספת צעצוע
    addToy: (state, action) => {
      state.toys.push(action.payload);
    },
    // הסרת צעצוע
    removeToy: (state, action) => {
      state.toys = state.toys.filter((toy) => toy.id !== action.payload);
    },
    // עדכון צעצוע
    updateToy: (state, action) => {
      const index = state.toys.findIndex((toy) => toy.id === action.payload.id);
      if (index !== -1) {
        state.toys[index] = { ...state.toys[index], ...action.payload };
      }
    },
    // הוספת קטגוריה חדשה
    addCategory: (state, action) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
      }
    },
    // הוספת מסר חדש לצעצוע
    addMessage: (state, action) => {
      const { toyId, message } = action.payload;
      const toy = state.toys.find((t) => t.id === toyId);
      if (toy) {
        toy.messages.push({
          id: `m${Date.now()}`,
          ...message,
        });
      }
    },
  },
});

export const {
  loadToys,
  addToy,
  removeToy,
  updateToy,
  addCategory,
  addMessage,
} = toysSlice.actions;

export default toysSlice.reducer;
