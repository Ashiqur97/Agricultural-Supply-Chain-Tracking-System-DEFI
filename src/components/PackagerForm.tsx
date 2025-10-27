import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { getContract } from '../utils/ethereum';
import { Package } from 'lucide-react';

export default function PackagerForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productId: '',
    packagingDate: '',
    brand: '',
    shelfLife: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const contract = await getContract();
      if (!contract) throw new Error('Contract not available');
      
      const tx = await contract.packageProduct(
        formData.productId,
        formData.packagingDate,
        formData.brand,
        formData.shelfLife
      );
      
      await tx.wait();
      alert('Product packaged successfully!');
      onSuccess();
      setFormData({ productId: '', packagingDate: '', brand: '', shelfLife: '' });
    } catch (error) {
      console.error('Error packaging product:', error);
      alert('Failed to package product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          Packaging Company
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Product ID</Label>
            <Input
              type="number"
              value={formData.productId}
              onChange={(e) => setFormData({...formData, productId: e.target.value})}
              placeholder="Enter product ID"
              required
            />
          </div>
          <div>
            <Label>Packaging Date</Label>
            <Input
              type="date"
              value={formData.packagingDate}
              onChange={(e) => setFormData({...formData, packagingDate: e.target.value})}
              required
            />
          </div>
          <div>
            <Label>Brand Name</Label>
            <Input
              value={formData.brand}
              onChange={(e) => setFormData({...formData, brand: e.target.value})}
              placeholder="e.g., Golden Harvest Rice"
              required
            />
          </div>
          <div>
            <Label>Shelf Life</Label>
            <Input
              value={formData.shelfLife}
              onChange={(e) => setFormData({...formData, shelfLife: e.target.value})}
              placeholder="e.g., 12 months"
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Packaging...' : 'Package Product'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
