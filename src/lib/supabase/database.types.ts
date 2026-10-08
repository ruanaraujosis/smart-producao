/**
 * Tipos do banco, no mesmo formato do gerador do Supabase.
 * Para regenerar a partir do banco: `npm run db:types`.
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      order_counters: {
        Row: {
          organization_id: string;
          last_number: number;
        };
        Insert: {
          organization_id: string;
          last_number?: number;
        };
        Update: {
          organization_id?: string;
          last_number?: number;
        };
        Relationships: [
          {
            foreignKeyName: "order_counters_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
        ];
      };
      orders: {
        Row: {
          id: string;
          organization_id: string;
          number: number;
          channel: Database["public"]["Enums"]["sales_channel"];
          status: Database["public"]["Enums"]["order_status"];
          customer_id: string | null;
          customer_name: string;
          customer_phone: string | null;
          needs_art: boolean;
          due_date: string | null;
          payment_method_id: string | null;
          subtotal: number;
          discount: number;
          shipping: number;
          total: number;
          notes: string | null;
          tracking_code: string | null;
          external_id: string | null;
          cancel_reason: string | null;
          status_changed_at: string;
          approved_at: string | null;
          shipped_at: string | null;
          delivered_at: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          number?: number;
          channel?: Database["public"]["Enums"]["sales_channel"];
          status?: Database["public"]["Enums"]["order_status"];
          customer_id?: string | null;
          customer_name: string;
          customer_phone?: string | null;
          needs_art?: boolean;
          due_date?: string | null;
          payment_method_id?: string | null;
          subtotal?: number;
          discount?: number;
          shipping?: number;
          total?: number;
          notes?: string | null;
          tracking_code?: string | null;
          external_id?: string | null;
          cancel_reason?: string | null;
          status_changed_at?: string;
          approved_at?: string | null;
          shipped_at?: string | null;
          delivered_at?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          number?: number;
          channel?: Database["public"]["Enums"]["sales_channel"];
          status?: Database["public"]["Enums"]["order_status"];
          customer_id?: string | null;
          customer_name?: string;
          customer_phone?: string | null;
          needs_art?: boolean;
          due_date?: string | null;
          payment_method_id?: string | null;
          subtotal?: number;
          discount?: number;
          shipping?: number;
          total?: number;
          notes?: string | null;
          tracking_code?: string | null;
          external_id?: string | null;
          cancel_reason?: string | null;
          status_changed_at?: string;
          approved_at?: string | null;
          shipped_at?: string | null;
          delivered_at?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "orders_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "orders_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "orders_payment_method_id_fkey";
            columns: ["payment_method_id"];
            isOneToOne: false;
            referencedRelation: "payment_methods";
            referencedColumns: ["id"];
          },
        ];
      };
      order_items: {
        Row: {
          id: string;
          organization_id: string;
          order_id: string;
          variant_id: string | null;
          description: string;
          quantity: number;
          unit_price: number;
          stock_state: Database["public"]["Enums"]["order_item_stock"];
          position: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          order_id: string;
          variant_id?: string | null;
          description: string;
          quantity: number;
          unit_price: number;
          stock_state?: Database["public"]["Enums"]["order_item_stock"];
          position?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          order_id?: string;
          variant_id?: string | null;
          description?: string;
          quantity?: number;
          unit_price?: number;
          stock_state?: Database["public"]["Enums"]["order_item_stock"];
          position?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_items_variant_id_fkey";
            columns: ["variant_id"];
            isOneToOne: false;
            referencedRelation: "product_variants";
            referencedColumns: ["id"];
          },
        ];
      };
      order_events: {
        Row: {
          id: number;
          organization_id: string;
          order_id: string;
          type: Database["public"]["Enums"]["order_event_type"];
          from_status: Database["public"]["Enums"]["order_status"] | null;
          to_status: Database["public"]["Enums"]["order_status"] | null;
          message: string | null;
          actor_id: string | null;
          actor_label: string | null;
          created_at: string;
        };
        Insert: {
          id?: never;
          organization_id: string;
          order_id: string;
          type: Database["public"]["Enums"]["order_event_type"];
          from_status?: Database["public"]["Enums"]["order_status"] | null;
          to_status?: Database["public"]["Enums"]["order_status"] | null;
          message?: string | null;
          actor_id?: string | null;
          actor_label?: string | null;
          created_at?: string;
        };
        Update: {
          id?: never;
          organization_id?: string;
          order_id?: string;
          type?: Database["public"]["Enums"]["order_event_type"];
          from_status?: Database["public"]["Enums"]["order_status"] | null;
          to_status?: Database["public"]["Enums"]["order_status"] | null;
          message?: string | null;
          actor_id?: string | null;
          actor_label?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "order_events_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_events_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
      art_links: {
        Row: {
          id: string;
          organization_id: string;
          order_id: string;
          token: string;
          expires_at: string;
          revoked_at: string | null;
          last_access_at: string | null;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          order_id: string;
          token?: string;
          expires_at?: string;
          revoked_at?: string | null;
          last_access_at?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          order_id?: string;
          token?: string;
          expires_at?: string;
          revoked_at?: string | null;
          last_access_at?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "art_links_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "art_links_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
      art_files: {
        Row: {
          id: string;
          organization_id: string;
          order_id: string;
          path: string;
          file_name: string;
          size_bytes: number | null;
          mime_type: string | null;
          note: string | null;
          uploaded_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          order_id: string;
          path: string;
          file_name: string;
          size_bytes?: number | null;
          mime_type?: string | null;
          note?: string | null;
          uploaded_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          order_id?: string;
          path?: string;
          file_name?: string;
          size_bytes?: number | null;
          mime_type?: string | null;
          note?: string | null;
          uploaded_by?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "art_files_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "art_files_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
      art_versions: {
        Row: {
          id: string;
          organization_id: string;
          order_id: string;
          version: number;
          proof_path: string;
          proof_mime: string;
          final_path: string | null;
          final_name: string | null;
          note: string | null;
          status: Database["public"]["Enums"]["art_version_status"];
          uploaded_by: string | null;
          created_at: string;
          reviewed_at: string | null;
        };
        Insert: {
          id?: string;
          organization_id: string;
          order_id: string;
          version?: number;
          proof_path: string;
          proof_mime: string;
          final_path?: string | null;
          final_name?: string | null;
          note?: string | null;
          status?: Database["public"]["Enums"]["art_version_status"];
          uploaded_by?: string | null;
          created_at?: string;
          reviewed_at?: string | null;
        };
        Update: {
          id?: string;
          organization_id?: string;
          order_id?: string;
          version?: number;
          proof_path?: string;
          proof_mime?: string;
          final_path?: string | null;
          final_name?: string | null;
          note?: string | null;
          status?: Database["public"]["Enums"]["art_version_status"];
          uploaded_by?: string | null;
          created_at?: string;
          reviewed_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "art_versions_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "art_versions_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
      art_reviews: {
        Row: {
          id: string;
          organization_id: string;
          order_id: string;
          version_id: string;
          decision: string;
          comment: string | null;
          pins: Json;
          reviewer_name: string | null;
          ip: unknown | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          order_id: string;
          version_id: string;
          decision: string;
          comment?: string | null;
          pins?: Json;
          reviewer_name?: string | null;
          ip?: unknown | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          order_id?: string;
          version_id?: string;
          decision?: string;
          comment?: string | null;
          pins?: Json;
          reviewer_name?: string | null;
          ip?: unknown | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "art_reviews_organization_id_fkey";
            columns: ["organization_id"];
            isOneToOne: false;
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "art_reviews_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "art_reviews_version_id_fkey";
            columns: ["version_id"];
            isOneToOne: false;
            referencedRelation: "art_versions";
            referencedColumns: ["id"];
          },
        ];
      };
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
          order_item_id: string | null;
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
          order_item_id?: string | null;
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
          order_item_id?: string | null;
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
          require_mfa: boolean;
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
          require_mfa?: boolean;
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
          require_mfa?: boolean;
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
      change_order_status: {
        Args: { p_order: string; p_status: Database["public"]["Enums"]["order_status"]; p_note?: string | null };
        Returns: undefined;
      };
      create_order: {
        Args: { p_org: string; p_status: Database["public"]["Enums"]["order_status"]; p_fields: Json; p_items: Json };
        Returns: string;
      };
      update_order: {
        Args: { p_order: string; p_fields: Json; p_items: Json };
        Returns: undefined;
      };
      save_order_items: {
        Args: { p_order: string; p_items: Json };
        Returns: undefined;
      };
      rate_limit_hit: {
        Args: { p_key: string; p_limit: number; p_window_seconds: number };
        Returns: boolean;
      };
      resolve_art_link: {
        Args: { p_token: string };
        Returns: { link_id: string; organization_id: string; order_id: string }[];
      };
      register_client_art_file: {
        Args: {
          p_token: string;
          p_path: string;
          p_file_name: string;
          p_size: number;
          p_mime: string;
          p_note: string | null;
        };
        Returns: string;
      };
      submit_art_review: {
        Args: {
          p_token: string;
          p_version_id: string;
          p_decision: string;
          p_comment: string | null;
          p_pins: Json;
          p_reviewer_name: string | null;
          p_ip: unknown;
          p_user_agent: string | null;
        };
        Returns: undefined;
      };
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
      order_status:
        | "orcamento"
        | "novo"
        | "aguardando_arte"
        | "arte_em_criacao"
        | "aguardando_aprovacao"
        | "aprovado"
        | "em_impressao"
        | "acabamento"
        | "expedicao"
        | "enviado"
        | "entregue"
        | "cancelado";
      order_item_stock: "livre" | "reservado" | "baixado";
      art_version_status: "pendente" | "aprovada" | "alteracao" | "substituida";
      order_event_type:
        | "criado"
        | "status"
        | "comentario"
        | "link_arte"
        | "arquivo_cliente"
        | "prova"
        | "arte_aprovada"
        | "alteracao_pedida"
        | "arte_final";
      sales_channel: "balcao" | "shopee" | "magalu" | "tiktok" | "whatsapp";
      person_type: "pf" | "pj";
      fulfillment_mode: "sob_encomenda" | "pronta_entrega";
      stock_movement_type: "entrada" | "saida" | "ajuste" | "perda" | "consumo" | "reserva" | "liberacao";
    };
    CompositeTypes: { [_ in never]: never };
  };
};
