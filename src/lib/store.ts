
import { create } from 'zustand'

interface UiState {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export const useUiStore = create<UiState>()((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}))
