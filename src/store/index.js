import { create } from 'zustand';

const useStore = create((set) => ({
  isLoaded: false,
  setIsLoaded: (value) => set({ isLoaded: value }),
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
  isMobileMenuOpen: false,
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
}));

export default useStore;
