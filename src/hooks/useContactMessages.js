import { useEffect, useState } from "react";

import {
  markContactMessageRead,
  subscribeContactMessages,
  deleteContactMessage,
} from "../firebase/services/messageService";

export const useContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeContactMessages(
      (data) => {
        setMessages(data);
        setLoading(false);
      },
      (err) => {
        setError(err.message || "Failed to load messages");
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const setRead = async (id) => {
    await markContactMessageRead(id);
  };

   const deleteMessage = async (id) => {
    await deleteContactMessage(id);
  };

  return {
    messages,
    loading,
    error,
    setRead,
    deleteMessage,
  };
};
