/**
 * Tipos do banco. Escritos à mão na Fase 1, no mesmo formato do gerador.
 * Para regenerar a partir do banco: `npm run db:types`.
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          full_name: string;
          role: Database["public"]["Enums"]["app_role"];
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          full_name: string;
          role: Database["public"]["Enums"]["app_role"];
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          full_name?: string;
          role?: Database["public"]["Enums"]["app_role"];
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      audit_log: {
        Row: {
          id: number;
          table_name: string;
          record_id: string | null;
          action: string;
          old_data: Json | null;
          new_data: Json | null;
          changed_fields: string[] | null;
          actor_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: never;
          table_name: string;
          record_id?: string | null;
          action: string;
          old_data?: Json | null;
          new_data?: Json | null;
          changed_fields?: string[] | null;
          actor_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: never;
          table_name?: string;
          record_id?: string | null;
          action?: string;
          old_data?: Json | null;
          new_data?: Json | null;
          changed_fields?: string[] | null;
          actor_id?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: {
      app_role: "admin" | "atendimento" | "designer" | "producao" | "expedicao" | "financeiro";
    };
    CompositeTypes: { [_ in never]: never };
  };
};

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
