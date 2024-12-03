import { Star } from "lucide-react";
import React from "react";

// กำหนด type ของ props ที่ component จะรับ
type PropsRating = {
  rating: number;
};
const Rating = ({ rating }: PropsRating) => {
  //ใช้ destructuring เพื่อรับค่า rating จาก props.
  return [1, 2, 3, 4].map((index) => (
       //สร้าง array [1, 2, 3, 4] (แทนจำนวนดาว 4 ดวง).
       <Star
       key={index}
       color={index <= rating ? "#FFC107" : "#E4E5E9"}
       className="w-4 h-4" //ถ้า index น้อยกว่าหรือเท่ากับค่า rating → ใช้สีทอง (#FFC107).
       // นั้น → ใช้สีเทา (#E4E5E9).
     />
  ))
};

export default Rating;
