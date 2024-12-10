import type { EmailsContextType } from "../../types/misc";

export const DEFAULT_EMAIL_CONTEXT_VALUES: EmailsContextType = {
  selectedEmail: null,
  setSelectedEmail: () => {},
  readEmails: [],
  setReadEmails: () => {},
  favoriteEmails: [],
  setFavoriteEmails: () => {},
};
