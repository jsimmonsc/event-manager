export interface Student {
  schoolid: number;
  first_name: string;
  last_name: string;
  grade_level: number;
  student_number: number;
  fines: boolean;
  lunch_fines?: boolean;
  attendance?: boolean;
}
