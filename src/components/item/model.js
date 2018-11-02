export const operction_del = (array, id) => {
    console.log(array)
    array[id-1].delete = true;
    localStorage.setItem('comment', JSON.stringify(array));
    return array;
}