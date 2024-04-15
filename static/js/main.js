var originalDocumentation = null;
var tokens = null;
var tokensJSON = null;

function getInput(){
    var code = document.getElementById("inputCode").value;
    code = code.replace(/[\r\n]+/g, '');
    code = code.replace(/\$/g, ' $');
    sendCode(code);
}

function sendCode(code) {
    if(originalDocumentation == null){
        originalDocumentation = document.querySelector(".results-content").textContent;
    }
    fetch('http://127.0.0.1:5000/analyzeCode', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://127.0.0.1:5000',
            'Access-Control-Credentials' : 'true'
        },
        body: JSON.stringify({ codeInput: code })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al enviar el código al backend');
        }
        return response.json();
    })
    .then(data => {
        console.log('Respuesta del backend:', data);
        if (data.error) {
            alert('Error en el análisis del código: ' + data.error);
        } else {
            tokensJSON = JSON.stringify(data);
            tokens = JSON.parse(tokensJSON);
            console.log(tokens);
            showTokens(tokens);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error al procesar el código');
    });
}

function showTokens(tokensJSON){
    var json = JSON.parse(JSON.stringify(tokensJSON));
    var tableResults = null;

    tableResults = 'Valor\tToken\n';
    tableResults += '----------------------\n';
    Object.keys(json).forEach(index => {
        if(json[index].token == undefined){
            tableResults = `There is an error in the code.\n\nDetails: ${json[index].error} ${json[index].details}\n`
        }else{
            let token = json[index].token;
            let value = json[index].value;
    
            // Agregar cada token al string de la tabla
            tableResults += `${value}\t->\t${token}\n`;
        }
    });

    // Mostrar el string de la tabla en el textarea
    var resultsTextarea = document.getElementById("documentation");
    resultsTextarea.value = tableResults;
    resultsTextarea.style.backgroundColor = 'black';
    resultsTextarea.style.color = 'white'
    resultsTextarea.style.paddingLeft = '70px';
    resultsTextarea.style.paddingTop = '50px';
    resultsTextarea.style.paddingBottom = '20px';
    resultsTextarea.style.borderRadius = '10px';
}


function back(){
    var resultsTextarea = document.querySelector(".results-content");
    resultsTextarea.value = originalDocumentation
    resultsTextarea.style.backgroundColor = 'rgba(255,255,255,0)';
    resultsTextarea.style.color = '#262626';
    resultsTextarea.style.padding = '0px';
    resultsTextarea.style.borderRadius = 'unset';
}