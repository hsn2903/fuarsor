"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PackageState } from "@/features/fairs/types";
import PackageCard from "./package-card";

interface PackageManagerProps {
  packages: PackageState[];
  setPackages: (packages: PackageState[]) => void;
}

export default function PackageManager({
  packages,
  setPackages,
}: PackageManagerProps) {
  // Add a new blank package
  const addPackage = () => {
    setPackages([
      ...packages,
      {
        tempId: Date.now(), // Unique ID for UI key
        name: "",
        duration: "",
        description: "",
        priceSingle: 0,
        priceDouble: 0,
        activities: [],
      },
    ]);
  };

  // Remove a package by index
  const removePackage = (index: number) => {
    setPackages(packages.filter((_, i) => i !== index));
  };

  // Update a specific field of a package
  const updatePackage = (
    index: number,
    field: keyof PackageState,
    value: any
  ) => {
    const updatedList = [...packages];
    // @ts-ignore
    updatedList[index][field] = value;
    setPackages(updatedList);
  };

  return (
    <div className="space-y-6 border p-6 rounded-lg bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">
          Tur Programları & Fiyatlar
        </h2>
        <Button type="button" onClick={addPackage} variant="secondary">
          <Plus className="h-4 w-4 mr-2" /> Yeni Paket Ekle
        </Button>
      </div>

      <div className="space-y-6">
        {packages.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed rounded-lg text-slate-400">
            <p>Henüz hiç tur paketi eklenmemiş.</p>
            <p className="text-sm">
              Fiyatlandırma ve günlük programları eklemek için yukarıdaki butonu
              kullanın.
            </p>
          </div>
        ) : (
          packages.map((pkg, index) => (
            <PackageCard
              key={pkg.tempId} // Use tempId for stable rendering
              index={index}
              pkg={pkg}
              updatePackage={updatePackage}
              removePackage={removePackage}
            />
          ))
        )}
      </div>
    </div>
  );
}
