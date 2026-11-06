export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          role: 'admin' | 'student'
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          role?: 'admin' | 'student'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          role?: 'admin' | 'student'
          created_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string | null
          price: number
          image_url: string | null
          created_at: string
        }
      }
      exams: {
        Row: {
          id: string
          course_id: string
          title: string
          duration_minutes: number
          total_marks: number
        }
      }
      questions: {
        Row: {
          id: string
          exam_id: string
          question_text: string
          options: Json
          correct_option: number
        }
      }
    }
  }
}
