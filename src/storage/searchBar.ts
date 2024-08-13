import {create} from 'zustand';

interface SearchBarState {
  text: string;
  setText: (text: string) => void;
}

export const useSearchBarStore = create<SearchBarState>((set, get) => ({
  text: '',
  setText: text => {
    set({text});
  },
}));
