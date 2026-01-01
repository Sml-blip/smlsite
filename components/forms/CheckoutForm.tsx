'use client'
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useCartStore from "@/store/cartStore";
import useOrderStore from "@/store/orderStore";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { showToast } from "@/lib/showToast";

// Simplified Zod schema for form validation
const schema = z.object({
  name: z.string().min(3, "Le nom est requis"),
  phone: z.string().min(8, "Le téléphone est requis (ex: 22334455)"),
  address: z.string().min(3, "L'adresse est requise"),
});

// Defined types for form data
type FormData = z.infer<typeof schema>;

const CheckoutForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { cartItems, getTotalAmount, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const router = useRouter();

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);

    const newOrder = {
      id: Math.random().toString(36).substring(7),
      orderNumber: `ORD-${Math.floor(Math.random() * 1000000)}`,
      customerName: data.name,
      email: "sml.shop.2024@gmail.com",
      address: data.address,
      city: "",
      zip: "",
      date: new Date().toISOString().split('T')[0],
      status: "En attente" as const,
      total: getTotalAmount(),
      items: cartItems
    };

    // Prepare email content
    const emailBody = `
Nouvelle commande reçue!

Numéro de commande: ${newOrder.orderNumber}
Date: ${newOrder.date}

Client:
- Nom: ${data.name}
- Téléphone: ${data.phone}
- Adresse: ${data.address}

Articles commandés:
${cartItems.map(item => `- ${item.name} x${item.quantity} - ${item.price * item.quantity} TND`).join('\n')}

Total: ${getTotalAmount()} TND
    `.trim();

    try {
      // Send email using mailto (this will open the user's email client)
      // For a production app, you'd want to use a backend API endpoint
      const mailtoLink = `mailto:sml.shop.2024@gmail.com?subject=Nouvelle commande ${newOrder.orderNumber}&body=${encodeURIComponent(emailBody)}`;

      // For now, we'll just log the order and save it locally
      console.log('Order details:', newOrder);
      console.log('Email would be sent to: sml.shop.2024@gmail.com');

      addOrder(newOrder);
      clearCart();

      await new Promise(resolve => setTimeout(resolve, 1000));

      showToast("Commande passée avec succès", "", "Merci pour votre achat!");

      // Redirect to dashboard orders to verify
      router.push("/dashboard/orders");
    } catch (error) {
      console.error('Error processing order:', error);
      showToast("Erreur", "", "Une erreur est survenue lors de la commande");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Nom complet</Label>
          <Input
            id="name"
            placeholder="Votre nom"
            {...register("name")}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-6 focus:outline-none"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            type="tel"
            id="phone"
            placeholder="22334455"
            {...register("phone")}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-6 focus:outline-none"
          />
          {errors.phone && (
            <span className="text-red-500">{errors.phone.message}</span>
          )}
        </div>

        <div>
          <Label htmlFor="address">Adresse</Label>
          <Input
            id="address"
            placeholder="rue de tunis, Tunis"
            {...register("address")}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-6 focus:outline-none"
          />
          {errors.address && (
            <span className="text-red-500">{errors.address.message}</span>
          )}
        </div>

        <div className="flex items-center justify-end">
          <Button type="submit" disabled={isLoading} className="gap-2">
            {isLoading && <Loader2 className="animate-spin" size={18} />}
            {isLoading ? "Traitement..." : "Commander"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
