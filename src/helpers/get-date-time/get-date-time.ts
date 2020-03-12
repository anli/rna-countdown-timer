const getDateTime = (date: string, time: string | undefined) =>
  time ? `${date}T${time}` : date;

export default getDateTime;
