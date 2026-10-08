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
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          credits: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          credits?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          credits?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          id: string
          user_id: string
          title: string
          type: 'video' | 'voice' | 'music'
          status: 'draft' | 'queued' | 'processing' | 'completed' | 'failed'
          thumbnail_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          type: 'video' | 'voice' | 'music'
          status?: 'draft' | 'queued' | 'processing' | 'completed' | 'failed'
          thumbnail_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          type?: 'video' | 'voice' | 'music'
          status?: 'draft' | 'queued' | 'processing' | 'completed' | 'failed'
          thumbnail_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      video_generations: {
        Row: {
          id: string
          project_id: string
          source_video_url: string | null
          source_language: string
          target_language: string
          subtitles_enabled: boolean
          translated_subtitles_enabled: boolean
          dubbed_audio_enabled: boolean
          original_transcript: string | null
          translated_transcript: string | null
          output_video_url: string | null
          error_message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          source_video_url?: string | null
          source_language: string
          target_language: string
          subtitles_enabled?: boolean
          translated_subtitles_enabled?: boolean
          dubbed_audio_enabled?: boolean
          original_transcript?: string | null
          translated_transcript?: string | null
          output_video_url?: string | null
          error_message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          source_video_url?: string | null
          source_language?: string
          target_language?: string
          subtitles_enabled?: boolean
          translated_subtitles_enabled?: boolean
          dubbed_audio_enabled?: boolean
          original_transcript?: string | null
          translated_transcript?: string | null
          output_video_url?: string | null
          error_message?: string | null
          created_at?: string
        }
        Relationships: []
      }
      voice_generations: {
        Row: {
          id: string
          project_id: string
          input_text: string
          language: string
          voice_id: string
          voice_name: string
          gender: string
          tone: string | null
          speed: number
          output_audio_url: string | null
          duration_seconds: number | null
          error_message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          input_text: string
          language: string
          voice_id: string
          voice_name: string
          gender: string
          tone?: string | null
          speed?: number
          output_audio_url?: string | null
          duration_seconds?: number | null
          error_message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          input_text?: string
          language?: string
          voice_id?: string
          voice_name?: string
          gender?: string
          tone?: string | null
          speed?: number
          output_audio_url?: string | null
          duration_seconds?: number | null
          error_message?: string | null
          created_at?: string
        }
        Relationships: []
      }
      music_generations: {
        Row: {
          id: string
          project_id: string
          mode: 'describe' | 'lyrics' | 'dna'
          prompt: string | null
          lyrics: string | null
          genre: string | null
          mood: string | null
          language: string | null
          vocal_type: string | null
          duration: string | null
          energy: number
          tempo: number
          dna_characteristics: Json | null
          output_audio_url: string | null
          cover_art_url: string | null
          parent_generation_id: string | null
          variation_prompt: string | null
          error_message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          mode: 'describe' | 'lyrics' | 'dna'
          prompt?: string | null
          lyrics?: string | null
          genre?: string | null
          mood?: string | null
          language?: string | null
          vocal_type?: string | null
          duration?: string | null
          energy?: number
          tempo?: number
          dna_characteristics?: Json | null
          output_audio_url?: string | null
          cover_art_url?: string | null
          parent_generation_id?: string | null
          variation_prompt?: string | null
          error_message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          mode?: 'describe' | 'lyrics' | 'dna'
          prompt?: string | null
          lyrics?: string | null
          genre?: string | null
          mood?: string | null
          language?: string | null
          vocal_type?: string | null
          duration?: string | null
          energy?: number
          tempo?: number
          dna_characteristics?: Json | null
          output_audio_url?: string | null
          cover_art_url?: string | null
          parent_generation_id?: string | null
          variation_prompt?: string | null
          error_message?: string | null
          created_at?: string
        }
        Relationships: []
      }
      credit_transactions: {
        Row: {
          id: string
          user_id: string
          amount: number
          type: 'credit' | 'debit' | 'refund'
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          type: 'credit' | 'debit' | 'refund'
          description: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          type?: 'credit' | 'debit' | 'refund'
          description?: string
          created_at?: string
        }
        Relationships: []
      }
      reference_uploads: {
        Row: {
          id: string
          user_id: string
          file_url: string
          file_name: string
          analysis_json: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          file_url: string
          file_name: string
          analysis_json?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          file_url?: string
          file_name?: string
          analysis_json?: Json | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}
