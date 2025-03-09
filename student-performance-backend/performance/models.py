from django.db import models

class Classroom(models.Model):
    code = models.CharField(max_length=100)

    def __str__(self):
        return self.code

class Student(models.Model):
    # Dados Pessoais
    name = models.CharField(max_length=100)
    age = models.IntegerField
    gender = models.CharField(max_length=1, choices=[("M", "Male"), ("F", "Female"), ("O", "Other")])
    learning_desability = models.BooleanField(default=False)
    # Turma
    classes = models.ForeignKey(Classroom, on_delete=models.CASCADE)
    # Dados Categóricos
    parental_involvement = models.CharField(max_length=10, choices=[("High", "High"), ("Medium", "Medium"), ("Low", "Low")])
    access_to_resources = models.CharField(max_length=10, choices=[("High", "High"), ("Medium", "Medium"), ("Low", "Low")])
    motivation_level = models.CharField(max_length=10, choices=[("High", "High"), ("Medium", "Medium"), ("Low", "Low")])
    family_income = models.CharField(max_length=10, choices=[("High", "High"), ("Medium", "Medium"), ("Low", "Low")])
    teacher_quality = models.CharField(max_length=10, choices=[("High", "High"), ("Medium", "Medium"), ("Low", "Low")])
    peer_influence = models.CharField(max_length=10, choices=[("Positive", "Positive"), ("Neutral", "Neutral"), ("Negative", "Negative")])
    parental_education = models.CharField(max_length=20, choices=[("High School", "High School"), ("College", "College"), ("Postgraduate", "Postgraduate")])
    distance_from_home = models.CharField(max_length=10, choices=[("Near", "Near"), ("Moderate", "Moderate"), ("Far", "Far")])
    # Dados Numéricos
    hours_studied = models.FloatField()
    attendance = models.FloatField()
    extracurricular_activities = models.IntegerField()
    sleep_hours = models.FloatField()
    previous_scores = models.FloatField()
    internet_access = models.BooleanField()
    tutoring_sessions = models.IntegerField()
    school_type = models.CharField(max_length=20, choices=[("Public", "Public"), ("Private", "Private")])
    physical_activity = models.IntegerField()
    # Resultado
    final_result = models.CharField(max_length=10, choices=[("Pass", "Pass"), ("Fail", "Fail")], null=True, blank=True)

    def __str__(self):
        return self.name