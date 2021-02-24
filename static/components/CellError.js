const CellError = (message) => {

return `
    <div class="error">
    <p>
        <span class="error-sign">&#10060;</span> 
        ${message}
    </p>
    <button class="error-close">&#10060;</button>
    </div>`
}

export default CellError;
