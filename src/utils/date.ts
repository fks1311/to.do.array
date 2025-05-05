/**
 * 오늘 날짜 함수
 *
 * @returns {string} yyyy-mm-dd
 */
export const Today = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${date}`;
};

/**
 * 타임스탬프 날짜 문자열 포맷팅
 *
 * @param {number} timestamp
 * @returns {string} yyyy-mm-dd
 */
export function timestampToDateString(timestamp: number): string {
  const date = new Date(timestamp);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
}

/**
 * 입력 날짜 기준 date + 1 함수
 *
 * @param {string} today
 * @returns {string} yyyy-mm-dd
 */
export const getTomorrowDate = (today: string): string => {
  const date = new Date(today);
  const addOneday = date.setDate(date.getDate() + 1);

  return timestampToDateString(addOneday);
};

/**
 * 하루 지났는지 확인하는 함수(오늘 자정 기준)
 *
 * @param {string} input
 * @returns {boolean} true/false
 */
export const isDateExpired = (input: string): boolean => {
  const inputDate = new Date(input);
  const inputStart = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate()).getTime();

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  const diff = todayStart - inputStart;

  return diff >= 24 * 60 * 60 * 1000;
};

// new Date() : 현재 날짜 + 시간
// new Date(y, m, d) : 그 날짜의 자정 00:00:00
