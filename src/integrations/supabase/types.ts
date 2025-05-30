export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      announcements: {
        Row: {
          content: string
          created_at: string
          id: string
          is_active: boolean
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_active?: boolean
          title: string
          type?: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          bv_earned: number
          created_at: string
          id: string
          product_id: string
          quantity: number
          status: string
          total_price: number
          unit_price: number
          user_id: string
        }
        Insert: {
          bv_earned?: number
          created_at?: string
          id?: string
          product_id: string
          quantity?: number
          status?: string
          total_price: number
          unit_price: number
          user_id: string
        }
        Update: {
          bv_earned?: number
          created_at?: string
          id?: string
          product_id?: string
          quantity?: number
          status?: string
          total_price?: number
          unit_price?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          base_price: number
          bv_credit: number
          created_at: string
          description: string | null
          gst: number
          id: string
          image: string | null
          is_active: boolean
          name: string
          stock: number
          updated_at: string
        }
        Insert: {
          base_price: number
          bv_credit?: number
          created_at?: string
          description?: string | null
          gst?: number
          id?: string
          image?: string | null
          is_active?: boolean
          name: string
          stock?: number
          updated_at?: string
        }
        Update: {
          base_price?: number
          bv_credit?: number
          created_at?: string
          description?: string | null
          gst?: number
          id?: string
          image?: string | null
          is_active?: boolean
          name?: string
          stock?: number
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          auth_id: string
          created_at: string
          email: string
          id: string
          join_date: string
          kyc_status: Database["public"]["Enums"]["kyc_status"]
          mobile: string
          name: string
          preferred_side: string | null
          profile_image: string | null
          rank: string
          referral_code: string
          sponsor_id: string | null
          sponsor_name: string | null
          updated_at: string
        }
        Insert: {
          auth_id: string
          created_at?: string
          email: string
          id?: string
          join_date?: string
          kyc_status?: Database["public"]["Enums"]["kyc_status"]
          mobile: string
          name: string
          preferred_side?: string | null
          profile_image?: string | null
          rank?: string
          referral_code?: string
          sponsor_id?: string | null
          sponsor_name?: string | null
          updated_at?: string
        }
        Update: {
          auth_id?: string
          created_at?: string
          email?: string
          id?: string
          join_date?: string
          kyc_status?: Database["public"]["Enums"]["kyc_status"]
          mobile?: string
          name?: string
          preferred_side?: string | null
          profile_image?: string | null
          rank?: string
          referral_code?: string
          sponsor_id?: string | null
          sponsor_name?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_sponsor_id_fkey"
            columns: ["sponsor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_levels: {
        Row: {
          direct_required: number
          id: string
          is_active: boolean
          level: number
          reward_percentage: number
        }
        Insert: {
          direct_required?: number
          id?: string
          is_active?: boolean
          level: number
          reward_percentage: number
        }
        Update: {
          direct_required?: number
          id?: string
          is_active?: boolean
          level?: number
          reward_percentage?: number
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          created_at: string
          id: string
          message: string
          priority: string
          status: string
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          priority?: string
          status?: string
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          priority?: string
          status?: string
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      team_structure: {
        Row: {
          created_at: string
          direct_team: number
          id: string
          left_team: number
          level: number
          path: string
          right_team: number
          side: string | null
          sponsor_id: string | null
          total_team: number
          user_id: string
        }
        Insert: {
          created_at?: string
          direct_team?: number
          id?: string
          left_team?: number
          level?: number
          path: string
          right_team?: number
          side?: string | null
          sponsor_id?: string | null
          total_team?: number
          user_id: string
        }
        Update: {
          created_at?: string
          direct_team?: number
          id?: string
          left_team?: number
          level?: number
          path?: string
          right_team?: number
          side?: string | null
          sponsor_id?: string | null
          total_team?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_structure_sponsor_id_fkey"
            columns: ["sponsor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_structure_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          description: string
          id: string
          method: string | null
          proof_link: string | null
          recipient_id: string | null
          reference_id: string | null
          status: Database["public"]["Enums"]["transaction_status"]
          transaction_id: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description: string
          id?: string
          method?: string | null
          proof_link?: string | null
          recipient_id?: string | null
          reference_id?: string | null
          status?: Database["public"]["Enums"]["transaction_status"]
          transaction_id?: string | null
          type: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string
          id?: string
          method?: string | null
          proof_link?: string | null
          recipient_id?: string | null
          reference_id?: string | null
          status?: Database["public"]["Enums"]["transaction_status"]
          transaction_id?: string | null
          type?: Database["public"]["Enums"]["transaction_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_level_earnings: {
        Row: {
          created_at: string
          id: string
          is_unlocked: boolean
          level: number
          total_earned: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_unlocked?: boolean
          level: number
          total_earned?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_unlocked?: boolean
          level?: number
          total_earned?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_level_earnings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          business_volume: number
          created_at: string
          id: string
          main_balance: number
          purchased_amount: number
          referral_bonus: number
          stk_balance: number
          topup_balance: number
          updated_at: string
          user_id: string
        }
        Insert: {
          business_volume?: number
          created_at?: string
          id?: string
          main_balance?: number
          purchased_amount?: number
          referral_bonus?: number
          stk_balance?: number
          topup_balance?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          business_volume?: number
          created_at?: string
          id?: string
          main_balance?: number
          purchased_amount?: number
          referral_bonus?: number
          stk_balance?: number
          topup_balance?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_announcement_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_order_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_product_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_referral_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_referral_level_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_ticket_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_transaction_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_user_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      deposit_method: "bank" | "crypto"
      kyc_status: "pending" | "verified" | "rejected"
      transaction_status: "pending" | "completed" | "rejected"
      transaction_type:
        | "deposit"
        | "withdraw"
        | "transfer"
        | "topup"
        | "purchase"
        | "referral_bonus"
        | "salary"
      withdraw_method: "bank" | "crypto"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      deposit_method: ["bank", "crypto"],
      kyc_status: ["pending", "verified", "rejected"],
      transaction_status: ["pending", "completed", "rejected"],
      transaction_type: [
        "deposit",
        "withdraw",
        "transfer",
        "topup",
        "purchase",
        "referral_bonus",
        "salary",
      ],
      withdraw_method: ["bank", "crypto"],
    },
  },
} as const
