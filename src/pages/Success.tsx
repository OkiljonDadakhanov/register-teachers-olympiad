
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
      <Card className="max-w-md w-full shadow-xl border-0">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Muvaffaqiyat!
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Siz muvaffaqiyatli ro'yxatdan o'tdingiz
            </p>
         
          </div>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Keyingi qadamlar:</strong>
              </p>
              <ul className="text-sm text-blue-700 mt-2 text-left">
                <li>• Arizangiz ko'rib chiqiladi</li>
                <li>• Qo'shimcha ma'lumot kerak bo'lsa, bog'lanamiz</li>
              </ul>
            </div>
            
            <Button 
              onClick={() => navigate("/")}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Home className="mr-2 h-4 w-4" />
              Bosh sahifaga qaytish
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Success;
