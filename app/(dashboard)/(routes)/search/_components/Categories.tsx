"use client";

import { Category } from "@prisma/client";
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
  FcBusinessContact,
  FcReading,
  FcPlus,
  FcMoneyTransfer,
  FcPodiumWithSpeaker,
  FcManager,
} from "react-icons/fc";
import { GiClothes } from "react-icons/gi";
import { MdOutdoorGrill, MdOutlineDesignServices } from "react-icons/md";
import {
  IoRestaurantOutline,
  IoLanguageOutline,
  IoTrainOutline,
  IoFootballOutline,
} from "react-icons/io5";
import { IconType } from "react-icons";
import CategoryItem from "./CategoryItem";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Computer Science": FcMultipleDevices,
  Music: FcMusic,
  Photography: FcOldTimeCamera,
  Fitness: FcSportsMode,
  Accounting: FcSalesPerformance,
  Filming: FcFilmReel,
  Engineering: FcEngineering,
  Fashion: GiClothes,
  Business: FcBusinessContact,
  Education: FcReading,
  Healthcare: FcPlus,
  Outdoors: MdOutdoorGrill,
  Finance: FcMoneyTransfer,
  Food: IoRestaurantOutline,
  Language: IoLanguageOutline,
  Marketing: FcPodiumWithSpeaker,
  Travel: IoTrainOutline,
  "Product Management": FcManager,
  "UI/UX Design": MdOutlineDesignServices,
  Sports: IoFootballOutline,
};

const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};

export default Categories;
