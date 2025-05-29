
import { useState } from 'react';
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

interface ShopTabProps {
  user: User;
}

const ShopTab = ({ user }: ShopTabProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Mock products data
  const products: Product[] = [
    {
      id: '1',
      name: 'Alkaline Water Bottle',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300',
      description: 'Premium alkaline water bottle with pH 9.5',
      basePrice: 2500,
      gst: 450,
      bvCredit: 50,
      stock: 100,
    },
    {
      id: '2',
      name: 'Alkaline Water Filter',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300',
      description: 'Advanced alkaline water filtration system',
      basePrice: 15000,
      gst: 2700,
      bvCredit: 300,
      stock: 25,
    },
    {
      id: '3',
      name: 'pH Testing Kit',
      image: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?w=300',
      description: 'Professional pH testing kit for water',
      basePrice: 1200,
      gst: 216,
      bvCredit: 25,
      stock: 50,
    },
  ];

  // Mock order history
  const orderHistory = [
    {
      orderId: 'ORD001',
      product: 'Alkaline Water Bottle',
      quantity: 2,
      amount: 5900,
      bvCredited: 100,
      status: 'delivered',
      date: '2024-01-20',
    },
    {
      orderId: 'ORD002',
      product: 'pH Testing Kit',
      quantity: 1,
      amount: 1416,
      bvCredited: 25,
      status: 'in-transit',
      date: '2024-01-22',
    },
  ];

  const handleBuyProduct = (product: Product) => {
    const totalAmount = (product.basePrice + product.gst) * quantity;
    
    if (user.topupBalance >= totalAmount) {
      toast({
        title: "Order Placed Successfully!",
        description: `${quantity}x ${product.name} ordered for ₹${totalAmount.toLocaleString()}`,
      });
      setSelectedProduct(null);
      setQuantity(1);
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
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-transit':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Package className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
                    src={product.image} 
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
                      <span>₹{product.basePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>GST:</span>
                      <span>₹{product.gst.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>BV Credit:</span>
                      <span>{product.bvCredit} BV</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>₹{(product.basePrice + product.gst).toLocaleString()}</span>
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
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Base Price:</span>
                              <span>₹{product.basePrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>GST:</span>
                              <span>₹{product.gst.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>BV Credit:</span>
                              <span>{product.bvCredit} BV</span>
                            </div>
                            <div className="flex justify-between font-semibold text-lg">
                              <span>Total:</span>
                              <span>₹{(product.basePrice + product.gst).toLocaleString()}</span>
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
                              <span>₹{(product.basePrice + product.gst).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Quantity:</span>
                              <span>{quantity}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>BV Credit:</span>
                              <span>{product.bvCredit * quantity} BV</span>
                            </div>
                            <div className="border-t pt-2">
                              <div className="flex justify-between font-semibold text-lg">
                                <span>Total Amount:</span>
                                <span>₹{((product.basePrice + product.gst) * quantity).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>

                          <Button 
                            onClick={() => handleBuyProduct(product)}
                            className="w-full bg-gradient-to-r from-green-500 to-blue-600"
                            disabled={user.topupBalance < (product.basePrice + product.gst) * quantity}
                          >
                            {user.topupBalance >= (product.basePrice + product.gst) * quantity 
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
                {orderHistory.map((order) => (
                  <div 
                    key={order.orderId}
                    className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-white/20"
                  >
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(order.status)}
                      <div>
                        <p className="font-medium">{order.product}</p>
                        <p className="text-sm text-gray-600">Order ID: {order.orderId}</p>
                        <p className="text-sm text-gray-600">Quantity: {order.quantity}</p>
                        <p className="text-xs text-gray-500">{order.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{order.amount.toLocaleString()}</p>
                      <p className="text-sm text-green-600">{order.bvCredited} BV Credited</p>
                      <Badge className={`mt-1 ${getStatusColor(order.status)}`}>
                        {order.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShopTab;
