import { create } from "zustand";
import { api } from "../lib/axios";

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
    play: (moduleAndLessonIndex:[number, number]) => void
    next: () => void
    load: () => Promise<void>
  }

export const useStore = create<PlayerState>((set, get) => {
    return {
        course: null,
        currentModelIndex:0,
        currentLeassonIndex: 0,
        isLoading: true,

        load: async () => {
            set({ isLoading: true})
            const response = await api.get("/courses/1")
            set({ 
                course: response.data,
                isLoading: false
            })
        },

        play: (moduleAndLessonIndex:[number, number]) => {
            const [moduleIndex, lessonIndex] = moduleAndLessonIndex

            set({
                currentModelIndex: moduleIndex,
                currentLeassonIndex: lessonIndex
            })
          },
  
        next: () => {
            const { currentLeassonIndex, currentModelIndex, course} = get()

            const nextLessonIndex = currentLeassonIndex + 1
            const nextLesson = course?.modules[currentModelIndex].lessons[nextLessonIndex]
  
            if (nextLesson) {
              set({
                currentLeassonIndex: nextLessonIndex
              })
            } else {
              const nextModuleIndex = currentModelIndex + 1
              const nextModule = course?.modules[nextModuleIndex]
  
              if (nextModule) {
                set({
                    currentModelIndex: nextModuleIndex,
                    currentLeassonIndex: 0
                })
              }
            }
          },

    }
})

export const useCurrentLesson = () => {
  return useStore(state => {
    const { currentLeassonIndex, currentModelIndex} = state
  
    const currentModel = state.course?.modules[currentModelIndex]
  
    const currentLeasson = 
        currentModel?.lessons[currentLeassonIndex]
  
    return { currentLeasson, currentModel }
  })
}