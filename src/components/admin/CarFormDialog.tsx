import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Car } from '@/data/carsData';
import { useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const carSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    price: z.string().min(1, 'Price is required'),
    images: z.array(z.string().url('Must be a valid URL'))
        .min(5, 'At least 5 images are required')
        .max(10, 'Maximum 10 images allowed'),
    type: z.string().min(1, 'Type is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    featured: z.boolean().default(false),
    specs: z.object({
        power: z.string().min(1, 'Power spec is required'),
        speed: z.string().min(1, 'Speed spec is required'),
        acceleration: z.string().min(1, 'Acceleration spec is required'),
        range: z.string().min(1, 'Range spec is required'),
    }),
    features: z.string().optional(),
});

type CarFormValues = z.infer<typeof carSchema>;

interface CarFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: any) => void;
    initialData?: Partial<Car>;
    title: string;
    loading?: boolean;
}

const CarFormDialog = ({
    open,
    onOpenChange,
    onSubmit,
    initialData,
    title,
    loading
}: CarFormDialogProps) => {
    const form = useForm<CarFormValues>({
        resolver: zodResolver(carSchema),
        defaultValues: {
            name: '',
            price: '',
            images: [],
            type: '',
            description: '',
            featured: false,
            specs: {
                power: '',
                speed: '',
                acceleration: '',
                range: '',
            },
            features: '',
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "images" as never, // Forced cast to bypass strict checking issue if valid
    });

    useEffect(() => {
        if (initialData) {
            form.reset({
                name: initialData.name || '',
                price: initialData.price || '',
                images: initialData.images || [],
                type: initialData.type || '',
                description: initialData.description || '',
                featured: initialData.featured || false,
                specs: {
                    power: initialData.specs?.power || '',
                    speed: initialData.specs?.speed || '',
                    acceleration: initialData.specs?.acceleration || '',
                    range: initialData.specs?.range || '',
                },
                features: Array.isArray(initialData.features)
                    ? initialData.features.join(', ')
                    : (initialData.features || ''),
            } as any);
        } else {
            form.reset({
                name: '',
                price: '',
                images: [],
                type: '',
                description: '',
                featured: false,
                specs: {
                    power: '',
                    speed: '',
                    acceleration: '',
                    range: '',
                },
                features: '',
            });
        }
    }, [initialData, form, open]);

    const handleSubmit = (values: CarFormValues) => {
        const transformedData = {
            ...values,
            features: values.features
                ? values.features.split(',').map((s) => s.trim()).filter(Boolean)
                : []
        };
        onSubmit(transformedData);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        Enter the details for the vehicle. At least 5 images are required.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Vehicle Name*</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tesla Model S" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price*</FormLabel>
                                        <FormControl>
                                            <Input placeholder="$89,990" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <FormLabel>Images* (Min 5, Max 10)</FormLabel>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => append("http://")}
                                    disabled={fields.length >= 10}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Image
                                </Button>
                            </div>

                            {fields.map((field, index) => (
                                <div key={field.id} className="flex gap-2">
                                    <FormField
                                        control={form.control}
                                        name={`images.${index}`}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input placeholder="https://..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => remove(index)}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            ))}
                            {form.formState.errors.images && (
                                <p className="text-sm font-medium text-destructive">
                                    {form.formState.errors.images.message}
                                </p>
                            )}
                            {fields.length === 0 && (
                                <p className="text-sm text-muted-foreground italic">
                                    No images added yet. Please add at least 5 images.
                                </p>
                            )}
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Vehicle Type*</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Electric">Electric</SelectItem>
                                                <SelectItem value="Electric Luxury">Electric Luxury</SelectItem>
                                                <SelectItem value="Electric SUV">Electric SUV</SelectItem>
                                                <SelectItem value="Electric Sports">Electric Sports</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description*</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Detailed description of the vehicle..."
                                            className="h-32"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <FormField
                                control={form.control}
                                name="specs.power"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Power</FormLabel>
                                        <FormControl>
                                            <Input placeholder="1,020 hp" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="specs.speed"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Top Speed</FormLabel>
                                        <FormControl>
                                            <Input placeholder="200 mph" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="specs.acceleration"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>0-60 mph</FormLabel>
                                        <FormControl>
                                            <Input placeholder="1.99s" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="specs.range"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Range</FormLabel>
                                        <FormControl>
                                            <Input placeholder="396 miles" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="features"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Features (comma separated)</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Autopilot, Glass Roof, Premium Interior"
                                            {...field}
                                            value={field.value || ''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="featured"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Featured Vehicle
                                        </FormLabel>
                                        <p className="text-sm text-muted-foreground">
                                            Display this vehicle in the featured section of the homepage.
                                        </p>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Saving...' : 'Save Vehicle'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CarFormDialog;
