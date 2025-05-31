
import { useState, useEffect } from 'react';
import { User, Product } from '../types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Eye, Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ShopTabProps {
  user: User;
}

const ShopTab = ({ user }: ShopTabProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        return;
      }

      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          products (name)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        return;
      }

      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleBuyProduct = async (product: Product) => {
    const totalAmount = (product.base_price + product.gst) * quantity;
    
    if (user.topupBalance >= totalAmount) {
      try {
        // Create order
        const { error: orderError } = await supabase
          .from('orders')
          .insert({
            user_id: user.id,
            product_id: product.id,
            quantity,
            unit_price: product.base_price + product.gst,
            total_price: totalAmount,
            bv_earned: product.bv_credit * quantity,
            status: 'completed'
          });

        if (orderError) {
          throw orderError;
        }

        // Update wallet balance
        const { error: walletError } = await supabase
          .from('wallets')
          .update({ 
            topup_balance: user.topupBalance - totalAmount,
            business_volume: user.businessVolume + (product.bv_credit * quantity)
          })
          .eq('user_id', user.id);

        if (walletError) {
          throw walletError;
        }

        // Create transaction record
        const { error: transactionError } = await supabase
          .from('transactions')
          .insert({
            user_id: user.id,
            type: 'purchase',
            amount: totalAmount,
            status: 'completed',
            description: `Purchase of ${quantity}x ${product.name}`,
            reference_id: product.id
          });

        if (transactionError) {
          console.error('Transaction record error:', transactionError);
        }

        toast({
          title: "Order Placed Successfully!",
          description: `${quantity}x ${product.name} ordered for ₹${totalAmount.toLocaleString()}`,
        });

        setSelectedProduct(null);
        setQuantity(1);
        fetchOrders();

      } catch (error: any) {
        toast({
          title: "Order Failed",
          description: error.message || "Failed to place order",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Insufficient Balance",
        description: "Please add funds to your top-up balance to complete this purchase.",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Package className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid grid-cols-2 w-full bg-white/60 backdrop-blur-lg border border-white/20">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          {/* Top-up Balance Display */}
          <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-white/30 shadow-xl mb-6">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Available Shopping Balance</p>
                <p className="text-2xl font-bold text-gray-900">₹{user.topupBalance.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="bg-white/60 backdrop-blur-lg border-white/30 shadow-lg hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <img 
                    src={product.image || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300'} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription className="text-sm">{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Base Price:</span>
                      <span>₹{product.base_price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>GST:</span>
                      <span>₹{product.gst.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>BV Credit:</span>
                      <span>{product.bv_credit} BV</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>₹{(product.base_price + product.gst).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      Stock: {product.stock}
                    </Badge>
                  </div>

                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1" onClick={() => setSelectedProduct(product)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{product.name}</DialogTitle>
                          <DialogDescription>{product.description}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <img 
                            src={product.image || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300'} 
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Base Price:</span>
                              <span>₹{product.base_price.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>GST:</span>
                              <span>₹{product.gst.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>BV Credit:</span>
                              <span>{product.bv_credit} BV</span>
                            </div>
                            <div className="flex justify-between font-semibold text-lg">
                              <span>Total:</span>
                              <span>₹{(product.base_price + product.gst).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="flex-1 bg-gradient-to-r from-green-500 to-blue-600">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Buy Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Purchase {product.name}</DialogTitle>
                          <DialogDescription>Complete your order details</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input
                              id="quantity"
                              type="number"
                              min="1"
                              max={product.stock}
                              value={quantity}
                              onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                            <div className="flex justify-between">
                              <span>Unit Price:</span>
                              <span>₹{(product.base_price + product.gst).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Quantity:</span>
                              <span>{quantity}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>BV Credit:</span>
                              <span>{product.bv_credit * quantity} BV</span>
                            </div>
                            <div className="border-t pt-2">
                              <div className="flex justify-between font-semibold text-lg">
                                <span>Total Amount:</span>
                                <span>₹{((product.base_price + product.gst) * quantity).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>

                          <Button 
                            onClick={() => handleBuyProduct(product)}
                            className="w-full bg-gradient-to-r from-green-500 to-blue-600"
                            disabled={user.topupBalance < (product.base_price + product.gst) * quantity}
                          >
                            {user.topupBalance >= (product.base_price + product.gst) * quantity 
                              ? 'Confirm Purchase' 
                              : 'Insufficient Balance'
                            }
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <Card className="bg-white/60 backdrop-blur-lg border-white/30 shadow-xl">
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>Track your purchase history and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No orders found</p>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div 
                      key={order.id}
                      className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-white/20"
                    >
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(order.status)}
                        <div>
                          <p className="font-medium">{order.products?.name}</p>
                          <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                          <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{order.total_price.toLocaleString()}</p>
                        <p className="text-sm text-green-600">{order.bv_earned} BV Credited</p>
                        <Badge className={`mt-1 ${getStatusColor(order.status)}`}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShopTab;
