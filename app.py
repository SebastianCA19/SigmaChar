from flask import Flask, request, render_template
import src.lexer as lexer
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def start():
    return render_template('index.html')

@app.route('/analyzeCode', methods=['POST'])
def analyze_code():
    if request.method == 'POST':
        code = request.json['codeInput']
        results, err = lexer.run(code)
        if err:
            errJSON = {}
            errJSON[0] = {
                'error' : err.error_name, 'details' : err.details
            }
            return json.dumps(errJSON)
        else:
            return json.dumps(results)
if __name__ == '__main__':
    # Utiliza la URL de tu aplicación si se ejecuta localmente
    app.run(debug=True, host='0.0.0.0', port=10000)
