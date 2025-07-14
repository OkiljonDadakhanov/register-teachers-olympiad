"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    birthDate: "",
    passportSeries: "",
    passportNumber: "",
    jshshir: "",
    region: 0,
    district: 0,
    school: 0,
    category: "",
    experience: "",
    language: "",
    phoneNumber: "+998",
    telegramPhone: "+998",
  });

  const [regionsData, setRegionsData] = useState<
    { id: number; name: string }[]
  >([]);
  const [districtsData, setDistrictsData] = useState<
    { id: number; name: string }[]
  >([]);
  const [schoolsData, setSchoolsData] = useState<
    { id: number; name: string }[]
  >([]);

  const [selectedRegionId, setSelectedRegionId] = useState<number | null>(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(
    null
  );

  const categories = ["Mutaxassis", "1-toifa", "2-toifa", "Oliy"];
  const experiences = ["0-3 yil", "3-5 yil", "5-10 yil", "10 yildan ko'p"];
  const languages = ["O'zbek", "Rus"];

  useEffect(() => {
    axios.get("https://api.olympcentre.uz/api/region/").then((res) => {
      setRegionsData(res.data);
    });
  }, []);

  useEffect(() => {
    if (!selectedRegionId) return;
    axios
      .get(
        `https://api.olympcentre.uz/api/district/?region=${selectedRegionId}`
      )
      .then((res) => {
        setDistrictsData(res.data);
        setFormData((prev) => ({ ...prev, district: 0, school: 0 }));
        setSchoolsData([]);
      });
  }, [selectedRegionId]);

  useEffect(() => {
    if (!selectedDistrictId) return;
    axios
      .get(
        `https://api.olympcentre.uz/api/school/?district=${selectedDistrictId}`
      )
      .then((res) => {
        setSchoolsData(res.data);
        setFormData((prev) => ({ ...prev, school: 0 }));
      });
  }, [selectedDistrictId]);

  const handleInputChange = (field: string, value: string | number) => {
    if (field === "birthDate" && typeof value === "string") {
      value = value
        .replace(/[^\d]/g, "")
        .replace(/(\d{2})(\d{0,2})(\d{0,4})/, (_, d, m, y) =>
          [d, m, y].filter(Boolean).join("/")
        );
    }
    if (field === "passportSeries" && typeof value === "string") {
      value = value
        .toUpperCase()
        .replace(/[^A-Z]/g, "")
        .slice(0, 2);
    }
    if (field === "passportNumber" && typeof value === "string") {
      value = value.replace(/\D/g, "").slice(0, 7);
    }
    if (
      field === "telegramPhone" &&
      typeof value === "string" &&
      !value.startsWith("+998")
    ) {
      value = "+998" + value.replace(/^\+998/, "");
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const required = [
      "lastName",
      "firstName",
      "middleName",
      "birthDate",
      "passportSeries",
      "passportNumber",
      "jshshir",
      "region",
      "district",
      "school",
      "category",
      "experience",
      "language",
      "phoneNumber",
      "telegramPhone",
    ];

    for (const field of required) {
      if (!formData[field as keyof typeof formData]) {
        toast({
          title: "Xatolik",
          description: "Barcha maydonlarni to'ldiring",
          variant: "destructive",
        });
        return false;
      }
    }

    const phoneRegex = /^\+998\d{9}$/;
    if (
      !phoneRegex.test(formData.phoneNumber) ||
      !phoneRegex.test(formData.telegramPhone)
    ) {
      toast({
        title: "Xatolik",
        description: "Telefon raqam +998 formatida noto‘g‘ri",
        variant: "destructive",
      });
      return false;
    }

    if (!/^[3-6]\d{13}$/.test(formData.jshshir)) {
      toast({
        title: "Xatolik",
        description: "JSHSHIR 14 xonali va 3-6 bilan boshlanishi kerak",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post(
        "https://api.olympcentre.uz/api/teacher-registration/register/",
        formData
      );
      toast({
        title: "Muvaffaqiyat!",
        description: "Ro'yxatdan o'tish muvaffaqiyatli yakunlandi",
      });
      navigate("/success");
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Server bilan muammo yuz berdi",
        variant: "destructive",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-xl mx-auto p-8 bg-white shadow-lg rounded-2xl"
    >
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
        O'qituvchilar Olimpiadasi
      </h1>

      <p className="text-sm text-center text-red-600 font-medium">
        Akademik litseylar, kasb hunar maktablari, professional ta'lim
        muassasalari o'qituvchilari ishtirok etmaydi.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputBlock
          label="Familiya"
          value={formData.lastName}
          onChange={(v) => handleInputChange("lastName", v)}
        />
        <InputBlock
          label="Ism"
          value={formData.firstName}
          onChange={(v) => handleInputChange("firstName", v)}
        />
        <InputBlock
          label="Sharif"
          value={formData.middleName}
          onChange={(v) => handleInputChange("middleName", v)}
        />
      </div>

      <InputBlock
        label="Tug'ilgan sana"
        value={formData.birthDate}
        onChange={(v) => handleInputChange("birthDate", v)}
      />

      <div className="flex flex-col">
        <Label className="mb-1">Pasport ma'lumotlari</Label>
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Seriya (AA)"
            value={formData.passportSeries}
            onChange={(e) =>
              handleInputChange("passportSeries", e.target.value)
            }
          />
          <Input
            placeholder="Raqami (1234567)"
            value={formData.passportNumber}
            onChange={(e) =>
              handleInputChange("passportNumber", e.target.value)
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Label className="mb-1">JShShIR</Label>
        <img
          src="/passport.jpg"
          alt="JShShIR ko'rsatmasi"
          className="w-full max-w-md mx-auto object-contain border rounded-lg"
        />
        <Input
          placeholder="14 xonali JShShIR"
          value={formData.jshshir}
          onChange={(e) => handleInputChange("jshshir", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SelectBlock
          label="Hudud"
          options={regionsData}
          value={formData.region}
          onChange={(val) => {
            const region = regionsData.find((r) => r.id === +val);
            if (region) {
              setSelectedRegionId(region.id);
              handleInputChange("region", region.id);
            }
          }}
        />

        <SelectBlock
          label="Tuman"
          options={districtsData}
          value={formData.district}
          onChange={(val) => {
            const district = districtsData.find((d) => d.id === +val);
            if (district) {
              setSelectedDistrictId(district.id);
              handleInputChange("district", district.id);
            }
          }}
        />

        <SelectBlock
          label="Maktab"
          options={schoolsData}
          value={formData.school}
          onChange={(val) => handleInputChange("school", +val)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Toifa", field: "category", values: categories },
          {
            label: "Pedagogik ish staji",
            field: "experience",
            values: experiences,
          },
          {
            label: "Test topshirish tili",
            field: "language",
            values: languages,
          },
        ].map(({ label, field, values }) => (
          <SelectBlock
            key={field}
            label={label}
            options={values.map((val) => ({ id: val, name: val }))}
            value={formData[field as keyof typeof formData] as string}
            onChange={(value) => handleInputChange(field, value)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputBlock
          label="Telefon raqam"
          value={formData.phoneNumber}
          onChange={(v) => handleInputChange("phoneNumber", v)}
        />
        <InputBlock
          label="Telegram raqam"
          value={formData.telegramPhone}
          onChange={(v) => handleInputChange("telegramPhone", v)}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
      >
        Yuborish
      </Button>
    </form>
  );
};

const InputBlock = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
}) => (
  <div className="flex flex-col">
    <Label className="mb-1">{label}</Label>
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={label}
    />
  </div>
);

const SelectBlock = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: number | string; name: string }[];
  value: string | number;
  onChange: (val: string) => void;
}) => (
  <div>
    <Label className="mb-1">{label}</Label>
    <Select onValueChange={onChange} value={String(value)}>
      <SelectTrigger>
        <SelectValue placeholder="Tanlang" />
      </SelectTrigger>
      <SelectContent>
        {options.map((item) => (
          <SelectItem key={item.id} value={String(item.id)}>
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default Index;
