"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, MapPin } from "lucide-react";

// Reuse the type we defined in FairForm
// (In a real app, you might export this from a shared types file)
type PackageState = {
  tempId: number;
  name: string;
  duration: string;
  description: string;
  priceSingle: number;
  priceDouble: number;
  activities: { dayNumber: number; description: string }[];
};

interface PackageManagerProps {
  packages: PackageState[];
  onChange: (packages: PackageState[]) => void;
}

export default function PackageManager({
  packages,
  onChange,
}: PackageManagerProps) {
  // --- ACTIONS ---

  const addPackage = () => {
    const newPkg: PackageState = {
      tempId: Math.random(),
      name: "Yeni Paket",
      duration: "3 Gece 4 Gün",
      description: "",
      priceSingle: 0,
      priceDouble: 0,
      activities: [
        {
          dayNumber: 1,
          description: "İstanbul - Şanghay uçuşu ve otele transfer.",
        },
      ],
    };
    onChange([...packages, newPkg]);
  };

  const removePackage = (tempId: number) => {
    onChange(packages.filter((p) => p.tempId !== tempId));
  };

  const updatePackage = (
    tempId: number,
    field: keyof PackageState,
    value: any
  ) => {
    onChange(
      packages.map((p) => (p.tempId === tempId ? { ...p, [field]: value } : p))
    );
  };

  // --- NESTED ACTIVITY ACTIONS ---

  const addActivity = (pkgId: number) => {
    onChange(
      packages.map((p) => {
        if (p.tempId !== pkgId) return p;

        const nextDay = p.activities.length + 1;
        return {
          ...p,
          activities: [
            ...p.activities,
            { dayNumber: nextDay, description: "" },
          ],
        };
      })
    );
  };

  const removeActivity = (pkgId: number, indexToRemove: number) => {
    onChange(
      packages.map((p) => {
        if (p.tempId !== pkgId) return p;
        // Filter out the activity and re-calculate day numbers
        const newActivities = p.activities
          .filter((_, idx) => idx !== indexToRemove)
          .map((act, idx) => ({ ...act, dayNumber: idx + 1 }));

        return { ...p, activities: newActivities };
      })
    );
  };

  const updateActivity = (pkgId: number, index: number, text: string) => {
    onChange(
      packages.map((p) => {
        if (p.tempId !== pkgId) return p;
        const newActivities = [...p.activities];
        newActivities[index].description = text;
        return { ...p, activities: newActivities };
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Tur Paketleri</h3>
        <Button
          type="button"
          onClick={addPackage}
          variant="outline"
          className="border-dashed border-2"
        >
          <Plus className="mr-2 h-4 w-4" /> Paket Ekle
        </Button>
      </div>

      {packages.length === 0 && (
        <div className="text-center p-8 border-2 border-dashed rounded-lg text-muted-foreground bg-slate-50">
          Henüz tur paketi eklenmemiş.
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {packages.map((pkg, pkgIndex) => (
          <Card
            key={pkg.tempId}
            className="relative border-l-4 border-l-blue-500"
          >
            {/* Delete Package Button */}
            <div className="absolute top-4 right-4">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removePackage(pkg.tempId)}
                className="text-red-400 hover:text-red-600"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Badge className="bg-blue-600">{pkgIndex + 1}</Badge>
                <Input
                  value={pkg.name}
                  onChange={(e) =>
                    updatePackage(pkg.tempId, "name", e.target.value)
                  }
                  className="font-bold h-8 w-1/2"
                  placeholder="Paket Adı"
                />
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* 1. Package Basics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs">Süre</Label>
                  <Input
                    value={pkg.duration}
                    onChange={(e) =>
                      updatePackage(pkg.tempId, "duration", e.target.value)
                    }
                    placeholder="Örn: 3 Gece 4 Gün"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Tek Kişilik Fiyat (€)</Label>
                  <Input
                    type="number"
                    value={pkg.priceSingle}
                    onChange={(e) =>
                      updatePackage(
                        pkg.tempId,
                        "priceSingle",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Çift Kişilik Fiyat (€)</Label>
                  <Input
                    type="number"
                    value={pkg.priceDouble}
                    onChange={(e) =>
                      updatePackage(
                        pkg.tempId,
                        "priceDouble",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
              </div>

              {/* 2. Itinerary (Activities) */}
              <div className="bg-slate-50 p-4 rounded-md space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold uppercase text-slate-500">
                    Günlük Program
                  </Label>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => addActivity(pkg.tempId)}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Gün Ekle
                  </Button>
                </div>

                {pkg.activities.map((act, actIndex) => (
                  <div key={actIndex} className="flex gap-3 items-start">
                    <div className="mt-2 flex-none w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                      {act.dayNumber}
                    </div>
                    <Textarea
                      value={act.description}
                      onChange={(e) =>
                        updateActivity(pkg.tempId, actIndex, e.target.value)
                      }
                      placeholder={`${act.dayNumber}. Gün programı...`}
                      className="min-h-[60px] text-sm"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeActivity(pkg.tempId, actIndex)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
