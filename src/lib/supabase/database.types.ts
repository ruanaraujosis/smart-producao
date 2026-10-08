/**
 * Tipos do banco, no mesmo formato do gerador do Supabase.
 * Para regenerar a partir do banco: `npm run db:types`.
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string;
          organization_id: string;
          person_type: Database["public"]["Enums"]["person_type"];
          name: string;
          legal_name: string | null;
          document: string | null;
          email: string | null;
          phone: string | null;
          whatsapp: string | null;
          origin: Database["public"]["Enums"]["sales_channel"];
          cep: string | null;
          street: string | null;
          number: string | null;
          complement: string | null;
          district: string | null;
          city: string | null;
          state: string | null;
          notes: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          person_type?: Database["public"]["Enums"]["person_type"];
          name: string;
          legal_name?: string | null;
          document?: string | null;
          email?: string | null;
          phone?: string | null;
          whatsapp?: string | null;
          origin?: Database["public"]["Enums"]["sales_channel"];
          cep?: string | null;
          street?: string | null;
          number?: string | null;
          complement?: string | null;
          district?: string | null;
          city?: string | null;
          state?: string | null;
          notes?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          person_type?: Database["public"]["Enums"]["person_type"];
          name?: string;
          legal_name?: string | null;
          document?: string | null;
          email?: string | null;
          phone?: string | null;
          whatsapp?: string | null;
          origin?: Database["public"]["Enums"]["sales_channel"];
          cep?: string | null;
          street?: string | null;
          number?: string | null;
          complement?: string | null;
          district?: string | null;
          city?: string | null;
          state?: string | null;
          notes?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "customers_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      suppliers: {
        Row: {
          id: string;
          organization_id: string;
          name: string;
          legal_name: string | null;
          document: string | null;
          contact_name: string | null;
          email: string | null;
          phone: string | null;
          cep: string | null;
          street: string | null;
          number: string | null;
          complement: string | null;
          district: string | null;
          city: string | null;
          state: string | null;
          notes: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          name: string;
          legal_name?: string | null;
          document?: string | null;
          contact_name?: string | null;
          email?: string | null;
          phone?: string | null;
          cep?: string | null;
          street?: string | null;
          number?: string | null;
          complement?: string | null;
          district?: string | null;
          city?: string | null;
          state?: string | null;
          notes?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          name?: string;
          legal_name?: string | null;
          document?: string | null;
          contact_name?: string | null;
          email?: string | null;
          phone?: string | null;
          cep?: string | null;
          street?: string | null;
          number?: string | null;
          complement?: string | null;
          district?: string | null;
          city?: string | null;
          state?: string | null;
          notes?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "suppliers_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      product_categories: {
        Row: {
          id: string;
          organization_id: string;
          name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          name: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          name?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "product_categories_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      products: {
        Row: {
          id: string;
          organization_id: string;
          category_id: string | null;
          name: string;
          description: string | null;
          fulfillment: Database["public"]["Enums"]["fulfillment_mode"];
          production_days: number;
          ncm: string | null;
          cest: string | null;
          cfop: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          category_id?: string | null;
          name: string;
          description?: string | null;
          fulfillment?: Database["public"]["Enums"]["fulfillment_mode"];
          production_days?: number;
          ncm?: string | null;
          cest?: string | null;
          cfop?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          category_id?: string | null;
          name?: string;
          description?: string | null;
          fulfillment?: Database["public"]["Enums"]["fulfillment_mode"];
          production_days?: number;
          ncm?: string | null;
          cest?: string | null;
          cfop?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "products_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "product_categories";
            referencedColumns: ["id"];
          },
        ];
      };
      product_variants: {
        Row: {
          id: string;
          organization_id: string;
          product_id: string;
          sku: string;
          name: string;
          attributes: Json;
          base_price: number;
          weight_g: number | null;
          length_cm: number | null;
          width_cm: number | null;
          height_cm: number | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          product_id: string;
          sku: string;
          name: string;
          attributes?: Json;
          base_price?: number;
          weight_g?: number | null;
          length_cm?: number | null;
          width_cm?: number | null;
          height_cm?: number | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          product_id?: string;
          sku?: string;
          name?: string;
          attributes?: Json;
          base_price?: number;
          weight_g?: number | null;
          length_cm?: number | null;
          width_cm?: number | null;
          height_cm?: number | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "product_variants_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "product_variants_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      product_images: {
        Row: {
          id: string;
          organization_id: string;
          product_id: string;
          storage_path: string;
          position: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          product_id: string;
          storage_path: string;
          position?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          product_id?: string;
          storage_path?: string;
          position?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "product_images_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "product_images_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
        ];
      };
      channel_price_rules: {
        Row: {
          organization_id: string;
          channel: Database["public"]["Enums"]["sales_channel"];
          adjustment_pct: number;
          updated_at: string;
        };
        Insert: {
          organization_id: string;
          channel: Database["public"]["Enums"]["sales_channel"];
          adjustment_pct?: number;
          updated_at?: string;
        };
        Update: {
          organization_id?: string;
          channel?: Database["public"]["Enums"]["sales_channel"];
          adjustment_pct?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "channel_price_rules_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      variant_channel_prices: {
        Row: {
          organization_id: string;
          variant_id: string;
          channel: Database["public"]["Enums"]["sales_channel"];
          price: number;
          updated_at: string;
        };
        Insert: {
          organization_id: string;
          variant_id: string;
          channel: Database["public"]["Enums"]["sales_channel"];
          price: number;
          updated_at?: string;
        };
        Update: {
          organization_id?: string;
          variant_id?: string;
          channel?: Database["public"]["Enums"]["sales_channel"];
          price?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "variant_channel_prices_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "variant_channel_prices_variant_id_fkey";
            columns: ["variant_id"];
            isOneToOne: false;
            referencedRelation: "product_variants";
            referencedColumns: ["id"];
          },
        ];
      };
      materials: {
        Row: {
          id: string;
          organization_id: string;
          name: string;
          sku: string | null;
          unit: string;
          avg_cost: number;
          min_stock: number;
          supplier_id: string | null;
          notes: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          name: string;
          sku?: string | null;
          unit: string;
          avg_cost?: number;
          min_stock?: number;
          supplier_id?: string | null;
          notes?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          name?: string;
          sku?: string | null;
          unit?: string;
          avg_cost?: number;
          min_stock?: number;
          supplier_id?: string | null;
          notes?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "materials_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "materials_supplier_id_fkey";
            columns: ["supplier_id"];
            isOneToOne: false;
            referencedRelation: "suppliers";
            referencedColumns: ["id"];
          },
        ];
      };
      bom_items: {
        Row: {
          organization_id: string;
          variant_id: string;
          material_id: string;
          quantity: number;
          waste_pct: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          organization_id: string;
          variant_id: string;
          material_id: string;
          quantity: number;
          waste_pct?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          organization_id?: string;
          variant_id?: string;
          material_id?: string;
          quantity?: number;
          waste_pct?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bom_items_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bom_items_variant_id_fkey";
            columns: ["variant_id"];
            isOneToOne: false;
            referencedRelation: "product_variants";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bom_items_material_id_fkey";
            columns: ["material_id"];
            isOneToOne: false;
            referencedRelation: "materials";
            referencedColumns: ["id"];
          },
        ];
      };
      payment_methods: {
        Row: {
          id: string;
          organization_id: string;
          name: string;
          kind: string;
          fee_pct: number;
          settlement_days: number;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          name: string;
          kind: string;
          fee_pct?: number;
          settlement_days?: number;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          name?: string;
          kind?: string;
          fee_pct?: number;
          settlement_days?: number;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "payment_methods_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      stock_balances: {
        Row: {
          id: string;
          organization_id: string;
          material_id: string | null;
          variant_id: string | null;
          on_hand: number;
          reserved: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          material_id?: string | null;
          variant_id?: string | null;
          on_hand?: number;
          reserved?: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          material_id?: string | null;
          variant_id?: string | null;
          on_hand?: number;
          reserved?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "stock_balances_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "stock_balances_material_id_fkey";
            columns: ["material_id"];
            isOneToOne: false;
            referencedRelation: "materials";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "stock_balances_variant_id_fkey";
            columns: ["variant_id"];
            isOneToOne: false;
            referencedRelation: "product_variants";
            referencedColumns: ["id"];
          },
        ];
      };
      stock_movements: {
        Row: {
          id: number;
          organization_id: string;
          material_id: string | null;
          variant_id: string | null;
          type: Database["public"]["Enums"]["stock_movement_type"];
          quantity: number;
          unit_cost: number | null;
          reason: string | null;
          reference: string | null;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: never;
          organization_id: string;
          material_id?: string | null;
          variant_id?: string | null;
          type: Database["public"]["Enums"]["stock_movement_type"];
          quantity: number;
          unit_cost?: number | null;
          reason?: string | null;
          reference?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: never;
          organization_id?: string;
          material_id?: string | null;
          variant_id?: string | null;
          type?: Database["public"]["Enums"]["stock_movement_type"];
          quantity?: number;
          unit_cost?: number | null;
          reason?: string | null;
          reference?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "stock_movements_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "stock_movements_material_id_fkey";
            columns: ["material_id"];
            isOneToOne: false;
            referencedRelation: "materials";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "stock_movements_variant_id_fkey";
            columns: ["variant_id"];
            isOneToOne: false;
            referencedRelation: "product_variants";
            referencedColumns: ["id"];
          },
        ];
      };
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
          must_change_password: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          full_name: string;
          email?: string | null;
          must_change_password?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          full_name?: string;
          email?: string | null;
          must_change_password?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      organization_members: {
        Row: {
          organization_id: string;
          user_id: string;
          role_id: string;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          organization_id: string;
          user_id: string;
          role_id: string;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          organization_id?: string;
          user_id?: string;
          role_id?: string;
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
          {
            foreignKeyName: "organization_members_role_id_fkey";
            columns: ["role_id"];
            isOneToOne: false;
            referencedRelation: "organization_roles";
            referencedColumns: ["id"];
          },
        ];
      };
      organization_roles: {
        Row: {
          id: string;
          organization_id: string;
          name: string;
          description: string | null;
          permissions: string[];
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          name: string;
          description?: string | null;
          permissions?: string[];
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          name?: string;
          description?: string | null;
          permissions?: string[];
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "organization_roles_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
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
    Views: {
      material_stock: {
        Row: {
          material_id: string;
          organization_id: string;
          name: string;
          unit: string;
          avg_cost: number;
          min_stock: number;
          supplier_id: string | null;
          active: boolean;
          on_hand: number;
          reserved: number;
          available: number;
          below_min: boolean;
          suggested_purchase: number;
          stock_value: number;
        };
        Relationships: [];
      };
      variant_availability: {
        Row: {
          variant_id: string;
          organization_id: string;
          product_id: string;
          sku: string;
          fulfillment: Database["public"]["Enums"]["fulfillment_mode"];
          ready_units: number;
          producible_units: number | null;
          bom_items: number;
          available_units: number;
        };
        Relationships: [];
      };
    };
    Functions: {
      variant_price: {
        Args: { p_variant: string; p_channel: Database["public"]["Enums"]["sales_channel"] };
        Returns: number;
      };
      consume_bom: {
        Args: { p_variant: string; p_quantity: number; p_reference?: string | null };
        Returns: number;
      };
    };
    Enums: {
      sales_channel: "balcao" | "shopee" | "magalu" | "tiktok" | "whatsapp";
      person_type: "pf" | "pj";
      fulfillment_mode: "sob_encomenda" | "pronta_entrega";
      stock_movement_type: "entrada" | "saida" | "ajuste" | "perda" | "consumo" | "reserva" | "liberacao";
    };
    CompositeTypes: { [_ in never]: never };
  };
};
