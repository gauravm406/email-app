import { createContext, type ReactNode, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import type { EmailsContextType, EmailType } from "../types/misc";
import { DEFAULT_EMAIL_CONTEXT_VALUES } from "../constants/Providers/DefaultEmailContextValues";

const EmailsContext = createContext<EmailsContextType>(
  DEFAULT_EMAIL_CONTEXT_VALUES
);

export const EmailsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedEmail, setSelectedEmail] = useLocalStorage<EmailType | null>(
    "selectedEmail",
    null
  );
  const [readEmails, setReadEmails] = useLocalStorage<(string | undefined)[]>(
    "readEmails",
    []
  );
  const [favoriteEmails, setFavoriteEmails] = useLocalStorage<
    (string | undefined)[]
  >("favoriteEmails", []);

  return (
    <EmailsContext.Provider
      value={{
        selectedEmail,
        setSelectedEmail,
        readEmails,
        setReadEmails,
        favoriteEmails,
        setFavoriteEmails,
      }}
    >
      {children}
    </EmailsContext.Provider>
  );
};

export const useEmailsContext = () => {
  const context = useContext(EmailsContext);
  if (!context)
    throw new Error("useEmailsContext must be used within an EmailsProvider");

  return context;
};
