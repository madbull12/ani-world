import create from 'zustand'

interface IProps {
    scrollSet:boolean;
    setScroll:()=>void;
    unsetScroll:()=>void
}

export const useSetBodyScroll = create<IProps>((set) => ({
    scrollSet:true,
    unsetScroll: () => set((state)=>({ scrollSet:state.scrollSet = false })),
    setScroll: () => set((state)=>({ scrollSet:state.scrollSet = true }))
}))