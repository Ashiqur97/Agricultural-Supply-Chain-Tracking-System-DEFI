import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { getContract } from '../utils/ethereum';
import { Search, CheckCircle2 } from 'lucide-react';

export default function ProductTracker() {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!productId) return;
    setLoading(true);
    
    try {
      const contract = await getContract();
      if (!contract) throw new Error('Contract not available');
      
      const result = await contract.getProduct(productId);
      setProduct(result);
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Product not found');
    } finally {
      setLoading(false);
    }
  };

  const getStageText = (stage: number) => {
    const stages = ['Farmer', 'Supplier/Mill', 'Packaged'];
    return stages[stage] || 'Unknown';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Track Product
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Label>Product ID</Label>
            <Input
              type="number"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Enter product ID"
            />
          </div>
          <Button onClick={handleSearch} disabled={loading} className="mt-6">
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>

        {product && (
          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Product #{product.id.toString()}</h3>
              <Badge>{getStageText(product.currentStage)}</Badge>
            </div>

            <div className="space-y-3">
              {product.crop && (
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Farmer Stage</p>
                    <p className="text-sm text-muted-foreground">Crop: {product.crop}</p>
                    <p className="text-sm text-muted-foreground">Harvest: {product.harvestDate}</p>
                    <p className="text-sm text-muted-foreground">Location: {product.location}</p>
                    <p className="text-sm text-muted-foreground">Quality: {product.quality}</p>
                  </div>
                </div>
              )}

              {product.millName && (
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Supplier/Mill Stage</p>
                    <p className="text-sm text-muted-foreground">Mill: {product.millName}</p>
                    <p className="text-sm text-muted-foreground">Processing: {product.processingDate}</p>
                    <p className="text-sm text-muted-foreground">Batch: {product.batchNumber}</p>
                    <p className="text-sm text-muted-foreground">Weight: {product.weight}</p>
                  </div>
                </div>
              )}

              {product.brand && (
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Packaging Stage</p>
                    <p className="text-sm text-muted-foreground">Brand: {product.brand}</p>
                    <p className="text-sm text-muted-foreground">Packaged: {product.packagingDate}</p>
                    <p className="text-sm text-muted-foreground">Shelf Life: {product.shelfLife}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
