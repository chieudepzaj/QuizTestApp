export const secondsToTime = (secs: number) => {
  const hours = Math.floor(secs / (60 * 60));
  const minutes = Math.floor((secs % (60 * 60)) / 60);
  const seconds = Math.ceil((secs % (60 * 60)) % 60);

  return {
    hours,
    minutes,
    seconds,
  };
};
