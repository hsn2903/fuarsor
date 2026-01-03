"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { PackageState, ActivityState } from "@/features/fairs/types";
import ActivityRow from "./activity-row";

interface PackageCardProps {
  index: number;
  pkg: PackageState;
  updatePackage: (index: number, field: keyof PackageState, value: any) => void;
  removePackage: (index: number) => void;
}

export default function PackageCard({
  index,
  pkg,
  updatePackage,
  removePackage,
}: PackageCardProps) {
  // --- HELPER FUNCTIONS FOR NESTED ACTIVITIES ---

  const addActivity = () => {
    const newActivities = [
      ...pkg.activities,
      { dayNumber: pkg.activities.length + 1, description: "" },
    ];
    updatePackage(index, "activities", newActivities);
  };

  const updateActivity = (
    actIndex: number,
    field: keyof ActivityState,
    value: any
  ) => {
    const newActivities = [...pkg.activities];
    // @ts-ignore
    newActivities[actIndex][field] = value;
    updatePackage(index, "activities", newActivities);
  };

  const removeActivity = (actIndex: number) => {
    const newActivities = pkg.activities.filter((_, i) => i !== actIndex);
    updatePackage(index, "activities", newActivities);
  };

  return (
    <Card className="bg-slate-50 border-slate-200">
      <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
        <div className="font-semibold text-slate-700">Paket #{index + 1}</div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => removePackage(index)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4 mr-2" /> Paketi Sil
        </Button>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {/* 1. Package Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Paket Adı</Label>
            <Input
              value={pkg.name}
              onChange={(e) => updatePackage(index, "name", e.target.value)}
              placeholder="Örn: Ekonomik Paket"
            />
          </div>
          <div className="space-y-2">
            <Label>Süre / Konaklama</Label>
            <Input
              value={pkg.duration}
              onChange={(e) => updatePackage(index, "duration", e.target.value)}
              placeholder="Örn: 4 Gece 5 Gün"
            />
          </div>
          <div className="space-y-2">
            <Label>Tek Kişilik Fiyat (€)</Label>
            <Input
              type="number"
              value={pkg.priceSingle}
              onChange={(e) =>
                updatePackage(index, "priceSingle", parseFloat(e.target.value))
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Çift Kişilik Fiyat (€)</Label>
            <Input
              type="number"
              value={pkg.priceDouble}
              onChange={(e) =>
                updatePackage(index, "priceDouble", parseFloat(e.target.value))
              }
            />
          </div>
        </div>

        {/* 2. Nested Activities Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-slate-600">
              Günlük Program (Aktiviteler)
            </Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addActivity}
            >
              <Plus className="h-3 w-3 mr-2" /> Gün Ekle
            </Button>
          </div>

          <div className="space-y-2 pl-2 border-l-2 border-slate-200">
            {pkg.activities.length === 0 && (
              <p className="text-sm text-slate-400 italic py-2">
                Henüz aktivite eklenmedi.
              </p>
            )}
            {pkg.activities.map((act, i) => (
              <ActivityRow
                key={i}
                activity={act}
                onChange={(field, val) => updateActivity(i, field, val)}
                onRemove={() => removeActivity(i)}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
