## Redux e zustand

Este projeto tinha como objetivo a implementação do Redux, que facilitaria o monitoramento do estado global de uma aplicação React. Após essa implementação, realizamos a migração para o Zustand, uma biblioteca mais moderna e simplificada para o gerenciamento de estados globais no React.

![image](https://github.com/Catalendas/project-redux-to-zuntand/assets/82763928/1d30a19c-4f04-4978-9ae9-85c9f2aa5c55)

### Código Redux

Após o código abaixo estar completo foi apenas importado para outro arquivo para ficar mais enchuta sua aplicação

```
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


```

### Código Zustand

```
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
```

### Dependencias utilizadas

- [axios](https://axios-http.com/ptbr/)
- [lucide-react](https://lucide.dev/)
- [react-playe](https://www.npmjs.com/package/react-player)
- [redux](https://redux.js.org/)
- [react-redux](https://react-redux.js.org/)
- [zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [tailwindcss](https://tailwindcss.com/)
- [typescript](https://www.typescriptlang.org/)
- [json-server](https://www.npmjs.com/package/json-server)

### Como rodar o projeto na minha máquina?

- Instalar Git: Certifique-se de ter o Git instalado em sua máquina para clonar o repositório.
- Instalar Node.js: Certifique-se de ter o Node.js instalado em sua máquina.
- Clonar o Repositório: Use o comando git clone https://github.com/Catalendas/project-redux-to-zuntand.git para clonar o repositório.
- Instalar Dependências: Navegue até a pasta do projeto no terminal e execute npm install para instalar as dependências.
- Iniciar o Servidor de Desenvolvimento: Execute npm run dev no terminal após a conclusão da instalação das dependências.
- Iniciar o Servidor Fictício: Em um terminal separado, execute npm run server para disponibilizar os dados de um servidor fictício.
- Acessar a Interface: Copie e cole http://localhost:5173/ na barra de endereços do seu navegador para acessar a interface do projeto.
