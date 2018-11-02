export const operction_del = (array, id) => {
    array[id-1].delete = true;
    localStorage.setItem('comment', JSON.stringify(array));
    return array;
}