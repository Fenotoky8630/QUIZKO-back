import ApplicationLogo2 from '@/Components/ApplicationLogo2';

export default function Guest({ children }) {
    return (
        <div className="w-full min-h-screen flex items-center justify-center p-4">
          <div className="max-w-4xl w-full flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="w-full md:w-1/2 bg-purple-600 p-8 flex flex-col justify-center items-center text-center">
              <h1 className="text-white text-3xl font-bold">
                Bienvenue sur Quiz'ko
              </h1>
              <p className="text-white/80 text-sm leading-relaxed mt-4">
                L'application éducative conçue pour les étudiants de l'École
                Nationale d'Informatique Fianarantsoa à Madagascar !
              </p>
              <div className="mt-auto w-full flex justify-center">
                <ApplicationLogo2 />
              </div>
            </div>
  
            <div className="w-full md:w-1/2 bg-white p-8 flex items-center justify-center">
                  {children}
            </div>
          </div>
        </div>
    );
}
