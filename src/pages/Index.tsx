
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Upload, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: undefined as Date | undefined,
    passportSeries: "",
    jshshir: "",
    region: "",
    district: "",
    school: "",
    category: "",
    experience: "",
    workDocument: null as File | null,
    passportCopy: null as File | null,
    language: "",
    phoneNumber: "",
    telegramPhone: ""
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
    "Toshkent shahri"
  ];

  const categories = ["Mutaxassis", "1-toifa", "2-toifa", "Oliy"];
  const experiences = ["0-3 yil", "3-5 yil", "5-10 yil", "10 yildan ko'p"];
  const languages = ["O'zbek", "Rus"];

  const handleInputChange = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const validateForm = () => {
    const required = [
      'fullName', 'birthDate', 'passportSeries', 'jshshir', 
      'region', 'district', 'school', 'category', 'experience',
      'workDocument', 'passportCopy', 'language', 'phoneNumber', 'telegramPhone'
    ];
    
    for (const field of required) {
      if (!formData[field as keyof typeof formData]) {
        toast({
          title: "Xatolik",
          description: "Barcha maydonlarni to'ldiring",
          variant: "destructive"
        });
        return false;
      }
    }

    // Phone number validation
    const phoneRegex = /^\+998\d{9}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      toast({
        title: "Xatolik", 
        description: "Telefon raqam +998 formatida kiritilishi kerak",
        variant: "destructive"
      });
      return false;
    }

    if (!phoneRegex.test(formData.telegramPhone)) {
      toast({
        title: "Xatolik",
        description: "Telegram telefon raqam +998 formatida kiritilishi kerak", 
        variant: "destructive"
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
      description: "Ro'yxatdan o'tish muvaffaqiyatli yakunlandi"
    });
    
    setTimeout(() => {
      navigate("/success");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            O'qituvchilar Olimpiadasi
          </h1>
          <p className="text-lg text-gray-600">Ro'yxatdan o'tish formasi</p>
        </div>

        <Alert className="mb-6 border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Diqqat:</strong> Litsey o'qituvchilari ushbu olimpiadada qatnasha olmaydi.
          </AlertDescription>
        </Alert>

        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center">Ro'yxatdan o'tish</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Shaxsiy ma'lumotlar
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">F.I.SH (Familya Ism Sharifi)</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Masalan: Aliyev Ali Aliovich"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Tug'ilgan sana</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !formData.birthDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.birthDate ? format(formData.birthDate, "dd/MM/yyyy") : "Sanani tanlang"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.birthDate}
                          onSelect={(date) => handleInputChange('birthDate', date)}
                          disabled={(date) => date > new Date() || date < new Date("1940-01-01")}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="passportSeries">Passport seriya va raqami</Label>
                    <Input
                      id="passportSeries"
                      value={formData.passportSeries}
                      onChange={(e) => handleInputChange('passportSeries', e.target.value)}
                      placeholder="AB1234567"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="jshshir">JSHSHIR raqami</Label>
                    <Input
                      id="jshshir"
                      value={formData.jshshir}
                      onChange={(e) => handleInputChange('jshshir', e.target.value)}
                      placeholder="12345678901234"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Manzil ma'lumotlari
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Hudud</Label>
                    <Select onValueChange={(value) => handleInputChange('region', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Hududni tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Tuman</Label>
                    <Select onValueChange={(value) => handleInputChange('district', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Tumanni tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="district1">Tuman 1</SelectItem>
                        <SelectItem value="district2">Tuman 2</SelectItem>
                        <SelectItem value="district3">Tuman 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Maktab</Label>
                    <Select onValueChange={(value) => handleInputChange('school', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Maktabni tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="school1">1-maktab</SelectItem>
                        <SelectItem value="school2">2-maktab</SelectItem>
                        <SelectItem value="school3">3-maktab</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Kasb ma'lumotlari
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Toifa</Label>
                    <Select onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Toifani tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Pedagogik staj</Label>
                    <Select onValueChange={(value) => handleInputChange('experience', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Stajni tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        {experiences.map((exp) => (
                          <SelectItem key={exp} value={exp}>
                            {exp}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Ta'lim tili</Label>
                  <Select onValueChange={(value) => handleInputChange('language', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Tilni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Documents */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Hujjatlar
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Ish joyidan ma'lumot (PDF)</Label>
                    <div className="mt-1">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileChange('workDocument', e.target.files?.[0] || null)}
                        className="hidden"
                        id="workDocument"
                      />
                      <label
                        htmlFor="workDocument"
                        className="flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors"
                      >
                        <div className="text-center">
                          <Upload className="h-6 w-6 mx-auto text-gray-400 mb-1" />
                          <span className="text-sm text-gray-600">
                            {formData.workDocument ? formData.workDocument.name : "Faylni yuklang"}
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label>Passport kopiyasi (PDF)</Label>
                    <div className="mt-1">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileChange('passportCopy', e.target.files?.[0] || null)}
                        className="hidden"
                        id="passportCopy"
                      />
                      <label
                        htmlFor="passportCopy"
                        className="flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors"
                      >
                        <div className="text-center">
                          <Upload className="h-6 w-6 mx-auto text-gray-400 mb-1" />
                          <span className="text-sm text-gray-600">
                            {formData.passportCopy ? formData.passportCopy.name : "Faylni yuklang"}
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Aloqa ma'lumotlari
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phoneNumber">Bog'lanish uchun telefon raqam</Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      placeholder="+998901234567"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="telegramPhone">Telegramga bog'langan telefon raqam</Label>
                    <Input
                      id="telegramPhone"
                      value={formData.telegramPhone}
                      onChange={(e) => handleInputChange('telegramPhone', e.target.value)}
                      placeholder="+998901234567"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 text-lg font-semibold"
              >
                Ro'yxatdan o'tish
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
