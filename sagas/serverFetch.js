export const fetch_comments = (action, state) => {
    const select_active = action.type === 'SHOW_FETCH_COMMENTS' ? action.payload : state.select_active;
    const page = action.type === 'CHANGE_PAGE' ? action.payload : 1;
    const url = `http://localhost:3000/comments/get?page=${page}&type=${select_active}`;
    return fetch(url).then((req) => server_error(req.json())).then((result) => {
        const { comments, pages_max } = result;
        if (comments.length <= 0) return { comments };
        return {
            comments,
            now_page: action.type === 'CHANGE_PAGE' ? action.payload : pages_max < 1 ? -1 : 1,
            pages_nums: pages_max,
            select_active
        };
    });
};

export const add_comment = (text) => {
    let replace_text = text.replace(/\r\n/g, '<br/>');
    let create_time = new Date().getTime().toString();
    let comment = { context: replace_text, state: 1, create_time };
    const parms = {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };
    return fetch('http://localhost:3000/comments/add', parms).then((result) => result.json()).then((active) => active).catch((error) => ({ error }));
};

export const update_comments = (payload, state) => {
    const parms = {
        method: 'POST',
        body: JSON.stringify({ ...payload }),
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };
    async function update_result() {
        await fetch('http://localhost:3000/comments/update', parms).then((result) => result.json()).then((active) => active).catch((error) => {
            throw new Error(error);
        });
        const url = `http://localhost:3000/comments/get?page=${state.now_page}&type=${state.select_active}`;
        return await fetch(url).then((req) => server_error(req.json())).catch((error) => {
            throw new Error(error);
        });
    }
    return update_result().then((payload) => {
        return { comments: payload.comments };
    });
};

export const fetch_delete_comment = (id, state) => {
    const parms = {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };
    async function del_result() {
        const url = `http://localhost:3000/comments/get?type=${state.select_active}&page=1`;
        await fetch('http://localhost:3000/comments/delete', parms).then((res) => res.json()).then((active) => server_error(active));
        return await fetch(url).then((req) => server_error(req.json()));
    }

    return del_result()
        .then((result) => {
            const { comments, pages_max } = result;
            return {
                comments,
                now_page: 1,
                pages_nums: pages_max > 1 ? pages_max : -1
            };
        })
        .catch((error) => {
            throw new Error(error);
        });
};

function server_error(active) {
    if (active.error) throw new Error(active);
    return active;
}
