import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    region: "",
    district: "",
    school: "",
    category: "",
    experience: "",
    language: "",
    phoneNumber: "+998",
    telegramPhone: "+998",
  });

  const regions = [
    "Andijon viloyati",
    "Buxoro viloyati",
    "Farg'ona viloyati",
    "Jizzax viloyati",
    "Xorazm viloyati",
    "Namangan viloyati",
    "Navoiy viloyati",
    "Qashqadaryo viloyati",
    "Qoraqalpog'iston Respublikasi",
    "Samarqand viloyati",
    "Sirdaryo viloyati",
    "Surxondaryo viloyati",
    "Toshkent viloyati",
    "Toshkent shahri",
  ];
  const tuman = ["Andijon tumani", "Buxoro tumani", "Farg'ona tumani"];

  const maktab = ["Andijon maktabi", "Buxoro maktabi", "Farg'ona maktabi"];

  const categories = ["Mutaxassis", "1-toifa", "2-toifa", "Oliy"];
  const experiences = ["0-3 yil", "3-5 yil", "5-10 yil", "10 yildan ko'p"];
  const languages = ["O'zbek", "Rus"];

  const handleInputChange = (field: string, value: string) => {
    if (field === "birthDate") {
      value = value
        .replace(/[^\d]/g, "")
        .replace(/(\d{2})(\d{0,2})(\d{0,4})/, (_, d, m, y) =>
          [d, m, y].filter(Boolean).join("/")
        );
    }
    if (field === "passportSeries") {
      value = value
        .toUpperCase()
        .replace(/[^A-Z]/g, "")
        .slice(0, 2);
    }

    if (field === "passportNumber") {
      value = value.replace(/\D/g, "").slice(0, 7);
    }
    if (field === "telegramPhone" && !value.startsWith("+998")) {
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
      "passportNumber",
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
    if (!phoneRegex.test(formData.phoneNumber)) {
      toast({
        title: "Xatolik",
        description:
          "Telefon raqam +998 formatida bo'lishi va 12 ta raqamdan oshmasligi kerak",
        variant: "destructive",
      });
      return false;
    }

    if (!phoneRegex.test(formData.telegramPhone)) {
      toast({
        title: "Xatolik",
        description:
          "Telegram raqam +998 formatida va 12 raqamdan iborat bo'lishi kerak",
        variant: "destructive",
      });
      return false;
    }

    if (!/^[3-6]\d{13}$/.test(formData.jshshir)) {
      toast({
        title: "Xatolik",
        description:
          "JSHSHIR 14 xonali bo'lishi va 3,4,5,6 bilan boshlanishi kerak",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Form submitted:", formData);
    toast({
      title: "Muvaffaqiyat!",
      description: "Ro'yxatdan o'tish muvaffaqiyatli yakunlandi",
    });

    setTimeout(() => {
      navigate("/success");
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-xl mx-auto p-8 bg-white shadow-lg rounded-2xl"
    >
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
        O'qituvchilar Olimpiadasi
      </h1>

      {/* Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <Label className="mb-1">Familiya</Label>
          <Input
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            placeholder="Familiyangiz"
          />
        </div>
        <div className="flex flex-col">
          <Label className="mb-1">Ism</Label>
          <Input
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            placeholder="Ismingiz"
          />
        </div>
        <div className="flex flex-col">
          <Label className="mb-1">Sharif</Label>
          <Input
            value={formData.middleName}
            onChange={(e) => handleInputChange("middleName", e.target.value)}
            placeholder="Sharifingiz"
          />
        </div>
      </div>

      {/* Birth Date */}
      <div className="flex flex-col">
        <Label className="mb-1">Tug'ilgan sana</Label>
        <Input
          placeholder="Kun/oy/yil"
          value={formData.birthDate}
          onChange={(e) => handleInputChange("birthDate", e.target.value)}
        />
      </div>

      {/* Passport */}
      <div className="flex flex-col">
        <Label className="mb-1">Passport ma'lumotlari</Label>
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Seriya (AA)"
            value={formData.passportSeries}
            onChange={(e) =>
              handleInputChange("passportSeries", e.target.value)
            }
            maxLength={2}
          />
          <Input
            placeholder="Raqami (1234567)"
            value={formData.passportNumber}
            onChange={(e) =>
              handleInputChange("passportNumber", e.target.value)
            }
            maxLength={7}
          />
        </div>
      </div>

      {/* JSHSHIR */}
      <div className="flex flex-col gap-4">
        <Label className="mb-1">JSHSHIR</Label>
        <img
          src="/passport.jpg"
          alt="JSHSHIR ko'rsatmasi"
          className="w-full max-w-md mx-auto object-contain border rounded-lg"
        />
        <Input
          placeholder="14 xonali JSHSHIR"
          value={formData.jshshir}
          onChange={(e) => handleInputChange("jshshir", e.target.value)}
        />
      </div>

      {/* Region, District, School */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label className="mb-1">Hudud</Label>
          <Select onValueChange={(value) => handleInputChange("region", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Tanlang" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-1">Tuman</Label>
          <Select
            onValueChange={(value) => handleInputChange("district", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tanlang" />
            </SelectTrigger>
            <SelectContent>
              {tuman.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-1">Maktab</Label>
          <Select onValueChange={(value) => handleInputChange("school", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Tanlang" />
            </SelectTrigger>
            <SelectContent>
              {maktab.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Category, Experience, Language */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label className="mb-1">Toifa</Label>
          <Select
            onValueChange={(value) => handleInputChange("category", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tanlang" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-1">Staj</Label>
          <Select
            onValueChange={(value) => handleInputChange("experience", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tanlang" />
            </SelectTrigger>
            <SelectContent>
              {experiences.map((e) => (
                <SelectItem key={e} value={e}>
                  {e}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-1">Ta'lim tili</Label>
          <Select
            onValueChange={(value) => handleInputChange("language", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tanlang" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Phone Numbers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <Label className="mb-1">Telefon raqam</Label>
          <Input
            placeholder="+998901234567"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <Label className="mb-1">Telegram raqam</Label>
          <Input
            placeholder="+998901234567"
            value={formData.telegramPhone}
            onChange={(e) => handleInputChange("telegramPhone", e.target.value)}
          />
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
      >
        Yuborish
      </Button>
    </form>
  );
};

export default Index;
