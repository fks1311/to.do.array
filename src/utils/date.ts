/**
 * 오늘 날짜 함수
 *
 * @returns {string} yyyy-mm-dd
 */
export const Today = (): string => {
  const curretnr = new Date();
  const today = new Date(curretnr.getFullYear(), curretnr.getMonth(), curretnr.getDate());
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
 * 하루 또는 일주일 지났는지 확인하는 함수(오늘 자정 기준)
 * 어제, 저번주 기준으로 지났으면 true, 아니면(미래기준이면) false
 *
 * @param {string} input
 * @returns {boolean} true/false
 */
export const isExpired = (input: string): boolean => {
  // console.log(input);
  // const Type = type === "today" ? 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000;

  const inputDate = new Date(input);
  const inputStart = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate()).getTime();

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  const diff = todayStart - inputStart;

  return diff >= 24 * 60 * 60 * 1000;
};

// new Date() : 현재 날짜 + 시간
// new Date(y, m, d) : 그 날짜의 자정 00:00:00
// 24 * 60 * 60 * 1000 : 하루 24 시간 * 1시간 60분 * 1분 60초 * 1초 1000 = 86,400,000ms

// 해당 주의 월요일 구하기
export const setStoreDate = (input: string): string => {
  const inputDate = new Date(input);
  const day = inputDate.getDay();
  const d = day === 0 ? day - 6 : day - 1;

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const date = String(inputDate.getDate()).padStart(2, "0");
  const setDate = new Date(`${year}-${month}-${Number(date) - d}`);

  const newYear = setDate.getFullYear();
  const newMonth = String(setDate.getMonth() + 1).padStart(2, "0");
  const newDate = String(setDate.getDate()).padStart(2, "0");

  return `${newYear}-${newMonth}-${newDate}`;
};

// 일요일부터 시작 0 ~ 토요일 6
