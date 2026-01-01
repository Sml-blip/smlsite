import Image from "next/image";
import React from "react";

const AboutPageOne = () => {
  return (
    <section className="max-w-screen-xl mx-auto p-2 md:p-4">
      <h2 className="text-4xl font-bold mb-4 text-center">À propos de nous</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="relative w-full h-[20rem] md:h-[30rem]">
          {/* replace with your actual image */}
          <Image
            className="rounded-xl object-contain"
            src={"/images/people/group-image.avif"}
            alt="about image"
            fill
          />
        </div>

        {/* add text about yourself */}
        <div className="text-lg">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Bienvenue dans notre paradis de l'électronique ! Nous sommes passionnés par
            la fourniture des derniers et meilleurs gadgets aux passionnés de technologie
            du monde entier. Notre mission est d'offrir des produits de haute qualité à
            des prix abordables, accompagnés d'un service client exceptionnel.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Avec des années d'expérience dans l'industrie, nous avons sélectionné une collection
            de produits qui répond aux exigences des modes de vie modernes. Que
            vous recherchiez des smartphones de pointe, des ordinateurs portables puissants ou
            des appareils domestiques intelligents innovants, nous avons ce qu'il vous faut.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Nous croyons en l'innovation, la fiabilité et la satisfaction du client.
            Nous mettons constamment à jour notre inventaire pour rester à la pointe
            et vous apporter les dernières tendances technologiques. Notre équipe dévouée
            travaille sans relâche pour garantir que votre expérience d'achat soit fluide
            du début à la fin.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Merci de nous avoir choisis comme votre destination privilégiée pour tout ce qui concerne
            l'électronique. Rejoignez-nous dans cette aventure passionnante alors que nous continuons à
            redéfinir la façon dont vous achetez la technologie.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPageOne;
