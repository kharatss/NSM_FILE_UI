import {create} from 'zustand'
export type AppState={
    showAppToast:boolean;
    isOpen :boolean;
    // toast:{
    //     title?:string;
    //     description?:string;
    //     type?:string;
    // }
}

export type AppStateAction={
    setToastVisibilty:(showAppToast:AppState['showAppToast'])=>void;
    setModalVisibilty:(isOpen:AppState['isOpen'])=>void;

}

const useAppStore = create<AppState&AppStateAction>((set)=>({showAppToast:false,isOpen:false,setToastVisibilty:(showAppToast)=>{set(()=>({showAppToast}))},setModalVisibilty:(isOpen)=>{set(()=>({isOpen}))}}))