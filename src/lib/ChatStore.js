import { create } from "zustand";

import { useUserStore } from "./UserStore";


export const useChatStore = create((set) => ({
  ChatId: null,
  user: null,
  isCurrentsUserBlocked: false,
  isRecieverBlocked: false,
  changeChat: (ChatId, user) => {
    const currentUser = useUserStore.getState().currentUser;

    // Check if current user is blocked
    if (user.blocked.includes(currentUser.id)) {
      return set({
        ChatId,
        user: null,
        isCurrentsUserBlocked: true,
        isRecieverBlocked: false,
      });
    }

    // check if reciever is blocked

   else if (currentUser.blocked.includes(user.id)) {
      return set({
        ChatId,
        user: user,
        isCurrentsUserBlocked: false,
        isRecieverBlocked: true,
      });
    }
    else{
     return   set({
            ChatId,
            user,
            isCurrentsUserBlocked: false,
            isRecieverBlocked: false,
          });
    }
  },

  changeBlock:()=>{
    set(state=>({...state,isRecieverBlocked:!state.isRecieverBlocked}))
  }
}));
