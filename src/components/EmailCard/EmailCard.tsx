import s from "./emailCard.module.css";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ENDPOINTS } from "../../constants/AppEndpoints";
import { useEmailsContext } from "../../providers/EmailsProvider";
import Initials from "../Initials/Initials";
import { FORMATTED_DATE } from "../../utils/FORMATTED_DATE";
import type { EmailType } from "../../types/misc";

const EmailCard = ({ email }: { email: EmailType }) => {
  const navigate = useNavigate();
  const { from, date, short_description, subject, id } = email ?? {};
  const { setSelectedEmail, readEmails, setReadEmails } = useEmailsContext();

  // open email handler
  const handleOpenEmail = useCallback(() => {
    setSelectedEmail(email);
    navigate(`${APP_ENDPOINTS.EMAIL_BODY}/${id}`);

    // if id is already present don't do anything
    if (readEmails.includes(id)) return;
    // add id to read emails
    const tempReadEmails = [...readEmails, id];
    setReadEmails(tempReadEmails);
  }, [navigate, id, setSelectedEmail, email, setReadEmails, readEmails]);

  const isReadEmail = readEmails?.includes(id);
  const emailCardClassName = isReadEmail
    ? `${s.email_card} ${s.bg_grey}`
    : `${s.email_card} ${s.bg_white}`;

  return (
    <div
      className={emailCardClassName}
      onClick={handleOpenEmail}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleOpenEmail();
        }
      }}
    >
      <Initials name={from.name} />
      <div className={s.content_container}>
        <p className={s.from}>
          from: <span className={s.from_name}>{from?.name}</span>{" "}
          <span className={s.from_email}>&lt;{from?.email}&gt;</span>
        </p>
        <p>
          Subject: <span className={s.subject}>{subject}</span>
        </p>
        <p className={s.short_description}>{short_description}</p>
        <p className={s.date}>{FORMATTED_DATE(date)}</p>
      </div>
    </div>
  );
};

export default EmailCard;
