export interface StudentData {
  id: number;
  name: string;
  age: number;
  gender: "M" | "F" | "O";
  learning_desability: boolean;
  classes: number;
  parental_involvement: "Low" | "Medium" | "High";
  access_to_resources: "Low" | "Medium" | "High";
  motivation_level: "Low" | "Medium" | "High";
  family_income: "Low" | "Medium" | "High";
  teacher_quality: "Low" | "Medium" | "High";
  peer_influence: "Negative" | "Neutral" | "Positive";
  parental_education: "High School" | "College" | "Postgraduate";
  distance_from_home: "Near" | "Moderate" | "Far";
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
}

export interface StudentRegisterData {
  name: string;
  age: number;
  gender: "M" | "F" | "O";
  learning_desability: boolean;
  classes: number;
  parental_involvement: "Low" | "Medium" | "High";
  access_to_resources: "Low" | "Medium" | "High";
  motivation_level: "Low" | "Medium" | "High";
  family_income: "Low" | "Medium" | "High";
  teacher_quality: "Low" | "Medium" | "High";
  peer_influence: "Negative" | "Neutral" | "Positive";
  parental_education: "High School" | "College" | "Postgraduate";
  distance_from_home: "Near" | "Moderate" | "Far";
  hours_studied: number;
  attendance: number;
  extracurricular_activities: number;
  sleep_hours: number;
  previous_scores: number;
  internet_access: boolean;
  tutoring_sessions: number;
  school_type: "Public" | "Private";
  physical_activity: number;
}

export interface StudentResponse {
  id: number;
  name: string;
  final_result: "Pass" | "Fail";
}
