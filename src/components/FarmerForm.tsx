import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { getContract } from '../utils/ethereum';
import { Sprout } from 'lucide-react';

export default function FarmerForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    crop: '',
    harvestDate: '',
    location: '',
    quality: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const contract = await getContract();
      if (!contract) throw new Error('Contract not available');
      
      const tx = await contract.createProduct(
        formData.crop,
        formData.harvestDate,
        formData.location,
        formData.quality
      );
      
      await tx.wait();
      alert('Product created successfully!');
      onSuccess();
      setFormData({ crop: '', harvestDate: '', location: '', quality: '' });
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sprout className="w-5 h-5" />
          Farmer Registration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Crop Type</Label>
            <Input
              value={formData.crop}
              onChange={(e) => setFormData({...formData, crop: e.target.value})}
              placeholder="e.g., Basmati Paddy"
              required
            />
          </div>
          <div>
            <Label>Harvest Date</Label>
            <Input
              type="date"
              value={formData.harvestDate}
              onChange={(e) => setFormData({...formData, harvestDate: e.target.value})}
              required
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="e.g., Dinajpur, Bangladesh"
              required
            />
          </div>
          <div>
            <Label>Quality Check</Label>
            <Input
              value={formData.quality}
              onChange={(e) => setFormData({...formData, quality: e.target.value})}
              placeholder="e.g., Moisture 12%"
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Creating...' : 'Create Product'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
