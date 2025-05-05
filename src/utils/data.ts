// 오늘 날짜 함수
export const Today = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  return `${year}-${month}-${date}`;
};

// 타임스탬프 날짜 문자열 포맷팅
export function timestampToDateString(timestamp: number): string {
  const date = new Date(timestamp);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// date + 1 함수
export const getTomorrowDate = (today: string): string => {
  const date = new Date(today);
  const addOneday = date.setDate(date.getDate() + 1);

  return timestampToDateString(addOneday);
};

// 하루 지났는지 확인하는 함수
export const isDateExpired = () => {};
