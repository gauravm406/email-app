export type EmailType = {
  id: string;
  date: number;
  from: {
    email: string;
    name: string;
  };
  short_description: string;
  subject: string;
};

export type EmailsDataType = {
  list: EmailType[];
  total: number;
};

export type EmailBodyType = {
  body: string;
  id: string;
};

export type EmailsContextType = {
  selectedEmail: EmailType | null;
  setSelectedEmail: (value: EmailType) => void;
  readEmails: (string | undefined)[];
  setReadEmails: (value: (string | undefined)[]) => void;
  favoriteEmails: (string | undefined)[];
  setFavoriteEmails: (value: (string | undefined)[]) => void;
};
