import numpy as np

def transform_student_data(student_data):
    """
    Converte os dados do aluno em um array formatado para o modelo de IA.
    """

    # Mapeamento para One-Hot Encoding
    one_hot_mappings = {
        "parental_involvement": ["High", "Low", "Medium"],
        "access_to_resources": ["High", "Low", "Medium"],
        "motivation_level": ["High", "Low", "Medium"],
        "family_income": ["High", "Low", "Medium"],
        "teacher_quality": ["High", "Low", "Medium"],
        "peer_influence": ["Negative", "Neutral", "Positive"],
        "parental_education": ["College", "High School", "Postgraduate"],
        "distance_from_home": ["Far", "Moderate", "Near"]
    }

    # Converter variáveis categóricas para One-Hot Encoding
    encoded_features = []
    for feature, categories in one_hot_mappings.items():
        value = student_data[feature]
        encoded_features.extend([1 if value == cat else 0 for cat in categories])

    # Converter Label Encodings
    internet_access = 1 if student_data["internet_access"] else 0 # 1 = Sim, 0 = Não
    learning_disability = 1 if student_data["learning_desability"] else 0 # 1 = Sim, 0 = Não
    school_type = 1 if student_data["school_type"] == "Public" else 0  # 1 = Pública, 0 = Privada
    gender = 1 if student_data["gender"] == "M" else 0  # 1 = Masculino, 0 = Feminino

    # Pegar valores numéricos diretamente
    numerical_features = [
        student_data["hours_studied"],
        student_data["attendance"],
        student_data["extracurricular_activities"],
        student_data["sleep_hours"],
        student_data["previous_scores"],
        internet_access,
        student_data["tutoring_sessions"],
        school_type,
        student_data["physical_activity"],
        learning_disability,
        gender
    ]

    # Criar array final para o modelo
    final_array = np.array(encoded_features + numerical_features).reshape(1, -1)
    
    return final_array