import { create } from "zustand";

type ClientMessage = { type: "ERROR" | "SUCCESS"; message: string } | undefined;

type State = {
  clientMessage: ClientMessage;
};

type Actions = {
  updateClientMessage: (clientMessage: ClientMessage) => void;
};

const useClientMessageStore = create<State & Actions>((set) => ({
  clientMessage: undefined,
  updateClientMessage: (clientMessage) => {
    set(() => ({
      clientMessage,
    }));
  },
}));

export default useClientMessageStore;
