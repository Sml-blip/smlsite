import React from "react";
import { Truck, RefreshCcw, DollarSign, Users } from "lucide-react";

const BenefitsSection = ({ textCenter }: { textCenter: boolean }) => {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {!textCenter ? (
          <div className="flex flex-wrap items-center justify-center md:justify-between mb-12">
            <h2 className="text-3xl md:text-5xl !text-center md:text-start font-bold  text-gray-900 dark:text-white border-l-4 p-2 border-l-rose-500 ">
              Découvrez nos avantages
            </h2>
          </div>
        ) : (
          <h2 className="text-3xl md:text-5xl font-bold text-start md:text-center text-gray-900 dark:text-white mb-12 border-l-4  border-l-rose-500 w-fit mx-auto p-2">
            Découvrez nos avantages
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="flex flex-col items-center space-y-4 bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md">
            <Truck size={48} className="text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Livraison gratuite
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-center">
              Profitez de la livraison gratuite sur toutes les commandes avec un minimum d'achat.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md">
            <RefreshCcw size={48} className="text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Retours faciles
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-center">
              Retournez tout article sous 30 jours pour un remboursement complet.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md">
            <DollarSign size={48} className="text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Meilleurs prix
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-center">
              Achetez en toute confiance en sachant que vous obtenez les meilleurs prix garantis.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 bg-white dark:bg-gray-700 rounded-lg p-6 shadow-md">
            <Users size={48} className="text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Support 24/7
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-center">
              Notre équipe de support client est disponible 24h/24 et 7j/7 pour vous aider.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
