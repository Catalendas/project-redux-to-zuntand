import * as Collapsible from "@radix-ui/react-collapsible"

import { ChevronDown } from "lucide-react";
import { Lesson } from "./Lesson";
import { useStore } from "../zustand-store";

interface ModuleProps {
    moduleIndex: number
    title: string
    amountOfLesson: number
}

export function Module({moduleIndex, title, amountOfLesson}: ModuleProps) {

    const { currentLeassonIndex, currentModelIndex, play, lessons} = useStore(store => ({
        lessons: store.course?.modules[moduleIndex].lessons,
        currentLeassonIndex: store.currentLeassonIndex,
        currentModelIndex: store.currentModelIndex,
        play: store.play
    }))

    return (
        <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
            <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
                <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
                    {moduleIndex + 1}
                </div>

                <div className="flex flex-col text-left">
                    <strong className="text-sm">{title}</strong>
                    <span className="text-xs text-zinc-400">{amountOfLesson} Aulas</span>
                </div>

                <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform"/>
            </Collapsible.Trigger>
            <Collapsible.Content>
                <nav className="relative flex flex-col gap-4 p-6">

                    { lessons && lessons.map((leasson, leassonIndex) => {
                        const isCurrent = currentModelIndex === moduleIndex && currentLeassonIndex === leassonIndex
                        
                        return (
                            <Lesson 
                                key={leasson.id}
                                title={leasson.title} 
                                duration={leasson.duration}
                                onPlay={() => play([moduleIndex, leassonIndex])}
                                isCurrent={isCurrent}
                            />
                        )
                    })}
                    
                </nav>
            </Collapsible.Content>
        </Collapsible.Root>
    )
}