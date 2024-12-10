import { Outlet, useMatch } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { emails } from "../../constants/ApiEndpoints.ts";
import s from "./rootLayout.module.css";
import EmailCard from "../../components/EmailCard/EmailCard";
import { APP_ENDPOINTS } from "../../constants/AppEndpoints.ts";
import { useCallback, useMemo, useState } from "react";
import { useEmailsContext } from "../../providers/EmailsProvider.tsx";
import { FAVORITE, READ, UNREAD } from "../../constants/Misc.ts";
import type { EmailType, EmailsDataType } from "../../types/misc.ts";

const RootLayout = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [emailsData, isEmailsDataLoading, error] = useFetch<EmailsDataType>(
    emails(pageNumber)
  );
  const isOnEmailBodyPath = useMatch(`${APP_ENDPOINTS.EMAIL_BODY}/:emailId`);
  const [filterAction, setFilterAction] = useState<null | string>(null);
  const { readEmails, favoriteEmails } = useEmailsContext();

  const rootMainWrapperClassName = isOnEmailBodyPath
    ? s.root_main_wrapper_flex
    : s.root_main_wrapper_block;

  const emailsListClassName = isOnEmailBodyPath
    ? `${s.emails_list} ${s.emails_list_width_40}`
    : `${s.emails_list} ${s.emails_list_width_100}`;

  // filter buttons handler
  const handleFilter = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const action = e.currentTarget.getAttribute("data-action");
    setFilterAction((prev) => (prev === action ? null : action));
  }, []);

  // filtered emails
  const filteredEmailsList = useMemo(() => {
    if (!emailsData) return [];

    switch (filterAction) {
      case UNREAD:
        return emailsData.list.filter(
          (email: EmailType) => !readEmails.includes(email.id)
        );
      case READ:
        return emailsData.list.filter((email) => readEmails.includes(email.id));
      case FAVORITE:
        return emailsData.list.filter((email) =>
          favoriteEmails.includes(email.id)
        );
      default:
        return emailsData.list;
    }
  }, [filterAction, emailsData, readEmails, favoriteEmails]);

  const pageChangeHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const page = Number(e.currentTarget.getAttribute("data-page"));
      if (!page) return;
      setPageNumber(page);
    },
    []
  );

  return (
    <main className={s.root_main}>
      <header className={s.filters}>
        <span>Filter By: </span>
        <button
          type="button"
          onClick={handleFilter}
          data-action={UNREAD}
          className={filterAction === UNREAD ? s.bg_grey : s.bg_white}
        >
          Unread
        </button>
        <button
          type="button"
          onClick={handleFilter}
          data-action={READ}
          className={filterAction === READ ? s.bg_grey : s.bg_white}
        >
          Read
        </button>
        <button
          type="button"
          onClick={handleFilter}
          data-action={FAVORITE}
          className={filterAction === FAVORITE ? s.bg_grey : s.bg_white}
        >
          Favorite
        </button>
      </header>
      <section className={rootMainWrapperClassName}>
        <aside className={emailsListClassName}>
          <section className={s.list}>
            {isEmailsDataLoading ? (
              <div className={s.loader}>...Loading</div>
            ) : (
              filteredEmailsList?.map((email: EmailType) => {
                return <EmailCard key={email.id} email={email} />;
              })
            )}
          </section>
          <section className={s.page_btns_container}>
            <button
              type="button"
              onClick={pageChangeHandler}
              data-page={1}
              className={pageNumber === 1 ? s.bg_grey : s.bg_white}
            >
              1
            </button>
            <button
              type="button"
              onClick={pageChangeHandler}
              data-page={2}
              className={pageNumber === 2 ? s.bg_grey : s.bg_white}
            >
              2
            </button>
          </section>
        </aside>
        <Outlet />
      </section>
    </main>
  );
};

export default RootLayout;
