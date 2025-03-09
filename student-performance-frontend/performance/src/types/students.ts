export interface StudentData {
  id: number;
  name: string;
  gender: "M" | "F";
  learning_desability: boolean;
  parental_involvement: "Low" | "Medium" | "High";
  access_to_resources: "Low" | "Medium" | "High";
  motivation_level: "Low" | "Medium" | "High";
  family_income: "Low" | "Medium" | "High";
  teacher_quality: "Low" | "Medium" | "High";
  peer_influence: "Negative" | "Neutral" | "Positive";
  parental_education: "None" | "High School" | "College" | "Graduate";
  distance_from_home: "Short" | "Moderate" | "Long";
  hours_studied: number;
  attendance: number;
  extracurricular_activities: number;
  sleep_hours: number;
  previous_scores: number;
  internet_access: boolean;
  tutoring_sessions: number;
  school_type: "Public" | "Private";
  physical_activity: number;
  final_result: "Pass" | "Fail" | "Error";
  classes: number;
}
