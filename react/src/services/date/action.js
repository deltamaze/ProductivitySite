
export const SETDATE = 'SETDATE';

export function setDate(date) {
  return (
    {
      type: SETDATE,
      payload: { date }
    });
}
