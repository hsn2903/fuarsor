"use client";

import { useFieldArray, UseFormReturn } from "react-hook-form";
import { FairSchema } from "@/lib/schemas/fair-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";

interface TourProgramsProps {
  form: UseFormReturn<FairSchema>;
}

export function TourProgramsSection({ form }: TourProgramsProps) {
  // 1. Level 1 Array: Tour Programs
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tourPrograms",
  });

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <Card key={field.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Program #{index + 1}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => remove(index)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`tourPrograms.${index}.title1`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Package Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ekonomik Paket" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`tourPrograms.${index}.onePersonPrice`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (Single)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* NESTED ARRAY: Activities */}
            <ActivitiesSection nestIndex={index} form={form} />
          </CardContent>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          append({
            title1: "",
            title2: "",
            title3: "",
            onePersonPrice: 0,
            twoPersonPrice: 0,
            activities: [],
          })
        }
      >
        <Plus className="mr-2 h-4 w-4" /> Add Tour Program
      </Button>
    </div>
  );
}

// --- Internal Component for Activities ---

function ActivitiesSection({
  nestIndex,
  form,
}: {
  nestIndex: number;
  form: UseFormReturn<FairSchema>;
}) {
  // 2. Level 2 Array: Activities inside specific Tour Program
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `tourPrograms.${nestIndex}.activities`,
  });

  return (
    <div className="mt-4 border-l-2 border-slate-200 pl-4">
      <h4 className="text-sm font-semibold mb-2">Activities</h4>
      <div className="space-y-2">
        {fields.map((item, k) => (
          <div key={item.id} className="flex gap-2 items-end">
            <FormField
              control={form.control}
              name={`tourPrograms.${nestIndex}.activities.${k}.day`}
              render={({ field }) => (
                <FormItem className="w-20">
                  <FormControl>
                    <Input {...field} placeholder="Day" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`tourPrograms.${nestIndex}.activities.${k}.activity`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input {...field} placeholder="Activity description..." />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(k)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="link"
        size="sm"
        className="px-0 mt-2"
        onClick={() => append({ day: "", activity: "" })}
      >
        + Add Activity
      </Button>
    </div>
  );
}
