import { error } from 'util';

export const fetch_comments = (action) => {
    return new Promise((resolve, reject) => {
        const url = `http://localhost:3000/comments/get?page=${action.type === 'CHANGE_PAGE' ? action.payload : 1}`;
        fetch(url).then((req) => {
            req.json().then((result) => {
                if (result.error) reject(error);
                const { comments, pages_max } = result;
                if (comments.length <= 0) resolve({ comments });
                comments.sort((a, b) => b.time - a.time);
                resolve({
                    comments,
                    now_page: action.type === 'CHANGE_PAGE' ? action.payload : pages_max < 1 ? -1 : 1,
                    pages_nums: pages_max,
                    select_active: action.type === 'SHOW_DELETEL' || 'SHOW_NOT_DELETEL' ? action.payload : 'all'
                });
            });
        });
    });
};

export const add_comment = (text, state) => {
    const data = state.comments;
    let replace_text = text.replace(/\r\n/g, '<br/>');
    let id = data[data.length - 1] ? data[0].id + 1 : 1;
    let create_time = new Date().getTime();
    let comment = { id, context: replace_text, state: 1, create_time };
    const start = 0; //(state.now_page - 1) * state.one_max;

    const parms = {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };

    return fetch('http://localhost:3000/comments/add', parms)
        .then((result) => result.json())
        .then((active) => active)
            // const sort_comment = comments.sort((a, b) => b.time - a.time);
            // const page_comment = sort_comment.length < state.one_max ? sort_comment : sort_comment.slice(start, start + state.one_max);
            // return {
            //     comments,
            //     page_comment,
            //     select_comments: sort_comment,
            //     ids: comments.length,
            //     select_active: 'all',
            //     now_page: sort_comment.length < 7 ? -1 : 1,
            //     pages_nums: Math.ceil(sort_comment.length / state.one_max)
            // };
        // })
        .catch((error) => ({ error }));
};

export const fetch_delete_comment = (id, state) => {
    const { select_active, one_max } = state;
    const select_func = select_comments;
    const parms = {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };
    return fetch('http://localhost:3000/comments/delete', parms)
        .then((result) => result.json())
        .then((array) => {
            const comments = array.sort((a, b) => b.time - a.time);
            const select_comments = select_func(comments, select_active);
            const pages_nums = select_comments.length > 7 ? Math.ceil(select_comments.length / one_max) : -1;
            const page_comment = select_comments.length > 7 ? select_comments.slice(0, 7) : select_comments;
            const data = {
                select_active,
                page_comment,
                now_page: 1,
                pages_nums,
                select_comments,
                comments
            };
            return data;
        })
        .catch((error) => ({ error }));
};

const select_comments = (array, type) => {
    switch (type) {
        case 'not':
            return array.filter((v) => !v.delete);
        case 'del':
            return array.filter((v) => v.delete);
        default:
            return array;
    }
};
