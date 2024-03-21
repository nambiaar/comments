import { CommentObj } from "../App";
import { parse, format, isBefore, sub } from "date-fns";

export const CommentCard = ({ comment }: { comment: CommentObj }) => {
  const { message, name, created } = comment;

  return (
    <div className="mt-5 m-5 border-2 border-[#000] p-5">
      <div className="font-bold">{message}</div>
      <div>
        <span>{name}</span> on <span>{formatDate(created)}</span>
      </div>
    </div>
  );
};

const formatDate = (created: string) => {
  if (created) {
    const dateObj = parse(created, "yyyy-MM-dd HH:mm:ss", new Date());

    const isWithinAWeek = isBefore(sub(new Date(), { days: 6 }), dateObj);
    const formattedDay = isWithinAWeek
      ? format(dateObj, "EEEE")
      : format(dateObj, "MMMM do");

    return formattedDay + format(dateObj, " 'at' p");
  }
};
