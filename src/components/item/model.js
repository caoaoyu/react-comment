export const operction_del = (array, id, comments) => {
    for (var i in comments) {
        if(comments[i].id === id) {
            console.log(comments[i])
            comments[i].delete = true;
        }
    }
    localStorage.setItem('comment', JSON.stringify(comments));
    return array;
}