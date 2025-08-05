"use client";

import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="max-w-xl w-full shadow-lg">
        <CardContent className="p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            O‘qituvchilar olimpiadasiga ro‘yxatdan o‘tish
          </h1>
          <p className="text-lg text-red-600 font-semibold">
            Ro‘yxatdan o‘tish yakunlangan!
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Hurmatli foydalanuvchi! Hozirda o‘qituvchilar olimpiadasi uchun
            ro‘yxatdan o‘tish jarayoni yopilgan.
          </p>
          <p className="mt-2 text-gray-700 leading-relaxed">
            Agar siz ro‘yxatdan o‘tishga ulgurmadingiz, iltimos keyingi
            bosqichlarni va e’lonlarni kuzatib boring. Yaqin orada yangi
            imkoniyatlar e’lon qilinadi.
          </p>
          <p className="mt-2 text-gray-700 leading-relaxed">
            E’tiboringiz uchun rahmat! Biz bilan qoling!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
