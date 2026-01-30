import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Zap, Gauge, Timer, Battery, Check } from 'lucide-react';
import Joyride from 'react-joyride';
import { useTour } from '@/context/TourContext';
import { carDetailsSteps } from '@/guides/tourSteps';
import { useCar } from '@/hooks/useCars';

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { run, stepIndex, setStepIndex, stopTour } = useTour();

  const { data: car, isLoading, error } = useCar(id || '');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl font-semibold">Loading vehicle details...</div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Vehicle Not Found</h1>
          <p className="text-muted-foreground mb-6">We couldn't find the vehicle you're looking for.</p>
          <Button onClick={() => navigate('/cars')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Collection
          </Button>
        </div>
      </div>
    );
  }

  const specs = [
    { icon: Zap, label: 'Power', value: car.specs.power },
    { icon: Gauge, label: 'Top Speed', value: car.specs.speed },
    { icon: Timer, label: 'Acceleration', value: car.specs.acceleration },
    { icon: Battery, label: 'Range', value: car.specs.range },
  ];

  return (
    <>
      <Joyride
        steps={carDetailsSteps}
        run={run}
        stepIndex={stepIndex}
        continuous
        showSkipButton
        showProgress
        callback={(data) => {
          const { status, index, type } = data;
          if (type === 'step:after') {
            setStepIndex(index + 1);
          }
          if (status === 'finished' || status === 'skipped') {
            stopTour();
          }
        }}
        styles={{
          options: {
            primaryColor: 'hsl(217 91% 50%)',
            zIndex: 10000,
          },
        }}
      />

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-8"
            onClick={() => navigate('/cars')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Collection
          </Button>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="car-hero mb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={car.images?.[0] || (car as any).image || '/placeholder.svg'}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
                {car.featured && (
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                    Featured
                  </Badge>
                )}
              </div>

              {/* Info */}
              <div className="space-y-6">
                <div>
                  <Badge variant="secondary" className="mb-4">
                    {car.type}
                  </Badge>
                  <h1 className="text-5xl font-bold mb-4">{car.name}</h1>
                  <p className="text-4xl font-bold text-accent mb-6">{car.price}</p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {car.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Specs Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="specs-section mb-12"
          >
            <h2 className="text-3xl font-bold mb-8">Performance Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {specs.map((spec, index) => (
                <Card key={index} className="border-border hover:border-accent transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-accent/10 p-3">
                        <spec.icon className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{spec.label}</p>
                        <p className="text-xl font-bold">{spec.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-8">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {car.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border"
                >
                  <div className="rounded-full bg-accent/10 p-1">
                    <Check className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-accent">
              <CardContent className="space-y-6">
                <h2 className="text-3xl font-bold">Ready to Experience Excellence?</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Choose your preferred package and take the next step towards owning this
                  remarkable vehicle.
                </p>
                <Button
                  size="lg"
                  className="package-btn gap-2 group px-8 py-6 text-lg"
                  onClick={() => navigate(`/package/${id}`)}
                >
                  Choose Package
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CarDetails;
