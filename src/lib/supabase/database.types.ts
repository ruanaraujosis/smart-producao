/**
 * Tipos do banco, no mesmo formato do gerador do Supabase.
 * Para regenerar a partir do banco: `npm run db:types`.
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

type AppRole = "admin" | "atendimento" | "designer" | "producao" | "expedicao" | "financeiro";

export type Database = {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          slug: string;
          name: string;
          legal_name: string | null;
          document: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          legal_name?: string | null;
          document?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          legal_name?: string | null;
          document?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          username: string;
          full_name: string;
          email: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          full_name: string;
          email?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          full_name?: string;
          email?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      organization_members: {
        Row: {
          organization_id: string;
          user_id: string;
          role: AppRole;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          organization_id: string;
          user_id: string;
          role: AppRole;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          organization_id?: string;
          user_id?: string;
          role?: AppRole;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "organization_members_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      platform_admins: {
        Row: { user_id: string; created_at: string };
        Insert: { user_id: string; created_at?: string };
        Update: { user_id?: string; created_at?: string };
        Relationships: [
          {
            foreignKeyName: "platform_admins_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      audit_log: {
        Row: {
          id: number;
          organization_id: string | null;
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
          organization_id?: string | null;
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
          organization_id?: string | null;
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
    Enums: { app_role: AppRole };
    CompositeTypes: { [_ in never]: never };
  };
};
