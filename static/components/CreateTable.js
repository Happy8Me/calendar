import { days } from '../data.js';
const CreateTable = (time, tbContainer) => {

    const headers = ['Name',...days]; //headers for the table
 
    if(!tbContainer){return};
    
    let tbl = '';
    const rows = time.length;
    const columns = headers.length;
    
    tbl += '<thead class="table-secondary"><tr>'
        for(let j = 0; j < columns; j++){
            tbl += `<th scope="col"> ${headers[j]} </th>`
        }
    tbl += '</tr></thead>'
    
    tbl += '<tbody>'
        for (let i = 0; i < rows; i++){
            tbl += `<tr><th>${time[i]}`
                for(let j = 1; j < columns; j++){
                    tbl += `<td class="a${i+1+''+j}"></td>`
                }
            tbl += '</th></tr>'
        }
    tbl += '</tbody>'
    
    tbContainer.insertAdjacentHTML('afterbegin', `<table class="table text-center table-bordered">${tbl}</table>`);
}
    
export { CreateTable }; 