import { useMatch, useParams } from "react-router-dom";
import { APP_ENDPOINTS } from "../../constants/AppEndpoints";
import { useFetch } from "../../hooks/useFetch";
import { email } from "../../constants/ApiEndpoints";
import s from "./emailBody.module.css";
import { useEmailsContext } from "../../providers/EmailsProvider";
import Initials from "../../components/Initials/Initials";
import { useCallback, useLayoutEffect } from "react";
import { FORMATTED_DATE } from "../../utils/FORMATTED_DATE";
import type { EmailBodyType } from "../../types/misc";

const EmailBody = () => {
  const isOnEmailBodyPath = useMatch(`${APP_ENDPOINTS.EMAIL_BODY}/:emailId`);
  const { emailId } = useParams();
  const [emailData, isEmailBodyLoading, error] = useFetch<EmailBodyType>(
    email(emailId as string)
  );
  const { selectedEmail, setFavoriteEmails, favoriteEmails } =
    useEmailsContext();

  // add/remove from favorites
  const handleMarkFavorite = useCallback(() => {
    if (favoriteEmails.includes(emailId as string)) {
      const tempReadEmails = favoriteEmails.filter((id) => emailId !== id);
      setFavoriteEmails(tempReadEmails);
      return;
    }

    const tempFavoriteEmails = [...favoriteEmails, emailId];
    setFavoriteEmails(tempFavoriteEmails);
  }, [emailId, setFavoriteEmails, favoriteEmails]);

  if (!isOnEmailBodyPath || !selectedEmail) return;

  // add email body content
  useLayoutEffect(() => {
    const descriptionBox = document.querySelector(".email-description");
    if (!descriptionBox || !emailData) return;
    descriptionBox.innerHTML = emailData?.body;
  }, [emailData]);

  const isMarkedFavorite = favoriteEmails.includes(emailId as string);

  return (
    <div className={s.email_body}>
      {isEmailBodyLoading ? (
        <div className={s.loader}>...Loading</div>
      ) : (
        <>
          <Initials name={selectedEmail.from.name} />
          <div className={s.email_body_content}>
            <section className={s.email_body_header}>
              <h2 className={s.email_subject}>{selectedEmail.subject}</h2>

              <button
                onClick={handleMarkFavorite}
                type="button"
                className={s.favorite_btn}
              >
                {isMarkedFavorite ? "Remove from favorite" : "Add to favorite"}
              </button>
            </section>
            <p>{FORMATTED_DATE(selectedEmail.date)}</p>
            <p className={`${s.email_description} email-description`} />
          </div>
        </>
      )}
    </div>
  );
};

export default EmailBody;
