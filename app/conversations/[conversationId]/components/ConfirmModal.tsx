"use client";

//core
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
//hooks
import useConversation from "@/hooks/useConversation";
//components
import Modal from "@/components/Modal";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmModal = ({ isOpen, onClose }: ConfirmModalProps) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(true);

  const onDelete = useCallback(() => {
    setIsLoading(true);

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push("/conversations");
        router.refresh();
      })
      .catch(() => toast.error("Failed to delete conversation."));
  }, []);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white p-5">Hello</div>
    </Modal>
  );
};
export default ConfirmModal;
