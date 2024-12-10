import s from "./initials.module.css";

const Initials = ({ name }: { name: string }) => {
  if (!name) return;
  return <p className={s.initials}>{name[0]}</p>;
};

export default Initials;
