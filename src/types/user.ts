
export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  userId: string;
  referralCode: string;
  sponsorName?: string;
  joinDate: string;
  kycStatus: 'pending' | 'verified' | 'rejected';
  rank: string;
  profileImage?: string;
  mainBalance: number;
  topupBalance: number;
  purchasedAmount: number;
  referralBonus: number;
  totalTeam: number;
  directTeam: number;
  businessVolume: number;
  stkBalance: number;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'transfer' | 'topup' | 'purchase' | 'referral_bonus' | 'salary';
  amount: number;
  status: 'pending' | 'completed' | 'rejected';
  date: string;
  description: string;
  reference_id?: string;
  transaction_id?: string;
  proof_link?: string;
  method?: string;
  recipient_id?: string;
}

export interface DepositRequest {
  method: 'bank' | 'crypto';
  amount: number;
  transactionId: string;
  proofLink: string;
}

export interface WithdrawRequest {
  method: 'bank' | 'crypto';
  amount: number;
  password: string;
}

export interface Product {
  id: string;
  name: string;
  image?: string;
  description?: string;
  base_price: number;
  gst: number;
  bv_credit: number;
  stock: number;
  is_active: boolean;
}

export interface Order {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  bv_earned: number;
  status: string;
  created_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: string;
  is_active: boolean;
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  mobile: string;
  referral_code: string;
  sponsor_id?: string;
  join_date: string;
  rank: string;
  kyc_status: 'pending' | 'verified' | 'rejected';
  total_team: number;
  direct_team: number;
  level: number;
  side?: 'left' | 'right';
}
