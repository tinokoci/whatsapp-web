"use client";

import { useAppSelector } from "@/redux/hooks";

interface Props {
  chatWindow: React.ReactNode;
  welcomeCard: React.ReactNode;
}

const RightPanel = ({ chatWindow, welcomeCard }: Props) => {
  const activeEntityId = useAppSelector(
    (store) => store.chatReducer.activeEntityId,
  );
  return activeEntityId ? chatWindow : welcomeCard;
};

export default RightPanel;
