// src/pages/Specialities.tsx
export function Specialities() {
  const specialties = [
    "Family Practice",
    "Internal Medicine",
    "Pediatrics",
    "Cardiology",
    "Dermatology",
    "Orthopedics",
    "Neurology",
    "Psychiatry",
    "Obstetrics & Gynecology",
    "Ophthalmology",
    "ENT",
    "Urology"
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Specialities We Serve
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We provide specialized medical billing services for various healthcare specialties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {specialties.map((specialty, index) => (
            <div key={index} className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {specialty}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}; 

