import { create } from 'zustand';

interface TemporalCameraState {
  selectedImages: string[];
  addSelectedImage: ( image: string ) => void;
  clearImages: () => void;
}

export const useCameraStore = create<TemporalCameraState>()( ( set ) => ({
  selectedImages: [],
  addSelectedImage: ( image ) => {
    set( ( state ) => ({ selectedImages: [ ...state.selectedImages, image ] }) )
  },
  clearImages: () => set({ selectedImages: [] })
}));
