"use client";

import { Dispatch, SetStateAction, useState, useMemo } from "react";
import Title from "../Title";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Category } from "@/sanity.types";
import { ChevronDown, ChevronRight, Folder, FolderOpen } from "lucide-react";

interface Props {
  categories: Category[];
  selectedCategory?: string | null;
  setSelectedCategory: Dispatch<SetStateAction<string | null>>;
}

const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});

  const toggleExpand = (catId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCats((prev) => ({ ...prev, [catId]: !prev[catId] }));
  };

  // Group top-level categories and build parent-child lookup
  const { topCategories, childMap } = useMemo(() => {
    const top: Category[] = [];
    const children: Record<string, Category[]> = {};

    categories?.forEach((cat) => {
      // If category has a parent reference
      const parentRef = (cat as any).parent?._id;
      if (parentRef) {
        if (!children[parentRef]) children[parentRef] = [];
        children[parentRef].push(cat);
      } else {
        top.push(cat);
      }
    });

    return { topCategories: top.length > 0 ? top : categories, childMap: children };
  }, [categories]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <Title className="text-base font-semibold text-gray-900">
          Categories
        </Title>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {categories?.length || 0}
        </span>
      </div>

      <RadioGroup value={selectedCategory || ""} className="space-y-1">
        {topCategories?.map((category) => {
          const subcats = childMap[category._id] || [];
          const hasChildren = subcats.length > 0;
          const isExpanded = !!expandedCats[category._id];
          const isSelected = selectedCategory === category?.slug?.current;

          return (
            <div key={category?._id} className="space-y-1">
              <div
                onClick={() =>
                  setSelectedCategory(
                    isSelected ? null : (category?.slug?.current as string)
                  )
                }
                className={`group flex items-center space-x-2 px-2 py-1.5 -mx-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${
                  isSelected ? "bg-ushop-purple/10 text-ushop-purple" : ""
                }`}
              >
                {hasChildren ? (
                  <button
                    onClick={(e) => toggleExpand(category._id, e)}
                    className="p-0.5 hover:bg-gray-200 rounded text-gray-500"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </button>
                ) : (
                  <span className="w-3.5" />
                )}

                <RadioGroupItem
                  value={category?.slug?.current as string}
                  id={category?.slug?.current}
                  className="border-gray-300 text-shop_dark_green focus:ring-shop_dark_green"
                />

                <Label
                  htmlFor={category?.slug?.current}
                  className={`flex-1 cursor-pointer text-xs transition-colors duration-150 flex items-center justify-between ${
                    isSelected
                      ? "font-semibold text-ushop-purple"
                      : "text-gray-700 group-hover:text-gray-900"
                  }`}
                >
                  <span className="truncate">{category?.title}</span>
                  {(category as any).productCount > 0 && (
                    <span className="text-[10px] text-gray-400 font-normal ml-1">
                      ({(category as any).productCount})
                    </span>
                  )}
                </Label>
              </div>

              {/* Subcategories accordion */}
              {hasChildren && isExpanded && (
                <div className="ml-5 pl-2 border-l border-gray-200 space-y-1 my-1">
                  {subcats.map((sub) => {
                    const leaves = childMap[sub._id] || [];
                    const isSubSelected = selectedCategory === sub?.slug?.current;

                    return (
                      <div key={sub._id} className="space-y-1">
                        <div
                          onClick={() =>
                            setSelectedCategory(
                              isSubSelected ? null : (sub?.slug?.current as string)
                            )
                          }
                          className={`flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-gray-50 cursor-pointer text-xs ${
                            isSubSelected ? "font-semibold text-ushop-purple bg-ushop-purple/10" : "text-gray-600"
                          }`}
                        >
                          <RadioGroupItem
                            value={sub?.slug?.current as string}
                            id={sub?.slug?.current}
                            className="border-gray-300 text-shop_dark_green w-3 h-3"
                          />
                          <span className="truncate flex-1">{sub.title}</span>
                        </div>

                        {/* Leaves */}
                        {leaves.length > 0 && (
                          <div className="ml-4 space-y-0.5">
                            {leaves.map((leaf) => {
                              const isLeafSelected =
                                selectedCategory === leaf?.slug?.current;
                              return (
                                <div
                                  key={leaf._id}
                                  onClick={() =>
                                    setSelectedCategory(
                                      isLeafSelected
                                        ? null
                                        : (leaf?.slug?.current as string)
                                    )
                                  }
                                  className={`px-2 py-0.5 rounded cursor-pointer text-[11px] hover:text-ushop-purple ${
                                    isLeafSelected
                                      ? "font-semibold text-ushop-purple bg-ushop-purple/5"
                                      : "text-gray-500"
                                  }`}
                                >
                                  • {leaf.title}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </RadioGroup>

      {selectedCategory && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedCategory(null);
          }}
          className="mt-4 text-xs font-medium text-gray-600 hover:text-shop_dark_green underline underline-offset-2 decoration-1 transition-colors duration-150"
        >
          Clear category filter
        </button>
      )}
    </div>
  );
};

export default CategoryList;
