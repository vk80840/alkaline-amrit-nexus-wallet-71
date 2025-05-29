
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
  type: 'deposit' | 'withdraw' | 'transfer' | 'topup';
  amount: number;
  status: 'pending' | 'completed' | 'rejected';
  date: string;
  description: string;
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
  image: string;
  description: string;
  basePrice: number;
  gst: number;
  bvCredit: number;
  stock: number;
}
