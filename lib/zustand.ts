import create from 'zustand'

interface IScroll {
    scrollSet:boolean;
    setScroll:()=>void;
    unsetScroll:()=>void
}

interface ISearch {
    isOpen:boolean;
    openSearch:()=>void;
    closeSearch:()=>void;
}

interface IToggle {
    isToggle:boolean;
    toggleNav:()=>void;
    untoggleNav:()=>void
}

export const useSetBodyScroll = create<IScroll>((set) => ({
    scrollSet:true,
    unsetScroll: () => set((state)=>({ scrollSet:state.scrollSet = false })),
    setScroll: () => set((state)=>({ scrollSet:state.scrollSet = true }))
}))

export const useSearch = create<ISearch>((set)=>({
    isOpen:false,
    openSearch:()=>set((state)=>({ isOpen:state.isOpen = true })),
    closeSearch:()=>set((state)=>({ isOpen:state.isOpen = false })),
    
}));

export const useToggle = create<IToggle>((set)=>({
    isToggle:false,
    toggleNav:()=>set((state)=>({ isToggle:state.isToggle=true })),
    untoggleNav:()=>set((state)=>({ isToggle:state.isToggle=false })),

}));