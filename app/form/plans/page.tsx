'use client';

import { MESSAGES } from "@/app/helpers/messages";

type Coverage = {
  name: string;
  value: number;
};

type Plan = {
  name: string;
  price: number;
  coverages: Coverage[];
};

const samplePlans: Plan[] = [
  {
    name: "Plan Básico",
    price: 25.99,
    coverages: [
      { name: "Daños a terceros", value: 5000 },
      { name: "Robo parcial", value: 2000 },
    ],
  },
  {
    name: "Plan Premium",
    price: 49.99,
    coverages: [
      { name: "Daños a terceros", value: 10000 },
      { name: "Robo total", value: 15000 },
      { name: "Asistencia en carretera", value: 3000 },
    ],
  },
  {
    name: "Plan Full Cobertura",
    price: 79.99,
    coverages: [
      { name: "Todo riesgo", value: 25000 },
      { name: "Daños personales", value: 10000 },
      { name: "Robo total", value: 15000 },
      { name: "Asistencia legal", value: 5000 },
    ],
  },
];

export default function PlansPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-10">
          {MESSAGES.PLAN_SELECTION_TITLE}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {samplePlans.map((plan, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-200"
            >
              <div>
                <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                  {plan.name}
                </h2>
                <p className="text-gray-800 text-lg font-bold mb-4">
                  ${plan.price.toFixed(2)} / mes
                </p>

                <h3 className="text-sm font-medium text-gray-600 mb-2">
                  Coberturas:
                </h3>
                <ul className="space-y-1">
                  {plan.coverages.map((c, i) => (
                    <li
                      key={i}
                      className="flex justify-between text-sm text-gray-700"
                    >
                      <span>{c.name}</span>
                      <span className="font-medium text-indigo-600">
                        ${c.value.toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl transition duration-300">
                Seleccionar Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
