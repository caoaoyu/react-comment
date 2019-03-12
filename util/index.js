export const timeToDate = (time) => {
    let date = new Date(time);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let minutes = date.getMinutes();
    let s = date.getSeconds();
    const before_format = timeToFormat({
        y,
        m,
        d,
        h,
        minutes,
        s
    });
    return before_format;
    // return `${y}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d} ${h < 10 ? `0${h}` : h} ：${minutes < 10
    // 	? `0${minutes}`
    // 	: minutes}`;
};

export const timeToFormat = (before, time) => {
    let now = new Date();
    const { y, m, d, h, minutes, s } = before;
    let now_y = now.getFullYear();
    let now_m = now.getMonth() + 1;
    let now_d = now.getDate();
    let now_h = now.getHours();
    let now_minutes = now.getMinutes();
    let now_s = now.getSeconds();

    const year = `${y}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d}`;
    const month_date = `${now_m - m} 月前`;
    const day_date = `${now_d - d} 天前`;
    const hour_date = `${now_h - h} 小时前`;
    const minutes_date = `${now_minutes - minutes} 分钟前`;
    const s_date = `${now_s - s + 1} 秒前`;

    if (y > now_y) return year;
    if (m > now_m) return month_date;
    if (d < now_d) return day_date;
    if (h < now_h) return hour_date;
    if (minutes < now_minutes) return minutes_date;
    if (s <= now_s) return s_date;
};

const host = 'http://localhost:3000/';

export const Get = (url_parms) => {
    return fetch(`${host}${url_parms}`)
        .then((res) => {
            return server_error(res.json());
        })
        .catch((error) => {
            throw new Error(error);
        });
};

export const Post = (url_parms, body) => {
    const parms = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };
    return fetch(`${host}${url_parms}`, parms)
        .then((res) => {
            return server_error(res.json());
        })
        .catch((error) => {
            throw new Error(error);
        });
};

export const Delete = (url_parms, body) => {
    const parms = {
        method: 'DELETE',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };
    return fetch(`${host}${url_parms}`, parms)
        .then((res) => {
            return server_error(res.json());
        })
        .catch((error) => {
            throw new Error(error);
        });
};
export const server_error = (active) => {
    return active.then((datas) => {
        if (datas.error) throw new Error(datas);
        return datas;
    });
};
