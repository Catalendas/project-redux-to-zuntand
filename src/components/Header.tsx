
import { useCurrentLesson, useStore } from "../zustand-store"

export function Header() {

    const isLoading = useStore(store => store.isLoading)

    const { currentLeasson, currentModel} = useCurrentLesson()


    if (isLoading) {
        return <h1 className="text-2xl font-bold">CArregando...</h1>
    }

    return (
        <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">{currentLeasson?.title}</h1>
            <span className="text-sm text-zinc-400">Módulo "{currentModel?.title}"</span>
        </div>
    )
}