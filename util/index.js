export const timeToDate = (time) => {
	let date = new Date(time);
	let y = date.getFullYear();
	let m = date.getMonth() + 1;
	let d = date.getDate();
	let h = date.getHours();
	let minutes = date.getMinutes();
	let s = date.getSeconds();
	// return {
	// 	y,
	// 	m,
	// 	d,
	// 	h,
	// 	minutes,
	// 	s
    // };
    return `${y}-${m <10 ? `0${m}` : m}-${d <10 ? `0${d}` : d} ${h <10 ? `0${h}` : h} ：${minutes <10 ? `0${minutes}` : minutes}`
};

// export const timeToDate = (time) => {
// 	let before = timeToNumber(time);
// 	let now = timeToNumber(new Date().getTime());
//     const { y, m, d, h, minutes, s } = before;
//     let year_date = `${y}-${m <10 ? `0${m}` : m}-${d <10 ? `0${d}` : d}`
//     let m_date = `${m <10 ? `0${m}` : m}-${d <10 ? `0${d}` : d}`
//     if (y < now.y) return year_date;
//     if(m > now.y) return 
// };
