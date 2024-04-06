import ReactPlayer from "react-player";
import { Loader } from "lucide-react";
import { useCurrentLesson, useStore } from "../zustand-store";

export function Video() {
    const { isLoading, next} = useStore(store => ({
        isLoading: store.isLoading,
        next: store.next
    }))
    
    const { currentLeasson } = useCurrentLesson()

    function handlePlayNext() {
        next()
    }


    return (
        <div className="w-full bg-zinc-950 aspect-video">
            {isLoading ? (
                <div className="flex h-full items-center justify-center">
                    <Loader className="w-6 h-6 text-zinc-400 animate-spin"/>
                </div>
            ) : (
                <ReactPlayer
                    width="100%"
                    height="100%"
                    controls
                    playing
                    onEnded={handlePlayNext}
                    url={`https://www.youtube.com/watch?v=${currentLeasson?.id}`}
                />
            )}
            
        </div>
    )
}