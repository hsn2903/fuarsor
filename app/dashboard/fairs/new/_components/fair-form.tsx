"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, X } from "lucide-react";
import { createFair } from "@/app/_actions/fair-actions";
import ImageUpload from "@/components/shared/image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// --- TYPES FOR LOCAL STATE ---
type ImageSet = { name: string; description: string; images: string[] };
type Activity = { day: string; activity: string };
type TourProgram = {
  id: number;
  title1: string;
  title2: string;
  title3: string;
  onePersonPrice: number;
  twoPersonPrice: number;
  activities: Activity[];
};

type Option = { id: string; name: string };

interface FairFormProps {
  hotelOptions: Option[];
  galleryOptions: Option[]; // NEW PROP
}

export default function FairForm({
  hotelOptions,
  galleryOptions,
}: FairFormProps) {
  const [state, formAction] = useActionState(createFair, null);

  const [selectedHotelId, setSelectedHotelId] = useState("");
  const [selectedGalleryId, setSelectedGalleryId] = useState("");

  // --- LOCAL STATE FOR COMPLEX FIELDS ---

  // String Arrays
  const [products, setProducts] = useState<string[]>([]);
  const [paidServices, setPaidServices] = useState<string[]>([]);
  const [freeServices, setFreeServices] = useState<string[]>([]);

  // Nested Objects
  const [hotel, setHotel] = useState<ImageSet>({
    name: "",
    description: "",
    images: [],
  });
  const [fairImages, setFairImages] = useState<ImageSet>({
    name: "",
    description: "",
    images: [],
  });
  const [tourImages, setTourImages] = useState<ImageSet>({
    name: "",
    description: "",
    images: [],
  });

  // Complex Nested Array
  const [tourPrograms, setTourPrograms] = useState<TourProgram[]>([]);

  <input type="hidden" name="fairHotelId" value={selectedHotelId} />;
  <input type="hidden" name="tourGalleryId" value={selectedGalleryId} />;

  // Single Images
  const [logoUrl, setLogoUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");

  // --- HELPER FUNCTIONS ---

  // 1. Tag List Helper (for Products, Services)
  const TagInput = ({
    items,
    setItems,
    placeholder,
  }: {
    items: string[];
    setItems: (v: string[]) => void;
    placeholder: string;
  }) => {
    const [input, setInput] = useState("");
    const add = () => {
      if (input.trim()) {
        setItems([...items, input.trim()]);
        setInput("");
      }
    };
    return (
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          />
          <Button type="button" onClick={add} variant="secondary">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <span
              key={i}
              className="bg-slate-100 px-2 py-1 rounded text-sm flex items-center gap-1 border"
            >
              {item}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => setItems(items.filter((_, idx) => idx !== i))}
              />
            </span>
          ))}
        </div>
      </div>
    );
  };

  // 2. Image Set Helper (for Hotel, FairImages, TourImages)
  const ImageSetSection = ({
    title,
    data,
    setData,
  }: {
    title: string;
    data: ImageSet;
    setData: (v: ImageSet) => void;
  }) => {
    const [imgInput, setImgInput] = useState("");
    const addImg = () => {
      if (imgInput) {
        setData({ ...data, images: [...data.images, imgInput] });
        setImgInput("");
      }
    };
    return (
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-base">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="Name / Title"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <Textarea
            placeholder="Description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />

          <div className="space-y-2">
            <Label>Images (URLs)</Label>
            <div className="flex gap-2">
              <Input
                value={imgInput}
                onChange={(e) => setImgInput(e.target.value)}
                placeholder="https://..."
              />
              <Button
                type="button"
                onClick={addImg}
                variant="outline"
                size="sm"
              >
                Add URL
              </Button>
            </div>
            <ul className="text-sm space-y-1">
              {data.images.map((url, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center bg-slate-50 p-1 rounded"
                >
                  <span className="truncate w-64">{url}</span>
                  <X
                    className="w-4 h-4 cursor-pointer text-red-500"
                    onClick={() =>
                      setData({
                        ...data,
                        images: data.images.filter((_, idx) => idx !== i),
                      })
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  };

  // 3. Tour Program Helpers
  const addProgram = () =>
    setTourPrograms([
      ...tourPrograms,
      {
        id: Date.now(),
        title1: "",
        title2: "",
        title3: "",
        onePersonPrice: 0,
        twoPersonPrice: 0,
        activities: [],
      },
    ]);

  const updateProgram = (idx: number, field: keyof TourProgram, val: any) => {
    const copy = [...tourPrograms];
    // @ts-ignore
    copy[idx][field] = val;
    setTourPrograms(copy);
  };

  const addActivity = (pIdx: number) => {
    const copy = [...tourPrograms];
    copy[pIdx].activities.push({ day: "", activity: "" });
    setTourPrograms(copy);
  };

  const updateActivity = (
    pIdx: number,
    aIdx: number,
    field: keyof Activity,
    val: string
  ) => {
    const copy = [...tourPrograms];
    copy[pIdx].activities[aIdx][field] = val;
    setTourPrograms(copy);
  };

  return (
    <form action={formAction} className="max-w-5xl mx-auto py-10 space-y-8">
      {state?.error && (
        <div className="bg-red-100 text-red-600 p-3 rounded">{state.error}</div>
      )}

      {/* --- HIDDEN INPUTS FOR COMPLEX STATE --- */}
      <input
        type="hidden"
        name="displayedProductsJson"
        value={JSON.stringify(products)}
      />
      <input
        type="hidden"
        name="paidServicesJson"
        value={JSON.stringify(paidServices)}
      />
      <input
        type="hidden"
        name="freeServicesJson"
        value={JSON.stringify(freeServices)}
      />
      <input type="hidden" name="hotelJson" value={JSON.stringify(hotel)} />
      <input
        type="hidden"
        name="fairImagesJson"
        value={JSON.stringify(fairImages)}
      />
      <input
        type="hidden"
        name="tourImagesJson"
        value={JSON.stringify(tourImages)}
      />
      <input
        type="hidden"
        name="tourProgramsJson"
        value={JSON.stringify(tourPrograms)}
      />

      {/* 1. BASIC INFO */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">General Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input name="name" placeholder="Expo 2026" required />
          </div>
          <div className="space-y-2">
            <Label>Slug</Label>
            <Input name="slug" placeholder="expo-2026" required />
          </div>
          <div className="space-y-2">
            <Label>Type</Label>
            <Input name="type" placeholder="Çin Fuarı" />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Input name="category" placeholder="Fuar" />
          </div>
          <div className="space-y-2">
            <Label>Venue</Label>
            <Input name="venue" placeholder="China" />
          </div>
          <div className="space-y-2">
            <Label>Website</Label>
            <Input name="website" placeholder="https://..." />
          </div>
          <div className="space-y-2">
            <Label>Date String</Label>
            <Input name="date" placeholder="2026-01-01" />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Input name="status" defaultValue="Beklemede" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Input type="date" name="startDate" required />
          </div>
          <div className="space-y-2">
            <Label>End Date</Label>
            <Input type="date" name="endDate" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea name="description" placeholder="Full description..." />
        </div>
        <div className="space-y-2">
          <Label>Summary</Label>
          <Textarea name="summary" placeholder="Short summary..." />
        </div>
        <div className="space-y-2">
          <Label>Tour Note</Label>
          <Textarea name="tourNote" placeholder="Important notes..." />
        </div>
      </div>

      <input type="hidden" name="logoImage" value={logoUrl} />
      <input type="hidden" name="bannerImage" value={bannerUrl} />

      <Separator />

      {/* 2. IMAGES SECTION*/}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Logo Upload */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Logo Image</Label>
          <ImageUpload
            value={logoUrl ? [logoUrl] : []} // Pass as array for the component
            onChange={(url) => setLogoUrl(url)}
            onRemove={() => setLogoUrl("")}
          />
        </div>

        {/* Banner Upload */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Banner Image</Label>
          <ImageUpload
            value={bannerUrl ? [bannerUrl] : []}
            onChange={(url) => setBannerUrl(url)}
            onRemove={() => setBannerUrl("")}
          />
        </div>
      </div>

      <Separator />

      {/* 2. IMAGES & BOOLEANS */}
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-semibold">Settings</h3>
          <div className="flex items-center justify-between border p-2 rounded">
            <Label>Display on Banner</Label>
            <Switch name="displayOnBanner" />
          </div>
          <div className="flex items-center justify-between border p-2 rounded">
            <Label>Featured</Label>
            <Switch name="isFeatured" />
          </div>
          <div className="flex items-center justify-between border p-2 rounded">
            <Label>Published</Label>
            <Switch name="isPublished" />
          </div>
          <div className="flex items-center justify-between border p-2 rounded">
            <Label>Sectoral</Label>
            <Switch name="isSectoral" />
          </div>
          <div className="flex items-center justify-between border p-2 rounded">
            <Label>Definite Departure</Label>
            <Switch name="isDefiniteDeparture" />
          </div>
        </div>
      </div>

      <Separator />

      {/* 3. LISTS (Products, Services) */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Displayed Products</Label>
          <TagInput
            items={products}
            setItems={setProducts}
            placeholder="Add product..."
          />
        </div>
        <div className="space-y-2">
          <Label>Paid Services</Label>
          <TagInput
            items={paidServices}
            setItems={setPaidServices}
            placeholder="Add service..."
          />
        </div>
        <div className="space-y-2">
          <Label>Free Services</Label>
          <TagInput
            items={freeServices}
            setItems={setFreeServices}
            placeholder="Add service..."
          />
        </div>
      </div>

      <Separator />

      {/* REPLACED HOTEL SECTION */}
      <div className="grid grid-cols-1 gap-4">
        <h3 className="font-semibold text-lg">Konaklama</h3>

        <div className="space-y-2">
          <Label>Hotel Seçimi</Label>
          <Select onValueChange={setSelectedHotelId}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Hotel Seçiniz..." />
            </SelectTrigger>
            <SelectContent>
              {hotelOptions.map((hotel) => (
                <SelectItem key={hotel.id} value={hotel.id}>
                  {hotel.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Otel bulunamadı?{" "}
            <a
              href="/admin/hotels/new"
              className="text-blue-600 underline"
              target="_blank"
            >
              Oluşturun
            </a>
            .
          </p>
        </div>
      </div>

      <Separator />

      {/* SELECTION SECTION: Hotel & Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Hotel Select */}
        <div className="space-y-2">
          <Label className="font-semibold">Accommodation (Hotel)</Label>
          <Select onValueChange={setSelectedHotelId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a hotel..." />
            </SelectTrigger>
            <SelectContent>
              {hotelOptions.map((h) => (
                <SelectItem key={h.id} value={h.id}>
                  {h.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="text-xs text-muted-foreground">
            <a
              href="/admin/hotels/new"
              target="_blank"
              className="hover:underline"
            >
              Create new hotel →
            </a>
          </div>
        </div>

        {/* NEW: Tour Gallery Select */}
        <div className="space-y-2">
          <Label className="font-semibold">Tour Images Gallery</Label>
          <Select onValueChange={setSelectedGalleryId}>
            <SelectTrigger>
              <SelectValue placeholder="Select tour gallery..." />
            </SelectTrigger>
            <SelectContent>
              {galleryOptions.map((g) => (
                <SelectItem key={g.id} value={g.id}>
                  {g.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="text-xs text-muted-foreground">
            <a
              href="/admin/galleries/new"
              target="_blank"
              className="hover:underline"
            >
              Create new gallery →
            </a>
          </div>
        </div>
      </div>

      <Separator />

      <Separator />

      {/* 4. NESTED OBJECTS (Hotel, Image Sets) */}
      <div className="grid grid-cols-3 gap-4">
        <ImageSetSection title="Fair Hotel" data={hotel} setData={setHotel} />
        <ImageSetSection
          title="Fair Images"
          data={fairImages}
          setData={setFairImages}
        />
        <ImageSetSection
          title="Tour Images"
          data={tourImages}
          setData={setTourImages}
        />
      </div>

      <Separator />

      {/* 5. TOUR PROGRAMS (Deeply Nested) */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Tour Programs</h2>
          <Button type="button" onClick={addProgram}>
            <Plus className="w-4 h-4 mr-2" /> Add Program
          </Button>
        </div>

        {tourPrograms.map((program, pIdx) => (
          <Card key={program.id} className="bg-slate-50">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-lg">Program #{pIdx + 1}</CardTitle>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setTourPrograms(tourPrograms.filter((_, i) => i !== pIdx))
                  }
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label>Title 1</Label>
                  <Input
                    value={program.title1}
                    onChange={(e) =>
                      updateProgram(pIdx, "title1", e.target.value)
                    }
                    placeholder="Ekonomik Paket"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Title 2</Label>
                  <Input
                    value={program.title2}
                    onChange={(e) =>
                      updateProgram(pIdx, "title2", e.target.value)
                    }
                    placeholder="4 Gece 5 Gün"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Title 3</Label>
                  <Input
                    value={program.title3}
                    onChange={(e) =>
                      updateProgram(pIdx, "title3", e.target.value)
                    }
                    placeholder="Hotel Name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>1 Person Price</Label>
                  <Input
                    type="number"
                    value={program.onePersonPrice}
                    onChange={(e) =>
                      updateProgram(
                        pIdx,
                        "onePersonPrice",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-1">
                  <Label>2 Person Price</Label>
                  <Input
                    type="number"
                    value={program.twoPersonPrice}
                    onChange={(e) =>
                      updateProgram(
                        pIdx,
                        "twoPersonPrice",
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
              </div>

              {/* Nested Activities */}
              <div className="bg-white p-3 rounded border space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Activities</Label>
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    onClick={() => addActivity(pIdx)}
                  >
                    + Add Activity
                  </Button>
                </div>
                {program.activities.map((act, aIdx) => (
                  <div key={aIdx} className="flex gap-2">
                    <Input
                      className="w-20"
                      placeholder="Day"
                      value={act.day}
                      onChange={(e) =>
                        updateActivity(pIdx, aIdx, "day", e.target.value)
                      }
                    />
                    <Input
                      className="flex-1"
                      placeholder="Activity"
                      value={act.activity}
                      onChange={(e) =>
                        updateActivity(pIdx, aIdx, "activity", e.target.value)
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const copy = [...tourPrograms];
                        copy[pIdx].activities = copy[pIdx].activities.filter(
                          (_, i) => i !== aIdx
                        );
                        setTourPrograms(copy);
                      }}
                    >
                      <Trash2 className="w-3 h-3 text-red-400" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button type="submit" size="lg" className="w-full">
        Create Fair
      </Button>
    </form>
  );
}
