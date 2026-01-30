import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const soldCars = [
  {
    id: 1,
    name: 'Mercedes-Benz S-Class',
    year: 2023,
    price: 115000,
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400',
    soldDate: 'Dec 2025',
  },
  {
    id: 2,
    name: 'Porsche 911 Carrera',
    year: 2022,
    price: 135000,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400',
    soldDate: 'Nov 2025',
  },
  {
    id: 3,
    name: 'Audi RS7',
    year: 2023,
    price: 125000,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
    soldDate: 'Nov 2025',
  },
  {
    id: 4,
    name: 'Lamborghini Huracán',
    year: 2021,
    price: 285000,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400',
    soldDate: 'Oct 2025',
  },
];

const RecentlySold = () => {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Recently Sold</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Check out some of our recently sold vehicles. These premium cars found their new homes with satisfied customers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {soldCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group">
                <div className="relative">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                  <Badge className="absolute top-3 right-3 bg-destructive">
                    SOLD
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{car.name}</h3>
                  <p className="text-sm text-muted-foreground">{car.year}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-accent font-bold">
                      ${car.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Sold: {car.soldDate}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlySold;
