"use client";
import HomePageChart from "@/components/dashboard/charts/HomePageChart";
import ProductOverviewChart from "@/components/dashboard/charts/ProductOverviewChart";
import RecentOrdersSection from "@/components/dashboard/order/RecentOrders";
import StatisticsCard from "@/components/dashboard/statistics/StatisticsCard";
import { Activity, DollarSign, ShoppingBag, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import useOrderStore from "@/store/orderStore";

const DashboardPageOne = () => {
  const { orders } = useOrderStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate stats
  const totalRevenue = orders.reduce((acc, order) => acc + (order.total || 0), 0);
  const totalOrders = orders.length;
  // Approximating items sold by just counting items array length per order (assuming 1 qty per item obj if structure is flat, or sum quantities if detailed).
  // In cartStore, items have quantity. So we should sum item.quantity.
  const totalItemsSold = orders.reduce((acc, order) => {
    // Check if items is array
    if (Array.isArray(order.items)) {
      return acc + order.items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
    }
    return acc;
  }, 0);

  const uniqueCustomers = new Set(orders.map(o => o.customerName)).size;

  if (!mounted) return null; // or skeleton

  return (
    <section className="max-w-screen-xl mx-auto py-4">
      <div className="grid gap-2 lg:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatisticsCard
          iconColor="bg-rose-500"
          title="Chiffre d'affaires"
          value={`${totalRevenue.toFixed(2)} TND`}
          icon={DollarSign}
        />
        <StatisticsCard
          iconColor="bg-lime-500"
          title="Articles Vendus"
          value={totalItemsSold.toString()}
          icon={ShoppingBag}
        />

        <StatisticsCard
          iconColor="bg-rose-500"
          title="Commandes"
          value={totalOrders.toString()}
          icon={Activity}
        />
        <StatisticsCard
          iconColor="bg-violet-500"
          title="Clients"
          value={uniqueCustomers.toString()}
          icon={Users}
        />
      </div>
      <HomePageChart />
      <RecentOrdersSection />
      <ProductOverviewChart />
    </section>
  );
};

export default DashboardPageOne;
