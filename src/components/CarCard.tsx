import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Gauge } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CarCardProps {
  id: number;
  name: string;
  price: string;
  images?: string[];
  image?: string;
  type: string;
  specs: {
    power: string;
    speed: string;
  };
  featured?: boolean;
}

const CarCard = ({ id, name, price, images, image, type, specs, featured }: CarCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="car-card"
    >
      <Card
        className="overflow-hidden cursor-pointer border-border hover:border-accent transition-all duration-300 h-full"
        onClick={() => navigate(`/car/${id}`)}
      >
        <CardContent className="p-0">
          {/* Image */}
          <div className="relative h-64 overflow-hidden bg-muted">
            <img
              src={images?.[0] || (image as string) || '/placeholder.svg'}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            {featured && (
              <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                Featured
              </Badge>
            )}
            <div className="absolute top-4 left-4">
              <Badge variant="secondary">{type}</Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">{name}</h3>
              <p className="text-3xl font-bold text-accent">{price}</p>
            </div>

            {/* Specs */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4 text-accent" />
                <span>{specs.power}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Gauge className="h-4 w-4 text-accent" />
                <span>{specs.speed}</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <Button
            onClick={() => navigate(`/car/${id}`)}
            className="w-full gap-2 group"
            variant="default"
          >
            View Details
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CarCard;
