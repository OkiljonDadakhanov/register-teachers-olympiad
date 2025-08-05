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
            Ro‘yxatdan o‘tish yakunlandi!
          </p>
         
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
