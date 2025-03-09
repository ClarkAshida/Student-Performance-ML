import joblib
from .data_preprocessing import transform_student_data

# Carregar o modelo treinado (substitua pelo caminho real do modelo)
model = joblib.load("./performance/model/model.pkl")

def predict_student_performance(student_data):
    """
    Converte os dados do aluno, faz a predição e retorna "Pass" ou "Fail".
    """
    try:
        # Transformar os dados para o formato esperado pelo modelo
        data = transform_student_data(student_data)
        
        # Fazer a predição
        prediction = model.predict(data)

        # Converter para "Pass" ou "Fail"
        return "Pass" if prediction[0] == 0 else "Fail"
    except Exception as e:
        print(f"Erro ao rodar predição: {e}")
        return "Error"
