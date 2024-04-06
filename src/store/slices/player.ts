import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { api } from "../../lib/axios";

interface Couse {
  id: number
  modules: Array<{
    id: number
    title: string
    lessons: Array<{
      id: string
      title: string
      duration: string
    }>
  }>
}

export interface PlayerState {
  course: Couse | null
  currentModelIndex: number
  currentLeassonIndex: number
  isLoading: boolean
}

const initialState: PlayerState = {
  course: null,
  currentModelIndex:0,
  currentLeassonIndex: 0,
  isLoading: true
}

export const loadCourses = createAsyncThunk(
  "player/load",
  async () => {
    const response = await api.get("/courses/1")
    return response.data
  }
)

export const playerSlice = createSlice({
    name: "player",
    initialState, 
    reducers: {
        play: (state, action: PayloadAction<[number, number]>) => {
          state.currentModelIndex = action.payload[0]
          state.currentLeassonIndex = action.payload[1]
        },

        next: (state) => {
          const nextLessonIndex = state.currentLeassonIndex + 1
          const nextLesson = state.course?.modules[state.currentModelIndex].lessons[nextLessonIndex]

          if (nextLesson) {
            state.currentLeassonIndex = nextLessonIndex
          } else {
            const nextModuleIndex = state.currentModelIndex + 1
            const nextModule = state.course?.modules[nextModuleIndex]

            if (nextModule) {
              state.currentModelIndex = nextModuleIndex
              state.currentLeassonIndex = 0
            }
          }
        },
    },
    extraReducers(builder){
      builder.addCase(loadCourses.fulfilled, (state, action) => {
        state.course = action.payload
        state.isLoading = false
      })

      builder.addCase(loadCourses.pending, (state, action) => {
        state.isLoading = true 
      })
    }
})

export const player = playerSlice.reducer
export const { play, next } = playerSlice.actions

