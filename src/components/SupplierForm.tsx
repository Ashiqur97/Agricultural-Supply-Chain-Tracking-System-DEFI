import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { getContract } from '../utils/ethereum';
import { Factory } from 'lucide-react';

export default function SupplierForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productId: '',
    processingDate: '',
    millName: '',
    batchNumber: '',
    weight: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const contract = await getContract();
      if (!contract) throw new Error('Contract not available');
      
      const tx = await contract.processProduct(
        formData.productId,
        formData.processingDate,
        formData.millName,
        formData.batchNumber,
        formData.weight
      );
      
      await tx.wait();
      alert('Product processed successfully!');
      onSuccess();
      setFormData({ productId: '', processingDate: '', millName: '', batchNumber: '', weight: '' });
    } catch (error) {
      console.error('Error processing product:', error);
      alert('Failed to process product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Factory className="w-5 h-5" />
          Supplier/Mill Processing
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
            <Label>Processing Date</Label>
            <Input
              type="date"
              value={formData.processingDate}
              onChange={(e) => setFormData({...formData, processingDate: e.target.value})}
              required
            />
          </div>
          <div>
            <Label>Mill Name</Label>
            <Input
              value={formData.millName}
              onChange={(e) => setFormData({...formData, millName: e.target.value})}
              placeholder="e.g., Dinajpur Rice Mills Ltd."
              required
            />
          </div>
          <div>
            <Label>Batch Number</Label>
            <Input
              value={formData.batchNumber}
              onChange={(e) => setFormData({...formData, batchNumber: e.target.value})}
              placeholder="e.g., RICE-2025-1001"
              required
            />
          </div>
          <div>
            <Label>Weight</Label>
            <Input
              value={formData.weight}
              onChange={(e) => setFormData({...formData, weight: e.target.value})}
              placeholder="e.g., 25 kg bags"
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Processing...' : 'Process Product'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
