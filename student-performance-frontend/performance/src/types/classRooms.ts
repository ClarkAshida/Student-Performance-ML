export interface ClassRoom {
  id: number;
  code: string;
  student_count: number;
  pass_rate: number;
}

export interface ClassRoomDetails extends ClassRoom {
  students_passed: number;
  students_failed: number;
  average_attendance: number;
  average_hours_studied: number;
  average_sleep_hours: number;
  most_common_motivation_level: string;
  most_common_peer_influence: string;
  most_common_teacher_quality: string;
}

export interface ClassRoomStudents {
  id: number;
  age: number;
  name: string;
  gender: "M" | "F";
  classes: number;
  attendance: number;
  previous_scores: number;
  hours_studied: number;
  motivation_level: string;
  peer_influence: string;
  final_result: string;
}

export interface ClassRoomRegisterData {
  code: string;
}
