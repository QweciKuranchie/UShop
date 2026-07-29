"use client";

import React, { Dispatch, SetStateAction } from "react";
import Title from "../Title";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Award, ShieldCheck, Cpu } from "lucide-react";

interface Props {
  selectedCondition: string | null;
  setSelectedCondition: Dispatch<SetStateAction<string | null>>;
  selectedWarranty: string | null;
  setSelectedWarranty: Dispatch<SetStateAction<string | null>>;
  selectedOs: string | null;
  setSelectedOs: Dispatch<SetStateAction<string | null>>;
}

export const CONDITIONS = [
  { label: "New", value: "new" },
  { label: "Refurbished", value: "refurbished" },
  { label: "Used - Like New", value: "like_new" },
  { label: "Used - Excellent", value: "excellent" },
  { label: "Used - Good", value: "good" },
  { label: "Used - Fair", value: "fair" },
  { label: "Used - For Parts", value: "for_parts" },
];

export const WARRANTIES = [
  { label: "Manufacturer Warranty", value: "manufacturer_warranty" },
  { label: "Seller Warranty", value: "seller_warranty" },
  { label: "No Warranty", value: "no_warranty" },
];

export const OS_OPTIONS = [
  { label: "Android", value: "Android" },
  { label: "iOS", value: "iOS" },
  { label: "Windows", value: "Windows" },
  { label: "macOS", value: "macOS" },
  { label: "Linux", value: "Linux" },
];

const AttributeList = ({
  selectedCondition,
  setSelectedCondition,
  selectedWarranty,
  setSelectedWarranty,
  selectedOs,
  setSelectedOs,
}: Props) => {
  return (
    <div className="p-6 space-y-6">
      {/* Condition Filter */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Title className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-ushop-purple" />
            Condition
          </Title>
          {selectedCondition && (
            <button
              onClick={() => setSelectedCondition(null)}
              className="text-xs text-gray-500 hover:text-red-600 underline"
            >
              Reset
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CONDITIONS.map((cond) => {
            const isSelected = selectedCondition === cond.value;
            return (
              <Badge
                key={cond.value}
                variant={isSelected ? "default" : "outline"}
                onClick={() =>
                  setSelectedCondition(isSelected ? null : cond.value)
                }
                className={`cursor-pointer text-xs py-1 px-2.5 rounded-full transition-all ${
                  isSelected
                    ? "bg-ushop-purple hover:bg-ushop-purple-dark text-white border-ushop-purple"
                    : "border-gray-200 text-gray-700 hover:border-ushop-purple hover:text-ushop-purple bg-white"
                }`}
              >
                {cond.label}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Warranty Filter */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <Title className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-ushop-pink" />
            Warranty Type
          </Title>
          {selectedWarranty && (
            <button
              onClick={() => setSelectedWarranty(null)}
              className="text-xs text-gray-500 hover:text-red-600 underline"
            >
              Reset
            </button>
          )}
        </div>
        <div className="space-y-1.5">
          {WARRANTIES.map((war) => {
            const isSelected = selectedWarranty === war.value;
            return (
              <div
                key={war.value}
                onClick={() => setSelectedWarranty(isSelected ? null : war.value)}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer text-xs transition-colors ${
                  isSelected
                    ? "bg-ushop-purple/10 text-ushop-purple font-medium"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <span>{war.label}</span>
                {isSelected && <span className="w-2 h-2 rounded-full bg-ushop-purple" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Operating System Filter */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <Title className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-ushop-purple" />
            Operating System
          </Title>
          {selectedOs && (
            <button
              onClick={() => setSelectedOs(null)}
              className="text-xs text-gray-500 hover:text-red-600 underline"
            >
              Reset
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {OS_OPTIONS.map((os) => {
            const isSelected = selectedOs === os.value;
            return (
              <Badge
                key={os.value}
                variant={isSelected ? "default" : "outline"}
                onClick={() => setSelectedOs(isSelected ? null : os.value)}
                className={`cursor-pointer text-xs py-1 px-2.5 rounded-full transition-all ${
                  isSelected
                    ? "bg-ushop-pink hover:bg-ushop-purple text-white border-ushop-pink"
                    : "border-gray-200 text-gray-700 hover:border-ushop-pink hover:text-ushop-pink bg-white"
                }`}
              >
                {os.label}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AttributeList;
