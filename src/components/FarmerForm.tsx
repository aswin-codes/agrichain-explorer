import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Leaf, MapPin, Calendar, Package, IndianRupee } from 'lucide-react';
import { toast } from 'sonner';
import QRDisplay from './QRDisplay';

const cropTypes = [
  'Organic Tomatoes',
  'Basmati Rice',
  'Alphonso Mangoes',
  'Fresh Spinach',
  'Red Onions',
  'Potatoes',
  'Wheat',
  'Cotton',
  'Sugarcane',
  'Other',
];

const units = ['kg', 'quintal', 'ton', 'pieces', 'dozen'];

interface FormData {
  cropType: string;
  variety: string;
  quantity: string;
  unit: string;
  harvestDate: string;
  farmLocation: string;
  price: string;
  notes: string;
}

const FarmerForm = () => {
  const [formData, setFormData] = useState<FormData>({
    cropType: '',
    variety: '',
    quantity: '',
    unit: 'kg',
    harvestDate: '',
    farmLocation: '',
    price: '',
    notes: '',
  });
  const [generatedQR, setGeneratedQR] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cropType || !formData.quantity || !formData.harvestDate || !formData.farmLocation || !formData.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate QR code
    const qrCode = `AGR-${Date.now().toString(36).toUpperCase()}`;
    setGeneratedQR(qrCode);
    setIsSubmitting(false);
    
    toast.success('Produce logged successfully! QR code generated.');
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (generatedQR) {
    return (
      <div className="space-y-6 animate-fade-in">
        <QRDisplay value={generatedQR} productName={formData.cropType} />
        
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => {
              setGeneratedQR(null);
              setFormData({
                cropType: '',
                variety: '',
                quantity: '',
                unit: 'kg',
                harvestDate: '',
                farmLocation: '',
                price: '',
                notes: '',
              });
            }}
          >
            Log Another Produce
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card variant="elevated">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-farm-green/10 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-farm-green" />
          </div>
          <div>
            <CardTitle>Log Your Produce</CardTitle>
            <CardDescription>Fill in the details to generate a unique QR code</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Crop Type & Variety */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cropType">Crop Type *</Label>
              <Select value={formData.cropType} onValueChange={(v) => handleChange('cropType', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent>
                  {cropTypes.map(crop => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="variety">Variety (Optional)</Label>
              <Input
                id="variety"
                placeholder="e.g., Roma, Basmati"
                value={formData.variety}
                onChange={(e) => handleChange('variety', e.target.value)}
              />
            </div>
          </div>

          {/* Quantity & Unit */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Quantity *
              </Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={(e) => handleChange('quantity', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Select value={formData.unit} onValueChange={(v) => handleChange('unit', v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {units.map(unit => (
                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Harvest Date & Price */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="harvestDate" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Harvest Date *
              </Label>
              <Input
                id="harvestDate"
                type="date"
                value={formData.harvestDate}
                onChange={(e) => handleChange('harvestDate', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price" className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4" />
                Price per {formData.unit} *
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="farmLocation" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Farm Location *
            </Label>
            <Input
              id="farmLocation"
              placeholder="e.g., Green Valley Farm, Punjab"
              value={formData.farmLocation}
              onChange={(e) => handleChange('farmLocation', e.target.value)}
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any additional information about the produce..."
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              rows={3}
            />
          </div>

          {/* Submit */}
          <Button type="submit" variant="farm" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="animate-spin">⏳</span>
                Generating QR Code...
              </>
            ) : (
              <>
                <Leaf className="w-5 h-5" />
                Generate QR Code
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FarmerForm;
