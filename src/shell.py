import src.lexer as lexer

while True:
    text = input("SigmaChar🗿 > ")
    result, err = lexer.run(text)

    if err: 
        print(err.as_string())
    else: 
        print(result) 
        